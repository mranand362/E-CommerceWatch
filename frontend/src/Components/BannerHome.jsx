import Navbar from "./Navbar";
import videoBg from "../assets/bannervideo.mp4";

import WatchLeft from "../assets/BL1.png";
import WatchCenter from "../assets/BM1.png";
import WatchRight from "../assets/BR1.png";

const HomeBanner = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* NAVBAR */}
      <div className="relative z-50 pt-13">
        <Navbar />
      </div>

      {/* HERO */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center">


        {/* TITLE */}
        <h1
          className="text-3xl sm:text-6xl md:text-6xl lg:text-5xl text-white font-light leading-[1.05]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Time Crafted{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-300 italic">
            For Legends
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-8 max-w-3xl text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
          Discover premium luxury watches with timeless elegance, Swiss precision and world-class craftsmanship.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5">

          <a
            href="/watches"
            className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            Explore Collection
          </a>

          <a
            href="/contact"
            className="px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            Contact Us
          </a>

        </div>

        {/* WATCH IMAGE GRID */}
        <div className="relative w-full max-w-7xl mx-auto mt-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            <div className="md:h-[380px]">
              <img
                src={WatchLeft}
                className="w-full h-full object-cover rounded-3xl hover:scale-105 transition duration-700"
              />
            </div>

            <div className="md:h-[420px] md:-translate-y-10">
              <img
                src={WatchCenter}
                className="w-full h-full object-cover rounded-3xl hover:scale-105 transition duration-700"
              />
            </div>

            <div className="md:h-[380px]">
              <img
                src={WatchRight}
                className="w-full h-full object-cover rounded-3xl hover:scale-105 transition duration-700"
              />
            </div>

          </div>

          {/* TEXT GRID BELOW IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-0 text-center">

            <div>
              <h3 className="text-white uppercase tracking-[0.2em]">
                Jacob & Co.
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Epic X Collection
              </p>
            </div>

            <div>
              <h3 className="text-yellow-400 uppercase tracking-[0.2em]">
                Rolex
              </h3>
              <p className="text-yellow-500/80 text-sm mt-1">
                Limited Edition
              </p>
            </div>

            <div>
              <h3 className="text-white uppercase tracking-[0.2em]">
                Bvlgari
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Octo Finissimo
              </p>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default HomeBanner;