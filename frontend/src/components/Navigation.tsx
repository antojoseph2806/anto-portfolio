import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Home, User, FileText, Briefcase, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // Close on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Measure nav height and publish as CSS variable on :root
  useLayoutEffect(() => {
    const setNavHeight = () => {
      const el = navRef.current;
      const h = el ? Math.round(el.getBoundingClientRect().height) : 68;
      // set on :root so any component can use it via CSS var
      document.documentElement.style.setProperty('--nav-height', `${h}px`);
    };

    setNavHeight();

    // re-calc on resize, load, and when fonts/images finish
    window.addEventListener('resize', setNavHeight);
    window.addEventListener('load', setNavHeight);

    // observe size changes (e.g. font load or UI changes)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      ro = new ResizeObserver(setNavHeight);
      ro.observe(navRef.current);
    }

    // small fallback timeout (handles late style/font loads)
    const t = setTimeout(setNavHeight, 200);
    return () => {
      window.removeEventListener('resize', setNavHeight);
      window.removeEventListener('load', setNavHeight);
      if (ro && navRef.current) ro.unobserve(navRef.current);
      clearTimeout(t);
    };
  }, []);

  // body scroll lock & focus management for mobile panel
  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a');
      firstLink?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  // keyboard handling (Escape + Tab trap)
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <>
      <nav
        ref={navRef}
        className="w-full fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        aria-label="Primary"
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="relative flex items-center justify-center h-16 sm:h-20">
            <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
              <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1 sm:py-0 justify-center">
                {navItems.map(item => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium whitespace-nowrap transition-all
                        ${isActive ? 'bg-blue-100 text-blue-800 shadow-inner' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* mobile toggle */}
            <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => setOpen(s => !s)}
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

        {/* UPDATED: Overlay + panel are now conditionally rendered.
          This prevents the overlay/backdrop from intercepting clicks
          on the main page content when the menu is closed. 
        */}
        {open && (
          <div className={`fixed inset-0 z-40`} aria-hidden={false}>
            <div
              onClick={handleBackdropClick}
              // pointer-events-auto ensures it can be clicked to close the menu
              className={`absolute inset-0 transition-opacity duration-300 ease-out opacity-60 pointer-events-auto bg-black/40`}
            />
            <div
              id="mobile-navigation"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              className={`mx-auto w-[min(92%,420px)] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto transform transition-all duration-350 ease-[cubic-bezier(.2,.9,.2,1)]
                ${open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-3 scale-[0.98] opacity-0'}`}
              style={{
                marginTop: `calc(var(--nav-height, 68px) + env(safe-area-inset-top))`,
                transitionProperty: 'transform, opacity, margin-top',
                transitionDuration: '280ms',
              }}
            >
              <div className="bg-white/95 backdrop-blur-md border border-white/30 p-3">
                <nav className="mt-2 flex flex-col gap-2" aria-label="Mobile primary">
                  {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-200
                          ${isActive ? 'bg-gradient-to-r from-blue-50 to-white text-blue-800 shadow-sm' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                      >
                        <span className={`flex items-center justify-center w-9 h-9 rounded-md shrink-0 ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-transparent text-gray-600'}`} aria-hidden>
                          <Icon size={18} />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <span className={`w-2 h-2 rounded-full ml-1 ${isActive ? 'bg-yellow-400' : 'bg-transparent'}`} aria-hidden />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to push page content below the fixed nav.
          Use minHeight as fallback if --nav-height hasn't been calculated yet. */}
      <div
        aria-hidden
        style={{
          minHeight: 'var(--nav-height, 68px)',
          height: 'var(--nav-height, 68px)',
        }}
      />
    </>
  );
}