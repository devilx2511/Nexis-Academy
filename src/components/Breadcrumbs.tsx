import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageRoute } from '../types';

export interface BreadcrumbItem {
  name: string;
  url?: string;
  route?: PageRoute;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (route: PageRoute) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = ''
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-xs font-mono text-gray-400 overflow-x-auto py-2 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1 text-gray-400 hover:text-[#66FCF1] transition-colors cursor-pointer"
            title="Go to Nexis Academy Homepage"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
              {isLast || (!item.route && !item.url) ? (
                <span
                  className="text-[#66FCF1] font-bold truncate max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.route && onNavigate) {
                      onNavigate(item.route);
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
