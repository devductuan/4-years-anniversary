"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  gravity: number;
};

const COLORS = ["#ec4899", "#f472b6", "#fbbf24", "#fb7185", "#c084fc"];

export function FireworksAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let animationFrame = 0;
    let lastBurst = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const burst = () => {
      const originX = width * (0.55 + Math.random() * 0.4);
      const originY = height * (0.08 + Math.random() * 0.35);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const isHeart = Math.random() < 0.3;
      const count = isHeart ? 80 : 22;
      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count;
        const heartAngle = angle;
        const heartX = 16 * Math.sin(heartAngle) ** 3;
        const heartY =
          13 * Math.cos(heartAngle) -
          5 * Math.cos(2 * heartAngle) -
          2 * Math.cos(3 * heartAngle) -
          Math.cos(4 * heartAngle);
        const speed = 0.7 + Math.random() * 1.8;
        particles.push({
          x: originX,
          y: originY,
          vx: isHeart ? (heartX * 4.5) / 38 : Math.cos(angle) * speed,
          vy: isHeart ? (-heartY * 4.5) / 38 : Math.sin(angle) * speed,
          life: isHeart ? 42 : 38 + Math.random() * 20,
          color,
          gravity: isHeart ? 0 : 0.025,
        });
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (time - lastBurst > 450) {
        burst();
        lastBurst = time;
      }

      particles = particles.filter((particle) => particle.life > 0);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.life -= 1;
        context.globalAlpha = Math.min(particle.life / 22, 0.8);
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = particle.gravity === 0 ? 9 : 2;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.gravity === 0 ? 2.8 : 2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
