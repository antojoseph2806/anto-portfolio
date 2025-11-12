import React, { useState, useEffect, useRef } from 'react';
import { Home, User, FileText, Briefcase, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // body scroll lock & focus management
  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      // lock scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // small delay so the panel exists in DOM before focusing
      setTimeout(() => {
        const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a');
        firstLink?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = prevOverflow;
        lastFocusedRef.current?.focus();
      };
    }
  }, [open]);

  // close with Escape and trap Tab inside panel for accessibility
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'Tab') {
        // simple focus trap
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // helper: close when tapping backdrop
  function handleBackdropClick(e: React.MouseEvent) {
    // if clicking directly on backdrop (not the panel)
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    // using env(safe-area-inset-top) for notch padding
    <nav
      className="w-full fixed inset-x-0 top-0 z-50"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      aria-label="Primary"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="relative flex items-center justify-center h-16 sm:h-20">
          {/* Desktop nav - centered */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1 sm:py-0 justify-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap transition-all
                      ${
                        isActive
                          ? 'bg-blue-100 text-blue-800 shadow-inner'
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

          {/* Mobile toggle */}
          <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className={`w-11 h-11 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all
                ${open ? 'bg-red-700 text-white shadow-lg' : 'bg-white text-red-700 shadow-sm'}`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay + sliding panel */}
      {/* The overlay and panel are rendered even when closed for smoother animation and to keep aria semantics stable */}
      <div
        // overlay sits under the nav but above the page
        className={`fixed inset-0 z-40 pointer-events-none`}
        aria-hidden={!open}
      >
        {/* Backdrop: fades in/out; when closed pointer-events-none prevents clicks */}
        <div
          onClick={handleBackdropClick}
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ease-out
            ${open ? 'opacity-60 pointer-events-auto bg-black/40' : 'opacity-0'}`}
        />

        {/* Sliding panel - center horizontally but anchored below top nav */
        }
        <div
          id="mobile-navigation"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className={`mx-auto mt-[calc(4.25rem+env(safe-area-inset-top))] w-[min(92%,420px)] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto transform transition-all duration-350 ease-[cubic-bezier(.2,.9,.2,1)]
            ${open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-3 scale-[0.98] opacity-0'}`}
          style={{
            // subtle entrance
            transitionProperty: 'transform, opacity',
            transitionDuration: '280ms',
          }}
        >
          {/* Panel content */}
          <div className="bg-white/95 backdrop-blur-md border border-white/30">
            <div className="p-3">
              {/* Top row: optional close button visually aligned */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-700 px-2">Navigation</div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="mt-2 flex flex-col gap-2" aria-label="Mobile primary">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-200
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-white text-blue-800 shadow-sm'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-md shrink-0 transition-transform
                          ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-transparent text-gray-600'}`}
                        aria-hidden
                      >
                        <Icon size={18} />
                      </span>

                      <span className="flex-1">{item.label}</span>

                      {/* chevron / subtle status dot */}
                      <span
                        className={`w-2 h-2 rounded-full ml-1 ${
                          isActive ? 'bg-yellow-400' : 'bg-transparent'
                        }`}
                        aria-hidden
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* The "Footer actions" section, including social buttons, has been completely removed. */}
              
            </div>
          </div>
        </div>
      </div> {/* end overlay */}
    </nav>
  );
}