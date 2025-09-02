import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Car,
  Building2,
  Package,
  Warehouse,
  FileText,
  Code,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Vehicle Master',
    href: '/vehicle-master',
    icon: Car,
  },
  {
    title: 'Companies',
    href: '/companies',
    icon: Building2,
    adminOnly: true,
  },
  {
    title: 'Parts Catalog',
    href: '/parts-catalog',
    icon: Package,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Warehouse,
  },
  {
    title: 'Invoicing',
    href: '/invoicing',
    icon: FileText,
  },
  {
    title: 'API Console',
    href: '/api-console',
    icon: Code,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  className, 
  userRole = 'admin',
  isMobile = false,
  isOpen = true,
  onClose
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const filteredItems = navigationItems.filter(item => {
    if (item.adminOnly && userRole !== 'admin') {
      return false;
    }
    return true;
  });

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [location.pathname, isMobile, onClose]);

  // Handle escape key for mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobile && onClose) {
        onClose();
      }
    };
    
    if (isMobile && isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobile, isOpen, onClose]);

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-sidebar-foreground">
                SpareParts
              </h1>
              <p className="text-xs text-sidebar-foreground/60">CRM System</p>
            </div>
          </div>
        )}
        
        {isMobile ? (
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-accent-foreground transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-accent-foreground transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4" role="navigation" aria-label="Main navigation">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'sidebar-nav-item group',
                  isActive && 'active'
                )}
                title={collapsed && !isMobile ? item.title : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {(!collapsed || isMobile) && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Role Badge */}
      {(!collapsed || isMobile) && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></div>
              <span className="text-sm font-medium text-sidebar-accent-foreground capitalize">
                {userRole} Role
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside 
          className={cn(
            'fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 lg:hidden flex flex-col',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            className
          )}
          aria-label="Mobile navigation"
        >
          <SidebarContent />
        </aside>
      </>
    );
  }

  return (
    <aside 
      className={cn(
        'sidebar flex flex-col h-full transition-all duration-300 hidden lg:flex',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
      aria-label="Desktop navigation"
    >
      <SidebarContent />
    </aside>
  );
}
