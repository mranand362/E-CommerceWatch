// src/Components/FashionPage.jsx

import { useState, useEffect } from "react";
import watchImg from "../assets/F1.png";

const FashionPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 40,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div className="relative bg-gradient-to-r from-[#0d1529] via-[#3d4757] to-[#9d9d9d] text-white px-6 md:px-10 py-10 flex flex-col justify-center">
          
          {/* Decorative Circles - Chhota */}
          <div className="absolute -top-8 -left-8 w-24 h-24 border-[3px] border-black rounded-full"></div>
          <div className="absolute bottom-8 -right-6 w-16 h-16 border-[3px] border-black rounded-full"></div>

          {/* Offer Tag - Chhota */}
          <span className="text-gray-300 text-sm font-semibold mb-4">
            Limited Time Offer
          </span>

          {/* Heading - Chhota */}
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Premium Luxury <br />
            Watches Collection
          </h1>

          {/* Description - Chhota */}
          <p className="text-gray-200 text-base leading-relaxed max-w-md mb-6">
            Discover our exclusive selection of premium timepieces with
            special discounts up to 30% off.
          </p>

          {/* Countdown - Chhota Boxes */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { value: formatNumber(timeLeft.days), label: "Days" },
              { value: formatNumber(timeLeft.hours), label: "Hours" },
              { value: formatNumber(timeLeft.minutes), label: "Minutes" },
              { value: formatNumber(timeLeft.seconds), label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#2f3b50]/80 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[70px]"
              >
                <h2 className="text-2xl font-bold">{item.value}</h2>
                <p className="text-gray-300 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Features - Chhota */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              🚚 <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              🛡️ <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              ❤️ <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative bg-[#ececec] flex items-center justify-center min-h-[500px] overflow-hidden">
          
          {/* Watch Image */}
          <img
            src={watchImg}
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />

          {/* Price Card - Chhota */}
          <div className="absolute bottom-6 right-6 bg-white rounded-xl px-5 py-4 shadow-xl text-center">
            <p className="text-gray-500 line-through text-sm">
              ₹89,999
            </p>
            <h2 className="text-3xl font-bold text-black mt-1">
              ₹62,999
            </h2>
            <p className="text-sm text-gray-700 mt-1">
              Save 30%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionPage;