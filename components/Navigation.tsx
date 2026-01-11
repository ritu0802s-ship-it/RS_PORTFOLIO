import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise', delay: '100ms' },
    { name: 'About', href: '#about', delay: '200ms' },
    { name: 'Experience', href: '#experience', delay: '300ms' },
    { name: 'Values', href: '#values', delay: '400ms' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 animate-slide-down ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl serif font-bold tracking-tighter hover:scale-105 transition-transform duration-300 ease-out will-change-transform">
          Ritu<span className="text-ritu-gold">.</span>
        </a>
        <div className="hidden md:flex space-x-6 items-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="px-4 py-2 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:text-ritu-green hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] animate-fade-in opacity-0 will-change-transform" 
              style={{ animationDelay: link.delay }}
            >
              {link.name}
            </a>
          ))}
        </div>
        <a 
          href="mailto:rs.in@hotmail.com" 
          className="bg-ritu-green text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-ritu-gold hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in opacity-0 active:scale-95 will-change-transform" 
          style={{ animationDelay: '500ms' }}
        >
          Connect
        </a>
      </div>
    </nav>
  );
};

export default Navigation;