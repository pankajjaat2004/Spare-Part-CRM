import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Package,
  Building2,
  FileText,
  User,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'part' | 'company' | 'order' | 'user';
  title: string;
  description: string;
  time: string;
  status?: 'pending' | 'completed' | 'approved' | 'rejected';
  user?: string;
}

interface RecentActivityProps {
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
}

export function RecentActivity({ userRole = 'admin' }: RecentActivityProps) {
  const getActivityData = (): ActivityItem[] => {
    if (userRole === 'admin') {
      return [
        {
          id: '1',
          type: 'company',
          title: 'New Company Registration',
          description: 'Auto Parts Ltd. submitted verification documents',
          time: '2 minutes ago',
          status: 'pending',
          user: 'System',
        },
        {
          id: '2',
          type: 'part',
          title: 'Part Approval Required',
          description: 'Brake Disc Set BR-2023 awaiting admin approval',
          time: '15 minutes ago',
          status: 'pending',
          user: 'Dealer ABC',
        },
        {
          id: '3',
          type: 'company',
          title: 'Company Verified',
          description: 'Precision Motors has been successfully verified',
          time: '1 hour ago',
          status: 'approved',
          user: 'Admin',
        },
        {
          id: '4',
          type: 'order',
          title: 'High Value Order',
          description: 'Order #ORD-2024-001 worth ₹85,000 processed',
          time: '2 hours ago',
          status: 'completed',
          user: 'Customer Portal',
        },
        {
          id: '5',
          type: 'user',
          title: 'New User Access',
          description: 'API access granted to TechParts Solutions',
          time: '3 hours ago',
          status: 'completed',
          user: 'Admin',
        },
      ];
    } else if (userRole === 'dealer') {
      return [
        {
          id: '1',
          type: 'order',
          title: 'New Order Received',
          description: 'Order #ORD-2024-012 for Engine Oil Filter',
          time: '5 minutes ago',
          status: 'pending',
          user: 'Customer',
        },
        {
          id: '2',
          type: 'part',
          title: 'Part Added to Catalog',
          description: 'Spark Plug Set SP-4526 successfully added',
          time: '30 minutes ago',
          status: 'completed',
          user: 'You',
        },
        {
          id: '3',
          type: 'order',
          title: 'Order Shipped',
          description: 'Order #ORD-2024-008 has been dispatched',
          time: '1 hour ago',
          status: 'completed',
          user: 'You',
        },
        {
          id: '4',
          type: 'part',
          title: 'Low Stock Alert',
          description: 'Brake Pads BP-301 stock below threshold',
          time: '2 hours ago',
          status: 'pending',
          user: 'System',
        },
      ];
    } else {
      return [
        {
          id: '1',
          type: 'order',
          title: 'Order Placed',
          description: 'Your order #ORD-2024-025 has been confirmed',
          time: '10 minutes ago',
          status: 'completed',
          user: 'You',
        },
        {
          id: '2',
          type: 'part',
          title: 'New Parts Available',
          description: '15 new Honda Civic parts added to catalog',
          time: '1 hour ago',
          status: 'completed',
          user: 'System',
        },
        {
          id: '3',
          type: 'order',
          title: 'Order Delivered',
          description: 'Order #ORD-2024-020 successfully delivered',
          time: '1 day ago',
          status: 'completed',
          user: 'Delivery Partner',
        },
      ];
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'part':
        return Package;
      case 'company':
        return Building2;
      case 'order':
        return FileText;
      case 'user':
        return User;
      default:
        return Clock;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    const statusMap = {
      pending: { variant: 'secondary' as const, className: 'status-pending' },
      completed: { variant: 'default' as const, className: 'status-verified' },
      approved: { variant: 'default' as const, className: 'status-verified' },
      rejected: { variant: 'destructive' as const, className: 'status-rejected' },
    };

    const config = statusMap[status as keyof typeof statusMap];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const activities = getActivityData();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      {activity.user && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            by {activity.user}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {activity.status && (
                    <div className="flex-shrink-0">
                      {getStatusBadge(activity.status)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
