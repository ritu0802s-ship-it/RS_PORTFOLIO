import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 left-8 z-[90] transition-all duration-500 transform ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-ritu-green text-ritu-gold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-ritu-gold/20"
      >
        <div className="absolute inset-0 rounded-full border border-ritu-gold/20 group-hover:border-ritu-gold/40 transition-colors"></div>
        <ChevronUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </div>
  );
};

export default ScrollToTop;