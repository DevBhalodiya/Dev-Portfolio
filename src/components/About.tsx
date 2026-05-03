import { useIntersection } from '../hooks/useIntersection';
import './About.css';

const About = () => {
  const [ref, isVisible] = useIntersection(0.2);

  return (
    <section id="about" ref={ref} className={`about ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// about_me</p>
        <h2>About Me</h2>

        <div className="about-grid">
          {/* LEFT: Code Card */}
          <div className="code-card glass-card">
            <div className="code-lines">
              <span className="line-num">1</span>
              <span className="code">{'{'}</span>
            </div>
            <div className="code-lines">
              <span className="line-num">2</span>
              <span className="code"><span className="key">"name"</span>: <span className="value">"Dev Bhalodiya"</span>,</span>
            </div>
            <div className="code-lines">
              <span className="line-num">3</span>
              <span className="code"><span className="key">"role"</span>: <span className="value">"Cloud & DevOps Engineer"</span>,</span>
            </div>
            <div className="code-lines">
              <span className="line-num">4</span>
              <span className="code"><span className="key">"location"</span>: <span className="value">"Anand, Gujarat, India"</span>,</span>
            </div>
            <div className="code-lines">
              <span className="line-num">5</span>
              <span className="code"><span className="key">"email"</span>: <span className="value">"bhalodiyadev485@gmail.com"</span>,</span>
            </div>
            <div className="code-lines">
              <span className="line-num">6</span>
              <span className="code"><span className="key">"education"</span>: <span className="value">"B.Tech IT @ CHARUSAT"</span>,</span>
            </div>
            <div className="code-lines">
              <span className="line-num">7</span>
              <span className="code"><span className="key">"status"</span>: <span className="value">"Open to Work"</span></span>
            </div>
            <div className="code-lines">
              <span className="line-num">8</span>
              <span className="code">{'}'}</span>
            </div>
          </div>

          {/* RIGHT: Profile Text & Stats */}
          <div className="about-content">
            <p>
              Aspiring Cloud and DevOps Engineer with hands-on experience in cloud services, 
              Linux, Docker, and basic CI/CD. Skilled in building full-stack web applications 
              and cross-platform mobile apps using React Native, with the ability to integrate 
              cloud-based solutions. Possesses foundational knowledge of DevOps practices and 
              basic machine learning.
            </p>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-number">4+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-number">2</div>
                <div className="stat-label">AWS Certifications</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-number">4</div>
                <div className="stat-label">Credly Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
