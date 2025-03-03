"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart);
      link.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart);
        link.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : linkHovered ? 1.5 : 1})`,
    backgroundColor: `hsl(var(${linkHovered ? "--primary" : "--accent"}))`,
  };

  const glowStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <>
      <div className="custom-cursor" style={cursorStyle}></div>
      <div className="cursor-glow" style={glowStyle}></div>
    </>
  );
}