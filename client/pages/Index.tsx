import { Layout } from '@/components/layout/Layout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function Index() {
  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'Admin User',
    role: 'admin' as const,
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Mock data for system overview
  const systemOverview = {
    uptime: '99.9%',
    lastBackup: '2 hours ago',
    activeUsers: 142,
    systemLoad: '23%',
  };

  const pendingTasks = [
    {
      id: 1,
      title: 'Part Approvals',
      count: 23,
      type: 'warning',
      description: 'Parts awaiting verification',
    },
    {
      id: 2,
      title: 'Company Verifications',
      count: 5,
      type: 'info',
      description: 'New companies pending approval',
    },
    {
      id: 3,
      title: 'Low Stock Alerts',
      count: 12,
      type: 'warning',
      description: 'Items below reorder level',
    },
    {
      id: 4,
      title: 'GST Compliance',
      count: 1,
      type: 'success',
      description: 'All invoices compliant',
    },
  ];

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Button className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatsCards userRole={user.role} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentActivity userRole={user.role} />
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div>
            <QuickActions userRole={user.role} />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      task.type === 'warning' ? 'bg-warning/10' :
                      task.type === 'info' ? 'bg-primary/10' :
                      'bg-success/10'
                    }`}>
                      {task.type === 'warning' ? (
                        <AlertTriangle className={`w-4 h-4 text-warning`} />
                      ) : task.type === 'info' ? (
                        <Clock className={`w-4 h-4 text-primary`} />
                      ) : (
                        <CheckCircle className={`w-4 h-4 text-success`} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <Badge variant={task.type === 'warning' ? 'secondary' : 'default'} className={
                    task.type === 'warning' ? 'status-pending' :
                    task.type === 'info' ? 'status-pending' :
                    'status-verified'
                  }>
                    {task.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-success">{systemOverview.uptime}</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{systemOverview.activeUsers}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{systemOverview.systemLoad}</div>
                  <div className="text-xs text-muted-foreground">System Load</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium text-muted-foreground">{systemOverview.lastBackup}</div>
                  <div className="text-xs text-muted-foreground">Last Backup</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
