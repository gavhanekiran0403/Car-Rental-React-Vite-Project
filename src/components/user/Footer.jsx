import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* TOP SECTION */}

      <div className="footer-top">

        {/* LOGO */}

        <div className="footer-about">

          <h2 className="footer-logo">
            <span>Car</span>Rental
          </h2>

          <p>
            Experience premium car rentals with luxury,
            comfort, and affordable pricing for every journey.
          </p>

          <div className="social-icons">

            <a href="/">🌐</a>
            <a href="/">📘</a>
            <a href="/">📸</a>
            <a href="/">🐦</a>

          </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/">Cars</a>
          <a href="/">Services</a>
          <a href="/">Pricing</a>
          <a href="/">Contact</a>

        </div>

        {/* SERVICES */}

        <div className="footer-links">

          <h3>Services</h3>

          <a href="/">Luxury Cars</a>
          <a href="/">Business Rentals</a>
          <a href="/">Airport Pickup</a>
          <a href="/">Daily Rental</a>
          <a href="/">24/7 Support</a>

        </div>

        {/* CONTACT */}

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>📍 New York, USA</p>
          <p>📞 +1 234 567 890</p>
          <p>✉ info@carrental.com</p>

        </div>

      </div>

      {/* BOTTOM SECTION */}

      <div className="footer-bottom">

        <p>
          © 2026 CarRental. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;