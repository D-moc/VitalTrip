import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2><span className="highlight">VITAL</span>Trip</h2>
          <p>Making your journeys safer, smarter & memorable.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blogs">Blogs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: info@vitaltrip.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        {/* Socials */}
        <div className="footer-socials">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="mailto:info@vitaltrip.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VitalTrip. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
