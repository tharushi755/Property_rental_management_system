import React, { useState } from 'react';

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', margin: '40px' }}>
        <h2>✅ Message Sent!</h2>
        <p>We'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} style={{ background: '#C4622D', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', marginTop: '20px', cursor: 'pointer' }}>Send Another</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', padding: '40px', background: 'white', borderRadius: '16px', margin: '20px' }}>
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h2>
        <p>📧 support@vilastay.com</p>
        <p>📞 +1 (555) 123-4567</p>
        <p>📍 123 Travel Street, Suite 100</p>
      </div>
      <div>
        <h3>Send us a message</h3>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <input type="text" placeholder="Name" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #E8D5B7', borderRadius: '8px' }} />
          <input type="email" placeholder="Email" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #E8D5B7', borderRadius: '8px' }} />
          <textarea placeholder="Message" rows="5" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #E8D5B7', borderRadius: '8px' }} />
          <button type="submit" style={{ background: '#C4622D', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;