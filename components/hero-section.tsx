"use client";

import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";

type Position = THREE.Vector3 | [number, number, number];

interface CubePositions {
  cube1: Position;
  cube2: Position;
  cube3: Position;
}

const TechIcon = ({ position, icon }: { position: [number, number, number]; icon: string }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={2}
      position={position}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8A2BE2" />
        <Html position={[0, 0, 0.51]} transform>
          <div className="text-4xl">{icon}</div>
        </Html>
      </mesh>
    </Float>
  );
};

// This is needed for the TechIcon component
const Html = ({ children, position, transform }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        transform: `translate(-50%, -50%) translate3d(${position[0]}px, ${position[1]}px, ${position[2]}px)`,
        transformStyle: transform ? "preserve-3d" : "flat",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export function HeroSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCubePositions = (): CubePositions => {
    if (isMobile) {
      return {
        cube1: new THREE.Vector3(-1.5, 0.5, 0),
        cube2: new THREE.Vector3(1.5, -0.5, 0),
        cube3: new THREE.Vector3(0, 1, 0),
      };
    } else if (isTablet) {
      return {
        cube1: new THREE.Vector3(-2, 0.8, 0),
        cube2: new THREE.Vector3(2, -0.8, 0),
        cube3: new THREE.Vector3(0, 1.5, 0),
      };
    }
    return {
      cube1: new THREE.Vector3(-3, 1, 0),
      cube2: new THREE.Vector3(3, -1, 0),
      cube3: new THREE.Vector3(0, 2, 0),
    };
  };

  const getCubeSize = () => {
    if (isMobile) return 0.7;
    if (isTablet) return 0.85;
    return 1;
  };

  const positions = getCubePositions();
  const cubeSize = getCubeSize();

  const handleResumeDownload = () => {
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "saumya-desai-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="section flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <TypeAnimation
              sequence={["Hi, I'm Saumya Desai", 1000]}
              wrapper="h1"
              speed={50}
              className="hero-text font-code"
              repeat={0}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mb-4"
          >
            <h2 className="hero-subtitle text-muted-foreground">
              Full Stack Developer | Student
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mb-12"
          >
            <p className="hero-description glow-text text-accent">
              Building the future with code
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button className="button button-primary" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button
            variant="outline"
            size="lg"
            onClick={() => {
              handleResumeDownload();
            }}
            className="flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Resume
          </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="absolute bottom-8"
          >
            <a
              href="#about"
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="mb-2 text-sm">Scroll Down</span>
              <ArrowDown className="animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 7 : 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={positions.cube1}
          >
            <mesh>
              <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
              <meshStandardMaterial 
                color="#8A2BE2"
                metalness={0.8}
                roughness={0.2}
                emissive="#8A2BE2"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
          
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={positions.cube2}
          >
            <mesh>
              <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
              <meshStandardMaterial 
                color="#00FFFF"
                metalness={0.8}
                roughness={0.2}
                emissive="#00FFFF"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
          
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={positions.cube3}
          >
            <mesh>
              <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
              <meshStandardMaterial 
                color="#FFD700"
                metalness={0.8}
                roughness={0.2}
                emissive="#FFD700"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        </Canvas>
      </div>
    </section>
  );
}