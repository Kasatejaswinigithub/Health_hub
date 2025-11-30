import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { Calendar, Droplets, Info, Sun } from 'lucide-react';
import { getHealthTip } from '../services/geminiService';

interface TrackerProps {
  user: User;
}

export const Tracker: React.FC<TrackerProps> = ({ user }) => {
  const [tip, setTip] = useState<string>("Loading daily tip...");

  useEffect(() => {
    let mounted = true;
    const fetchTip = async () => {
        const t = await getHealthTip();
        if(mounted) setTip(t);
    }
    fetchTip();
    return () => { mounted = false; };
  }, []);

  const calculateDaysUntilPeriod = () => {
    const lastStart = new Date(user.lastPeriodStart);
    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(lastStart.getDate() + user.cycleLength);
    
    const today = new Date();
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: diffDays,
      date: nextPeriod.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };
  };

  const { days, date } = calculateDaysUntilPeriod();

  const isPeriodDue = days <= 3 && days >= 0;
  const isLate = days < 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-rose-400 to-purple-500 rounded-3xl p-8 text-white shadow-xl transform transition hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Hello, {user.name}</h2>
            <p className="opacity-90 flex items-center gap-2">
              <Sun size={18} />
              {tip}
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center min-w-[200px]">
            {isLate ? (
               <>
                 <span className="block text-sm uppercase tracking-wide opacity-80">Cycle Status</span>
                 <span className="block text-4xl font-bold my-1">{Math.abs(days)} Days</span>
                 <span className="block text-sm font-semibold bg-red-500/80 px-2 py-1 rounded-full inline-block">Late</span>
               </>
            ) : (
                <>
                <span className="block text-sm uppercase tracking-wide opacity-80">Next Period In</span>
                <span className="block text-5xl font-bold my-2">{days}</span>
                <span className="block text-lg opacity-90">Days</span>
                </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
          <div className="flex items-center space-x-3 mb-4 text-rose-600">
            <Calendar size={24} />
            <h3 className="font-semibold text-lg">Predicted Date</h3>
          </div>
          <p className="text-gray-600">Your next cycle is predicted to start on:</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{date}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
          <div className="flex items-center space-x-3 mb-4 text-purple-600">
            <Droplets size={24} />
            <h3 className="font-semibold text-lg">Cycle History</h3>
          </div>
          <p className="text-gray-600">Average Cycle Length:</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{user.cycleLength} Days</p>
          <p className="text-sm text-gray-400 mt-1">Based on your input</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
          <div className="flex items-center space-x-3 mb-4 text-blue-500">
            <Info size={24} />
            <h3 className="font-semibold text-lg">Did You Know?</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Hormone levels fluctuate throughout your cycle. You might feel more energetic during the follicular phase (days 6-14)!
          </p>
        </div>
      </div>
    </div>
  );
};
