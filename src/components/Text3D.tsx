import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

interface Text3DProps {
  text: string;
  onReady?: () => void;
}

export default function Text3D({ text, onReady }: Text3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Load font and create text
    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://threejs.org/examples/fonts/Space_Grotesk_Regular.json',
      (font) => {
        const textGeometry = new TextGeometry(text, {
          font,
          size: 1,
          depth: 0.3,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.03,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshPhongMaterial({
          color: 0xe2e8f0,
          emissive: 0x6366f1,
          emissiveIntensity: 0.3,
          shininess: 100,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.z = 0;
        scene.add(textMesh);

        onReady?.();

        // Animation loop
        let rotationY = 0;
        const animate = () => {
          requestAnimationFrame(animate);
          rotationY += 0.003;
          textMesh.rotation.y = rotationY;
          renderer.render(scene, camera);
        };
        animate();
      }
    );

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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [text, onReady]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
