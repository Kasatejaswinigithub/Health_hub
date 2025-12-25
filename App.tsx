
import React, { useState } from 'react';
import { User, Page } from './types';
import { Layout } from './components/Layout';
import { Tracker } from './components/Tracker';
import { HealthTest } from './components/HealthTest';
import { HealthCare, DoctorFinder, FunZone } from './components/OtherPages';
import { GeminiChat } from './components/GeminiChat';
import { Heart, Mail, Lock, User as UserIcon, Calendar, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: name || "Jane Doe",
      email: email,
      cycleLength: 28,
      lastPeriodStart: lastPeriod || new Date(Date.now() - 5 * 86400000).toISOString()
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-200/40 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-200/40 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        
        <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl w-full max-w-xl relative z-10 border border-white">
          <div className="text-center mb-12">
            <div className="inline-block p-5 bg-rose-50 rounded-[2rem] shadow-inner mb-6">
                <Heart className="h-12 w-12 text-rose-500 fill-current" />
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-2">FemHealth</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Wellness Reimagined</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {isRegistering && (
              <div className="space-y-6">
                <div className="relative group">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium text-slate-700" required />
                </div>
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} type="date" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium text-slate-700" required />
                  <span className="absolute -top-7 left-1 text-[10px] font-black text-slate-300 uppercase tracking-widest">Last Period Start</span>
                </div>
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium text-slate-700" required />
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium text-slate-700" required />
            </div>
            <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-rose-200 transition-all flex items-center justify-center gap-3">
              {isRegistering ? "Register Account" : "Enter Dashboard"} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-12 text-center">
             <button onClick={() => setIsRegistering(!isRegistering)} className="text-slate-400 font-bold hover:text-rose-500 transition-colors underline underline-offset-8 decoration-rose-200">
               {isRegistering ? "Already member? Login" : "New member? Sign up"}
             </button>
          </div>
        </div>
      </div>
    );
  }

  const render = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Tracker user={user} />;
      case Page.HEALTH_TEST: return <HealthTest onNavigateToDoctor={() => setCurrentPage(Page.DOCTORS)} onNavigateToFun={() => setCurrentPage(Page.FUN_ZONE)} />;
      case Page.HEALTH_CARE: return <HealthCare />;
      case Page.DOCTORS: return <DoctorFinder />;
      case Page.FUN_ZONE: return <FunZone />;
      case Page.AI_CHAT: return <GeminiChat />;
      default: return <Tracker user={user} />;
    }

  const render = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Tracker user={user} />;
      case Page.HEALTH_TEST: return <HealthTest onNavigateToDoctor={() => setCurrentPage(Page.DOCTORS)} onNavigateToFun={() => setCurrentPage(Page.FUN_ZONE)} />;
      case Page.HEA
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={() => setUser(null)}>
      {render()}
    </Layout>
  );
};

export default App;
