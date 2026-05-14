// src/Components/ComingSoonWatchesPage.jsx

import { useState, useEffect, useRef } from "react";
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";
import { comingSoonStyles as styles } from "../assets/dummyStyles";

const comingSoonWatches = [
  {
    id: 1,
    name: "ROLEX GMT-MASTER II",
    collection: "Pepsi",
    price: 14500,
    image: CS1,
    releaseDate: "2025-03-15",
    brand: "Rolex",
    description: "The iconic GMT-Master II returns with an updated movement and ceramic bezel.",
    movement: "Caliber 3285",
    caseSize: "40mm",
    material: "Oystersteel",
  },
  {
    id: 2,
    name: "OMEGA SPEEDMASTER",
    collection: "Moonwatch Professional",
    price: 8900,
    image: CS2,
    releaseDate: "2025-04-01",
    brand: "Omega",
    description: "New Calibre 3861 movement with Master Chronometer certification.",
    movement: "Caliber 3861",
    caseSize: "42mm",
    material: "Stainless Steel",
  },
  {
    id: 3,
    name: "PATEK PHILIPPE",
    collection: "Nautilus 5811",
    price: 62000,
    image: CS3,
    releaseDate: "2025-05-20",
    brand: "Patek Philippe",
    description: "Limited edition timepiece celebrating the Nautilus legacy.",
    movement: "Caliber 26-330 SC",
    caseSize: "41mm",
    material: "White Gold",
  },
  {
    id: 4,
    name: "AUDEMARS PIGUET",
    collection: "Royal Oak Offshore",
    price: 38500,
    image: CS4,
    releaseDate: "2025-06-10",
    brand: "Audemars Piguet",
    description: "Bold new chronograph with enhanced water resistance.",
    movement: "Caliber 4404",
    caseSize: "43mm",
    material: "Forged Carbon",
  },
  {
    id: 5,
    name: "CARTIER SANTOS",
    collection: "de Cartier",
    price: 7800,
    image: CS5,
    releaseDate: "2025-07-01",
    brand: "Cartier",
    description: "The legendary square-cased watch gets a modern movement.",
    movement: "Caliber 1847 MC",
    caseSize: "39.8mm",
    material: "Steel & Gold",
  },
];

const ComingSoonWatchesPage = () => {
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

  const formatINR = styles.formatINR;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={`${styles.headerContainer} transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <div className={styles.titleContainer}>
            <span className="text-xs font-semibold tracking-wider text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full uppercase">
              Coming Soon
            </span>
            <h2 className={styles.title} style={styles.titleStyle}>
              Upcoming <span className="text-amber-600">Releases</span>
            </h2>
            <p className={styles.subtitle}>
              Be the first to experience our newest arrivals
            </p>
          </div>
        </div>

        {/* Watches Row */}
        <div className={styles.watchesContainer}>
          <div className={styles.watchesRow}>
            {comingSoonWatches.map((watch, index) => (
              <div
                key={watch.id}
                className={styles.watchItem}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <figure className={styles.imageContainer}>
                  <img
                    src={watch.image}
                    alt={`${watch.brand} ${watch.name}`}
                    className={styles.image}
                    loading="lazy"
                  />
                </figure>
                
                <figcaption className={styles.figcaption}>
                  <div className="text-xs text-amber-600 font-semibold mb-1 tracking-wide">
                    {watch.brand}
                  </div>
                  <div className={styles.watchName}>
                    {watch.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {watch.collection}
                  </div>
                  <div className={styles.price}>
                    {formatINR(watch.price)}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Est. {watch.releaseDate}
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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

        .${styles.watchItem.split(' ')[0]} {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default ComingSoonWatchesPage;