import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

const SERVICE_ID = "service_0eiecjj";
const AutoReply_TEMPLATE_ID = "template_xsh4jk8";
const saveContactUs_TEMPLATE_ID = "template_98za7ju";
const PUBLIC_KEY = "fVSphtiJzBLtw4TeG";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    // Send to saveContactUs template (for admin)
    emailjs.sendForm(SERVICE_ID, saveContactUs_TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          // Send auto-reply to user
          emailjs.sendForm(SERVICE_ID, AutoReply_TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(
              () => {
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
              },
              (err) => setError("Failed to send auto-reply. Please try again.")
            );
        },
        (err) => {
          setError("Failed to save contact info. Please try again.");
          console.error("SaveContactUs error:", err); // <-- Add this line
        }
      );
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      {submitted && <p className="thank-you">Thanks for reaching out!</p>}
      {error && <p className="error">{error}</p>}
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;