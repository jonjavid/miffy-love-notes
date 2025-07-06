
import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-20"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            size={heart.size}
            className="text-heart-red heart-float"
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
