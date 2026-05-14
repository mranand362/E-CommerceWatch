// src/Components/AboutUs.jsx

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Truck, Gift, CreditCard, Award, Clock, Gem, Users } from "lucide-react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const values = [
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Excellence",
      desc: "We source only the finest timepieces from the world's most prestigious manufacturers.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Authenticity",
      desc: "Every watch is 100% authenticated and comes with original documentation.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Trust",
      desc: "Over 10,000+ satisfied customers and 5-star reviews worldwide.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Service",
      desc: "Dedicated concierge service for all your horology needs.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "50+", label: "Luxury Brands" },
    { value: "200+", label: "Timepieces" },
    { value: "100%", label: "Authentic" },
  ];

  const team = [
    {
      name: "Rajiv Mehta",
      role: "Founder & CEO",
      bio: "30+ years in luxury watch industry",
      initial: "RM",
    },
    {
      name: "Priya Sharma",
      role: "Head of Curation",
      bio: "Watch connoisseur & collector",
      initial: "PS",
    },
    {
      name: "Amit Patel",
      role: "Master Horologist",
      bio: "Certified watchmaker since 1995",
      initial: "AP",
    },
    {
      name: "Neha Singh",
      role: "Client Relations",
      bio: "Luxury retail specialist",
      initial: "NS",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      
      {/* Hero Section */}
      <div className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            About <span className="font-bold">LuxuryTime</span>
          </h1>
          <div className="w-12 h-px bg-black/30 mx-auto mb-6"></div>
          <p className="text-black/60 text-sm max-w-2xl mx-auto">
            Since 1985, we have been curating the world's finest timepieces for discerning collectors
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 transform ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
            <span className="text-xs font-semibold tracking-[0.2em] text-black uppercase bg-gray-100 px-3 py-1">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-black mt-4 mb-4">
              A Legacy of <span className="font-bold">Horology</span>
            </h2>
            <div className="w-12 h-px bg-black mb-6"></div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Founded in 1985, LuxuryTime began with a simple mission: to bring the world's most 
              exceptional timepieces to discerning collectors. What started as a small boutique 
              in New York has grown into a global destination for luxury watches.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Our journey has been defined by an unwavering commitment to authenticity, quality, 
              and client service. We've built lasting relationships with the world's finest 
              watchmakers, from Rolex and Patek Philippe to Audemars Piguet and Omega.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Today, we continue to uphold the same values that guided our founders: integrity, 
              expertise, and a genuine passion for the art of watchmaking.
            </p>
          </div>
          <div className={`bg-white border border-gray-200 p-8 transition-all duration-700 delay-200 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
            <div className="text-center">
              <span className="text-6xl mb-4 block">⌚</span>
              <h3 className="text-xl font-light text-black mb-2">Since 1985</h3>
              <div className="w-12 h-px bg-black mx-auto mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                "Crafting moments that last a lifetime, one timepiece at a time."
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-black uppercase bg-gray-100 px-3 py-1">
            Our Values
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-black mt-4 mb-3">
            What Drives <span className="font-bold">Us</span>
          </h2>
          <div className="w-12 h-px bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-300 group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">{value.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-black uppercase bg-gray-100 px-3 py-1">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-black mt-4 mb-3">
              Meet the <span className="font-bold">Experts</span>
            </h2>
            <div className="w-12 h-px bg-black mx-auto"></div>
            <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
              Passionate horologists dedicated to serving you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-300">
                  <span className="text-2xl font-light text-gray-600 group-hover:text-white transition-colors">
                    {member.initial}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black">{member.name}</h3>
                <p className="text-xs text-amber-600 uppercase tracking-wider mt-1">{member.role}</p>
                <p className="text-xs text-gray-400 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black text-white p-8">
            <h3 className="text-xl font-light mb-4">Why Choose <span className="font-bold">LuxuryTime?</span></h3>
            <div className="w-12 h-px bg-white/30 mb-6"></div>
            <div className="space-y-3">
              {[
                "100% Authenticity Guaranteed",
                "Free Worldwide Shipping",
                "5-Year Warranty on All Watches",
                "Expert Horologist Support",
                "30-Day Easy Returns",
                "Secure Payment Gateway",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8">
            <h3 className="text-xl font-light text-black mb-4">Contact <span className="font-bold">Us</span></h3>
            <div className="w-12 h-px bg-black mb-6"></div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Visit Our Boutique</p>
                <p className="text-sm text-gray-700">450 Madison Avenue, New York, NY 10022</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                <p className="text-sm text-gray-700">+1 (212) 555-6789</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                <p className="text-sm text-gray-700">concierge@luxurytime.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Boutique Hours</p>
                <p className="text-sm text-gray-700">Mon-Sat: 10am - 7pm | Sun: By Appointment</p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="inline-block mt-6 px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grid > div {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;