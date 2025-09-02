import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Warehouse,
  FileText,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

function StatCard({ title, value, change, icon: Icon, description, status }: StatCardProps) {
  return (
    <Card className="stat-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {change && (
          <div className="flex items-center mt-2">
            {change.trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-success mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive mr-1" />
            )}
            <span className={`text-xs ${
              change.trend === 'up' ? 'text-success' : 'text-destructive'
            }`}>
              {change.value}
            </span>
          </div>
        )}
        {status && (
          <div className="mt-2">
            <Badge 
              variant={status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}
              className={`text-xs ${
                status === 'success' ? 'status-verified' : 
                status === 'warning' ? 'status-pending' : 
                'status-rejected'
              }`}
            >
              {status === 'success' && <CheckCircle className="w-3 h-3 mr-1" />}
              {status === 'warning' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {status === 'error' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
}

export function StatsCards({ userRole = 'admin' }: StatsCardsProps) {
  // Mock data based on user role
  const getStatsData = () => {
    if (userRole === 'admin') {
      return [
        {
          title: 'Total Parts',
          value: '12,845',
          change: { value: '+12% from last month', trend: 'up' as const },
          icon: Package,
          description: 'Across all categories',
        },
        {
          title: 'Active Companies',
          value: '156',
          change: { value: '+3 new this week', trend: 'up' as const },
          icon: Building2,
          description: 'Verified dealers & vendors',
        },
        {
          title: 'Pending Approvals',
          value: '23',
          icon: AlertTriangle,
          description: 'Parts awaiting verification',
          status: 'warning' as const,
        },
        {
          title: 'Monthly Revenue',
          value: '₹2.4M',
          change: { value: '+18% from last month', trend: 'up' as const },
          icon: TrendingUp,
          description: 'Total platform revenue',
        },
      ];
    } else if (userRole === 'dealer') {
      return [
        {
          title: 'My Inventory',
          value: '2,156',
          change: { value: '+8% this month', trend: 'up' as const },
          icon: Warehouse,
          description: 'Total parts in stock',
        },
        {
          title: 'Orders Today',
          value: '24',
          change: { value: '+15% from yesterday', trend: 'up' as const },
          icon: FileText,
          description: 'New orders received',
        },
        {
          title: 'Low Stock Items',
          value: '12',
          icon: AlertTriangle,
          description: 'Items below reorder level',
          status: 'warning' as const,
        },
        {
          title: 'Revenue Today',
          value: '₹45,200',
          change: { value: '+22% from yesterday', trend: 'up' as const },
          icon: TrendingUp,
          description: 'Todays sales',
        },
      ];
    } else {
      return [
        {
          title: 'Available Parts',
          value: '8,942',
          icon: Package,
          description: 'Ready to order',
        },
        {
          title: 'My Orders',
          value: '5',
          icon: FileText,
          description: 'Active orders',
        },
        {
          title: 'Quick Delivery',
          value: '2,341',
          icon: TrendingUp,
          description: 'Same day delivery',
          status: 'success' as const,
        },
        {
          title: 'Categories',
          value: '24',
          icon: Warehouse,
          description: 'Part categories',
        },
      ];
    }
  };

  const statsData = getStatsData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
