import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="#home"
              className="text-xl font-bold font-code text-primary hover:text-accent transition-colors"
            >
              &lt;saumya.desai /&gt;
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6">
              <Link href="#home" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="#skills" className="text-sm hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="#contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            © {currentYear} Saumya Desai. All rights reserved. Built with{" "}
            <Heart className="h-4 w-4 mx-1 text-primary" /> using Next.js, Three.js & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
}