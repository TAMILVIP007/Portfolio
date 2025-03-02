/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
interface TechGlobeProps {
  className?: string;
}

const TechGlobe: React.FC<TechGlobeProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globe: THREE.Mesh;
    technologies: THREE.Group;
    frameId: number | null;
    spriteGroup: THREE.Group;
  }>({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(),
    renderer: new THREE.WebGLRenderer(),
    globe: new THREE.Mesh(),
    technologies: new THREE.Group(),
    frameId: null,
    spriteGroup: new THREE.Group(),
  });

  // Technology stack with icon mappings
  const techStack = [
    { name: "Node.js", color: "#539e43", icon: "server" },
    { name: "Python", color: "#3572A5", icon: "code" },
    { name: "MongoDB", color: "#4DB33D", icon: "database" },
    { name: "PostgreSQL", color: "#336791", icon: "database" },
    { name: "Redis", color: "#D82C20", icon: "database" },
    { name: "GraphQL", color: "#E535AB", icon: "file-json" },
    { name: "Docker", color: "#0db7ed", icon: "container" },
    { name: "AWS", color: "#FF9900", icon: "cloud" },
    { name: "Express", color: "#000000", icon: "server" },
  ];

  // Helper function to create canvas with tech icon
  const createIconCanvas = (iconName: string, color: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return canvas;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw icon
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 80px sans-serif";

    // Map icon name to a simple character or symbol for representation
    let iconSymbol = "";
    switch (iconName) {
      case "server":
        iconSymbol = "⚙️";
        break;
      case "code":
        iconSymbol = "🐍";
        break;
      case "database":
        iconSymbol = "💾";
        break;
      case "file-json":
        iconSymbol = "📊";
        break;
      case "container":
        iconSymbol = "🐳";
        break;
      case "cloud":
        iconSymbol = "☁️";
        break;
      default:
        iconSymbol = "🔧";
    }

    context.fillText(iconSymbol, canvas.width / 2, canvas.height / 2);

    return canvas;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Initialize scene
    const scene = new THREE.Scene();
    globeRef.current.scene = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;
    globeRef.current.camera = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    globeRef.current.renderer = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create Earth globe with wireframe
    const globeGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x3a3f6b,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0x222244,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current.globe = globe;

    // Create a solid inner globe with slight glow
    const innerGlobeGeometry = new THREE.SphereGeometry(1.45, 32, 32);
    const innerGlobeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.7,
      emissive: 0x161626,
    });
    const innerGlobe = new THREE.Mesh(innerGlobeGeometry, innerGlobeMaterial);
    scene.add(innerGlobe);

    // Create sprite group for technology icons
    const spriteGroup = new THREE.Group();
    globeRef.current.spriteGroup = spriteGroup;
    scene.add(spriteGroup);

    // Create technology nodes
    const technologies = new THREE.Group();
    globeRef.current.technologies = technologies;
    scene.add(technologies);

    // Add tech stack as sprites around the globe
    techStack.forEach((tech, i) => {
      // Random position on the sphere surface
      const phi = Math.acos(-1 + (2 * i) / techStack.length);
      const theta = Math.sqrt(techStack.length * Math.PI) * phi;

      // Calculate position with some randomness
      const x = 2.5 * Math.cos(theta) * Math.sin(phi);
      const y = 2.5 * Math.sin(theta) * Math.sin(phi);
      const z = 2.5 * Math.cos(phi);

      // Create tech node (small invisible sphere for connection purposes)
      const techGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const techMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(tech.color),
        transparent: true,
        opacity: 0.2,
      });
      const techNode = new THREE.Mesh(techGeometry, techMaterial);
      techNode.position.set(x, y, z);

      // Add a pulsing animation for each node
      techNode.userData = {
        initialScale: 1,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        rotationSpeed: 0.01 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      };

      technologies.add(techNode);

      // Create sprite with icon
      const iconCanvas = createIconCanvas(tech.icon, tech.color);
      const iconTexture = new THREE.CanvasTexture(iconCanvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: iconTexture,
        transparent: true,
        opacity: 0.9,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, y, z);
      sprite.scale.set(0.5, 0.5, 0.5);

      // Add pulsing data to sprite
      sprite.userData = {
        name: tech.name,
        initialScale: 0.5,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      };

      spriteGroup.add(sprite);

      // Connect to globe with a line
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(tech.color),
        transparent: true,
        opacity: 0.3,
      });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      technologies.add(line);
    });

    // Animation loop
    const animate = () => {
      // Rotate globe slowly
      globe.rotation.y += 0.002;
      innerGlobe.rotation.y += 0.001;

      // Make sprites face the camera and pulse
      spriteGroup.children.forEach((sprite) => {
        if (sprite instanceof THREE.Sprite) {
          // Always face camera
          sprite.quaternion.copy(camera.quaternion);

          // Pulsing effect
          const userData = sprite.userData;
          const pulse =
            Math.sin(
              Date.now() * 0.001 * userData.pulseSpeed + userData.phase,
            ) *
              0.1 +
            1;
          const scale = userData.initialScale * pulse;
          sprite.scale.set(scale, scale, scale);

          // Slight orbital movement
          sprite.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.003);
        }
      });

      // Make tech nodes pulse and orbit slightly
      technologies.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.SphereGeometry
        ) {
          const userData = child.userData;

          // Slight orbital movement
          child.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.003);
        }
      });

      // Make globe responsive to mouse movement with slight parallax effect
      if (typeof window !== "undefined") {
        const mouseX =
          (window.innerWidth / 2 - (window.mouseX || window.innerWidth / 2)) *
          0.0002;
        const mouseY =
          (window.innerHeight / 2 - (window.mouseY || window.innerHeight / 2)) *
          0.0002;
        globe.rotation.y += mouseX;
        globe.rotation.x += mouseY;
        technologies.rotation.y += mouseX;
        technologies.rotation.x += mouseY;
        spriteGroup.rotation.y += mouseX;
        spriteGroup.rotation.x += mouseY;
      }

      renderer.render(scene, camera);
      globeRef.current.frameId = requestAnimationFrame(animate);
    };

    // Track mouse position
    const handleMouseMove = (event: MouseEvent) => {
      window.mouseX = event.clientX;
      window.mouseY = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (globeRef.current.frameId !== null) {
        cancelAnimationFrame(globeRef.current.frameId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-[400px] w-full overflow-hidden rounded-lg ${className}`}
    />
  );
};

// Extend Window interface to include mouseX and mouseY properties
declare global {
  interface Window {
    mouseX?: number;
    mouseY?: number;
  }
}

export default TechGlobe;
