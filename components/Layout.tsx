
import React, { useState } from 'react';
import { Page } from '../types';
import { Menu, X, Heart, Activity, Stethoscope, Smile, MessageCircle, LogOut } from 'lucide-react';

interface LayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentPage, onNavigate, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        currentPage === page
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
          : 'text-gray-600 hover:bg-rose-100 hover:text-rose-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(Page.DASHBOARD)}>
              <div className="p-2 bg-rose-100 rounded-xl group-hover:scale-110 transition-transform">
                <Heart className="h-6 w-6 text-rose-500 fill-current" />
              </div>
              <span className="ml-2 text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                FemHealth
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <NavItem page={Page.DASHBOARD} icon={Activity} label="Tracker" />
              <NavItem page={Page.HEALTH_TEST} icon={Heart} label="Health Test" />
              <NavItem page={Page.HEALTH_CARE} icon={Stethoscope} label="Care" />
              <NavItem page={Page.DOCTORS} icon={Stethoscope} label="Specialists" />
              <NavItem page={Page.FUN_ZONE} icon={Smile} label="Zen" />
              <NavItem page={Page.AI_CHAT} icon={MessageCircle} label="AI Hub" />
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <button onClick={onLogout} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                <LogOut size={20} />
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-rose-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
             <Heart className="h-6 w-6 text-rose-500 fill-current" />
             <span className="ml-2 font-black text-gray-800">FemHealth</span>
          </div>
          <p className="text-gray-400 text-sm italic">"Empowering wellness, one cycle at a time."</p>
          <div className="mt-6 flex justify-center space-x-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-rose-500">Privacy</a>
            <a href="#" className="hover:text-rose-500">Terms</a>
            <a href="#" className="hover:text-rose-500">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
