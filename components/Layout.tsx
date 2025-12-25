
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(Page.DASHBOARD)}>
              <div className="p-2 bg-rose-100 rounded-xl group-hover:scale-110 transition-transform">
                <Heart className="h-6 w-6 text-rose-500 fill-current" />
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                FemHealth
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <NavItem page={Page.DASHBOARD} icon={Activity} label="Tracker" />
              <NavItem page={Page.HEALTH_TEST} icon={Heart} label="Test" />
              <NavItem page={Page.HEALTH_CARE} icon={Stethoscope} label="Care" />
              <NavItem page={Page.DOCTORS} icon={Stethoscope} label="Doctors" />
              <NavItem page={Page.FUN_ZONE} icon={Smile} label="Fun" />
              <NavItem page={Page.AI_CHAT} icon={MessageCircle} label="Assistant" />
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <button 
                onClick={onLogout} 
                className="text-gray-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-rose-500 focus:outline-none p-2 bg-rose-50 rounded-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100 shadow-xl p-4 space-y-2 animate-fade-in">
            <NavItem page={Page.DASHBOARD} icon={Activity} label="Tracker" />
            <NavItem page={Page.HEALTH_TEST} icon={Heart} label="Health Test" />
            <NavItem page={Page.HEALTH_CARE} icon={Stethoscope} label="Care & Nutrition" />
            <NavItem page={Page.DOCTORS} icon={Stethoscope} label="Find Doctors" />
            <NavItem page={Page.FUN_ZONE} icon={Smile} label="Fun Zone" />
            <NavItem page={Page.AI_CHAT} icon={MessageCircle} label="AI Assistant" />
            <hr className="my-2 border-rose-100" />
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-rose-100 hover:text-rose-600 w-full text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-rose-100 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-rose-500 fill-current" />
            <span className="ml-2 font-bold text-gray-700">FemHealth</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FemHealth. All your health data is encrypted and secure.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-rose-500">Privacy Policy</a>
            <a href="#" className="hover:text-rose-500">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
