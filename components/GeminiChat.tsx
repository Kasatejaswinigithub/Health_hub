
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGemini } from '../services/geminiService';

export const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hello! I'm FemBot. How can I assist you with your health today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const onSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const text = await chatWithGemini(userMsg.text);
    setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', text, timestamp: new Date() }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-fade-in">
      <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
        <div className="flex items-center space-x-5">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                <Bot size={32} />
            </div>
            <div>
                <h2 className="font-black text-2xl">FemBot AI</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Medical Assistant</span>
                </div>
            </div>
        </div>
        <Sparkles className="text-rose-500 opacity-50" size={32} />
      </div>

      <div className="flex-grow overflow-y-auto p-10 space-y-8 bg-slate-50/50 scrollbar-hide">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-[2.5rem] p-8 ${m.role === 'user' ? 'bg-rose-500 text-white rounded-tr-none' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'}`}>
              <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3">
                <Loader2 className="animate-spin text-rose-500" size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Processing...</span>
             </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-8 bg-white border-t border-slate-100">
        <div className="flex items-center gap-4 bg-slate-100 p-3 rounded-[2.5rem] border border-slate-200">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSend()} placeholder="Ask anything about wellness..." className="flex-grow px-6 py-4 bg-transparent outline-none text-slate-700 font-medium" disabled={loading} />
          <button onClick={onSend} disabled={loading || !input.trim()} className="bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-3xl transition-all shadow-lg active:scale-95 disabled:opacity-50">
            <Send size={24} />
          </button>
        </div>
        <div className="mt-4 flex justify-center items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <AlertCircle size={14} /> Not medical advice
        </div>
      </div>
    </div>
  );
};
