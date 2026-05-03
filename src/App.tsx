import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Hero />
        <About />
        <Skills/>
        <Projects />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
