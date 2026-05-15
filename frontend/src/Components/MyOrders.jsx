// src/Components/MyOrders.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle, Loader, Eye, Printer, Download } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/useAuth";

// Import all images for mapping
import R1 from "../assets/R1.png";
import R2 from "../assets/R2.png";
import R3 from "../assets/R3.png";
import R4 from "../assets/R4.png";
import R5 from "../assets/R5.png";
import R6 from "../assets/R6.png";
import R7 from "../assets/R7.png";
import R8 from "../assets/R8.png";
import O1 from "../assets/O1.png";
import O2 from "../assets/O2.png";
import O3 from "../assets/O3.png";
import O4 from "../assets/O4.png";
import O5 from "../assets/O5.png";
import O6 from "../assets/O6.png";
import O7 from "../assets/O7.png";
import O8 from "../assets/O8.png";
import P1 from "../assets/P1.png";
import P2 from "../assets/P2.png";
import P3 from "../assets/P3.PNG";
import P4 from "../assets/P4.png";
import P5 from "../assets/P5.png";
import P6 from "../assets/P6.png";
import P7 from "../assets/P7.png";
import P8 from "../assets/P8.png";
import AP1 from "../assets/AP1.png";
import AP2 from "../assets/AP2.png";
import AP3 from "../assets/AP3.png";
import AP4 from "../assets/AP4.png";
import AP5 from "../assets/AP5.png";
import AP6 from "../assets/AP6.png";
import AP7 from "../assets/AP7.png";
import AP8 from "../assets/AP8.png";
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import C7 from "../assets/C7.png";
import C8 from "../assets/C8.png";
import B1 from "../assets/B1.png";
import B2 from "../assets/B2.png";
import B3 from "../assets/B3.png";
import B4 from "../assets/B4.PNG";
import B5 from "../assets/B5.png";
import B6 from "../assets/B6.png";
import B7 from "../assets/B7.png";
import B8 from "../assets/B8.png";
import IWC1 from "../assets/IWC1.png";
import IWC2 from "../assets/IWC2.png";
import IWC3 from "../assets/IWC3.png";
import IWC4 from "../assets/IWC4.png";
import IWC5 from "../assets/IWC5.png";
import IWC6 from "../assets/IWC6.png";
import IWC7 from "../assets/IWC7.png";
import IWC8 from "../assets/IWC8.png";
import H1 from "../assets/H1.png";
import H2 from "../assets/H2.png";
import H3 from "../assets/H3.png";
import H4 from "../assets/H4.png";
import H5 from "../assets/H5.png";
import H6 from "../assets/H6.png";
import H7 from "../assets/H7.png";
import H8 from "../assets/H8.png";
import TH1 from "../assets/TH1.png";
import TH2 from "../assets/TH2.png";
import TH3 from "../assets/TH3.png";
import TH4 from "../assets/TH4.png";
import TH5 from "../assets/TH5.png";
import TH6 from "../assets/TH6.png";
import TH7 from "../assets/TH7.png";
import TH8 from "../assets/TH8.png";
import JL1 from "../assets/JL1.png";
import JL2 from "../assets/JL2.png";
import JL3 from "../assets/JL3.png";
import JL4 from "../assets/JL4.png";
import JL5 from "../assets/JL5.png";
import JL6 from "../assets/JL6.png";
import JL7 from "../assets/JL7.png";
import JL8 from "../assets/JL8.png";

// Image mapping for backend paths
const imageMap = {
  "/images/R1.png": R1, "R1.png": R1, "R1": R1,
  "/images/R2.png": R2, "R2.png": R2, "R2": R2,
  "/images/R3.png": R3, "R3.png": R3, "R3": R3,
  "/images/R4.png": R4, "R4.png": R4, "R4": R4,
  "/images/R5.png": R5, "R5.png": R5, "R5": R5,
  "/images/R6.png": R6, "R6.png": R6, "R6": R6,
  "/images/R7.png": R7, "R7.png": R7, "R7": R7,
  "/images/R8.png": R8, "R8.png": R8, "R8": R8,
  "/images/O1.png": O1, "O1.png": O1, "O1": O1,
  "/images/O2.png": O2, "O2.png": O2, "O2": O2,
  "/images/O3.png": O3, "O3.png": O3, "O3": O3,
  "/images/O4.png": O4, "O4.png": O4, "O4": O4,
  "/images/O5.png": O5, "O5.png": O5, "O5": O5,
  "/images/O6.png": O6, "O6.png": O6, "O6": O6,
  "/images/O7.png": O7, "O7.png": O7, "O7": O7,
  "/images/O8.png": O8, "O8.png": O8, "O8": O8,
  "/images/P1.png": P1, "P1.png": P1, "P1": P1,
  "/images/P2.png": P2, "P2.png": P2, "P2": P2,
  "/images/P3.PNG": P3, "P3.PNG": P3, "P3": P3,
  "/images/P4.png": P4, "P4.png": P4, "P4": P4,
  "/images/P5.png": P5, "P5.png": P5, "P5": P5,
  "/images/P6.png": P6, "P6.png": P6, "P6": P6,
  "/images/P7.png": P7, "P7.png": P7, "P7": P7,
  "/images/P8.png": P8, "P8.png": P8, "P8": P8,
  "/images/AP1.png": AP1, "AP1.png": AP1, "AP1": AP1,
  "/images/AP2.png": AP2, "AP2.png": AP2, "AP2": AP2,
  "/images/AP3.png": AP3, "AP3.png": AP3, "AP3": AP3,
  "/images/AP4.png": AP4, "AP4.png": AP4, "AP4": AP4,
  "/images/AP5.png": AP5, "AP5.png": AP5, "AP5": AP5,
  "/images/AP6.png": AP6, "AP6.png": AP6, "AP6": AP6,
  "/images/AP7.png": AP7, "AP7.png": AP7, "AP7": AP7,
  "/images/AP8.png": AP8, "AP8.png": AP8, "AP8": AP8,
  "/images/C1.png": C1, "C1.png": C1, "C1": C1,
  "/images/C2.png": C2, "C2.png": C2, "C2": C2,
  "/images/C3.png": C3, "C3.png": C3, "C3": C3,
  "/images/C4.png": C4, "C4.png": C4, "C4": C4,
  "/images/C5.png": C5, "C5.png": C5, "C5": C5,
  "/images/C6.png": C6, "C6.png": C6, "C6": C6,
  "/images/C7.png": C7, "C7.png": C7, "C7": C7,
  "/images/C8.png": C8, "C8.png": C8, "C8": C8,
  "/images/B1.png": B1, "B1.png": B1, "B1": B1,
  "/images/B2.png": B2, "B2.png": B2, "B2": B2,
  "/images/B3.png": B3, "B3.png": B3, "B3": B3,
  "/images/B4.PNG": B4, "B4.PNG": B4, "B4": B4,
  "/images/B5.png": B5, "B5.png": B5, "B5": B5,
  "/images/B6.png": B6, "B6.png": B6, "B6": B6,
  "/images/B7.png": B7, "B7.png": B7, "B7": B7,
  "/images/B8.png": B8, "B8.png": B8, "B8": B8,
  "/images/IWC1.png": IWC1, "IWC1.png": IWC1, "IWC1": IWC1,
  "/images/IWC2.png": IWC2, "IWC2.png": IWC2, "IWC2": IWC2,
  "/images/IWC3.png": IWC3, "IWC3.png": IWC3, "IWC3": IWC3,
  "/images/IWC4.png": IWC4, "IWC4.png": IWC4, "IWC4": IWC4,
  "/images/IWC5.png": IWC5, "IWC5.png": IWC5, "IWC5": IWC5,
  "/images/IWC6.png": IWC6, "IWC6.png": IWC6, "IWC6": IWC6,
  "/images/IWC7.png": IWC7, "IWC7.png": IWC7, "IWC7": IWC7,
  "/images/IWC8.png": IWC8, "IWC8.png": IWC8, "IWC8": IWC8,
  "/images/H1.png": H1, "H1.png": H1, "H1": H1,
  "/images/H2.png": H2, "H2.png": H2, "H2": H2,
  "/images/H3.png": H3, "H3.png": H3, "H3": H3,
  "/images/H4.png": H4, "H4.png": H4, "H4": H4,
  "/images/H5.png": H5, "H5.png": H5, "H5": H5,
  "/images/H6.png": H6, "H6.png": H6, "H6": H6,
  "/images/H7.png": H7, "H7.png": H7, "H7": H7,
  "/images/H8.png": H8, "H8.png": H8, "H8": H8,
  "/images/TH1.png": TH1, "TH1.png": TH1, "TH1": TH1,
  "/images/TH2.png": TH2, "TH2.png": TH2, "TH2": TH2,
  "/images/TH3.png": TH3, "TH3.png": TH3, "TH3": TH3,
  "/images/TH4.png": TH4, "TH4.png": TH4, "TH4": TH4,
  "/images/TH5.png": TH5, "TH5.png": TH5, "TH5": TH5,
  "/images/TH6.png": TH6, "TH6.png": TH6, "TH6": TH6,
  "/images/TH7.png": TH7, "TH7.png": TH7, "TH7": TH7,
  "/images/TH8.png": TH8, "TH8.png": TH8, "TH8": TH8,
  "/images/JL1.png": JL1, "JL1.png": JL1, "JL1": JL1,
  "/images/JL2.png": JL2, "JL2.png": JL2, "JL2": JL2,
  "/images/JL3.png": JL3, "JL3.png": JL3, "JL3": JL3,
  "/images/JL4.png": JL4, "JL4.png": JL4, "JL4": JL4,
  "/images/JL5.png": JL5, "JL5.png": JL5, "JL5": JL5,
  "/images/JL6.png": JL6, "JL6.png": JL6, "JL6": JL6,
  "/images/JL7.png": JL7, "JL7.png": JL7, "JL7": JL7,
  "/images/JL8.png": JL8, "JL8.png": JL8, "JL8": JL8,
};

const DEFAULT_IMAGE = "https://via.placeholder.com/80?text=Watch";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const API_URL = 'http://e-commercewatch.onrender.com/api';

  const getImageSrc = (imagePath) => {
    if (!imagePath) return DEFAULT_IMAGE;
    if (imageMap[imagePath]) return imageMap[imagePath];
    const filename = imagePath.split('/').pop();
    for (const [key, value] of Object.entries(imageMap)) {
      if (key.endsWith(filename) || key === filename) {
        return value;
      }
    }
    return DEFAULT_IMAGE;
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { icon: Loader, color: "bg-blue-100 text-blue-800", label: "Processing" },
      shipped: { icon: Truck, color: "bg-purple-100 text-purple-800", label: "Shipped" },
      delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Delivered" },
      cancelled: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Cancelled" },
    };
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const formatPrice = (price) => {
    return `₹ ${price?.toLocaleString("en-IN") || 0}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-black animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-black mb-2">No Orders Yet</h2>
            <div className="w-12 h-px bg-black mx-auto mb-4"></div>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Link to="/watches" className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Print Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-black">My Orders</h1>
            <div className="w-12 h-px bg-black mt-2"></div>
            <p className="text-gray-500 text-sm mt-3">Track and manage your orders</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-black transition text-sm"
          >
            <Printer className="w-4 h-4" />
            Print Orders
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              {/* Order Header */}
              <div
                className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 mt-1">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="text-sm font-semibold text-black">{formatPrice(order.totalPrice)}</span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrder === order._id ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
                  {/* Order Items */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-black mb-3">Order Items</h3>
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <img 
                            src={getImageSrc(item.image)} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain"
                            onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm font-semibold text-black">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">{formatPrice(order.itemsPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-gray-900">{formatPrice(order.shippingPrice)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t border-gray-200">
                      <span className="text-black">Total</span>
                      <span className="text-black">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Shipping Address</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                  )}

                  {/* Order Timeline */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Timeline</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Order Confirmed</span>
                        <span className="text-xs text-gray-400 ml-auto">{formatDate(order.createdAt)}</span>
                      </div>
                      {(order.status === "shipped" || order.status === "delivered") && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span className="text-sm text-gray-600">Shipped</span>
                          <span className="text-xs text-gray-400 ml-auto">{formatDate(order.updatedAt)}</span>
                        </div>
                      )}
                      {order.status === "delivered" && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-600">Delivered</span>
                          <span className="text-xs text-gray-400 ml-auto">{formatDate(order.deliveredAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                      Track Order
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-black transition">
                      Need Help?
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-light text-black">{orders.length}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Total Orders</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">{formatPrice(orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0))}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Total Spent</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">{orders.filter(o => o.status === "delivered").length}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;