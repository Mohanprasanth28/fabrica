import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderList: fetchedOrderList } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  // Mock Orders (for fallback)
  const mockOrders = [
    {
      _id: "mock1",
      orderDate: "2024-11-01T12:34:56",
      orderStatus: "confirmed",
      totalAmount: 123.45,
      items: [{ name: "Item A", quantity: 2, price: 50 }],
    },
    {
      _id: "mock2",
      orderDate: "2024-11-05T15:22:18",
      orderStatus: "pending",
      totalAmount: 67.89,
      items: [{ name: "Item B", quantity: 1, price: 67.89 }],
    },
    {
      _id: "mock3",
      orderDate: "2024-11-10T08:15:42",
      orderStatus: "rejected",
      totalAmount: 34.56,
      items: [{ name: "Item C", quantity: 3, price: 11.52 }],
    },
  ];

  // Use fetchedOrderList if available, fallback to mockOrders otherwise
  const orderList =
    fetchedOrderList && fetchedOrderList.length > 0
      ? fetchedOrderList
      : mockOrders;

  // Open the dialog with selected order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 ${
                      orderItem.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-black"
                    }`}
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>${orderItem.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(orderItem)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog for Order Details */}
        {selectedOrder && (
          <Dialog
            open={openDetailsDialog}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpenDetailsDialog(false);
                setSelectedOrder(null);
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
              </DialogHeader>
              <div>
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {selectedOrder.orderDate.split("T")[0]}
                </p>
                <p>
                  <strong>Order Status:</strong> {selectedOrder.orderStatus}
                </p>
                <p>
                  <strong>Total Amount:</strong> $
                  {selectedOrder.totalAmount.toFixed(2)}
                </p>
                <div>
                  <strong>Items:</strong>
                  <ul>
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
