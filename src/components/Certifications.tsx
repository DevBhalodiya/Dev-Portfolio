import { FiCheck } from 'react-icons/fi';
import { FiAward } from 'react-icons/fi';
import { useIntersection } from '../hooks/useIntersection';
import awsCloudDeveloping from '../assets/badges/AWS-Cloud-Developing.png';
import awsCloudFoundation from '../assets/badges/AWs-Cloud-Foundation.png';
import ibmDevOps from '../assets/badges/IBM-DevOps.png';
import ibmML from '../assets/badges/IBM-ML.png';
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
    src: awsCloudDeveloping,
  },
  {
    title: 'AWS Cloud Foundations',
    src: awsCloudFoundation,
  },
  {
    title: 'DevOps Essentials',
    src: ibmDevOps,
  },
  {
    title: 'ML with Python (V2)',
    src: ibmML,
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
                <img 
                  src={badge.src}
                  alt={badge.title}
                  className="badge-image"
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
