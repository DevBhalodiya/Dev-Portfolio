import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../styles/Projects3D.css';

const projects = [
  {
    id: 1,
    title: 'Group Study Organizer',
    tech: ['React Native', 'Firebase', 'Cloudinary'],
    description: 'React Native app with Firebase for real-time collaboration and Cloudinary for media storage',
    github: 'https://github.com/DevBhalodiya',
    color: 0x6366f1,
  },
  {
    id: 2,
    title: 'KhataBook – Digital Credit System',
    tech: ['React Native', 'Expo', 'Firebase'],
    description: 'Cross-platform mobile app for managing customer credit records with transaction tracking',
    github: 'https://github.com/DevBhalodiya',
    color: 0xa855f7,
  },
  {
    id: 3,
    title: 'AI Crop Disease Prediction',
    tech: ['Python', 'CNN', 'React', 'REST API'],
    description: 'Web app using CNN to detect crop diseases and provides treatment recommendations',
    github: 'https://github.com/DevBhalodiya',
    color: 0x06b6d4,
  },
  {
    id: 4,
    title: 'MERN Stack Containerization',
    tech: ['Docker', 'MongoDB', 'Express', 'React', 'Node.js'],
    description: 'Full Docker-based containerization demonstrating DevOps and container orchestration',
    github: 'https://github.com/DevBhalodiya',
    color: 0xec4899,
  },
];

interface CardMesh extends THREE.Mesh {
  projectId?: number;
  originalPosition?: THREE.Vector3;
}

export default function Projects3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cardsRef = useRef<CardMesh[]>([]);
  const [activeProject, setActiveProject] = useState(0);

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
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create project cards
    const cards: CardMesh[] = [];
    projects.forEach((project, i) => {
      const geometry = new THREE.PlaneGeometry(4, 5);

      // Create canvas texture for the card
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 640;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 512, 640);

      ctx.fillStyle = '#6366f1';
      ctx.fillRect(0, 0, 512, 80);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(project.title, 20, 55);

      ctx.fillStyle = '#a0aec0';
      ctx.font = '16px Arial';
      const techText = project.tech.join(' • ');
      ctx.fillText(techText, 20, 130);

      ctx.fillStyle = '#6366f1';
      ctx.fillRect(20, 180, 200, 50);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('View Project', 50, 215);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: project.color,
        emissiveIntensity: 0.1,
      });

      const card = new THREE.Mesh(geometry, material) as CardMesh;
      card.projectId = project.id;
      card.originalPosition = new THREE.Vector3();

      const angle = (i / projects.length) * Math.PI * 2;
      const radius = 8;
      card.position.x = Math.cos(angle) * radius;
      card.position.y = Math.sin(angle) * radius;
      card.position.z = 0;
      card.originalPosition.copy(card.position);

      // Rotation toward center
      card.lookAt(0, 0, 0);

      scene.add(card);
      cards.push(card);
      cardsRef.current = cards;
    });

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cards);

      cards.forEach((card) => {
        const isHovered = intersects.some((i) => i.object === card);
        if (isHovered) {
          gsap.to(card.position, { z: 2, duration: 0.3 });
          gsap.to(card.scale, { x: 1.05, y: 1.05, duration: 0.3 });
          gsap.to(card.rotation, { x: 0.2, duration: 0.3 });
        } else {
          gsap.to(card.position, { z: card.originalPosition?.z || 0, duration: 0.3 });
          gsap.to(card.scale, { x: 1, y: 1, duration: 0.3 });
          gsap.to(card.rotation, { x: 0, duration: 0.3 });
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cards);

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object as CardMesh;
        const projectIndex = cards.findIndex((c) => c === clickedCard);
        if (projectIndex !== -1) {
          setActiveProject(projectIndex);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cards.forEach((card, i) => {
        const time = Date.now() * 0.0003;
        const targetAngle = (i / cards.length) * Math.PI * 2 + time;
        const radius = 8;

        card.position.x = Math.cos(targetAngle) * radius;
        card.position.y = Math.sin(targetAngle) * radius;
        card.position.z = (card.originalPosition?.z || 0) + Math.sin(time + i) * 0.2;

        card.lookAt(0, 0, card.position.z);
      });

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
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const currentProject = projects[activeProject];

  return (
    <section id="projects" className="projects-3d">
      <div className="projects-header">
        <h2>Featured Projects</h2>
        <p>Explore my work in 3D</p>
      </div>
      <div ref={containerRef} className="projects-canvas" />
      <div className="project-info">
        <h3>{currentProject.title}</h3>
        <p className="tech-stack">{currentProject.tech.join(' • ')}</p>
        <p className="project-desc">{currentProject.description}</p>
        <div className="project-links">
          <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
