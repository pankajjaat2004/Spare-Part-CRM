import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
  userName?: string;
}

export function Layout({ 
  children, 
  className,
  userRole = 'admin',
  userName = 'Admin User'
}: LayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      admin: 'System Administrator',
      dealer: 'Dealer Admin',
      company: 'Company User',
      api: 'API Vendor',
      customer: 'Customer'
    };
    return roleMap[role as keyof typeof roleMap] || 'User';
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar 
        userRole={userRole} 
        isMobile={false}
      />
      
      {/* Mobile Sidebar */}
      <Sidebar 
        userRole={userRole} 
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        {/* Top Bar */}
        <TopBar 
          userName={userName}
          userRole={getRoleDisplayName(userRole)}
          onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        
        {/* Page Content */}
        <main className={cn(
          'flex-1 overflow-auto p-4 lg:p-6 bg-muted/30',
          className
        )}>
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
