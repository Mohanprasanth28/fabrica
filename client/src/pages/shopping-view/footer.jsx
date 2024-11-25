import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: Fabrica@shop.com</li>
            <li>Phone: +91-9876543210</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            We are a leading online store providing the best fashion products at
            affordable prices.
          </p>
        </div>
        

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <FaTwitter className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-colors duration-300" />
            <FaFacebookF className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors duration-300" />
            <FaInstagram className="w-6 h-6 cursor-pointer hover:text-pink-500 transition-colors duration-300" />
            <FaWhatsapp className="w-6 h-6 cursor-pointer hover:text-green-500 transition-colors duration-300" />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Address</h3>
          <ul className="space-y-2 text-sm">
            <li>123 Fashion Avenue</li>
            <li>New York, NY 10001</li>
            <li>United States</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
