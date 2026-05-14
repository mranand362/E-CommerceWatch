// src/Components/NewArrival.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { WATCHES } from "../assets/dummywdata"; // Import WATCHES from your data file

const NewArrival = () => {
  // Get first 6 watches as new arrivals
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Get new arrivals (first 6 or you can filter by date)
  const newArrivals = WATCHES.slice(0, 12); // All 12 watches as new arrivals

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-black uppercase">
            Discover Latest
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-black mt-2 mb-3">
            New <span className="font-bold">Arrivals</span>
          </h2>
          <div className="w-12 h-px bg-black mx-auto"></div>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
            Be the first to experience our newest timepieces, fresh from the world's finest ateliers
          </p>
        </div>

        {/* New Arrivals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.slice(0, visibleCount).map((watch) => (
            <div
              key={watch.id}
              className="group bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 block"
            >
              {/* Image Container */}
              <div className="relative bg-[#fafafa] overflow-hidden">
                <img
                  src={watch.img}
                  alt={watch.name}
                  className="w-full h-80 object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gender Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-white bg-black px-2 py-1 uppercase tracking-wider">
                    {watch.gender === "men" ? "Men's Collection" : "Women's Collection"}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs tracking-[0.2em] border-b border-white pb-1">
                    VIEW DETAILS
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-base mt-1">
                    {watch.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {watch.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-black">
                    {watch.price}
                  </span>
                  <button 
                    className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Added ${watch.name} to cart`);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < newArrivals.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-transparent border border-black text-black text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition duration-300"
            >
              Load More
            </button>
          </div>
        )}

        {/* View All Collection Link */}
        <div className="text-center mt-8">
          <Link
            to="/watches"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-black transition"
          >
            <span>VIEW ALL COLLECTION</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;