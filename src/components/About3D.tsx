import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/About3D.css';

export default function About3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

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
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create 3D rotating cube with info on faces
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3 }),
      new THREE.MeshPhongMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.3 }),
      new THREE.MeshPhongMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.3 }),
      new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.3 }),
      new THREE.MeshPhongMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.3 }),
      new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.3 }),
    ];

    const cube = new THREE.Mesh(cubeGeometry, materials);
    scene.add(cube);

    // Counter cylinders for stats
    const stats = [
      { label: 'Years', value: 5, position: new THREE.Vector3(-4, -2, 0) },
      { label: 'Projects', value: 25, position: new THREE.Vector3(0, -2, 0) },
      { label: 'Clients', value: 15, position: new THREE.Vector3(4, -2, 0) },
    ];

    const cylinders: THREE.Group[] = [];

    stats.forEach((stat) => {
      const group = new THREE.Group();
      group.position.copy(stat.position);

      // Base cylinder
      const geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 0.3,
      });
      const cylinder = new THREE.Mesh(geometry, material);
      group.add(cylinder);

      cylinders.push(group);
      scene.add(group);
    });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Rotate cube
      cube.rotation.x += 0.003;
      cube.rotation.y += 0.005;

      // Animate cylinders (rolling effect)
      cylinders.forEach((cylinder, i) => {
        const targetScale = 1 + Math.sin(time + i) * 0.2;
        cylinder.scale.y = targetScale;
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="about" className="about-3d">
      <div className="about-content">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I'm Dev Bhalodiya, an aspiring Cloud and DevOps Engineer with hands-on experience in cloud services,
            Linux, Docker, and CI/CD pipelines. I've built full-stack web applications and cross-platform mobile apps
            using React Native, with the ability to integrate cloud-based solutions.
          </p>
          <p>
            Currently based in Anand, Gujarat, India, I hold a B.Tech in IT from CHARUSAT and possess 2 AWS certifications.
            I'm passionate about learning new technologies and open to exciting opportunities in cloud and DevOps.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h3>4+</h3>
              <p>Projects Built</p>
            </div>
            <div className="stat-item">
              <h3>2</h3>
              <p>AWS Certifications</p>
            </div>
            <div className="stat-item">
              <h3>4</h3>
              <p>Credly Badges</p>
            </div>
          </div>
        </div>
        <div ref={containerRef} className="about-canvas" />
      </div>
    </section>
  );
}
