import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, RotateCcw, BrainCircuit, Coffee, Star, Filter } from 'lucide-react';
import { TOOLS } from '../constants';
import { getToolSynergyInsight } from '../services/geminiService';

const ToolSynthesizer: React.FC = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [insight, setInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ['All', 'Strategy', 'Marketing', 'Management', 'Technical'];

  const filteredTools = activeFilter === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeFilter);

  const toggleTool = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter(t => t !== toolName));
      setInsight(null);
    } else if (selectedTools.length < 3) {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  const handleSynthesize = async () => {
    if (selectedTools.length !== 3) return;
    setIsGenerating(true);
    const result = await getToolSynergyInsight(selectedTools);
    setInsight(result);
    setIsGenerating(false);
  };

  const reset = () => {
    setSelectedTools([]);
    setInsight(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Synthesizer Display Area */}
      <div className="mb-12 p-8 bg-ritu-green rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,160,89,0.15),transparent_70%)]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-5 h-5 text-ritu-gold animate-pulse" />
            <span className="text-ritu-gold text-[10px] font-black uppercase tracking-[0.3em]">The Strategic Synthesizer</span>
          </div>
          
          <h3 className="text-white text-2xl serif mb-8">
            Select 3 tools to reveal their <span className="italic text-ritu-gold">strategic synergy.</span>
          </h3>

          <div className="flex gap-4 mb-8">
            {[0, 1, 2].map((slot) => (
              <div 
                key={slot}
                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-500 ${
                  selectedTools[slot] 
                    ? 'border-ritu-gold bg-ritu-gold/10 scale-105 shadow-[0_0_30px_rgba(197,160,89,0.2)]' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {selectedTools[slot] ? (
                  <>
                    <Zap className="w-4 h-4 text-ritu-gold mb-2 animate-bounce" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center px-2">
                      {selectedTools[slot]}
                    </span>
                  </>
                ) : (
                  <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Slot {slot + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSynthesize}
              disabled={selectedTools.length !== 3 || isGenerating}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                selectedTools.length === 3 
                  ? 'bg-ritu-gold text-ritu-green hover:scale-105 active:scale-95 shadow-xl shadow-ritu-gold/20' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {isGenerating ? 'Synthesizing...' : 'Generate Insight'}
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>
            
            {selectedTools.length > 0 && (
              <button 
                onClick={reset}
                className="p-3 rounded-full bg-white/5 text-white/50 hover:text-ritu-gold hover:bg-white/10 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {insight && (
          <div className="mt-10 p-8 bg-white/5 border border-ritu-gold/20 rounded-3xl animate-slide-up relative overflow-hidden group/insight">
            <div className="absolute top-0 left-0 w-1 h-full bg-ritu-gold"></div>
            <div className="flex items-start gap-5">
              <div className="p-3 bg-ritu-gold/20 rounded-2xl">
                <Coffee className="w-6 h-6 text-ritu-gold" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-ritu-gold mb-2 block">Synergy Unlock Complete</span>
                <p className="text-gray-300 text-sm leading-relaxed italic font-light">
                  "{insight}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Bar */}
      <div className="mb-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter by category</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-ritu-green text-white shadow-lg shadow-ritu-green/10 scale-105'
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-ritu-gold/40 hover:text-ritu-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTools.map((tool) => {
          const isSelected = selectedTools.includes(tool.name);
          return (
            <button
              key={tool.name}
              onClick={() => toggleTool(tool.name)}
              disabled={!isSelected && selectedTools.length >= 3}
              className={`group relative px-4 py-6 rounded-2xl border transition-all duration-500 text-center transform will-change-transform cubic-bezier(0.34, 1.56, 0.64, 1) animate-fade-in ${
                isSelected 
                  ? 'border-ritu-gold bg-white shadow-[0_15px_35px_-5px_rgba(197,160,89,0.3)] -translate-y-2 scale-105 ring-2 ring-ritu-gold/20' 
                  : 'border-slate-100 bg-white hover:border-ritu-gold/40 hover:shadow-md hover:scale-105 hover:-translate-y-1 hover:rotate-1 disabled:opacity-40 disabled:grayscale disabled:hover:scale-100 disabled:hover:rotate-0 disabled:hover:translate-y-0 active:scale-95'
              }`}
            >
              <div className={`mb-3 mx-auto w-2 h-2 rounded-full transition-all duration-500 ${isSelected ? 'bg-ritu-gold scale-150 animate-ping' : 'bg-slate-200 group-hover:bg-ritu-gold/60 group-hover:scale-150'}`}></div>
              
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${isSelected ? 'text-ritu-green' : 'text-slate-500 group-hover:text-ritu-green'}`}>
                  {tool.name}
                </span>
                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-wider group-hover:text-ritu-gold transition-colors">
                  {tool.category}
                </span>
              </div>

              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-ritu-gold text-white rounded-full p-1 shadow-lg animate-bounce z-20">
                  <Star className="w-3 h-3 fill-white" />
                </div>
              )}

              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-ritu-gold/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg] transition-all duration-1000 group-hover:left-[100%]"></div>
              </div>
              
              <div className={`absolute -inset-1 rounded-3xl bg-ritu-gold/5 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10`}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolSynthesizer;