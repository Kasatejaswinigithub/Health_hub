
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, RefreshCw, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Do you experience brownish discharge before your cycle starts?" },
  { id: 2, text: "Are your menstrual periods generally regular (every 21-35 days)?" },
  { id: 3, text: "Do you experience severe, debilitating pain during your period?" },
  { id: 4, text: "Do you notice extreme bloating or digestive issues during your cycle?" },
  { id: 5, text: "Do you feel unusually lethargic, fatigued, or 'brain fogged'?" },
  { id: 6, text: "Have you noticed any sudden, unexplained weight changes recently?" },
  { id: 7, text: "Do you experience significant mood swings or emotional sensitivity?" }
];

interface HealthTestProps {
    onNavigateToDoctor: () => void;
    onNavigateToFun: () => void;
}

export const HealthTest: React.FC<HealthTestProps> = ({onNavigateToDoctor, onNavigateToFun}) => {
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

  const resetQuiz = () => {
    setCurrentIndex(0);
    setYesCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    let resultMessage = "";
    let resultColor = "";
    let resultIcon = null;

    if (yesCount > 4) {
      resultMessage = "Your symptoms suggest you might benefit from a clinical consultation to rule out any underlying hormonal imbalances.";
      resultColor = "bg-rose-50 border-rose-200 text-rose-900";
      resultIcon = <AlertCircle className="text-rose-500 w-12 h-12 mb-4" />;
    } else if (yesCount > 2) {
      resultMessage = "You're experiencing some standard symptoms. Monitoring your diet and prioritizing rest could help improve your comfort.";
      resultColor = "bg-yellow-50 border-yellow-200 text-yellow-900";
      resultIcon = <Sparkles className="text-yellow-500 w-12 h-12 mb-4" />;
    } else {
      resultMessage = "Your health profile looks great! Keep maintaining your current wellness routine.";
      resultColor = "bg-green-50 border-green-200 text-green-900";
      resultIcon = <CheckCircle className="text-green-500 w-12 h-12 mb-4" />;
    }

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center animate-fade-in border border-rose-50">
        <div className="flex flex-col items-center mb-6">
          {resultIcon}
          <h2 className="text-3xl font-black text-slate-800">Your Health Report</h2>
        </div>
        
        <div className={`p-8 rounded-2xl border ${resultColor} mb-8 shadow-inner`}>
            <p className="text-lg font-medium leading-relaxed">{resultMessage}</p>
        </div>
        
        <p className="text-gray-400 mb-10 text-sm">
          You responded "Yes" to {yesCount} out of {QUESTIONS.length} wellness indicators.
        </p>
        
        <div className="flex flex-col gap-4">
            {yesCount > 4 ? (
              <button 
                onClick={onNavigateToDoctor} 
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
              >
                Find a Specialist Near You <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={onNavigateToFun} 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
              >
                Explore the Fun Zone <Sparkles size={20} />
              </button>
            )}
            
            <button onClick={resetQuiz} className="flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors font-medium">
                <RefreshCw size={18} className="mr-2" /> Retake Symptom Test
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 min-h-[500px] flex flex-col justify-between animate-fade-in border border-rose-100">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-rose-500 font-bold tracking-widest uppercase text-xs">Symptom Checker</span>
            <h2 className="text-2xl font-black text-slate-800">Wellness Assessment</h2>
          </div>
          <div className="bg-rose-50 px-4 py-2 rounded-2xl text-rose-500 font-bold text-sm">
            {currentIndex + 1} / {QUESTIONS.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div 
                className="bg-rose-500 h-full transition-all duration-700 ease-out shadow-lg" 
                style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
        </div>
        
        <div className="py-12">
          <h3 className="text-3xl font-bold text-slate-800 leading-tight">
            {QUESTIONS[currentIndex].text}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer('yes')}
          className="group relative bg-rose-500 hover:bg-rose-600 text-white py-6 rounded-2xl font-black transition-all shadow-xl shadow-rose-200 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
        >
          <CheckCircle className="opacity-70 group-hover:scale-125 transition-transform" /> Yes, Frequently
        </button>
        <button
          onClick={() => handleAnswer('no')}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-6 rounded-2xl font-bold transition-all border-2 border-transparent hover:border-slate-300 active:scale-95"
        >
          No, Not Really
        </button>
      </div>
    </div>
  );
};
