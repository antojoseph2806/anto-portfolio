import React, { useState, useEffect } from 'react';
import { Home, User, FileText, Briefcase, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    // use env(safe-area-inset-top) to avoid white padding due to notches/status bars
    <nav
      className="w-full fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        {/* header wrapper with fixed height so toggle centers nicely */}
        <div className="relative flex items-center justify-center h-16 sm:h-20">
          {/* Desktop Navigation (centered) */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1 sm:py-0 justify-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Toggle - fixed to top right but vertically centered */}
          <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              // larger tappable area, dark red color, visible focus ring
              className={`w-11 h-11 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all ${
                open ? 'bg-red-700 text-white' : 'bg-white text-red-700 shadow-sm'
              }`}
            >
              {/* lucide icons inherit current text color */}
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            open ? 'max-h-96' : 'max-h-0'
          }`}
          aria-hidden={!open}
        >
          <div className="flex flex-col gap-1 py-2 bg-white border-t">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
