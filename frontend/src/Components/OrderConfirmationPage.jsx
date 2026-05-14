// src/Components/OrderConfirmationPage.jsx
import { Link } from "react-router-dom";
import { CheckCircle, Truck, Mail } from "lucide-react";

const OrderConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white border border-gray-200 p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-light text-black mb-2">Order Confirmed!</h1>
          <div className="w-12 h-px bg-black mx-auto mb-4"></div>
          <p className="text-gray-500 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          <div className="border-t border-gray-100 pt-6 mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Estimated Delivery: 5-7 business days</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Confirmation sent to your email</span>
            </div>
          </div>
          <Link to="/watches" className="inline-block mt-6 px-8 py-3 bg-black text-white hover:bg-gray-800 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmationPage;