"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "RetailAI",
    description: "An AI-powered retail analytics platform that helps businesses optimize inventory and predict customer behavior.",
    longDescription: "Developed RetailAI, an AI-driven retail analytics platform that predicts customer preferences and optimizes store placements using machine learning. The system provides a real-time dashboard for tracking sales, orders, and average order value, along with outlet-wise performance analytics. It forecasts 30-day sales, maps high-demand areas for new outlets, analyzes competitor locations, and identifies optimal rental spaces. Additionally, it automates customer engagement by sending WhatsApp notifications about new store openings, enabling data-driven decision-making to maximize sales and improve customer targeting.",
    image: "/project-images/RetailAI.png",
    technologies: ["NextJs", "FastApi.js", "TailwindCss", "PostgreSQL"],
    github: "https://github.com/saumyadesai17/Datathon2025/",
    demo: "https://retailai.vercel.app/"
  },
  {
    id: 2,
    title: "SummifyAI",
    description: "An AI-powered study tool that summarizes handwritten and digital notes for students.",
    longDescription: "SummifyAI is an AI-powered tool designed to assist students with last-minute studying by summarizing handwritten and digital PDFs, YouTube videos, and recorded lectures. By leveraging cutting-edge artificial intelligence, SummifyAI allows students to quickly absorb essential information and improve their study efficiency. The project also includes interactive quizzes based on application-based case studies and analytics to track progress and provide personalized study recommendations.",
    image: "/project-images/SummifyAI.png",
    technologies: ["ReactJs", "TailwindCss", "Django", "React", "Docker"],
    github: "https://github.com/saumyadesai/summifyai",
    demo: "https://summifyai.demo.com"
  },
  {
    id: 3,
    title: "PlaceEase",
    description: "A career guidance platform that uses AI to recommend personalized upskilling opportunities.",
    longDescription: "Developed a platform to empower job seekers with personalized upskilling and career guidance using NLP, Cosine Similarity, and TFIDF. Integrated the Gemini-Pro chatbot via Langchain, offering features like project recommendations, resume-based career advice, DSA practice, and a doubt-solving chatbot.",
    image: "/project-images/PlaceEase.png",
    technologies: ["HTML", "CSS", "Javascript", "Flask", "Streamlit"],
    github: "https://github.com/saumyadesai17/PlacEase/",
    demo: "https://www.youtube.com/watch?v=Yz0cVw220Yg"
  },
  {
    id: 4,
    title: "Code Sync",
    description: "A real-time collaborative code editor with integrated version control and chat.",
    longDescription: "Code Sync is a powerful real-time collaborative code editor designed for remote development teams. It allows multiple developers to work on the same codebase simultaneously with instant synchronization. The platform features syntax highlighting for over 40 programming languages, integrated version control with Git, real-time chat and video conferencing, customizable themes and layouts, and automatic code linting and formatting. Code Sync also includes a robust permission system and detailed activity logs.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["ReactJs", "NodeJs", "Express", "Socket.io", "MongoDB"],
    github: "https://github.com/saumyadesai/codesync",
    demo: "https://codesync.demo.com"
  },
  // {
  //   id: 5,
  //   title: "HealthTrack",
  //   description: "A comprehensive health monitoring application with AI-powered insights and recommendations.",
  //   longDescription: "HealthTrack is an all-in-one health monitoring application that helps users track various aspects of their wellbeing including physical activity, nutrition, sleep patterns, and vital signs. The application uses artificial intelligence to analyze user data and provide personalized insights and recommendations. Key features include integration with wearable devices, customizable goals and reminders, detailed progress reports, and a secure health data vault that complies with HIPAA regulations.",
  //   image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   technologies: ["React", "GraphQL", "TensorFlow.js", "PostgreSQL", "AWS"],
  //   github: "https://github.com/saumyadesai/healthtrack",
  //   demo: "https://healthtrack.demo.com"
  // },
  // {
  //   id: 6,
  //   title: "EcoSmart",
  //   description: "An IoT platform for smart home energy management and environmental monitoring.",
  //   longDescription: "EcoSmart is an innovative IoT platform designed to help homeowners monitor and optimize their energy usage while reducing their environmental footprint. The system connects to various smart home devices and sensors to collect real-time data on electricity consumption, water usage, indoor air quality, and more. Using advanced analytics, EcoSmart provides actionable insights and automated routines to maximize energy efficiency. The platform includes a user-friendly dashboard, customizable alerts, historical usage trends, and integration with popular smart home ecosystems.",
  //   image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   technologies: ["React", "Node.js", "MQTT", "InfluxDB", "TensorFlow"],
  //   github: "https://github.com/saumyadesai/ecosmart",
  //   demo: "https://ecosmart.demo.com"
  // }
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="section bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          My Projects
        </motion.h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="masonry-grid mt-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              variants={item}
              className="project-card hover-effect"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="project-card-content">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, "_blank");
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.demo, "_blank");
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DialogDescription className="text-foreground mb-4">
                  {selectedProject.longDescription}
                </DialogDescription>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" asChild>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}