// src/Components/CategoriesHome.jsx

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import brands from "../data/brandsData";

const CategoriesHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, triggerOnce: true }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const brandStats = [
    { label: "LUXURY BRANDS", value: brands.length },
    { label: "TIMEPIECES", value: "200+" },
    { label: "AUTHENTIC", value: "100%" },
  ];

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div 
          className={`text-center mb-12 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-black bg-gray-100 px-3 py-1.5 uppercase">
              Curated Collection
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-3">
            Premium Watch <span className="font-bold">Brands</span>
          </h1>
          
          <div className="w-12 h-px bg-black mx-auto mb-6"></div>
          
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Discover the world's most prestigious watchmakers — curated picks
            for every style and occasion.
          </p>

          {/* Stats Section */}
          <div className="flex justify-center gap-8 mt-8">
            {brandStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-black">{stat.value}</div>
                <div className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={brand.id}
              to={brand.link}
              className="group block focus:outline-none"
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="relative overflow-hidden border border-gray-200 transition-shadow duration-300 bg-white shadow-sm hover:shadow-lg">
                
                {/* Image Container */}
                <div className="w-full aspect-square bg-[#fafafa] flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.image}
                    alt={`${brand.name} luxury watch collection`}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                    style={{
                      transform: hoveredBrand === brand.id ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  {hoveredBrand === brand.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300">
                      <span className="text-white text-xs font-semibold tracking-[0.2em] border-b border-white pb-1">
                        EXPLORE →
                      </span>
                    </div>
                  )}
                </div>

                {/* Brand Name */}
                <div className="p-3 md:p-4 text-center">
                  <h3 
                    className={`text-sm md:text-base font-medium truncate transition-colors duration-300 ${
                      hoveredBrand === brand.id ? "text-black" : "text-gray-800"
                    }`}
                  >
                    {brand.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1 hidden md:block uppercase tracking-wider">
                    Official Retailer
                  </p>
                </div>

                {/* Focus Ring for Accessibility */}
                <div className="absolute inset-0 pointer-events-none ring-0 focus:ring-2 focus:ring-black"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > a {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default CategoriesHome;