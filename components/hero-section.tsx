"use client";

import React, { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";

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
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="button button-primary" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" className="button button-outline" asChild>
              <a href="#contact">Contact Me</a>
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
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Tech stack icons would go here in a real implementation */}
          {/* For now, we'll use placeholder cubes */}
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={[-3, 1, 0]}
          >
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#8A2BE2" />
            </mesh>
          </Float>
          
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={[3, -1, 0]}
          >
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#00FFFF" />
            </mesh>
          </Float>
          
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={[0, 2, 0]}
          >
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#FFFF00" />
            </mesh>
          </Float>
        </Canvas>
      </div>
    </section>
  );
}