import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import '../styles/LoadingScreen.css';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050508, 1);
    rendererRef.current = renderer;

    // Create rotating cube cluster
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.4,
    });

    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      const angle = (i / 5) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 0.8;
      cube.position.y = Math.sin(angle) * 0.8;
      cube.position.z = Math.sin(angle * 2) * 0.5;
      scene.add(cube);
      cubes.push(cube);
    }

    // Add lighting
    const light = new THREE.PointLight(0x6366f1, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.03;
        const time = Date.now() * 0.001;
        cube.position.z = Math.sin(time + i) * 0.8;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Simulate loading
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 3,
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    });

    // Complete loading and exit
    setTimeout(() => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      exitTimeline.to(containerRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        ease: 'power2.inOut',
      });

      exitTimeline.to(
        camera.position,
        {
          z: 8,
          duration: 1,
        },
        '<'
      );
    }, 3500);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      <canvas ref={canvasRef} className="loading-canvas" />
      <div className="loading-content">
        <div className="progress-counter">{progress}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-text">Initializing portfolio...</div>
      </div>
    </div>
  );
}
