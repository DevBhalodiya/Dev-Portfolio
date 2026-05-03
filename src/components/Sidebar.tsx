import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Sidebar.css';

const Sidebar = () => {
  const sectionIds = ['about', 'skills', 'projects', 'certifications', 'education', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { num: '01', label: 'About', id: 'about' },
    { num: '02', label: 'Skills', id: 'skills' },
    { num: '03', label: 'Projects', id: 'projects' },
    { num: '04', label: 'Certifications', id: 'certifications' },
    { num: '05', label: 'Education', id: 'education' },
    { num: '06', label: 'Contact', id: 'contact' },
  ];

  return (
    <aside className="sidebar">
      {/* Avatar */}
      <div className="avatar-section">
        <div className="avatar">
          <span>DB</span>
        </div>
        <h1 className="name gradient-text">Dev Bhalodiya</h1>
        <p className="title">Cloud & DevOps Engineer</p>

        {/* Status badge */}
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Open to opportunities</span>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Navigation */}
      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-num">{item.num}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="spacer"></div>

      {/* Social Icons and Location */}
      <div className="sidebar-footer">
        <div className="social-icons">
          <a href="https://github.com" title="GitHub" target="_blank" rel="noopener noreferrer">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/dev-bhalodiya-395315258/" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:bhalodiyadev485@gmail.com" title="Email">
            <FiMail size={18} />
          </a>
        </div>

        <p className="location">📍 Anand, Gujarat, India</p>
      </div>
    </aside>
  );
};

export default Sidebar;
