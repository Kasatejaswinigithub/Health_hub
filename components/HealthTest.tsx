
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, RefreshCw, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Do you experience brownish discharge before your cycle starts?" },
  { id: 2, text: "Are your periods generally regular (every 21-35 days)?" },
  { id: 3, text: "Do you experience severe, debilitating pain during your period?" },
  { id: 4, text: "Do you notice extreme bloating during your cycle?" },
  { id: 5, text: "Do you feel unusually lethargic or experience 'brain fog'?" },
  { id: 6, text: "Have you noticed sudden weight changes recently?" },
  { id: 7, text: "Do you experience significant mood swings?" }
];

interface HealthTestProps {
  onNavigateToDoctor: () => void;
  onNavigateToFun: () => void;
}

export const HealthTest: React.FC<HealthTestProps> = ({ onNavigateToDoctor, onNavigateToFun }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (answer === 'yes') setYesCount(prev => prev + 1);
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    let result = { msg: "", col: "", ico: null };
    if (yesCount > 4) {
      result = { msg: "We suggest consulting a specialist to rule out hormonal imbalances.", col: "bg-rose-50 border-rose-200 text-rose-900", ico: <AlertCircle className="text-rose-500 w-16 h-16 mb-6" /> };
    } else if (yesCount > 2) {
      result = { msg: "You have common symptoms. Better nutrition and rest could help.", col: "bg-amber-50 border-amber-200 text-amber-900", ico: <Sparkles className="text-amber-500 w-16 h-16 mb-6" /> };
    } else {
      result = { msg: "Your wellness profile looks excellent! Keep it up.", col: "bg-emerald-50 border-emerald-200 text-emerald-900", ico: <CheckCircle className="text-emerald-500 w-16 h-16 mb-6" /> };
    }

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-slate-100 animate-fade-in">
        <div className="flex flex-col items-center">
          {result.ico}
          <h2 className="text-4xl font-black text-slate-800 mb-6">Report Ready</h2>
        </div>
        <div className={`p-10 rounded-3xl border ${result.col} mb-10 shadow-inner`}>
            <p className="text-xl font-bold leading-relaxed">{result.msg}</p>
        </div>
        <div className="flex flex-col gap-4">
            <button onClick={yesCount > 4 ? onNavigateToDoctor : onNavigateToFun} className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-2xl font-black shadow-xl transition-all flex items-center justify-center gap-3">
              {yesCount > 4 ? "Find a Specialist" : "Visit Zen Zone"} <ChevronRight size={20} />
            </button>
            <button onClick={() => { setCurrentIndex(0); setYesCount(0); setIsFinished(false); }} className="text-slate-400 hover:text-rose-500 font-bold text-sm flex items-center justify-center gap-2 mt-4">
              <RefreshCw size={18} /> Retake Test
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3.5rem] shadow-2xl p-12 min-h-[550px] flex flex-col justify-between border border-slate-100 animate-fade-in">
      <div>
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-rose-500 font-black tracking-widest uppercase text-xs">Wellness Check</span>
            <h2 className="text-3xl font-black text-slate-800">Assessment</h2>
          </div>
          <div className="bg-rose-50 px-6 py-3 rounded-2xl text-rose-600 font-black text-sm">
            {currentIndex + 1} / {QUESTIONS.length}
          </div>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-12">
            <div className="bg-rose-500 h-full transition-all duration-700 shadow-lg" style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}></div>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
          {QUESTIONS[currentIndex].text}
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={() => handleAnswer('yes')} className="bg-rose-500 hover:bg-rose-600 text-white py-6 rounded-3xl font-black shadow-xl shadow-rose-200 transition-all active:scale-95">
          Yes, Regularly
        </button>
        <button onClick={() => handleAnswer('no')} className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-6 rounded-3xl font-black transition-all active:scale-95">
          No, Rarely
        </button>
      </div>
    </div>
  );
};
