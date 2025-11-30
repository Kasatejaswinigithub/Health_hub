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
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
        currentPage === page
          ? 'bg-rose-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-rose-100 hover:text-rose-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.DASHBOARD)}>
              <Heart className="h-8 w-8 text-rose-500 fill-current" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                FemHealth
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <NavItem page={Page.DASHBOARD} icon={Activity} label="Tracker" />
              <NavItem page={Page.HEALTH_TEST} icon={Heart} label="Health Test" />
              <NavItem page={Page.HEALTH_CARE} icon={Stethoscope} label="Care" />
              <NavItem page={Page.DOCTORS} icon={Stethoscope} label="Doctors" />
              <NavItem page={Page.FUN_ZONE} icon={Smile} label="Fun Zone" />
              <NavItem page={Page.AI_CHAT} icon={MessageCircle} label="AI Assistant" />
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <button onClick={onLogout} className="text-gray-500 hover:text-rose-600 p-2">
                <LogOut size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-rose-500 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <NavItem page={Page.DASHBOARD} icon={Activity} label="Tracker" />
              <NavItem page={Page.HEALTH_TEST} icon={Heart} label="Health Test" />
              <NavItem page={Page.HEALTH_CARE} icon={Stethoscope} label="Care" />
              <NavItem page={Page.DOCTORS} icon={Stethoscope} label="Doctors" />
              <NavItem page={Page.FUN_ZONE} icon={Smile} label="Fun Zone" />
              <NavItem page={Page.AI_CHAT} icon={MessageCircle} label="AI Assistant" />
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-rose-100 hover:text-rose-600 w-full text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} FemHealth. Empowering women's health journeys.
          </p>
        </div>
      </footer>
    </div>
  );
};
