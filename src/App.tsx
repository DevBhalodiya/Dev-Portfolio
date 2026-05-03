import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Background3D from './components/Background3D';
import Hero3D from './components/Hero3D';
import About3D from './components/About3D';
import Skills3D from './components/Skills3D';
import Projects3D from './components/Projects3D';
import Contact3D from './components/Contact3D';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <div className="app-container">
          <Background3D />
          <main className="main-content">
            <Hero3D />
            <About3D />
            <Skills3D />
            <Projects3D />
            <Contact3D />
            <footer className="footer">
              <p>&copy; 2026 Dev Bhalodiya. Built with Three.js & GSAP</p>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
