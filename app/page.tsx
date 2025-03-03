"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { CustomCursor } from "@/components/custom-cursor";
import { ParticlesBackground } from "@/components/particles-background";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-4xl font-bold font-code text-primary">
          <span className="inline-block animate-pulse">&lt;</span>
          <span className="inline-block">Loading</span>
          <span className="inline-block animate-pulse">/&gt;</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <CustomCursor />
      <ParticlesBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}