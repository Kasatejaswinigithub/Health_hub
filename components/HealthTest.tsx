import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, AlertTriangle, PlayCircle, RefreshCw } from 'lucide-react';

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Do you have a brownish discharge before your period starts?" },
  { id: 2, text: "Do your menstrual periods occur regularly?" },
  { id: 3, text: "Do you use tobacco products?" },
  { id: 4, text: "Do you experience severe pain with your period?" },
  { id: 5, text: "Do you experience extreme bloating during your periods?" },
  { id: 6, text: "Do you feel unusually lethargic or fatigued?" },
  { id: 7, text: "Have you experienced sudden weight changes recently?" }
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
    if (answer === 'yes') {
      setYesCount(prev => prev + 1);
    }

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
    let ActionComponent = null;

    if (yesCount > 4) {
      resultMessage = "You have reported several symptoms. It might be beneficial to consult a specialist.";
      resultColor = "text-red-600 bg-red-50 border-red-200";
      ActionComponent = (
        <button onClick={onNavigateToDoctor} className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition">
            Find a Doctor
        </button>
      );
    } else if (yesCount > 2) {
      resultMessage = "You have some symptoms. Take care of your diet and rest well. Monitor your health.";
      resultColor = "text-yellow-700 bg-yellow-50 border-yellow-200";
      ActionComponent = (
        <div className="mt-2 text-sm text-gray-600">Check the 'Care' section for tips!</div>
      );
    } else {
      resultMessage = "You seem to be doing well! Keep maintaining a healthy lifestyle.";
      resultColor = "text-green-700 bg-green-50 border-green-200";
      ActionComponent = (
        <button onClick={onNavigateToFun} className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
            Relax in Fun Zone
        </button>
      );
    }

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-6">Test Results</h2>
        <div className={`p-6 rounded-xl border ${resultColor} mb-6`}>
            <p className="text-lg font-medium">{resultMessage}</p>
        </div>
        <p className="text-gray-500 mb-8">You answered "Yes" to {yesCount} out of {QUESTIONS.length} questions.</p>
        
        <div className="flex flex-col items-center gap-4">
            {ActionComponent}
            <button onClick={resetQuiz} className="flex items-center text-gray-500 hover:text-rose-500 mt-4">
                <RefreshCw size={16} className="mr-2" /> Retake Test
            </button>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 min-h-[400px] flex flex-col justify-center animate-fade-in border border-rose-50">
      <div className="mb-8">
        <span className="text-xs font-bold tracking-wider text-rose-500 uppercase">Question {currentIndex + 1} of {QUESTIONS.length}</span>
        <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
            <div 
                className="bg-rose-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-10 leading-relaxed">
        {currentQuestion.text}
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleAnswer('yes')}
          className="py-4 rounded-xl border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-50 text-rose-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <CheckCircle className="group-hover:scale-110 transition-transform" /> Yes
        </button>
        <button
          onClick={() => handleAnswer('no')}
          className="py-4 rounded-xl border-2 border-gray-100 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        >
          No
        </button>
      </div>
    </div>
  );
};
