
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
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
       setUser({
         name: "Jane Smith",
         email: email,
         cycleLength: 28,
         lastPeriodStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
       });
       setCurrentPage(Page.DASHBOARD);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name && lastPeriod) {
        setUser({
            name,
            email,
            cycleLength: 28,
            lastPeriodStart: lastPeriod
        });
        setCurrentPage(Page.DASHBOARD);
    }
  };

  const renderContent = () => {
    if (!user) return null;
    switch (currentPage) {
      case Page.DASHBOARD: return <Tracker user={user} />;
      case Page.HEALTH_TEST: return <HealthTest onNavigateToDoctor={() => setCurrentPage(Page.DOCTORS)} onNavigateToFun={() => setCurrentPage(Page.FUN_ZONE)} />;
      case Page.HEALTH_CARE: return <HealthCare />;
      case Page.DOCTORS: return <DoctorFinder />;
      case Page.FUN_ZONE: return <FunZone />;
      case Page.AI_CHAT: return <GeminiChat />;
      default: return <Tracker user={user} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-purple-200 p-6 overflow-hidden relative">
        {/* Abstract decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-xl relative z-10 border border-white/40 backdrop-blur-sm">
            <div className="text-center mb-10">
                <div className="inline-flex p-4 bg-rose-50 rounded-3xl mb-4 shadow-inner">
                    <Heart className="h-10 w-10 text-rose-500 fill-current" />
                </div>
                <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 mb-2">FemHealth</h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">{isRegistering ? "Your journey starts here" : "Good to see you again"}</p>
            </div>
            
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
                {isRegistering && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-600 font-medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                            <input 
                                type="date" 
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-600 font-medium"
                                value={lastPeriod}
                                onChange={(e) => setLastPeriod(e.target.value)}
                                required
                            />
                            <span className="absolute -top-6 left-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Cycle Start</span>
                        </div>
                    </div>
                )}
                
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-600 font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                    <input 
                        type="password" 
                        placeholder="Secure Password" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-600 font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-rose-200 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                    {isRegistering ? "Create Account" : "Sign In to Dashboard"}
                    <ArrowRight size={20} />
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                <p className="text-slate-500 font-medium">
                    {isRegistering ? "Already a member?" : "New to the hub?"}
                    <button 
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="ml-2 text-rose-500 font-black hover:text-rose-600 underline decoration-rose-200 underline-offset-4"
                    >
                        {isRegistering ? "Login here" : "Join for free"}
                    </button>
                </p>
                {isRegistering && (
                  <p className="text-[10px] text-slate-300 mt-4 uppercase font-bold tracking-widest leading-relaxed">
                    By signing up, you agree to receive email reminders about your cycle and wellness tips.
                  </p>
                )}
            </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      onLogout={() => setUser(null)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
