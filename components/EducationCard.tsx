import React, { useState } from 'react';
import { GraduationCap, Award, Lightbulb, Sparkles } from 'lucide-react';

interface Education {
  year: string;
  title: string;
  institution: string;
  type?: string;
  desc?: string;
  bestieInsight?: string;
}

interface EducationCardProps {
  edu: Education;
  index: number;
  addToRefs: (el: HTMLDivElement | null) => void;
}

const EducationCard: React.FC<EducationCardProps> = ({ edu, addToRefs }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDegree = edu.title.toLowerCase().includes('ma') || edu.title.toLowerCase().includes('degree');

  return (
    <div 
      ref={addToRefs} 
      className="reveal relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-full p-8 border rounded-[2rem] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) group bg-[#FDFBF7] relative z-10 overflow-hidden ${
        isHovered 
          ? 'border-ritu-gold shadow-[0_25px_60px_-15px_rgba(197,160,89,0.15)] -translate-y-2 scale-[1.02] ring-1 ring-ritu-gold/10' 
          : 'border-slate-100 shadow-sm'
      }`}>
        
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-ritu-gold/5 rounded-full blur-3xl transition-all duration-1000 ${isHovered ? 'scale-[2.5] opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ritu-gold/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="relative z-20">
          <div className={`mb-6 text-ritu-green transition-all duration-500 flex items-center justify-between ${isHovered ? 'scale-110 text-ritu-gold' : ''}`}>
            {isDegree ? <GraduationCap size={32} /> : <Award size={32} />}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-ritu-gold transition-colors">{edu.year}</span>
          </div>
          
          <h3 className={`text-lg font-bold mb-2 serif tracking-tight leading-tight transition-colors duration-500 ${isHovered ? 'text-ritu-green' : 'text-slate-800'}`}>
            {edu.title}
          </h3>
          
          <p className="text-[10px] font-black uppercase tracking-widest text-ritu-gold mb-4 font-sans">
            {edu.institution}
          </p>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-4 font-sans font-medium">
            {edu.desc || "Professional development focused on strategic marketing impact and team leadership."}
          </p>
        </div>

        <div className={`mt-auto flex items-center gap-2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          <Sparkles className="w-3.5 h-3.5 text-ritu-gold animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-ritu-gold">{edu.type || "Professional"} Growth</span>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 skew-x-12 transition-transform duration-1000 pointer-events-none ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
      </div>

      {edu.bestieInsight && (
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full w-full max-w-[280px] z-50 transition-all duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-[-12px] scale-100' : 'opacity-0 translate-y-0 scale-90'
        }`}>
          <div className="bg-ritu-green text-white p-5 rounded-3xl shadow-2xl border border-ritu-gold/30 relative backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-ritu-gold/20 rounded-xl flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-ritu-gold" />
              </div>
              <p className="text-[12px] italic leading-relaxed font-light text-slate-100 font-sans">
                "{edu.bestieInsight}"
              </p>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ritu-green rotate-45 border-r border-b border-ritu-gold/30"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCard;