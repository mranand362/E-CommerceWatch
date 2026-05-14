// src/Components/Testimonials.jsx

import  { useRef, useState, useEffect } from "react";
import T1 from "../assets/T1.png";
import T2 from "../assets/T2.png";
import T3 from "../assets/T3.png";
import T4 from "../assets/T4.png";
import { testimonialPageStyles as styles } from "../assets/dummyStyles";

const testimonials = [
  {
    id: 1,
    image: T1,
    name: "Asha K.",
    date: "July 5, 2025",
    title: "Elegance and Precision",
    review: "The crystal detailing catches light beautifully and the movement keeps perfect time. Classy enough for special occasions.",
    bg: "from-amber-700 to-amber-500",
    location: "Mumbai, India",
    rating: 5,
  },
  {
    id: 2,
    image: T2,
    name: "Rohit S.",
    date: "June 26, 2025",
    title: "Built Like a Tank",
    review: "Shock resistance and battery life are outstanding. Perfect for work, gym and outdoor adventures.",
    bg: "from-rose-800 to-rose-600",
    location: "Delhi, India",
    rating: 5,
  },
  {
    id: 3,
    image: T3,
    name: "Priya M.",
    date: "May 14, 2025",
    title: "Sleek and Feminine",
    review: "The rose-gold finish looks incredibly elegant and pairs perfectly with every outfit effortlessly.",
    bg: "from-gray-800 to-gray-600",
    location: "Bangalore, India",
    rating: 5,
  },
  {
    id: 4,
    image: T4,
    name: "Arjun P.",
    date: "April 18, 2025",
    title: "Luxury That Turns Heads",
    review: "Premium craftsmanship with stunning detailing. Feels luxurious from every angle.",
    bg: "from-slate-800 to-slate-600",
    location: "Chennai, India",
    rating: 5,
  },
];

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollToSlide = (index) => {
    const container = sliderRef.current;
    if (!container) return;
    
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 32;
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    
    setActiveIndex(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        scrollToSlide(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isDragging]);

  // Handle scroll events to update active dot
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.children;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      Array.from(cards).forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });
      
      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const renderStars = () => {
    return (
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-amber-600 uppercase mb-3 inline-block">
            Client Testimonials
          </span>
          <h2 className={styles.title} style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our <span className="text-amber-600">Customers Say</span>
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className={styles.scroller}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={styles.card}
            >
              {/* Image Block */}
              <div className={styles.imageBlock}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-90`}></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-white/20 text-6xl font-serif">"</div>
              </div>

              {/* Content Block */}
              <div className={styles.contentBlock}>
                <div>
                  {renderStars()}
                  <h3 className={styles.cardTitle}>
                    “{item.title}”
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-amber-400"></div>
                    <p className={styles.cardMeta}>
                      {item.name} • {item.date}
                    </p>
                  </div>
                  <p className={styles.cardExcerpt}>
                    {item.review}
                  </p>
                </div>
                
                {/* Location Badge */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? "w-10 h-2.5 bg-amber-600"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="hidden lg:flex justify-center gap-4 mt-8">
          <button
            onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
            className="p-2 rounded-full border border-gray-300 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(testimonials.length - 1, activeIndex + 1))}
            className="p-2 rounded-full border border-gray-300 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hide Scrollbar Styles */}
      <style>{`
        .${styles.scroller.split(' ')[0]}::-webkit-scrollbar {
          display: none;
        }
        .${styles.scroller.split(' ')[0]} {
          -ms-overflow-style: none;
          scrollbar-width: none;
          cursor: ${isDragging ? 'grabbing' : 'grab'};
        }
        .${styles.scroller.split(' ')[0]}:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;