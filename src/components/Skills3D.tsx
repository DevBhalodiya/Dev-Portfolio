import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../styles/Skills3D.css';

const skills = [
  { name: 'AWS', proficiency: 0.8, color: 0xFF9900 },
  { name: 'Docker', proficiency: 0.75, color: 0x2496ED },
  { name: 'React Native', proficiency: 0.85, color: 0x61DAFB },
  { name: 'Python', proficiency: 0.7, color: 0x3776AB },
  { name: 'Node.js', proficiency: 0.75, color: 0x339933 },
  { name: 'JavaScript', proficiency: 0.8, color: 0xF7DF1E },
];

interface Planet {
  mesh: THREE.Mesh;
  orbitRadius: number;
  orbitSpeed: number;
  skill: typeof skills[0];
}

export default function Skills3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const planetsRef = useRef<Planet[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Central sun
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.8,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add glow to sun
    const glowGeometry = new THREE.SphereGeometry(1.7, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.2,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Create planets
    const planets: Planet[] = [];
    skills.forEach((skill, i) => {
      const orbitRadius = 8 + i * 2;
      const size = 0.5 + skill.proficiency * 0.5;

      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.3,
        shininess: 100,
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = orbitRadius;

      // Add glow effect
      const glowGeo = new THREE.SphereGeometry(size + 0.3, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.2,
      });
      const planetGlow = new THREE.Mesh(glowGeo, glowMat);
      planetGlow.position.copy(planet.position);
      planet.add(planetGlow);

      scene.add(planet);

      const orbitSpeed = 0.01 / (1 + i * 0.2);

      planets.push({
        mesh: planet,
        orbitRadius,
        orbitSpeed,
        skill,
      });

      planetsRef.current = planets;
    });

    // Orbit lines
    skills.forEach((_, i) => {
      const orbitRadius = 8 + i * 2;
      const orbitGeometry = new THREE.BufferGeometry();
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * orbitRadius,
            0,
            Math.sin(angle) * orbitRadius
          )
        );
      }
      orbitGeometry.setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.2,
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbitLine);
    });

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        planets.map((p) => p.mesh),
        false
      );

      planets.forEach((planet) => {
        const isIntersected = intersects.some((i) => i.object === planet.mesh);
        if (isIntersected) {
          gsap.to(planet.mesh.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 });
          setHoveredPlanet(planet.skill.name);
        } else {
          gsap.to(planet.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        }
      });

      if (intersects.length === 0) {
        setHoveredPlanet(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let angle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      angle += 0.001;

      planets.forEach((planet, i) => {
        const time = Date.now() * planet.orbitSpeed * 0.001;
        planet.mesh.position.x = Math.cos(time) * planet.orbitRadius;
        planet.mesh.position.z = Math.sin(time) * planet.orbitRadius;

        planet.mesh.rotation.x += 0.005;
        planet.mesh.rotation.y += 0.008;

        // Update glow position
        if (planet.mesh.children[0]) {
          planet.mesh.children[0].position.copy(planet.mesh.position);
        }
      });

      sun.rotation.y += 0.003;
      glow.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="skills" className="skills-3d">
      <div className="skills-header">
        <h2>Skills & Technologies</h2>
        <p>Hover over planets to explore my tech stack</p>
      </div>
      <div ref={containerRef} className="skills-canvas" />
      {hoveredPlanet && (
        <div className="skill-tooltip">
          <h3>{hoveredPlanet}</h3>
          <div className="proficiency-bar">
            <div
              className="proficiency-fill"
              style={{
                width: `${(skills.find((s) => s.name === hoveredPlanet)?.proficiency || 0) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
