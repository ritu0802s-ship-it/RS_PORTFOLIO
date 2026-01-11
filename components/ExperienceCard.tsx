import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

interface ExperienceCardProps {
  exp: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group/exp h-fit">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative bg-white border transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer overflow-hidden rounded-[2rem] ${
          isExpanded 
            ? 'border-ritu-gold ring-1 ring-ritu-gold/20 shadow-[0_25px_60px_-15px_rgba(197,160,89,0.15)] scale-[1.01]' 
            : 'border-white/10 shadow-sm hover:shadow-[0_25px_60px_-15px_rgba(197,160,89,0.15)] hover:-translate-y-2 hover:scale-[1.02] hover:ring-1 hover:ring-ritu-gold/10'
        }`}
      >
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-ritu-gold/5 rounded-full blur-3xl transition-opacity duration-1000 opacity-0 group-hover/exp:opacity-100"></div>

        <div className={`p-8 transition-colors duration-300 ${isExpanded ? 'bg-ritu-gold/5' : 'bg-white'}`}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-ritu-green font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-1.5">
                  <span className="company-highlight">{exp.company}</span>
                  <ExternalLink className="w-3 h-3 opacity-40" />
                </p>
                <h3 className="text-xl md:text-2xl serif leading-tight transition-colors duration-300 group-hover/exp:text-ritu-green">
                  {exp.role}
                </h3>
              </div>
              <div className={`p-2.5 rounded-full transition-all duration-300 ${isExpanded ? 'bg-ritu-gold text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover/exp:text-ritu-gold'}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-ritu-gold font-bold tracking-widest uppercase text-[9px] bg-ritu-gold/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                {exp.period}
              </span>
              {!isExpanded && (
                <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover/exp:opacity-100 transition-opacity">
                  <Briefcase className="w-3 h-3" />
                  <span>Strategic Impact</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[1200px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-8 space-y-8 bg-white relative z-10">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ritu-gold">Overview</h4>
              <p className="text-slate-600 leading-relaxed font-medium text-[14px]">
                {exp.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ritu-gold">Core Impact</h4>
              <ul className="space-y-4">
                {exp.highlights.map((item, hIdx) => (
                  <li 
                    key={hIdx} 
                    className="flex items-start space-x-4 group/item cursor-default"
                  >
                    <div className="mt-1 flex-shrink-0 transition-all duration-500 ease-out transform group-hover/item:scale-110">
                      <div className="w-6 h-6 rounded-full bg-ritu-green/5 flex items-center justify-center transition-all duration-500 group-hover/item:bg-ritu-gold group-hover/item:shadow-[0_4px_12px_rgba(197,160,89,0.2)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ritu-green group-hover/item:text-white transition-colors duration-500" />
                      </div>
                    </div>
                    <span className="text-[13px] text-slate-500 font-medium transition-all duration-500 leading-relaxed group-hover/item:text-ritu-green group-hover/item:translate-x-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 skew-x-12 transition-transform duration-1000 pointer-events-none -translate-x-full group-hover/exp:translate-x-full"></div>
        
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-ritu-gold transition-transform duration-700 origin-left ${isExpanded ? 'scale-x-100' : 'scale-x-0'}`}></div>
      </div>
    </div>
  );
};

export default ExperienceCard;