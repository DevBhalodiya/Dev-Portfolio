import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../styles/Contact3D.css';

export default function Contact3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

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
    cameraRef.current = camera;

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

    // Central platform (space station)
    const platformGeometry = new THREE.TorusGeometry(3, 0.5, 32, 100);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x6366f1,
      emissiveIntensity: 0.2,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    scene.add(platform);

    // Floating island
    const islandGeometry = new THREE.ConeGeometry(2.5, 0.5, 32);
    const islandMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d3748,
      emissive: 0x6366f1,
      emissiveIntensity: 0.1,
    });
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.y = 1;
    scene.add(island);

    // Orbiting social spheres
    const socialColors = [0x1da1f2, 0x0a66c2, 0xff0000]; // Twitter, LinkedIn, GitHub
    const socials: THREE.Mesh[] = [];

    socialColors.forEach((color, i) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
      });
      const sphere = new THREE.Mesh(geometry, material);
      const angle = (i / socialColors.length) * Math.PI * 2;
      sphere.position.x = Math.cos(angle) * 4;
      sphere.position.y = Math.sin(angle) * 4;
      scene.add(sphere);
      socials.push(sphere);
    });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      platform.rotation.z += 0.002;
      island.rotation.y += 0.005;

      socials.forEach((social, i) => {
        const angle = (i / socials.length) * Math.PI * 2 + time * 0.5;
        social.position.x = Math.cos(angle) * 4;
        social.position.y = Math.sin(angle) * 4;
        social.rotation.x += 0.01;
        social.rotation.y += 0.015;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // Send email via mailto
    const mailtoLink = `mailto:bhalodiyadev485@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;

    // Create paper airplane and launch animation
    const airplaneEl = document.createElement('div');
    airplaneEl.className = 'paper-airplane';
    airplaneEl.textContent = '✈️';
    document.body.appendChild(airplaneEl);

    const startX = formRef.current?.getBoundingClientRect().left || 0;
    const startY = formRef.current?.getBoundingClientRect().top || 0;

    gsap.to(airplaneEl, {
      x: window.innerWidth + 100,
      y: -window.innerHeight,
      duration: 2,
      ease: 'power1.in',
      rotation: 360 * 3,
      onComplete: () => {
        airplaneEl.remove();
        setIsSending(false);
        setFormData({ name: '', email: '', message: '' });

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Message sent successfully! 🎉';
        document.body.appendChild(successMsg);

        gsap.to(successMsg, {
          opacity: 0,
          duration: 3,
          delay: 1,
          onComplete: () => successMsg.remove(),
        });
      },
    });
  };

  return (
    <section id="contact" className="contact-3d">
      <div ref={containerRef} className="contact-canvas" />
      <div className="contact-overlay">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>Send me a message and I'll respond as soon as possible</p>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="form-textarea"
              rows={5}
            />
          </div>
          <button type="submit" disabled={isSending} className="submit-btn">
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
