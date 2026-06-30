import React, { useState } from 'react';
import {
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from '../components/Icons';

function ContactPage() {
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
          background: "#fff",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CheckCircleIcon size={55} stroke="#2E7D32" />

        <h2 style={{ marginTop: "20px" }}>
          Message Sent Successfully!
        </h2>

        <p style={{ color: "#666" }}>
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
        background: "#fff",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Left Side */}

      <div>
        <h2 style={{ marginBottom: "20px" }}>
          Contact Information
        </h2>

        <p style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <MailIcon size={18} />
          support@villastay.com
        </p>

        <p style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <PhoneIcon size={18} />
          +94 77 123 4567
        </p>

        <p style={{ display: "flex", gap: "10px" }}>
          <MapPinIcon size={18} />
          Villa Stay,
          <br />
          Colombo,
          <br />
          Sri Lanka
        </p>

        <hr style={{ margin: "30px 0" }} />

        <h3>Business Hours</h3>

        <p>Monday - Friday : 8.00 AM - 6.00 PM</p>
        <p>Saturday : 9.00 AM - 4.00 PM</p>
        <p>Sunday : Closed</p>
      </div>

      {/* Right Side */}

      <div>
        <h2 style={{ marginBottom: "20px" }}>
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default ContactPage;
