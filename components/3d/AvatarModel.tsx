"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";

interface AvatarModelProps {
  isWaving?: boolean;
}

export function AvatarModel({ isWaving = false }: AvatarModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/67c85ee4b9756e8d9c7a8110.glb");
  
  // Load all FBX animations
  const formalBow = useLoader(FBXLoader, "/animations/Formal-Bow.fbx");
  const shakingHands = useLoader(FBXLoader, "/animations/Shaking-Hands.fbx");
  const waveAnimation = useLoader(FBXLoader, "/animations/Waving.fbx");
  
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const animations = [formalBow, shakingHands, waveAnimation];
  
  useEffect(() => {
    if (group.current && animations.every(anim => anim)) {
      // Set up animations
      const mixer = new THREE.AnimationMixer(group.current);
      const actions = animations.map(anim => mixer.clipAction(anim.animations[0]));
      
      // Set up random animation cycling
      const cycleAnimations = () => {
        const nextAnimation = Math.floor(Math.random() * animations.length);
        actions.forEach((action, index) => {
          if (index === nextAnimation) {
            action.reset().play();
          } else {
            action.stop();
          }
        });
        setCurrentAnimation(nextAnimation);
      };

      // Initial animation
      cycleAnimations();

      // Cycle animations every 5-10 seconds
      const interval = setInterval(cycleAnimations, 3000 + Math.random() * 3000);

      // Update mixer on each frame
      const animate = () => {
        mixer.update(0.016); // Assuming 60fps
        requestAnimationFrame(animate);
      };
      animate();

      return () => {
        clearInterval(interval);
        actions.forEach(action => action.stop());
      };
    }
  }, [animations]);

  return (
    <group ref={group} position={[0, -1.70, 0]} scale={[1.3, 1.3, 1.3]}>
      <primitive object={scene} />
    </group>
  );
}