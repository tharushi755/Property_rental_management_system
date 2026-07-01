import React, { useState } from 'react';
import {
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from '../components/Icons';
import { useTheme } from '../context/ThemeContext';

function ContactPage() {
  const { darkMode } = useTheme();
  const cardBg = darkMode ? '#1e293b' : '#fff';
  const textColor = darkMode ? '#ffffff' : '#1A1612';
  const textMuted = darkMode ? '#aaaaaa' : '#666';
  const borderColor = darkMode ? '#2c3e50' : '#ccc';
  const inputBg = darkMode ? '#0f172a' : '#fff';
  const cardShadow = darkMode ? '0 5px 20px rgba(0,0,0,0.4)' : '0 5px 20px rgba(0,0,0,0.08)';

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: `1px solid ${borderColor}`,
    fontSize: "15px",
    boxSizing: "border-box",
    background: inputBg,
    color: textColor,
  };

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Backend API call එක මෙතන දාන්න
    // await fetch(...)

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          padding: "50px",
          background: cardBg,
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: cardShadow,
        }}
      >
        <CheckCircleIcon size={55} stroke="#2E7D32" />

        <h2 style={{ marginTop: "20px", color: textColor }}>
          Message Sent Successfully!
        </h2>

        <p style={{ color: textMuted }}>
          Thank you for contacting Villa Stay.
          <br />
          Our team will contact you within 24 hours.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          style={{
            marginTop: "25px",
            padding: "12px 30px",
            background: "#C4622D",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "40px",
        background: cardBg,
        padding: "40px",
        borderRadius: "15px",
        boxShadow: cardShadow,
      }}
    >
      {/* Left Side */}

      <div>
        <h2 style={{ marginBottom: "20px", color: textColor }}>
          Contact Information
        </h2>

        <p style={{ display: "flex", gap: "10px", marginBottom: "20px", color: textColor }}>
          <MailIcon size={18} />
          support@villastay.com
        </p>

        <p style={{ display: "flex", gap: "10px", marginBottom: "20px", color: textColor }}>
          <PhoneIcon size={18} />
          +94 77 123 4567
        </p>

        <p style={{ display: "flex", gap: "10px", color: textColor }}>
          <MapPinIcon size={18} />
          Villa Stay,
          <br />
          Colombo,
          <br />
          Sri Lanka
        </p>

        <hr style={{ margin: "30px 0", borderColor: borderColor }} />

        <h3 style={{ color: textColor }}>Business Hours</h3>

        <p style={{ color: textMuted }}>Monday - Friday : 8.00 AM - 6.00 PM</p>
        <p style={{ color: textMuted }}>Saturday : 9.00 AM - 4.00 PM</p>
        <p style={{ color: textMuted }}>Sunday : Closed</p>
      </div>

      {/* Right Side */}

      <div>
        <h2 style={{ marginBottom: "20px", color: textColor }}>
          Send us a Message
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Write your message..."
            required
            value={formData.message}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#C4622D",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
