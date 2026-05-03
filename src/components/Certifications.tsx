import { FiCheck } from 'react-icons/fi';
import { FiAward } from 'react-icons/fi';
import { useIntersection } from '../hooks/useIntersection';
import './Certifications.css';

const certifications = [
  { name: 'AWS Cloud Foundations', issuer: 'Amazon Web Services', icon: FiAward },
  { name: 'AWS Academy Cloud Developing', issuer: 'Amazon Web Services', icon: FiAward },
  { name: 'Intro to Containers (Docker, K8s, OpenShift)', issuer: 'Coursera / IBM', icon: FiCheck },
  { name: 'Data Structure and Algorithm', issuer: 'NPTEL', icon: FiCheck },
];

const badges = [
  {
    title: 'AWS Cloud Developing',
    src: 'https://www.credly.com/badges/b945b39d-1ad8-48c6-88d0-349ee845c62d/embedded',
  },
  {
    title: 'AWS Cloud Foundations',
    src: 'https://www.credly.com/badges/8f7911f5-2d80-4f46-b2ee-1e46a0e93c36/embedded',
  },
  {
    title: 'DevOps Essentials',
    src: 'https://www.credly.com/badges/974cd9e9-6521-4d33-a625-16df7ffcb4e7/embedded',
  },
  {
    title: 'ML with Python (V2)',
    src: 'https://www.credly.com/badges/59e544cf-97ce-4256-a402-5023d7b77463/embedded',
  },
];

const Certifications = () => {
  const [ref, isVisible] = useIntersection(0.2);

  return (
    <section id="certifications" ref={ref} className={`certifications ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// certifications_&_badges</p>
        <h2>Certifications & Badges</h2>

        {/* Certification Cards */}
        <div className="certs-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="cert-card glass-card">
              <div className="cert-icon-wrapper">
                <cert.icon size={32} />
              </div>
              <p className="cert-issuer">{cert.issuer}</p>
              <h4>{cert.name}</h4>
              <span className="verified">Verified ✓</span>
            </div>
          ))}
        </div>

        {/* Credly Badges */}
        <div className="badges-section">
          <p className="section-tag">// credly_badges</p>
          <div className="badges-grid">
            {badges.map((badge, idx) => (
              <div key={idx} className="badge-wrapper glass-card">
                <iframe
                  src={badge.src}
                  width="150"
                  height="270"
                  frameBorder="0"
                  title={badge.title}
                  allow="encrypted-media"
                />
                <p className="badge-label">{badge.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
