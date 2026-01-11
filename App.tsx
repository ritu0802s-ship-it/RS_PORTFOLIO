import React, { useEffect, useRef, useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import InteractiveAssistant from './components/InteractiveAssistant';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import SectionDivider from './components/SectionDivider';
import ToolSynthesizer from './components/ToolSynthesizer';
import ExperienceCard from './components/ExperienceCard';
import ExpertiseCard from './components/ExpertiseCard';
import EducationCard from './components/EducationCard';
import { EXPERTISE_CARDS, EXPERIENCES, VALUES, EDUCATION } from './constants';
import { Linkedin, Mail, Coffee, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target === aboutSectionRef.current) {
              setAboutInView(true);
            }
          } else {
            if (entry.target === aboutSectionRef.current) {
              setAboutInView(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial values
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
    setShine({ x: x * 100, y: y * 100 });
  };

  const taglineOpacity = useMemo(() => {
    const footerThreshold = documentHeight - windowHeight - 200;
    if (scrollY <= footerThreshold) return 0;
    return Math.min(1, (scrollY - footerThreshold) / 150);
  }, [scrollY, documentHeight, windowHeight]);

  const aboutOffset = aboutSectionRef.current?.offsetTop || 0;
  const aboutScrollProgress = Math.max(0, scrollY - aboutOffset + (windowHeight / 2));

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-content-entry">
          <Navigation />
          
          <main>
            <Hero scrollY={scrollY} />

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* About / Narrative */}
            <section 
              id="about" 
              ref={(el) => {
                aboutSectionRef.current = el;
                addToRefs(el);
              }}
              className="py-10 bg-ritu-green text-white overflow-hidden relative group/about reveal"
            >
              <div 
                className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-ritu-gold/5 rounded-full blur-[160px] pointer-events-none will-change-transform animate-soft-pulse gpu" 
                style={{ transform: `translate3d(0, ${aboutScrollProgress * 0.05}px, 0)` }}
              ></div>
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ritu-gold/10 rounded-full blur-[120px] pointer-events-none will-change-transform gpu" 
                style={{ transform: `translate3d(${-50 + aboutScrollProgress * 0.02}px, ${-50 + aboutScrollProgress * 0.1}px, 0)` }}
              ></div>
              <div 
                className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] bg-white/5 rounded-full blur-[110px] pointer-events-none transition-transform duration-75 ease-out will-change-transform gpu" 
                style={{ transform: `translate3d(0, ${aboutScrollProgress * -0.15}px, 0)` }}
              ></div>

              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
                <div 
                  className={`relative group mx-auto md:mx-0 max-w-[360px] w-full cursor-pointer transition-all duration-1000 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  style={{ perspective: '1000px' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-ritu-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  {/* Photo Wrapper with prominence pulse and reveal animations */}
                  <div 
                    className={`relative z-20 overflow-hidden bg-ritu-green aspect-square shadow-2xl border border-white/10 transition-transform duration-300 ease-out rounded-[2rem] gpu ${aboutInView ? 'animate-photo-reveal' : 'opacity-0'}`} 
                    style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
                  >
                    <div className={`w-full h-full ${aboutInView ? 'animate-prominence-pulse' : ''}`}>
                       <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,1) 0%, transparent 80%)` }}></div>
                      
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D4E03AQGw62c947LBqg/profile-displayphoto-crop_800_800/B4EZueyhyjLUAI-/0/1767895604943?e=1769644800&v=beta&t=MVdJWxcECJ-dWNyto6FUnvTU488da-A20gqo781wHEs"
                        alt="Ritu Singh"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ease-out will-change-transform"
                        style={{ 
                          transform: `scale(1.05) translate3d(0, ${aboutScrollProgress * -0.05}px, 0)`,
                          filter: 'contrast(1.05) brightness(1.02)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative z-20">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block font-sans">My Approach</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl serif leading-[1.1]">
                    <span>Hi, I’m Ritu.</span>
                    <span className="italic text-ritu-gold block mt-1 text-xl md:text-2xl">welcome to my corner of the internet.</span>
                  </h2>
                  <div className="space-y-3 text-gray-300 text-sm font-light leading-relaxed font-sans mt-4">
                    <p>I’ve spent my career shaping customer journeys, analysing campaigns and bringing brand purpose to life across digital channels. I love simplifying the complex, collaborating with brilliant teams and creating communication that feels honest, warm and genuinely useful.</p>
                  </div>
                </div>
              </div>
            </section>

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* Expertise */}
            <section id="expertise" className="py-6 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-4 max-w-xl">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-sans">Core Capabilities</span>
                  <h2 className="text-2xl md:text-3xl serif leading-tight">Strategic Intelligence, <span className="text-ritu-gold italic">Measured Impact.</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {EXPERTISE_CARDS.map((item, idx) => (
                    <ExpertiseCard key={idx} item={item} addToRefs={addToRefs} />
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* Experience */}
            <section id="experience" className="py-8 bg-ritu-green relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-6 max-w-xl">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-sans">The Timeline</span>
                  <h2 className="text-2xl md:text-3xl serif leading-tight text-white">Career <span className="text-ritu-gold italic">Experience.</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EXPERIENCES.map((exp, idx) => (
                    <ExperienceCard key={idx} exp={exp} />
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* Education */}
            <section id="education" className="py-6 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-4 max-w-xl">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-sans">Academic & Professional</span>
                  <h2 className="text-2xl md:text-3xl serif leading-tight text-slate-900">Credentials & <span className="text-ritu-gold italic">Development.</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EDUCATION.map((edu, idx) => (
                    <EducationCard key={idx} edu={edu} index={idx} addToRefs={addToRefs} />
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* Values */}
            <section id="values" className="py-8 bg-ritu-green text-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-6 text-center">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-sans">Community & Connection</span>
                  <h2 className="text-2xl md:text-3xl serif text-white">Human Centered <span className="text-ritu-gold italic">Leadership.</span></h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {VALUES.map((val, idx) => (
                    <div key={idx} ref={addToRefs} className="reveal group bg-white/5 border border-white/10 p-5 rounded-[1.5rem] transition-all duration-500 hover:bg-white/10 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-ritu-gold/30">
                      <div className="p-2.5 bg-ritu-gold/10 rounded-full w-fit mb-3 group-hover:bg-ritu-gold/20 transition-all duration-300">
                        <Sparkles className="w-4 h-4 text-ritu-gold" />
                      </div>
                      <h3 className="text-lg serif mb-2 group-hover:text-ritu-gold transition-colors duration-300">{val.title}</h3>
                      <p className="text-gray-400 font-light text-[13px] leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-sans">{val.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider ref={addToRefs} className="!py-0" />

            {/* Tool synthesizer */}
            <section id="skills" className="py-8 bg-[#FDFBF7]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-6 text-center">
                  <span className="text-ritu-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-sans">The Toolbox</span>
                  <h2 className="text-2xl md:text-3xl serif text-slate-900">Technical <span className="text-ritu-gold italic">Stack.</span></h2>
                </div>
                <ToolSynthesizer />
              </div>
            </section>

            <section id="contact" className="py-10 bg-white text-center">
              <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl serif mb-4">Let's build <span className="text-ritu-gold italic">something great.</span></h2>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <a href="mailto:rs.in@hotmail.com" className="flex items-center gap-2.5 px-6 py-3 bg-ritu-green text-white rounded-full font-bold uppercase tracking-widest hover:bg-ritu-gold transition-all duration-300 font-sans text-[10px] shadow-lg active:scale-95">
                    <Mail className="w-4 h-4" />
                    Email Me
                  </a>
                  <a href="https://www.linkedin.com/in/ritusi0802/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-3 border border-slate-200 rounded-full font-bold uppercase tracking-widest hover:border-ritu-gold transition-all duration-300 text-slate-600 font-sans text-[10px] active:scale-95">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </section>
          </main>

          <footer className="py-6 border-t border-slate-100 bg-[#FDFBF7]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xl serif font-bold">Ritu<span className="text-ritu-gold">.</span></div>
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 font-sans">
                &copy; {new Date().getFullYear()} Ritu
              </div>
              <div 
                className="flex items-center gap-2 text-ritu-green relative transition-opacity duration-700 ease-in-out will-change-opacity"
                style={{ opacity: taglineOpacity }}
              >
                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                    <div className="w-0.5 h-3 bg-ritu-gold/40 rounded-full animate-steam" style={{ animationDelay: '0s' }}></div>
                    <div className="w-0.5 h-4 bg-ritu-gold/40 rounded-full animate-steam" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-0.5 h-3 bg-ritu-gold/40 rounded-full animate-steam" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                  <Coffee className="w-4 h-4 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[10px] font-serif italic font-sans whitespace-nowrap">Sip, brainstorm, create. Repeat.</span>
              </div>
            </div>
          </footer>

          <InteractiveAssistant />
          <ScrollToTop />
        </div>
      )}
    </div>
  );
};

export default App;