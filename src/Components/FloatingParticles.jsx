import React, { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
          color: ['purple', 'pink', 'blue', 'emerald', 'indigo'][Math.floor(Math.random() * 5)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full opacity-30 animate-float`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `var(--${particle.color}-400)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent)`
          }}
        />
      ))}
      
      {/* Additional magical elements */}
      <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-float" style={{animationDuration: '4s'}}>
        ✨
      </div>
      <div className="absolute top-3/4 right-1/4 text-3xl opacity-20 animate-float" style={{animationDuration: '5s', animationDelay: '1s'}}>
        🌟
      </div>
      <div className="absolute top-1/2 left-3/4 text-2xl opacity-20 animate-float" style={{animationDuration: '3s', animationDelay: '2s'}}>
        💫
      </div>
      <div className="absolute bottom-1/4 left-1/2 text-3xl opacity-20 animate-float" style={{animationDuration: '6s'}}>
        🌸
      </div>
    </div>
  );
};

export default FloatingParticles;