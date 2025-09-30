import React, { useState } from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_al5yitk", // ✅ your EmailJS Service ID
        "template_rp23wih", // ✅ your EmailJS Template ID
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        "N3wkfGFUrmWRSm_AQ" // ✅ your EmailJS Public Key
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("❌ FAILED...", error.text);
          alert("Failed to send. Please try again later.");
        }
      );
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        {/* Left: About & Social */}
        <div className="footer-left">
          <h2 className="footer-logo">
            <span className="highlight">VITAL</span>Trip
          </h2>
          <p className="footer-desc">
            Welcome to your insider’s guide to authentic travel experiences.
            Discover hidden gems and essential tips from locals to explore
            destinations like never before!
          </p>
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="mailto:info@vitaltrip.com"><FaEnvelope /></a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="footer-right">
          <h3 className="footer-heading">Have a Query?</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="send-btn">
              Submit
            </button>
          </form>
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
