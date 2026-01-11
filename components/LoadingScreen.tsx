import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-ritu-green flex flex-col items-center justify-center text-white">
      <div className="mb-8 overflow-hidden">
        <h1 className="text-4xl serif tracking-tighter animate-slide-up">
          Ritu - Portfolio<span className="text-ritu-gold">.</span>
        </h1>
      </div>
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-ritu-gold transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] uppercase tracking-[0.4em] font-bold text-ritu-gold/60">
        Defining Strategy
      </span>
    </div>
  );
};

export default LoadingScreen;