import { useState } from 'react';
import { FiMail, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { useIntersection } from '../hooks/useIntersection';
import './Contact.css';

const Contact = () => {
  const [ref, isVisible] = useIntersection(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bhalodiyadev485@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className={`contact ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// get_in_touch</p>
        <h2>Contact</h2>
        <p className="section-desc">Let's build something amazing together</p>

        <div className="contact-grid">
          {/* LEFT: Contact Info */}
          <div className="contact-info">
            <div className="info-card glass-card" onClick={handleCopyEmail}>
              <div className="info-icon">
                <FiMail size={20} />
              </div>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">bhalodiyadev485@gmail.com</p>
                <p className="copy-hint">{copied ? 'Copied!' : 'Click to copy'}</p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/dev-bhalodiya-395315258/"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card glass-card"
            >
              <div className="info-icon">
                <FiLinkedin size={20} />
              </div>
              <div>
                <p className="info-label">LinkedIn</p>
                <p className="info-value">dev-bhalodiya-395315258</p>
              </div>
            </a>

            <div className="info-card glass-card">
              <div className="info-icon">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="info-label">Location</p>
                <p className="info-value">Anand, Gujarat, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="// your_name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="// your_email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="text"
              name="subject"
              placeholder="// subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
            />
            <textarea
              name="message"
              placeholder="// your_message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="form-input"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
