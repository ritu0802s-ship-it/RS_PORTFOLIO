import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { STATS_DATA } from '../constants';

const InteractiveStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`group relative bg-white/5 border border-white/10 p-6 rounded-[2rem] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
              hoveredIdx === idx ? 'bg-white/10 border-ritu-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] -translate-y-1' : ''
            }`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-ritu-gold/5 rounded-[2rem] transition-opacity duration-700 pointer-events-none ${hoveredIdx === idx ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ritu-gold/80">
                  {stat.label}
                </span>
                <Info className={`w-3.5 h-3.5 text-ritu-gold/40 transition-all duration-500 ${hoveredIdx === idx ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} />
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl lg:text-4xl serif text-white transition-all duration-1000">
                  {isVisible ? (
                    <Counter value={stat.value} duration={2000} />
                  ) : '0'}
                </span>
                <span className="text-xl serif text-ritu-gold italic">{stat.suffix}</span>
              </div>

              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                {stat.subtext}
              </p>

              {/* Insight Text */}
              <div className={`mt-2 pt-4 border-t border-white/5 transition-all duration-500 overflow-hidden ${
                hoveredIdx === idx ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-[11px] text-gray-300 italic font-light leading-relaxed">
                  "{stat.insight}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counter: React.FC<{ value: number; duration: number }> = ({ value, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
};

export default InteractiveStats;