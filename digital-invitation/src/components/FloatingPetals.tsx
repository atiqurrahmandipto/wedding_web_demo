"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  color: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(244, 206, 216, 0.65)", // soft romantic blush
      "rgba(230, 200, 140, 0.55)", // champagne gold
      "rgba(255, 235, 220, 0.7)",  // warm peach petal
      "rgba(212, 175, 55, 0.45)",  // gold leaf
    ];

    const generated: Petal[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.35,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            left: `${petal.left}%`,
            top: "-5%",
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            backgroundColor: petal.color,
            borderRadius: "50% 10% 50% 50% / 50% 50% 10% 50%",
            boxShadow: `0 2px 10px ${petal.color}`,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotate}deg)`,
            animation: `fallPetal ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
