import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { Chat } from "@google/genai";

export const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm FemBot. How can I help you with your health today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session once on mount
    const session = createChatSession();
    setChatSession(session);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(chatSession, userMsg.text);

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
    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden h-[600px] flex flex-col max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-4 text-white flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Bot size={24} />
        </div>
        <div>
            <h2 className="font-bold text-lg">FemBot Assistant</h2>
            <p className="text-rose-100 text-xs">Powered by Gemini AI</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 flex items-start space-x-3 ${
                msg.role === 'user'
                  ? 'bg-rose-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
              }`}
            >
              <div className="mt-1 flex-shrink-0">
                  {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-2">
              <Loader2 className="animate-spin text-rose-500" size={16} />
              <span className="text-gray-500 text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your health, symptoms, or remedies..."
            className="flex-grow px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-gray-700"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          FemBot provides general information, not medical advice.
        </p>
      </div>
    </div>
  );
};
