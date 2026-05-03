import { useIntersection } from '../hooks/useIntersection';
import './Skills.css';

const skillCards = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'C/C++', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Frameworks & Runtime',
    skills: ['Node.js', 'React', '.NET', 'React Native', 'Expo'],
  },
  {
    title: 'Cloud Platforms',
    skills: ['AWS', 'GCP'],
  },
  {
    title: 'Databases',
    skills: ['SQL', 'MySQL', 'MongoDB', 'Firebase', 'Firestore', 'DynamoDB'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub', 'Jira', 'Figma', 'Linux'],
  },
  {
    title: 'Concepts',
    skills: ['CI/CD', 'Containerization', 'REST APIs', 'CNN/ML', 'Agile'],
  },
];

const skillBars = [
  { name: 'AWS', level: 80 },
  { name: 'Docker', level: 75 },
  { name: 'React Native', level: 85 },
  { name: 'Python', level: 70 },
  { name: 'Node.js', level: 75 },
];

const Skills = () => {
  const [ref, isVisible] = useIntersection(0.2);

  return (
    <section id="skills" ref={ref} className={`skills ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// technical_skills</p>
        <h2>Skills & Technologies</h2>

        {/* Skill Cards Grid */}
        <div className="skills-grid">
          {skillCards.map((card, idx) => (
            <div key={idx} className="skill-card glass-card">
              <h3>{card.title}</h3>
              <div className="skill-pills-wrapper">
                {card.skills.map((skill, i) => (
                  <span key={i} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Skill Bars */}
        <div className="skill-bars-section">
          <h3 className="subsection-title">Core Proficiencies</h3>
          <div className="skill-bars">
            {skillBars.map((skill, idx) => (
              <div key={idx} className="skill-bar-item">
                <div className="bar-header">
                  <span className="bar-name">{skill.name}</span>
                  <span className="bar-percent">{skill.level}%</span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                      transition: isVisible ? 'width 1s ease 0.2s' : 'none',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
