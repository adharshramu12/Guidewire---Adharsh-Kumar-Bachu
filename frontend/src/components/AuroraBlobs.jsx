import React from 'react';

/**
 * Animated aurora-like gradient blobs for atmospheric depth.
 * Place behind content with position: relative on the parent.
 */
export default function AuroraBlobs({ variant = 'default' }) {
  const configs = {
    default: [
      { color: 'rgba(16, 185, 129, 0.15)', size: 500, top: '-10%', left: '-5%', delay: '0s', duration: '18s' },
      { color: 'rgba(6, 182, 212, 0.12)', size: 450, top: '20%', right: '-10%', delay: '3s', duration: '22s' },
      { color: 'rgba(99, 102, 241, 0.10)', size: 400, bottom: '-5%', left: '30%', delay: '6s', duration: '20s' },
    ],
    hero: [
      { color: 'rgba(16, 185, 129, 0.18)', size: 600, top: '-20%', left: '-10%', delay: '0s', duration: '20s' },
      { color: 'rgba(6, 182, 212, 0.14)', size: 550, top: '10%', right: '-15%', delay: '4s', duration: '25s' },
      { color: 'rgba(99, 102, 241, 0.12)', size: 500, bottom: '-15%', left: '20%', delay: '8s', duration: '22s' },
      { color: 'rgba(78, 222, 163, 0.08)', size: 350, top: '50%', left: '60%', delay: '2s', duration: '16s' },
    ],
    subtle: [
      { color: 'rgba(16, 185, 129, 0.06)', size: 400, top: '-5%', left: '10%', delay: '0s', duration: '24s' },
      { color: 'rgba(6, 182, 212, 0.05)', size: 350, bottom: '10%', right: '5%', delay: '5s', duration: '28s' },
    ],
  };

  const blobs = configs[variant] || configs.default;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            animationDelay: blob.delay,
            animationDuration: blob.duration,
          }}
        />
      ))}
    </div>
  );
}
