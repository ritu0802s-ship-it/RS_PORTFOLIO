
import React, { forwardRef } from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(({ className = "" }, ref) => {
  return (
    <div ref={ref} className={`max-w-7xl mx-auto px-6 py-2 flex items-center justify-center reveal ${className}`}>
      <div className="divider-line w-full flex items-center justify-center py-2 relative">
        <div className="w-1.5 h-1.5 rounded-full bg-ritu-gold/60 relative z-10"></div>
      </div>
    </div>
  );
});

SectionDivider.displayName = 'SectionDivider';

export default SectionDivider;
