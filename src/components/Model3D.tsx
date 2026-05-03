import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Model3DProps {
  modelUrl?: string;
  onModelLoaded?: () => void;
  onAnimationPlay?: (name: string) => void;
}

export default function Model3D({ modelUrl, onModelLoaded, onAnimationPlay }: Model3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) {
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.5);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotateSpeed = 1.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(8, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Rim lights for drama
    const rimLight1 = new THREE.PointLight(0x6366f1, 0.6, 50);
    rimLight1.position.set(-5, 3, 3);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0xa855f7, 0.4, 50);
    rimLight2.position.set(5, 3, -3);
    scene.add(rimLight2);

    // Create detailed human figure
    const group = new THREE.Group();

    // Skin color
    const skinColor = 0xdba584;
    const clothesColor = 0x2d3748;

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      metalness: 0.1,
      roughness: 0.8,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.85, 0);
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.2, 16);
    const neckMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      metalness: 0.05,
      roughness: 0.8,
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.set(0, 1.6, 0);
    neck.castShadow = true;
    neck.receiveShadow = true;
    group.add(neck);

    // Torso/Body
    const torsoGeometry = new THREE.BoxGeometry(0.35, 0.6, 0.25);
    const torsoMaterial = new THREE.MeshStandardMaterial({
      color: clothesColor,
      metalness: 0.2,
      roughness: 0.7,
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.set(0, 1.15, 0.05);
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    // Left arm
    const leftArmGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.5, 16);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      metalness: 0.1,
      roughness: 0.8,
    });
    const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    leftArm.position.set(-0.3, 1.3, -0.1);
    leftArm.rotation.z = -0.3;
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    group.add(leftArm);

    // Right arm (typing on keyboard)
    const rightArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    rightArm.position.set(0.3, 1.25, 0.3);
    rightArm.rotation.z = 0.4;
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    group.add(rightArm);

    // Left hand
    const handGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const handMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      metalness: 0.05,
      roughness: 0.8,
    });
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.3, 0.95, -0.3);
    leftHand.castShadow = true;
    leftHand.receiveShadow = true;
    group.add(leftHand);

    // Right hand
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.3, 0.95, 0.5);
    rightHand.castShadow = true;
    rightHand.receiveShadow = true;
    group.add(rightHand);

    // Left leg
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.1,
      roughness: 0.8,
    });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.12, 0.35, 0.05);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    group.add(leftLeg);

    // Right leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.12, 0.35, 0.05);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    group.add(rightLeg);

    // Left shoe
    const shoeGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.15);
    const shoeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.2,
      roughness: 0.6,
    });
    const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    leftShoe.position.set(-0.12, 0.02, 0.05);
    leftShoe.castShadow = true;
    leftShoe.receiveShadow = true;
    group.add(leftShoe);

    // Right shoe
    const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    rightShoe.position.set(0.12, 0.02, 0.05);
    rightShoe.castShadow = true;
    rightShoe.receiveShadow = true;
    group.add(rightShoe);

    scene.add(group);

    // Desk
    const deskGeometry = new THREE.BoxGeometry(3, 0.12, 1.2);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.4,
      roughness: 0.6,
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = 0.75;
    desk.castShadow = true;
    desk.receiveShadow = true;
    scene.add(desk);

    // Desk legs
    const legDeskGeometry = new THREE.BoxGeometry(0.12, 0.7, 0.12);
    const legDeskMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.5,
      roughness: 0.5,
    });

    const deskLegs = [
      { x: -1.3, z: -0.4 },
      { x: -1.3, z: 0.4 },
      { x: 1.3, z: -0.4 },
      { x: 1.3, z: 0.4 },
    ];

    deskLegs.forEach((pos) => {
      const leg = new THREE.Mesh(legDeskGeometry, legDeskMaterial);
      leg.position.set(pos.x, 0.35, pos.z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      scene.add(leg);
    });

    // Laptop base
    const laptopBaseGeometry = new THREE.BoxGeometry(0.9, 0.08, 0.6);
    const laptopBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.6,
      roughness: 0.4,
    });
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopBaseMaterial);
    laptopBase.position.set(0.8, 0.95, 0.3);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    scene.add(laptopBase);

    // Laptop screen
    const screenGeometry = new THREE.BoxGeometry(0.85, 0.55, 0.02);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x00ff88,
      emissiveIntensity: 0.15,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0.8, 1.45, 0.2);
    screen.rotation.x = -0.35;
    screen.castShadow = true;
    screen.receiveShadow = true;
    scene.add(screen);

    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(0.85, 0.04, 0.35);
    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.3,
      roughness: 0.7,
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(-0.3, 0.82, 0.4);
    keyboard.castShadow = true;
    keyboard.receiveShadow = true;
    scene.add(keyboard);

    // Mouse
    const mouseGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const mouseMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.4,
      roughness: 0.6,
      emissive: 0x6366f1,
      emissiveIntensity: 0.25,
    });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(-0.8, 0.85, 0.5);
    mouse.castShadow = true;
    mouse.receiveShadow = true;
    scene.add(mouse);

    // Monitor stand (optional secondary monitor)
    const monitorStandGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
    const standMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.5,
      roughness: 0.5,
    });
    const monitorStand = new THREE.Mesh(monitorStandGeometry, standMaterial);
    monitorStand.position.set(1.8, 0.5, -0.2);
    monitorStand.castShadow = true;
    monitorStand.receiveShadow = true;
    scene.add(monitorStand);

    // Secondary monitor
    const monitorGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.02);
    const monitorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x6366f1,
      emissiveIntensity: 0.1,
    });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.set(1.8, 1.15, -0.2);
    monitor.castShadow = true;
    monitor.receiveShadow = true;
    scene.add(monitor);

    // Holographic platform
    const platformGeometry = new THREE.TorusGeometry(2, 0.2, 32, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x6366f1,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.5,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 0.6;
    platform.rotation.x = Math.PI / 6;
    scene.add(platform);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      time += clock.getDelta();

      // Arm typing animation
      leftArm.rotation.z = -0.3 + Math.sin(time * 3) * 0.15;
      rightArm.rotation.z = 0.4 + Math.sin(time * 3 + Math.PI) * 0.2;

      // Hand positioning
      leftHand.position.y = 0.95 + Math.sin(time * 3) * 0.05;
      rightHand.position.y = 0.95 + Math.sin(time * 3 + Math.PI) * 0.05;

      // Head slight bob
      head.position.y = 1.85 + Math.sin(time * 0.5) * 0.03;

      // Platform rotation
      platform.rotation.z += 0.003;

      // Mouse glow pulse
      (mouse.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.25 + Math.sin(time * 2) * 0.15;

      // Screen glow pulse
      (screen.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + Math.sin(time * 1.5) * 0.1;

      // Particles floating
      particles.rotation.y += 0.0003;
      particles.position.y += Math.sin(time * 0.3) * 0.001;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    onModelLoaded?.();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onModelLoaded, onAnimationPlay]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
