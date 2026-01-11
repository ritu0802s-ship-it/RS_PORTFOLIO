import React, { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

interface ExpertiseCardProps {
  item: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    bestieInsight: string;
  };
  addToRefs: (el: HTMLDivElement | null) => void;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ item, addToRefs }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={addToRefs} 
      className="reveal relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-full p-8 border rounded-[2rem] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) group bg-[#FDFBF7] relative z-10 overflow-hidden will-change-transform ${
        isHovered 
          ? 'border-ritu-gold shadow-[0_25px_60px_-15px_rgba(197,160,89,0.15)] -translate-y-2 scale-[1.01] ring-1 ring-ritu-gold/10' 
          : 'border-slate-100 shadow-sm'
      }`}>
        
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-ritu-gold/5 rounded-full blur-3xl transition-all duration-1000 ease-out will-change-transform ${isHovered ? 'scale-[2.5] opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ritu-gold/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="relative z-20">
          <div className={`mb-6 text-ritu-green transition-all duration-500 ease-out ${isHovered ? 'scale-110 text-ritu-gold' : ''}`}>
            {item.icon}
          </div>
          <h3 className={`text-xl font-bold mb-4 serif tracking-tight transition-colors duration-500 ${isHovered ? 'text-ritu-green' : 'text-slate-800'}`}>
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 font-sans font-medium">
            {item.desc}
          </p>
        </div>

        <div className={`mt-6 flex items-center gap-2 transition-all duration-500 ease-out will-change-transform ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          <Sparkles className="w-3.5 h-3.5 text-ritu-gold animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-ritu-gold">Strategic Depth</span>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 skew-x-12 transition-transform duration-1000 pointer-events-none will-change-transform ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
      </div>

      {/* Optimized Tooltip with faster easing */}
      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full w-full max-w-[280px] z-50 transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none will-change-transform ${
        isHovered ? 'opacity-100 translate-y-[-10px] scale-100' : 'opacity-0 translate-y-0 scale-95'
      }`}>
        <div className="bg-ritu-green text-white p-5 rounded-[1.5rem] shadow-2xl border border-ritu-gold/30 relative backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-ritu-gold/20 rounded-xl flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-ritu-gold" />
            </div>
            <p className="text-[12px] italic leading-relaxed font-light text-slate-100 font-sans">
              "{item.bestieInsight}"
            </p>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ritu-green rotate-45 border-r border-b border-ritu-gold/30"></div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseCard;