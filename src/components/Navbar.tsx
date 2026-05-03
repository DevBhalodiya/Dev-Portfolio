import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#hero" className="logo-text gradient-text">
            Dev.B
          </a>
        </div>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <button onClick={() => handleNavClick('about')} className="nav-link">
            About
          </button>
          <button onClick={() => handleNavClick('skills')} className="nav-link">
            Skills
          </button>
          <button onClick={() => handleNavClick('projects')} className="nav-link">
            Projects
          </button>
          <button onClick={() => handleNavClick('certifications')} className="nav-link">
            Certifications
          </button>
          <button onClick={() => handleNavClick('contact')} className="nav-link">
            Contact
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}
