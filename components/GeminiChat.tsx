
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGemini } from '../services/geminiService';

export const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm FemBot, your personal health companion. I'm here to answer your questions about menstrual cycles, nutrition, or general wellness. How can I support you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await chatWithGemini(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-rose-100 overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Bot size={28} />
            </div>
            <div>
                <h2 className="font-black text-xl">FemBot Assistant</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-rose-100 text-xs font-bold uppercase tracking-widest">Active Intelligence</span>
                </div>
            </div>
        </div>
        <Sparkles className="text-white/40" />
      </div>

      <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50/50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-[2rem] px-6 py-4 flex flex-col ${
                msg.role === 'user'
                  ? 'bg-rose-500 text-white rounded-tr-none shadow-lg shadow-rose-200'
                  : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] font-bold uppercase tracking-widest">
                  {msg.role === 'user' ? <UserIcon size={12} /> : <Bot size={12} />}
                  <span>{msg.role === 'user' ? 'You' : 'FemBot'}</span>
              </div>
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-slate-100 rounded-[2rem] rounded-tl-none px-6 py-4 shadow-sm flex items-center space-x-3">
              <Loader2 className="animate-spin text-rose-500" size={18} />
              <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">Analyzing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-[2rem] border border-slate-100 focus-within:ring-4 focus-within:ring-rose-100 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="How can I help you today?"
            className="flex-grow px-6 py-4 bg-transparent focus:outline-none text-slate-700 font-medium placeholder:text-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-[1.5rem] transition-all disabled:opacity-50 shadow-lg shadow-rose-200"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-slate-400">
           <AlertCircle size={14} />
           <p className="text-[10px] font-bold uppercase tracking-widest">
             Not medical advice • Information for educational purposes only
           </p>
        </div>
      </div>
    </div>
  );
};
