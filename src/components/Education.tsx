import { useIntersection } from '../hooks/useIntersection';
import { FiBook } from 'react-icons/fi';
import './Education.css';

const educationEntries = [
  {
    icon: FiBook,
    status: 'Current',
    degree: 'B.Tech in Information Technology',
    institution: 'Charotar University of Science and Technology (CHARUSAT)',
    period: '2024 – Present',
  },
  {
    icon: FiBook,
    status: 'Completed',
    degree: 'Diploma in Computer Engineering',
    institution: 'B & B Institute of Technology (GTU)',
    period: 'Oct 2021 – May 2024',
  },
];

const Education = () => {
  const [ref, isVisible] = useIntersection(0.2);

  return (
    <section id="education" ref={ref} className={`education ${isVisible ? 'visible' : ''}`}>
      <div>
        <p className="section-tag">// education</p>
        <h2>Education</h2>

        <div className="timeline">
          {educationEntries.map((entry, idx) => (
            <div key={idx} className="timeline-entry">
              <div className="timeline-line"></div>
              <div className="timeline-node">
                <entry.icon size={20} />
              </div>

              <div className="timeline-content">
                <div className="status-badge" data-status={entry.status}>
                  {entry.status}
                </div>
                <h3>{entry.degree}</h3>
                <p className="institution">{entry.institution}</p>
                <p className="period">{entry.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
