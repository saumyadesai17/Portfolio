"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { AvatarModel } from "@/components/3d/AvatarModel";

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Python", "FastApi", "MySQL", "MongoDB", "RESTful APIs"
];

const education = [
  {
    date: "2022 - Present",
    title: "B.Tech in Computer Science and Engineering (Data Science)",
    institution: "SVKM'S Dwarkadas Jivanlal sanghvi College of Engineering, Mumbai",
    description: "CGPA - 8.39"
  },
  {
    date: "2020 - 2022",
    title: "Higher Secondary School",
    institution: "Mithibai College, Mumbai",
    description: "Aggregate - 79%"
  },
  {
    date: "2008 - 2020",
    title: "Secondary School",
    institution: "ST. Augustine's High School, Mumbai",
    description: "Aggregate - 87%"
  }
];

export function AboutSection() {
  const [bioRef, bioInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [skillsRef, skillsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [educationRef, educationInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [avatarRef, avatarInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="section">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <motion.div
              ref={bioRef}
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground mb-4">
                I'm a passionate Full-stack Developer and AI Enthusiast building innovative solutions for complex problems. My journey in technology began at Dwarkadas Jivanlal Sanghvi College of Engineering, where I am currently pursuing my B.Tech in Computer Science and Engineering (Data Science).
              </p>
              <p className="text-muted-foreground mb-4">
                I specialize in creating performant web applications using modern JavaScript frameworks while also implementing cutting-edge AI solutions. My goal is to bridge the gap between powerful backend systems and intuitive user experiences.
              </p>
            </motion.div>

            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  <Badge key={index} className="skill-badge mr-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              ref={educationRef}
              initial={{ opacity: 0, y: 20 }}
              animate={educationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <div className="timeline">
                {education.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-subtitle">{item.institution}</div>
                    <div className="timeline-description">{item.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            ref={avatarRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={avatarInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-8"
          >
            <div className="avatar-container bg-secondary/30 rounded-lg overflow-hidden h-[400px]">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0.5, 2]} />
                <ambientLight intensity={1.2} />
                <directionalLight 
                  position={[5, 5, 5]} 
                  intensity={1.5} 
                  castShadow 
                />
                <directionalLight 
                  position={[-5, 5, -5]} 
                  intensity={1} 
                />
                <pointLight 
                  position={[0, 2, 0]} 
                  intensity={1} 
                  distance={5}
                />
                <spotLight
                  position={[0, 5, 0]}
                  angle={0.5}
                  penumbra={0.5}
                  intensity={1}
                  castShadow
                />
                <AvatarModel />
                <OrbitControls 
                  enableZoom={false} 
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 2}
                />
                <fog attach="fog" args={['#ffffff', 5, 15]} />
              </Canvas>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">IEEE Member</h3>
                </div>
                <p className="text-muted-foreground">
                  Active member of the IEEE Computer Society, contributing to advancements in computing technology and participating in conferences and workshops.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}