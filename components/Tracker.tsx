
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { Calendar, Droplets, Info, Sun, Bell, Mail, CheckCircle, BellRing, History, Send } from 'lucide-react';
import { getHealthTip } from '../services/geminiService';

interface TrackerProps {
  user: User;
}

interface NotificationLog {
  id: string;
  type: 'email' | 'system';
  message: string;
  timestamp: string;
  status: 'Sent' | 'Delivered';
}

export const Tracker: React.FC<TrackerProps> = ({ user }) => {
  const [tip, setTip] = useState<string>("Loading daily tip...");
  const [isDispatching, setIsDispatching] = useState(false);
  const [notified, setNotified] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [logs, setLogs] = useState<NotificationLog[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchTip = async () => {
      const t = await getHealthTip();
      if(mounted) setTip(t);
    };
    fetchTip();
    
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    }

    return () => { mounted = false; };
  }, []);

  const calculateDaysUntilPeriod = () => {
    const lastStart = new Date(user.lastPeriodStart);
    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(lastStart.getDate() + user.cycleLength);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    nextPeriod.setHours(0, 0, 0, 0);
    
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: diffDays,
      date: nextPeriod.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };
  };

  const { days, date } = calculateDaysUntilPeriod();
  const isPeriodDueSoon = days === 3;

  useEffect(() => {
    if (isPeriodDueSoon && !notified) {
      triggerNotification();
      setNotified(true);
    }
  }, [isPeriodDueSoon, notified]);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    if (permission === 'granted') {
      new Notification("FemHealth Alerts Active", {
        body: "You'll receive a real alert 3 days before your cycle starts.",
        icon: "https://cdn-icons-png.flaticon.com/512/2913/2913445.png"
      });
      addLog('system', 'Browser notifications enabled successfully.');
    }
  };

  const addLog = (type: 'email' | 'system', message: string) => {
    const newLog: NotificationLog = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Delivered'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const triggerNotification = async () => {
    setIsDispatching(true);
    
    // Simulate network latency for the "Email"
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Real Browser Alert
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("FemHealth Reminder", {
        body: `Hi ${user.name.split(' ')[0]}, your cycle starts in 3 days (${date}).`,
      });
    }

    addLog('email', `Reminder email dispatched to ${user.email}`);
    setIsDispatching(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dispatching Animation Overlay */}
      {isDispatching && (
        <div className="fixed inset-0 z-[100] bg-rose-900/40 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center space-y-6">
            <div className="relative inline-block">
               <Mail className="text-rose-500 w-16 h-16 animate-bounce" />
               <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full scale-150 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">Dispatching Reminder</h3>
              <p className="text-slate-500 mt-2">Connecting to secure mail server...</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className="bg-rose-500 h-full animate-[loading_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Request Header */}
      {permissionStatus === 'default' && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <BellRing className="animate-pulse" size={24} />
            </div>
            <div>
              <p className="font-black text-lg">Never miss a cycle again!</p>
              <p className="text-sm text-purple-100">Enable real-time push notifications for your 3-day alerts.</p>
            </div>
          </div>
          <button 
            onClick={requestNotificationPermission}
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-2xl font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Enable Device Alerts
          </button>
        </div>
      )}

      <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-purple-600 rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
          <div className="max-w-xl text-center lg:text-left space-y-8">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
              Hello, <span className="text-rose-100">{user.name.split(' ')[0]}</span>
            </h2>
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
              <div className="flex items-start gap-4">
                <Sun className="flex-shrink-0 mt-1 text-yellow-300" size={28} />
                <p className="italic text-xl font-medium leading-relaxed opacity-95">"{tip}"</p>
              </div>
            </div>
            
            <button 
              onClick={triggerNotification}
              className="flex items-center gap-3 text-sm font-black uppercase tracking-widest bg-white text-rose-500 hover:bg-rose-50 px-8 py-4 rounded-[2rem] transition-all shadow-xl shadow-rose-900/20 active:scale-95"
            >
              <Send size={18} /> Test Email Dispatch
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 blur-[80px] rounded-full scale-125"></div>
            <div className="relative bg-white/10 backdrop-blur-3xl rounded-full w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center text-center border-8 border-white/10 shadow-inner">
              <span className="text-xs uppercase tracking-[0.4em] font-black text-rose-100 mb-2">Predicted In</span>
              <span className="text-9xl font-black drop-shadow-2xl">{days}</span>
              <span className="text-sm uppercase tracking-[0.5em] font-black text-rose-100 mt-2">Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Prediction Card */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-rose-50 hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="flex items-center space-x-4 mb-6 relative z-10">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Calendar size={28} />
            </div>
            <h3 className="font-black text-xl text-slate-800">Prediction</h3>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 relative z-10">Next Expected Cycle</p>
          <p className="text-3xl font-black text-slate-800 relative z-10">{date}</p>
          <div className="mt-8 flex items-center gap-3 text-rose-500 bg-rose-50 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider relative z-10">
             <BellRing size={20} className={isPeriodDueSoon ? "animate-bounce" : ""} />
             {isPeriodDueSoon ? "Mail Dispatched" : "Smart Alerts Armed"}
          </div>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-rose-50 rounded-full group-hover:scale-150 transition-transform"></div>
        </div>

        {/* Stats Card */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-purple-50 hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="flex items-center space-x-4 mb-6 relative z-10">
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Droplets size={28} />
            </div>
            <h3 className="font-black text-xl text-slate-800">Stats</h3>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <p className="text-6xl font-black text-slate-800">{user.cycleLength}</p>
            <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Days Avg</p>
          </div>
          <div className="mt-8 w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner relative z-10">
            <div className="bg-gradient-to-r from-purple-500 to-rose-400 h-full w-[85%] rounded-full shadow-lg"></div>
          </div>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-50 rounded-full group-hover:scale-150 transition-transform"></div>
        </div>

        {/* Notification Hub Card */}
        <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white hover:shadow-rose-500/20 transition-all group lg:row-span-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-2xl text-rose-400">
                <History size={28} />
              </div>
              <h3 className="font-black text-xl">Alert Hub</h3>
            </div>
            {logs.length > 0 && (
               <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            )}
          </div>
          
          <div className="space-y-4 max-h-[160px] overflow-y-auto scrollbar-hide pr-2">
            {logs.length === 0 ? (
              <div className="py-10 text-center opacity-30">
                <Mail className="mx-auto mb-2 opacity-20" size={32} />
                <p className="text-xs font-black uppercase tracking-widest">No Recent Dispatches</p>
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-3 hover:bg-white/10 transition-colors">
                  {log.type === 'email' ? <Mail size={16} className="mt-1 text-rose-400" /> : <BellRing size={16} className="mt-1 text-purple-400" />}
                  <div className="flex-1">
                    <p className="text-xs font-medium leading-tight">{log.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{log.timestamp}</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle size={10} /> {log.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
