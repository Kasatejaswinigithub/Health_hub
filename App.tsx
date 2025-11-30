import React, { useState } from 'react';
import { User, Page } from './types';
import { Layout } from './components/Layout';
import { Tracker } from './components/Tracker';
import { HealthTest } from './components/HealthTest';
import { HealthCare, DoctorFinder, FunZone } from './components/OtherPages';
import { GeminiChat } from './components/GeminiChat';

const App: React.FC = () => {
  // Simulating Auth State
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    if (email && password) {
       // Mock data
       setUser({
         name: "Jane Doe",
         email: email,
         cycleLength: 28,
         lastPeriodStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
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
            cycleLength: 28, // Default
            lastPeriodStart: lastPeriod
        });
        setCurrentPage(Page.DASHBOARD);
    }
  };

  const renderContent = () => {
    if (!user) return null;

    switch (currentPage) {
      case Page.DASHBOARD:
        return <Tracker user={user} />;
      case Page.HEALTH_TEST:
        return <HealthTest 
                onNavigateToDoctor={() => setCurrentPage(Page.DOCTORS)}
                onNavigateToFun={() => setCurrentPage(Page.FUN_ZONE)}
               />;
      case Page.HEALTH_CARE:
        return <HealthCare />;
      case Page.DOCTORS:
        return <DoctorFinder />;
      case Page.FUN_ZONE:
        return <FunZone />;
      case Page.AI_CHAT:
        return <GeminiChat />;
      default:
        return <Tracker user={user} />;
    }
  };

  // Auth Screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-purple-200 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 mb-2">FemHealth</h1>
                <p className="text-gray-500">{isRegistering ? "Create your account" : "Welcome back"}</p>
            </div>
            
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                {isRegistering && (
                    <>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                     <label className="block text-sm text-gray-500 ml-1">Last Period Start Date</label>
                     <input 
                        type="date" 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                        value={lastPeriod}
                        onChange={(e) => setLastPeriod(e.target.value)}
                        required
                    />
                    </>
                )}
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-rose-500/30">
                    {isRegistering ? "Sign Up" : "Login"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                    {isRegistering ? "Already have an account?" : "Don't have an account?"}
                    <button 
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="ml-2 text-rose-500 font-bold hover:underline"
                    >
                        {isRegistering ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
      </div>
    );
  }

  // Authenticated App
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
