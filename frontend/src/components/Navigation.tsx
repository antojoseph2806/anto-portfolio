import { Home, User, FileText, Briefcase, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 sm:py-4 justify-start sm:justify-center">
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
    </nav>
  );
};

export default Navigation;
