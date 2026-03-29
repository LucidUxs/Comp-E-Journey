import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'CURRICULUM', path: '/curriculum' },
    { name: 'PARTNERS', path: '/partners' },
    { name: 'CAREERS', path: '/careers' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-[100] shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0 z-50 overflow-visible">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity block">
            <img src="/logo.png" alt="CompEJourney" className="h-10 w-auto scale-125 origin-left" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-[11px] font-black text-gray-500 uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-[#419CB8] transition-colors relative py-1 ${location.pathname === link.path ? 'text-[#419CB8]' : ''
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#419CB8] rounded-full"></span>
              )}
            </Link>
          ))}
        </div>



        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 p-2 text-gray-600 hover:text-[#00607a] transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-0 left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-b border-gray-100 ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-5 opacity-0 invisible pointer-events-none'}`}>
        <div className="pt-24 pb-12 px-8 flex flex-col items-center gap-8 justify-center min-h-[50vh]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black tracking-tighter uppercase transition-colors ${location.pathname === link.path ? 'text-[#419CB8]' : 'text-gray-400'
                }`}
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
}
