import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">

      {/* HERO */}

      <section className="contact-hero">

        <div className="contact-overlay">

          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you. Get in touch with our team.
          </p>

        </div>

      </section>

      {/* CONTACT SECTION */}

      <section className="contact-section">

        {/* LEFT */}

        <div className="contact-info">

          <span>Get In Touch</span>

          <h2>Let's Start A Conversation</h2>

          <p>
            Whether you have questions about bookings,
            pricing, or support, our team is ready to help.
          </p>

          <div className="info-box">

            <FaPhoneAlt className="info-icon"/>

            <div>
              <h4>Phone</h4>
              <p>+91 9876543210</p>
            </div>

          </div>

          <div className="info-box">

            <FaEnvelope className="info-icon"/>

            <div>
              <h4>Email</h4>
              <p>support@carrental.com</p>
            </div>

          </div>

          <div className="info-box">

            <FaMapMarkerAlt className="info-icon"/>

            <div>
              <h4>Location</h4>
              <p>Mumbai, Maharashtra, India</p>
            </div>

          </div>

          <div className="info-box">

            <FaClock className="info-icon"/>

            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sun : 24 Hours</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="contact-form">

          <h2>Send Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>

            <button>
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* MAP */}

      <section className="map-section">

        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Mumbai&output=embed"
          loading="lazy"
        ></iframe>

      </section>

    </div>
  );
};

export default ContactUs;