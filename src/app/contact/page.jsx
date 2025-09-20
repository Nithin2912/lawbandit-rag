'use client'; // ⚠ Important: this makes this file a Client Component
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactPage;
function ContactPage() {
    return (<div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Contact LawBandit RAG</h1>
      <p>You can reach us at <strong>contact@lawbandit.com</strong> or via the contact form below.</p>

      <form onSubmit={(e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            e.currentTarget.reset();
        }} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1.5rem',
        }}>
        <input type="text" name="name" placeholder="Your Name" required style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
        }}/>
        <input type="email" name="email" placeholder="Your Email" required style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
        }}/>
        <textarea name="message" placeholder="Your Message" required rows={5} style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            resize: 'vertical',
        }}></textarea>
        <button type="submit" style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#1a202c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
        }}>
          Send Message
        </button>
      </form>
    </div>);
}
