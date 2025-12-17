import { Link, useLocation } from 'react-router-dom';
import { Zap, Wifi, BookOpen, BarChart3, GitCompare, Info } from 'lucide-react';

interface SidebarProps {
  networkSize: 50 | 100 | 150;
  onNetworkSizeChange: (size: 50 | 100 | 150) => void;
}

export default function Sidebar({ networkSize, onNetworkSizeChange }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/simulation', label: 'Network Sim', icon: Wifi },
    { path: '/algorithms', label: 'Algorithms', icon: BookOpen },
    { path: '/results', label: 'Results', icon: BarChart3 },
    { path: '/comparison', label: 'Comparison', icon: GitCompare },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-teal-900 to-teal-800 text-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-teal-700">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-teal-300" />
          <h1 className="text-xl font-bold">Green Net</h1>
        </div>
        <p className="text-xs text-teal-200">Energy-Efficient Routing</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-teal-600 text-white'
                  : 'text-teal-100 hover:bg-teal-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-teal-700 space-y-3">
        <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
          Network Size
        </div>
        <div className="space-y-2">
          {[50, 100, 150].map(size => (
            <button
              key={size}
              onClick={() => onNetworkSizeChange(size as 50 | 100 | 150)}
              className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                networkSize === size
                  ? 'bg-teal-500 text-white'
                  : 'bg-teal-700 text-teal-100 hover:bg-teal-600'
              }`}
            >
              {size} Nodes
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
