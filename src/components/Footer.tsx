import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">// dev_bhalodiya © 2025</p>
        <p className="footer-built">Built with React + ☁️ Deployed on Vercel</p>

        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/dev-bhalodiya-395315258/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:bhalodiyadev485@gmail.com" title="Email">
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
