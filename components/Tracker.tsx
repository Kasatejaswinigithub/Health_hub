
import React, { useEffect, useState, useRef } from 'react';
import { User, NotificationLog } from '../types';
import { Calendar, Droplets, Sun, Mail, CheckCircle, BellRing, History, Send, ShieldCheck, Loader2, Server, Terminal, Zap, Shield } from 'lucide-react';
import { getHealthTip } from '../services/geminiService';
import { dispatchNodemailerEmail } from '../services/notificationService';

interface TrackerProps {
  user: User;
}

export const Tracker: React.FC<TrackerProps> = ({ user }) => {
  const [tip, setTip] = useState<string>("Setting up your space...");
  const [isDispatching, setIsDispatching] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getHealthTip().then(setTip);
    if ("Notification" in window) setPermissionStatus(Notification.permission);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const calculateDaysUntilPeriod = () => {
    const lastStart = new Date(user.lastPeriodStart);
    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(lastStart.getDate() + user.cycleLength);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffDays = Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return {
      days: diffDays,
      date: nextPeriod.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };
  };

  const { days, date } = calculateDaysUntilPeriod();

  const handleManualNotification = async () => {
    setIsDispatching(true);
    setIsSuccess(false);
    setTerminalLogs([]);
    
    try {
      const newLog = await dispatchNodemailerEmail(
        user.name, 
        user.email, 
        days, 
        date, 
        (step) => setTerminalLogs(prev => [...prev, step])
      );
      
      setLogs(prev => [newLog, ...prev]);
      setIsSuccess(true);
      
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Nodemailer: Success", {
          body: `Handover to ${user.email} completed successfully.`,
        });
      }
    } catch (e) {
      console.error("Nodemailer Service Error", e);
    }
  };

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Nodemailer SMTP Simulation Overlay */}
      {isDispatching && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl max-w-2xl w-full space-y-8 border border-white text-center">
            {isSuccess ? (
              <div className="space-y-8 animate-fade-in">
                <div className="relative inline-block">
                  <div className="p-12 bg-emerald-50 rounded-full">
                    <CheckCircle className="text-emerald-500 w-24 h-24" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg border border-slate-100">
                    <ShieldCheck className="text-emerald-500" size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-900 mb-4">Transmission Success</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Nodemailer has generated your MIME payload and initiated the <strong>Inbox Handover</strong>.
                    Please click "Send" in your mail application to finish.
                  </p>
                </div>
                <button 
                  onClick={() => setIsDispatching(false)}
                  className="w-full bg-slate-900 text-white px-10 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  Confirm & Close
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-50 rounded-2xl">
                      <Server className="text-rose-500" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-slate-900 leading-tight">SMTP Transport</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Nodemailer v6.9.15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                    <Shield size={12} />
                    <span>SSL/TLS Secure</span>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 border-4 border-slate-800 shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-64 overflow-y-auto font-mono text-left text-[11px] space-y-1.5 scrollbar-hide">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className={`flex gap-3 ${log.startsWith('2') || log.startsWith('3') ? 'text-emerald-400' : 'text-slate-400'}`}>
                        <span className="opacity-30 select-none">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                        <span className="flex-1 break-all">{log}</span>
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                  <div className="absolute bottom-4 right-8">
                    <Loader2 className="animate-spin text-rose-500/50" size={32} />
                  </div>
                </div>

                <div className="space-y-3 px-2">
                   <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                     <span>Message Stream</span>
                     <span className="text-rose-500 animate-pulse italic">MIME Packing...</span>
                   </div>
                   <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-rose-500 via-rose-400 to-purple-600 h-full rounded-full animate-[loading_2s_infinite]"></div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Permission Header */}
      {permissionStatus === 'default' && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md">
              <BellRing className="animate-pulse" size={28} />
            </div>
            <div>
              <p className="font-black text-xl text-white">Browser Notifications</p>
              <p className="text-sm opacity-80 text-white/80">Allow alerts to receive real-time cycle tracking updates.</p>
            </div>
          </div>
          <button onClick={requestPermission} className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Enable Alerts
          </button>
        </div>
      )}

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-purple-600 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-white/20 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 relative z-10">
          <div className="max-w-2xl text-center lg:text-left space-y-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                Hi, <span className="text-rose-100">{user.name.split(' ')[0]}!</span>
              </h2>
              <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/20 shadow-inner">
                <div className="flex items-start gap-4">
                  <Sun className="flex-shrink-0 mt-1 text-yellow-300" size={32} />
                  <p className="italic text-xl font-medium leading-relaxed opacity-95">"{tip}"</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={handleManualNotification} className="flex items-center gap-4 bg-white text-rose-500 hover:bg-rose-50 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95 group border-2 border-white">
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                Send Cycle Alert
              </button>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-8 py-5 rounded-[2rem] border border-white/10">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest">Transport Active</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 blur-[100px] rounded-full scale-125 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-3xl rounded-full w-72 h-72 md:w-96 md:h-96 flex flex-col items-center justify-center text-center border-8 border-white/10 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.6em] font-black text-rose-100 mb-2">Next Cycle In</span>
              <span className="text-[10rem] md:text-[12rem] font-black drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] leading-none">{days}</span>
              <span className="text-sm uppercase tracking-[0.8em] font-black text-rose-100 mt-2">Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden">
          <div className="flex items-center space-x-4 mb-8 relative z-10">
            <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Calendar size={32} />
            </div>
            <h3 className="font-black text-2xl text-slate-800">Timeline</h3>
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Expected Flow</p>
            <p className="text-4xl font-black text-slate-800">{date}</p>
            <div className="mt-10 flex items-center gap-3 text-rose-500 bg-rose-50 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest">
               <BellRing size={20} className="animate-bounce" /> Smart Alerts Armed
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-rose-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden">
          <div className="flex items-center space-x-4 mb-8 relative z-10">
            <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Droplets size={32} />
            </div>
            <h3 className="font-black text-2xl text-slate-800">Cycle Stats</h3>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <p className="text-7xl font-black text-slate-800">{user.cycleLength}</p>
              <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Days Avg</p>
            </div>
            <div className="mt-10 w-full bg-slate-100 h-5 rounded-full overflow-hidden shadow-inner p-1">
              <div className="bg-gradient-to-r from-purple-500 to-rose-400 h-full w-[85%] rounded-full shadow-lg relative">
                 <div className="absolute inset-0 bg-white/20 animate-[loading_2s_infinite]"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white group lg:row-span-1 border border-white/5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/10 rounded-2xl text-rose-400">
                <History size={32} />
              </div>
              <h3 className="font-black text-2xl">Alert Hub</h3>
            </div>
            <button 
              onClick={handleManualNotification}
              className="p-3 bg-rose-500 hover:bg-rose-600 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2 text-xs font-black uppercase tracking-widest group"
            >
              <Zap size={16} className="fill-current" />
              <span>Test SMTP</span>
            </button>
          </div>
          
          <div className="space-y-4 max-h-[220px] overflow-y-auto scrollbar-hide pr-2">
            {logs.length === 0 ? (
              <div className="py-16 text-center opacity-30 flex flex-col items-center">
                <Mail className="mb-4 opacity-20" size={48} />
                <p className="text-[10px] font-black uppercase tracking-widest">No Active Dispatches</p>
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-start gap-4 hover:bg-white/10 transition-colors group">
                  <div className="p-2 bg-rose-500/20 rounded-xl">
                    <Mail size={18} className="text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black mb-1 leading-tight line-clamp-1">{log.subject}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3 italic font-medium opacity-80">"{log.message}"</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{log.timestamp}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${log.status === 'Delivered' ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                        {log.status === 'Delivered' && <CheckCircle size={10} />}
                        {log.status}
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
