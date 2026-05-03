import { useState, useEffect } from 'react';
import { FiArrowDownCircle, FiLinkedin } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const titles = [
    'Cloud Engineer',
    'DevOps Enthusiast',
    'Full Stack Developer',
    'React Native Developer',
    'AWS Certified',
  ];

  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentTitle.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex, titles]);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Background orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="hero-content">
        {/* Available badge */}
        <div className="available-badge">
          <span>// available_for_work</span>
        </div>

        {/* Main heading */}
        <div className="hero-heading">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name gradient-text">Dev Bhalodiya</h1>
          <div className="hero-typing">
            <span className="typing-prefix">&gt;</span>
            <span className="typing-text">{displayText}</span>
            <span className="typing-cursor">|</span>
          </div>
        </div>

        {/* Terminal block */}
        <div className="terminal-block">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-content">
            <div className="terminal-line line-1">
              <span className="prompt">$</span> whoami
            </div>
            <div className="terminal-line line-2">
              <span className="prefix">&gt;</span> dev_bhalodiya
            </div>

            <div className="terminal-line line-3">
              <span className="prompt">$</span> cat skills.txt
            </div>
            <div className="terminal-line line-4">
              <span className="prefix">&gt;</span> Cloud: AWS, GCP | DevOps: Docker, K8s, Jenkins
            </div>
            <div className="terminal-line line-5">
              <span className="prefix">&gt;</span> Languages: Java, Python, JS, C/C++
            </div>
            <div className="terminal-line line-6">
              <span className="prefix">&gt;</span> Mobile: React Native | DB: MongoDB, Firebase
            </div>

            <div className="terminal-line line-7">
              <span className="prompt">$</span> status
            </div>
            <div className="terminal-line line-8">
              <span className="prefix">&gt;</span> 🟢 Open to opportunities
            </div>
            <div className="terminal-cursor">|</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#" className="btn btn-outline">
            Download Resume
          </a>
          <a href="https://www.linkedin.com/in/dev-bhalodiya-395315258/" target="_blank" rel="noopener noreferrer" className="btn btn-icon">
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <button onClick={handleScrollClick} className="chevron">
          <FiArrowDownCircle size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
