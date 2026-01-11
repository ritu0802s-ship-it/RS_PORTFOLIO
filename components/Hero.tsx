import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  // Optimized ascent: Directly maps scroll position to altitude and attitude
  const launchX = scrollY * 0.4; 
  const launchY = -scrollY * 16; 
  const launchRotate = scrollY * 1.5; 
  const launchOpacity = Math.max(0, 1 - scrollY / 550);

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center px-6 pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <h1 className="text-6xl md:text-8xl lg:text-[8rem] xl:text-[9rem] serif leading-[0.85] tracking-tighter mb-6 animate-slide-up opacity-0">
          Digital <br />
          <span className="italic text-ritu-green ml-0 md:ml-24">Marketing &</span> <br />
          Project Lead 
          <span 
            className="relative inline-block will-change-transform gpu"
            style={{ 
              transform: `translate3d(${launchX}px, ${launchY}px, 0) rotate(${launchRotate}deg)`,
              opacity: launchOpacity
            }}
          >
            {/* Dynamic engine smoke puffs when launching */}
            {scrollY > 15 && (
              <div className="absolute top-[85%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="w-5 h-5 bg-ritu-gold/30 rounded-full blur-md animate-smoke-puff" style={{ animationDelay: '0s' }}></div>
                <div className="w-8 h-8 bg-slate-400/10 rounded-full blur-lg animate-smoke-puff" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-ritu-gold/15 rounded-full blur-sm animate-smoke-puff" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            
            <span className="inline-block animate-rocket-float hover:animate-rocket-launch cursor-pointer transition-transform duration-500 active:scale-150 relative z-10">
              🚀
            </span>
          </span>
        </h1>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ArrowDown className="w-6 h-6 text-ritu-gold" />
      </div>
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-ritu-gold/5 rounded-full blur-[140px] pointer-events-none -z-0 gpu"></div>
    </section>
  );
};

export default Hero;