import { useIntersection } from '../hooks/useIntersection';
import './Projects.css';

const projects = [
  {
    title: 'Group Study Organizer',
    tech: ['React Native', 'Firebase', 'Cloudinary'],
    description:
      'Mobile app for collaborative group study with real-time Firebase authentication, data management, and Cloudinary-powered media sharing.',
    type: 'mobile',
    featured: true,
  },
  {
    title: 'KhataBook – Digital Credit System',
    tech: ['React Native (Expo)', 'Firebase'],
    description:
      'Cross-platform mobile app for shop owners to digitally manage customer credit records, track transactions and balances.',
    type: 'mobile',
  },
  {
    title: 'AI Crop Disease Prediction',
    tech: ['Python', 'CNN', 'React', 'REST API'],
    description:
      'Web app using CNNs to detect crop diseases from images with real-time environmental data and treatment recommendations.',
    type: 'ai',
  },
  {
    title: 'MERN Stack Containerization',
    tech: ['Docker', 'MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'Full Docker-based containerization of a MERN application demonstrating DevOps and container orchestration.',
    type: 'devops',
  },
];

const Projects = () => {
  const [ref, isVisible] = useIntersection(0.2);

  return (
    <section id="projects" ref={ref} className={`projects ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// featured_projects</p>
        <h2>Projects</h2>

        <div className="projects-bento">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
            >
              <div className="project-badge" data-type={project.type}></div>
              <div className="project-index">#{String(idx + 1).padStart(2, '0')}</div>

              <h3>{project.title}</h3>
              <p className="tech-stack">{project.tech.join(' · ')}</p>
              <p className="project-desc">{project.description}</p>

              <div className="project-links">
                <a href="#" className="link">
                  GitHub ↗
                </a>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
