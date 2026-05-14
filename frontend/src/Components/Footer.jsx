// src/Components/Footer.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { footerStyles as styles } from "../assets/dummyStyles";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus("success");
      setTimeout(() => setSubscribeStatus(null), 3000);
      setEmail("");
    }
  };

  return (
    <footer className={`${styles.footer} relative overflow-hidden`}>
      {/* Top Border */}
      <div className={styles.topBorder}></div>
{/* Pattern Overlay */}
<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
  <svg
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        id="circlePattern"
        x="0"
        y="0"
        width="125"
        height="125"
        patternUnits="userSpaceOnUse"
      >
        <g fill="none" stroke="#d1d5db" strokeWidth="1">
          <circle cx="62.5" cy="62.5" r="12" />
          <circle cx="62.5" cy="62.5" r="24" />
          <circle cx="62.5" cy="62.5" r="36" />
          <circle cx="62.5" cy="62.5" r="48" />
          <circle cx="62.5" cy="62.5" r="60" />
        </g>
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      fill="url(#circlePattern)"
    />
  </svg>
</div>

      <div className={styles.mainContainer}>
        
        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Join Our Newsletter</h3>
            <p className={styles.newsletterText}>
              Subscribe to receive exclusive offers, new arrivals, and watch care tips.
            </p>
            
            <form onSubmit={handleSubscribe} className={styles.formContainer}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={styles.emailInput}
                required
              />
              <button 
                type="submit" 
                className={styles.subscribeButton}
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
            
            {subscribeStatus === "success" && (
              <p className="text-green-600 text-sm mt-3">✓ Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className={styles.mainGrid}>
          
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandContainer}>
              <div className={styles.brandIconContainer}>
                <div className={styles.brandIconPing}></div>
                <svg className={styles.brandIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={styles.brandName}>LuxuryTime</span>
            </div>
            <p className={styles.brandDescription}>
              Curating the finest timepieces from the world's most prestigious watchmakers since 1985.
            </p>
            <div className={styles.socialIconsContainer}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg className={styles.socialIconInner} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg className={styles.socialIconInner} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.197.156 3.548.5 2.075 1.973.5 3.548.156 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.428 3.504 1.903 4.978 1.474 1.475 3.123 1.818 4.978 1.903 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.855-.085 3.504-.428 4.978-1.903 1.475-1.474 1.818-3.123 1.903-4.978.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.428-3.504-1.903-4.978C20.452.5 18.803.156 16.948.072 15.668.014 15.259 0 12 0z"/>
                  <circle cx="12" cy="12" r="3.5"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg className={styles.socialIconInner} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.968-11.64c0-.214 0-.428-.015-.642A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">
                <svg className={styles.socialIconInner} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.sectionHeading}>
              <svg className={styles.sectionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Links
            </h4>
            <ul className={styles.linksList}>

  <li>
    <Link to="/about" className={styles.linkItem}>
      <span className={styles.linkIcon}>→</span>
      About Us
    </Link>
  </li>

  <li>
    <Link to="/brands" className={styles.linkItem}>
      <span className={styles.linkIcon}>→</span>
      Our Brands
    </Link>
  </li>
   <li>
    <Link to="/new-arrivals" className={styles.linkItem}>
      <span className={styles.linkIcon}>→</span>
      New Arrivals
    </Link>
  </li>

  <li>
    <Link to="/watches" className={styles.linkItem}>
      <span className={styles.linkIcon}>→</span>
      Shop All
    </Link>
  </li>

  <li>
    <Link to="/contact" className={styles.linkItem}>
      <span className={styles.linkIcon}>→</span>
      Contact Us
    </Link>
  </li>

 

</ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className={styles.sectionHeading}>
              <svg className={styles.sectionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Customer Service
            </h4>
            <ul className={styles.linksList}>
              <li><a href="/shipping" className={styles.linkItem}><span className={styles.linkIcon}>→</span> Shipping Info</a></li>
              <li><a href="/returns" className={styles.linkItem}><span className={styles.linkIcon}>→</span> Returns & Exchanges</a></li>
              <li><a href="/warranty" className={styles.linkItem}><span className={styles.linkIcon}>→</span> Warranty</a></li>
              <li><a href="/size-guide" className={styles.linkItem}><span className={styles.linkIcon}>→</span> Size Guide</a></li>
              <li><a href="/track-order" className={styles.linkItem}><span className={styles.linkIcon}>→</span> Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={styles.sectionHeading}>
              <svg className={styles.sectionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Info
            </h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <div className={styles.contactIconContainer}>
                  <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className={styles.contactText}>Luxury Watch Boutique, New York, NY 10001</span>
              </li>
              <li className={styles.contactItem}>
                <div className={styles.contactIconContainer}>
                  <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className={styles.contactText}>+1 (555) 123-4567</span>
              </li>
              <li className={styles.contactItem}>
                <div className={styles.contactIconContainer}>
                  <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className={styles.contactText}>support@luxurytime.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} LuxuryTime. 
            <svg className={styles.heartIcon} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className={styles.supportLink}>Privacy Policy</a>
            <a href="/terms" className={styles.supportLink}>Terms of Service</a>
            <a href="/cookies" className={styles.supportLink}>Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Media Queries */}
      <style>{styles.mediaQueries}</style>
    </footer>
  );
};

export default Footer;