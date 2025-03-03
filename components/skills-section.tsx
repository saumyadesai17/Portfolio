"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import * as THREE from "three";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "CSS/Tailwind", proficiency: 90 },
      { name: "Three.js", proficiency: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: 90 },
      { name: "Express", proficiency: 85 },
      { name: "GraphQL", proficiency: 80 },
      { name: "REST APIs", proficiency: 95 },
      { name: "Microservices", proficiency: 75 },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "TensorFlow", proficiency: 85 },
      { name: "PyTorch", proficiency: 80 },
      { name: "NLP", proficiency: 75 },
      { name: "Computer Vision", proficiency: 70 },
      { name: "Data Science", proficiency: 85 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", proficiency: 90 },
      { name: "MongoDB", proficiency: 85 },
      { name: "Redis", proficiency: 75 },
      { name: "Firebase", proficiency: 80 },
      { name: "SQL", proficiency: 95 },
    ],
  },
];

// 3D Skill Sphere component
const SkillSphere = ({ activeCategory }: { activeCategory: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Get skills for the active category
  const skills = skillCategories.find(category => category.name === activeCategory)?.skills || [];
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#112240" transparent opacity={0.3} />
      </mesh>
      
      {skills.map((skill, i) => {
        // Calculate position on sphere
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi) * 2.2;
        const y = Math.sin(theta) * Math.sin(phi) * 2.2;
        const z = Math.cos(phi) * 2.2;
        
        return (
          <Text
            key={skill.name}
            position={[x, y, z]}
            fontSize={0.3}
            color="#8A2BE2"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        );
      })}
    </group>
  );
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const activeSkills = skillCategories.find(
    (category) => category.name === activeCategory
  )?.skills || [];
  
  return (
    <section id="skills" className="section">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Skills & Expertise
        </motion.h2>
        
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {skillCategories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              onClick={() => setActiveCategory(category.name)}
              className="skill-category"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">{activeCategory} Skills</h3>
            
            {activeSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.proficiency}%</span>
                </div>
                <Progress value={skill.proficiency} className="h-2" />
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="skill-sphere bg-secondary/30 rounded-lg overflow-hidden"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SkillSphere activeCategory={activeCategory} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}