import React, { useRef, useEffect } from 'react';

export default function ParticleCanvas({ particleCount = 120, color = 'rgba(78, 222, 163, 0.4)', lineColor = 'rgba(78, 222, 163, 0.06)', maxDist = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Create particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w();
        if (p.x > w()) p.x = 0;
        if (p.y < 0) p.y = h();
        if (p.y > h()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, color, lineColor, maxDist]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
