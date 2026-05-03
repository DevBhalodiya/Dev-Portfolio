import { useIntersection } from '../hooks/useIntersection';
import './Projects.css';

const projects = [
  {
    title: 'Group Study Organizer',
    tech: ['React Native', 'Firebase', 'Cloudinary'],
    description:
      'Built a React Native–based Group Study App backed by Firebase services for authentication, real-time collaboration, and data management. Implemented Cloudinary for efficient media storage, allowing users to share images and PDFs seamlessly within study groups.',
    type: 'mobile',
    featured: true,
  },
  {
    title: 'KhataBook – Digital Credit System',
    tech: ['React Native (Expo)', 'Firebase'],
    description:
      "A cross-platform mobile application built using React Native (Expo) & Firebase that helps small shop owners manage customer credit (khata) records digitally.The app allows tracking of credit transactions, payments, and outstanding balances for both shop owners and customers.",
    type: 'mobile',
  },
  {
    title: 'AI Crop Disease Prediction',
    tech: ['Python', 'CNN', 'React', 'REST API'],
    description:
      'Developed a web-based application that uses Convolutional Neural Networks (CNN) to detect crop diseases from images and integrates real-time environmental data for improved prediction accuracy. Implemented a user-friendly frontend and a backend API for disease analysis, providing treatment recommendations to assist farmers in early decision-making.',
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
                <a href="https://github.com/DevBhalodiya" className="link">
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
