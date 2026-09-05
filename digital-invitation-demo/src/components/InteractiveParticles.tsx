"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  glow: number;
  sparkleSpeed: number;
  sparklePhase: number;
}

interface CursorTrail {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & velocity
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170,
      isMoving: false,
    };

    let moveTimeout: any;

    // Elegant gold, champagne & warm rose tones calibrated for white / ivory backgrounds
    const colors = [
      "197, 148, 45",   // Warm Rich Gold
      "180, 120, 20",   // Burnished Bronze
      "212, 160, 50",   // Sunlit Champagne
      "214, 130, 148",  // Rose Gold
      "166, 115, 30",   // Antique Gold
    ];

    // Background floating particles
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 13000), 110);

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.4 + 0.25;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        size: Math.random() * 2.6 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        glow: Math.random() * 8 + 4,
        sparkleSpeed: Math.random() * 0.04 + 0.015,
        sparklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive cursor sparkles trail
    const trails: CursorTrail[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 150);

      // Spawn stardust trails on cursor movement
      if (Math.random() < 0.65) {
        trails.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 2.8 + 1.5,
          alpha: 0.85,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.8,
          life: 0,
          maxLife: Math.random() * 25 + 20,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.isMoving = true;

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
          mouse.isMoving = false;
        }, 200);

        trails.push({
          x: touch.clientX,
          y: touch.clientY,
          size: Math.random() * 3 + 2,
          alpha: 0.85,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          life: 0,
          maxLife: 28,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Golden ripple bloom on click
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.2;
        const speed = Math.random() * 3.5 + 1.5;
        trails.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3.5 + 2,
          alpha: 0.95,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 30 + 25,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 1. Draw background interactive floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sparkle shimmer
        p.sparklePhase += p.sparkleSpeed;
        const shimmer = (Math.sin(p.sparklePhase) + 1) * 0.5;
        const currentAlpha = p.baseAlpha * (0.65 + shimmer * 0.5);

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse interaction: Magnetic attraction & displacement
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let activeAlpha = currentAlpha;
        let activeSize = p.size;

        if (dist < mouse.radius && mouse.x > 0 && mouse.y > 0) {
          const force = 1 - dist / mouse.radius;
          const angle = Math.atan2(dy, dx);

          const pushX = Math.cos(angle) * force * 3.5;
          const pushY = Math.sin(angle) * force * 3.5;
          const tangentX = -Math.sin(angle) * force * 1.5;
          const tangentY = Math.cos(angle) * force * 1.5;

          p.x += pushX + tangentX;
          p.y += pushY + tangentY;

          activeAlpha = Math.min(currentAlpha + force * 0.4, 0.95);
          activeSize = p.size + force * 2.0;

          // Connective constellation gold line to cursor
          if (dist < mouse.radius * 0.75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p.color}, ${force * 0.35})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, activeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${activeAlpha})`;
        ctx.shadowColor = `rgba(${p.color}, ${activeAlpha * 0.6})`;
        ctx.shadowBlur = p.glow;
        ctx.fill();

        // Starlight cross shine for larger particles
        if (activeSize > 2.8) {
          ctx.beginPath();
          ctx.moveTo(p.x - activeSize * 2, p.y);
          ctx.lineTo(p.x + activeSize * 2, p.y);
          ctx.moveTo(p.x, p.y - activeSize * 2);
          ctx.lineTo(p.x, p.y + activeSize * 2);
          ctx.strokeStyle = `rgba(${p.color}, ${activeAlpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Draw & Update cursor trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life++;
        t.x += t.vx;
        t.y += t.vy;
        t.vy += 0.03;
        t.vx *= 0.96;

        const progress = t.life / t.maxLife;
        const trailAlpha = (1 - progress) * t.alpha;

        if (progress >= 1) {
          trails.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size * (1 - progress * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${t.color}, ${trailAlpha})`;
        ctx.shadowColor = `rgba(${t.color}, ${trailAlpha * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      clearTimeout(moveTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
