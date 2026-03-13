import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Public Navbar */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#174E4F] tracking-tight">
            Lend Sphere
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-gray-600 hover:text-[#174E4F] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:text-[#174E4F] px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-[#174E4F] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0f3636] transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Join the Community
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-[#174E4F]"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-gray-700"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#174E4F] text-white text-center text-lg font-semibold py-4 rounded-xl"
            >
              Join the Community
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#174E4F]">Lend Sphere</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering communities through peer-to-peer lending. Transparent, fair, and human-centric.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/how-it-works" className="hover:text-[#174E4F]">How it works</Link></li>
              <li><Link to="/marketplace" className="hover:text-[#174E4F]">Marketplace</Link></li>
              <li><Link to="/about" className="hover:text-[#174E4F]">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/help" className="hover:text-[#174E4F]">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-[#174E4F]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#174E4F]">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#174E4F]/20"
              />
              <button className="bg-[#174E4F] text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Go
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © 2026 Lend Sphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
