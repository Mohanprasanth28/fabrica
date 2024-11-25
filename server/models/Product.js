const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["men", "women", "kids"],
      required: true
    },
    brand: {
      type: String,
      enum: ["nike", "adidas", "puma", "levi", "zara", "h&m"],
      required: true
    },
    totalStock: {
      type: Number,
      default: 0,
    },
    sizes: [{
      name: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        required: true
      },
      stock: {
        type: Number,
        default: 0,
        min: 0
      }
    }],
    averageReview: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to update totalStock based on sizes
ProductSchema.pre('save', function(next) {
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((sum, size) => sum + size.stock, 0);
  }
  next();
});

// Initialize sizes if not provided
ProductSchema.pre('save', function(next) {
  if (!this.sizes || this.sizes.length === 0) {
    this.sizes = ['S', 'M', 'L', 'XL', 'XXL'].map(name => ({
      name,
      stock: 0
    }));
  }
  next();
});

module.exports = mongoose.model("Products", ProductSchema);