"use client";

import React, { useState, useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export function ModelViewer() {
  const [isHovered, setIsHovered] = useState(false);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    if (modelViewerRef.current) {
      // Get available animations
      const animations = modelViewerRef.current.availableAnimations;
      console.log('Available animations:', animations);
    }
  }, []);

  useEffect(() => {
    if (modelViewerRef.current && isHovered) {
      // Play greeting sequence
      modelViewerRef.current.play('Wave');
      setTimeout(() => {
        modelViewerRef.current.play('Smile');
      }, 2000);
      setTimeout(() => {
        modelViewerRef.current.play('Idle');
      }, 4000);
    } else if (modelViewerRef.current) {
      modelViewerRef.current.play('Idle');
    }
  }, [isHovered]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src="/models/67c85ee4b9756e8d9c7a8110.glb"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      tone-mapping="neutral"
      shadow-intensity="1"
      auto-rotate
      auto-rotate-delay={0}
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
      </div>
      <button slot="ar-button" id="ar-button">
        View in your space
      </button>
      <div id="ar-prompt">
        <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="AR prompt" />
      </div>
    </model-viewer>
  );
} 