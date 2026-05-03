import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import gsap from 'gsap';
import Model3D from './Model3D';
import Text3D from './Text3D';
import '../styles/Hero3D.css';

export default function Hero3D() {
  const typedRef = useRef<Typed | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    typedRef.current = new Typed('#typed-text', {
      strings: ['Cloud Engineer', 'DevOps Enthusiast', 'Full Stack Developer', 'React Native Developer', 'AWS Certified'],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      backDelay: 1500,
    });

    return () => {
      typedRef.current?.destroy();
    };
  }, []);

  const handleViewWork = () => {
    gsap.to(window, { scrollTo: '#projects', duration: 1.5 });
  };

  const handleDownloadCV = () => {
    // Create and trigger download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'CV.pdf';
    link.click();
  };

  const handleModelClick = () => {
    if (typeof window !== 'undefined' && (window as any).playModelAnimation) {
      (window as any).playModelAnimation('Wave');
    }
  };

  return (
    <section id="hero" className="hero-3d">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Dev Bhalodiya</h1>
          <p className="hero-subtitle">
            I'm a <span id="typed-text"></span>
          </p>
          <p className="hero-description">
            Aspiring Cloud and DevOps Engineer with hands-on experience in cloud services, 
            Linux, Docker, and CI/CD. Skilled in building full-stack web applications 
            and cross-platform mobile apps with foundational ML knowledge.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleViewWork}>
              View Work
            </button>
            <button className="btn btn-secondary" onClick={handleDownloadCV}>
              Download CV
            </button>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/DevBhalodiya" target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dev-bhalodiya-395315258/" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <a href="mailto:bhalodiyadev485@gmail.com" className="social-link">
              Email
            </a>
          </div>
        </div>

        <div className="hero-model">
          {!modelLoaded && (
            <div className="model-loading">
              <div className="loader"></div>
              <p>Loading 3D Scene...</p>
            </div>
          )}
          <div className="model-container" onClick={handleModelClick} style={{ opacity: modelLoaded ? 1 : 0 }}>
            <Model3D
              onModelLoaded={() => setModelLoaded(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
