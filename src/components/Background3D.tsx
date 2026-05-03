import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050508, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main group for parallax
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // 1. Star field
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    group.add(stars);

    // 2. Floating geometric shapes
    const shapes: THREE.Mesh[] = [];

    const createShape = (type: string, position: THREE.Vector3) => {
      let geometry: THREE.BufferGeometry;

      switch (type) {
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(0.5, 2);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.5, 1);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 16);
          break;
        default:
          geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      }

      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        emissive: 0x6366f1,
        emissiveIntensity: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      return mesh;
    };

    const shapeTypes = ['icosahedron', 'octahedron', 'torus', 'icosahedron', 'octahedron'];
    shapeTypes.forEach((type, i) => {
      const angle = (i / shapeTypes.length) * Math.PI * 2;
      const distance = 8 + Math.random() * 4;
      const position = new THREE.Vector3(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
        Math.sin(angle * 2) * distance
      );
      const shape = createShape(type, position);
      group.add(shape);
      shapes.push(shape);
    });

    // 3. Aurora/Nebula effect (large transparent blobs)
    const auroraGeometry = new THREE.IcosahedronGeometry(3, 4);
    const auroraColors = [0x6366f1, 0xa855f7, 0x9333ea];
    const auroras = auroraColors.map((color) => {
      const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.1,
        emissive: color,
        emissiveIntensity: 0.2,
      });
      const mesh = new THREE.Mesh(auroraGeometry, material);
      mesh.scale.set(2 + Math.random(), 2 + Math.random(), 2 + Math.random());
      group.add(mesh);
      return mesh;
    });

    // 4. Grid plane at bottom
    const gridGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.1,
    });
    const gridLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(gridGeometry),
      gridMaterial
    );
    gridLines.position.y = -15;
    gridLines.rotation.x = Math.PI / 4;
    group.add(gridLines);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 0.8, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Mouse tracking for parallax
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Parallax effect
      group.rotation.x += (mouseRef.current.y * 0.5 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseRef.current.x * 0.5 - group.rotation.y) * 0.05;

      // Rotate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.001 + i * 0.0005;
        shape.rotation.y += 0.002 + i * 0.0008;
        const time = Date.now() * 0.0001;
        shape.position.y += Math.sin(time + i) * 0.001;
      });

      // Animate aurora
      auroras.forEach((aurora, i) => {
        aurora.rotation.x += 0.0001;
        aurora.rotation.y += 0.00015;
        const time = Date.now() * 0.00005;
        aurora.scale.x = 2 + Math.sin(time + i) * 0.3;
        aurora.scale.y = 2 + Math.cos(time + i * 1.5) * 0.3;
      });

      // Stars drift
      stars.rotation.z += 0.00005;

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

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
}
