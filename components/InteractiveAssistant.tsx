import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Coffee, CheckCircle, Sparkles, Trophy, User, Zap, Heart, MessageCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

const InteractiveAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unlockStep, setUnlockStep] = useState<number>(0); // 0: Q1, 1: Q2, 2: Final/Chat
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("Steeping...");
  const [isPulsing, setIsPulsing] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const statuses = [
    "Steeping some Earl Grey...",
    "Reviewing brand propositions...",
    "Considering the sentiment...",
    "Drafting a sophisticated response...",
    "Consulting with Ritu's strategy map..."
  ];

  const getTimeBasedGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  useEffect(() => {
    const greeting = getTimeBasedGreeting();
    setMessages([{ 
      role: 'assistant', 
      content: `${greeting}! I'm Ritu's digital bestie. Before we talk strategy, let's get to know the vibe. First up: How are most good ideas actually formed?` 
    }]);

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [getTimeBasedGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, unlockStep, isTyping, isMinimized]);

  useEffect(() => {
    let interval: any;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  const q1Options = [
    { label: "A. In a long, structured meeting", value: "A" },
    { label: "B. During a solo brainstorming marathon", value: "B" },
    { label: "C. Exactly 5 minutes after the kettle boils", value: "C" },
    { label: "D. All of the above, but mostly C", value: "D" }
  ];

  const q2Options = [
    { label: "A. Perfect silence and productivity", value: "A" },
    { label: "B. Back-to-back status updates", value: "B" },
    { label: "C. Shared values and a proper cup of tea", value: "C" },
    { label: "D. High-fives, trust, and mutual respect", value: "D" }
  ];

  const handleQ1Selection = (option: typeof q1Options[0]) => {
    setIsPulsing(false); 
    setMessages(prev => [...prev, { role: 'user', content: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = "Spot on! Ritu believes that the best solutions often surface when the formal pressure is off. That's Unlock #1! ✨ Now, for the heart of the matter: What's the secret ingredient to a thriving work culture?";
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
      setUnlockStep(1);
    }, 1000);
  };

  const handleQ2Selection = (option: typeof q2Options[0]) => {
    setMessages(prev => [...prev, { role: 'user', content: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = "Exactly! It's that human connection that makes the strategy sing. ✅ Unlock #2 complete! You've officially earned 'The All-Rounder' badge. Now that we've settled the essentials, I'd love to show you how Ritu brings that same spirit to her work. What would you like to know about her experience?";
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
      setUnlockStep(2);
    }, 1200);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    
    const response = await getGeminiResponse(userMessage, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const handleClose = () => setIsMinimized(true);
  const handleExpand = () => setIsMinimized(false);

  if (!isOpen) return null;

  return (
    <div className={`fixed top-24 right-6 z-[150] origin-top-right transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isMinimized ? 'w-auto' : 'w-[350px] sm:w-[400px] animate-slide-up'} ${isPulsing && !isMinimized ? 'animate-pulse-glow scale-[1.01]' : ''}`}>
      {isMinimized ? (
        <button 
          onClick={handleExpand}
          className="group flex items-center gap-3 bg-ritu-green text-white p-3 pr-6 rounded-full shadow-2xl border border-ritu-gold/30 hover:bg-slate-800 transition-all active:scale-95 animate-fade-in gpu"
        >
          <div className="w-10 h-10 rounded-full bg-ritu-gold flex items-center justify-center font-bold text-ritu-green shadow-inner">R</div>
          <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Still here!</span>
        </button>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,61,46,0.2)] border border-ritu-gold/15 overflow-hidden flex flex-col h-[600px] relative gpu">
          <div className="p-7 bg-ritu-green text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-ritu-gold/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-ritu-gold flex items-center justify-center font-bold text-ritu-green text-lg shadow-inner relative z-20 transition-transform duration-500 group-hover:scale-110">R</div>
                {isPulsing && (
                  <div className="absolute inset-0 bg-ritu-gold/60 rounded-full animate-ping opacity-40 scale-125"></div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-ritu-green rounded-full shadow-sm z-30"></div>
              </div>
              <div>
                <h3 className="font-semibold text-base tracking-tight">Ritu's Concierge</h3>
                <div className="flex items-center gap-1.5 opacity-60">
                  <Heart className="w-2.5 h-2.5 text-ritu-gold" />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Your Digital Bestie</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleClose}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-7 space-y-6 bg-[#FDFBF7]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[88%]`}>
                  <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm transition-all duration-300 ${
                    m.role === 'user' 
                      ? 'bg-ritu-gold text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100/50 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                  {m.content.includes("'The All-Rounder' badge") && (
                    <div className="mt-3 flex items-center gap-2.5 bg-ritu-gold/10 px-4 py-2 rounded-full border border-ritu-gold/20 animate-bounce">
                      <Trophy className="w-3.5 h-3.5 text-ritu-gold" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-ritu-gold">Badge: All-Rounder</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {unlockStep === 0 && !isTyping && (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {q1Options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleQ1Selection(opt)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-ritu-gold hover:bg-ritu-gold/5 transition-all duration-300 text-xs font-bold text-slate-600 group flex items-center justify-between shadow-sm animate-slide-up"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-6 h-6 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-ritu-gold group-hover:text-white group-hover:border-ritu-gold transition-all duration-300 font-serif">{opt.value}</span>
                      <span className="group-hover:text-ritu-green transition-colors">{opt.label.split('. ')[1] || opt.label}</span>
                    </span>
                    <Zap className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-ritu-gold transition-all scale-75 group-hover:scale-100" />
                  </button>
                ))}
              </div>
            )}

            {unlockStep === 1 && !isTyping && (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {q2Options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleQ2Selection(opt)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-ritu-gold hover:bg-ritu-gold/5 transition-all duration-300 text-xs font-bold text-slate-600 group flex items-center justify-between shadow-sm animate-slide-up"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-6 h-6 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-ritu-gold group-hover:text-white group-hover:border-ritu-gold transition-all duration-300 font-serif">{opt.value}</span>
                      <span className="group-hover:text-ritu-green transition-colors">{opt.label.split('. ')[1] || opt.label}</span>
                    </span>
                    <Heart className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-ritu-gold transition-all scale-75 group-hover:scale-100" />
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start items-center gap-3">
                <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex flex-col gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-ritu-gold rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-ritu-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-ritu-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium italic animate-pulse">{typingStatus}</span>
                </div>
              </div>
            )}
          </div>

          <div className={`p-6 bg-white border-t border-slate-100/50 flex items-center space-x-3 transition-opacity duration-500 ${unlockStep < 2 ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
            <div className="flex-1 relative group">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={unlockStep < 2 ? "Unlock my secrets first..." : "Ask me anything..."}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-ritu-gold/20 focus:border-ritu-gold outline-none transition-all duration-300"
                disabled={unlockStep < 2}
              />
            </div>
            <button 
              onClick={handleSend} 
              disabled={unlockStep < 2 || isTyping || !input.trim()}
              className="w-12 h-12 bg-ritu-green text-white rounded-2xl flex items-center justify-center hover:bg-ritu-gold shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {!isMinimized && (
        <div className="absolute -top-3 right-12 w-5 h-5 bg-white rotate-45 border-l border-t border-ritu-gold/15 z-[149]"></div>
      )}
    </div>
  );
};

export default InteractiveAssistant;