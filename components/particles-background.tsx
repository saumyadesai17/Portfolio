"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mousePosition = { x: 0, y: 0 };
    let isMouseMoving = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 200);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: theme === "dark" 
            ? `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.2})` 
            : `rgba(138, 43, 226, ${Math.random() * 0.3 + 0.1})`,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles
        connectParticles(particle, i);
        
        // React to mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            particle.speedX += directionX * force * 0.02;
            particle.speedY += directionY * force * 0.02;
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particles.length; j++) {
        const particle2 = particles[j];
        const dx = particle.x - particle2.x;
        const dy = particle.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = theme === "dark" 
            ? `rgba(138, 43, 226, ${(100 - distance) / 500})` 
            : `rgba(138, 43, 226, ${(100 - distance) / 1000})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.stroke();
        }
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition = { x: e.clientX, y: e.clientY };
      isMouseMoving = true;
      
      // Reset the flag after a delay
      clearTimeout(window.mouseMoveTimeout);
      window.mouseMoveTimeout = window.setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };
    
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    resizeCanvas();
    drawParticles();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}