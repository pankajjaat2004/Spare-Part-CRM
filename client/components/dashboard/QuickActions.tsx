import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Plus,
  Package,
  Building2,
  FileText,
  Search,
  Upload,
  Settings,
  BarChart3,
} from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  variant?: 'default' | 'secondary' | 'outline';
}

interface QuickActionsProps {
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
}

export function QuickActions({ userRole = 'admin' }: QuickActionsProps) {
  const getQuickActions = (): QuickAction[] => {
    if (userRole === 'admin') {
      return [
        {
          title: 'Add New Company',
          description: 'Register and verify a new dealer or vendor',
          icon: Building2,
          href: '/companies/new',
          variant: 'default',
        },
        {
          title: 'Approve Parts',
          description: 'Review pending part submissions',
          icon: Package,
          href: '/parts-catalog/approvals',
          variant: 'secondary',
        },
        {
          title: 'Generate Report',
          description: 'Create system-wide analytics report',
          icon: BarChart3,
          href: '/reports/generate',
          variant: 'outline',
        },
        {
          title: 'System Settings',
          description: 'Configure CRM system parameters',
          icon: Settings,
          href: '/settings',
          variant: 'outline',
        },
      ];
    } else if (userRole === 'dealer') {
      return [
        {
          title: 'Add New Part',
          description: 'Add parts to your catalog',
          icon: Plus,
          href: '/parts-catalog/new',
          variant: 'default',
        },
        {
          title: 'Process Orders',
          description: 'View and fulfill pending orders',
          icon: FileText,
          href: '/orders/pending',
          variant: 'secondary',
        },
        {
          title: 'Update Inventory',
          description: 'Manage stock levels and quantities',
          icon: Package,
          href: '/inventory/update',
          variant: 'outline',
        },
        {
          title: 'Bulk Upload',
          description: 'Import parts via CSV file',
          icon: Upload,
          href: '/parts-catalog/bulk-upload',
          variant: 'outline',
        },
      ];
    } else {
      return [
        {
          title: 'Search Parts',
          description: 'Find parts for your vehicle',
          icon: Search,
          href: '/search',
          variant: 'default',
        },
        {
          title: 'View Orders',
          description: 'Track your order history',
          icon: FileText,
          href: '/orders',
          variant: 'secondary',
        },
        {
          title: 'Browse Catalog',
          description: 'Explore available parts',
          icon: Package,
          href: '/catalog',
          variant: 'outline',
        },
      ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              className="w-full h-auto p-4 flex items-start gap-3 justify-start"
              asChild
            >
              <Link to={action.href}>
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {action.description}
                  </div>
                </div>
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
