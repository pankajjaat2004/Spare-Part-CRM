import { Layout } from "@/components/layout/Layout";
import { CompanyList } from "@/components/company/CompanyList";
import { CompanyCreation } from "@/components/company/CompanyCreation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function Companies() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: "Admin User",
    role: "admin" as const,
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock data for dashboard overview
  const overviewStats = {
    totalCompanies: 24,
    pendingVerifications: 3,
    activeCompanies: 18,
    suspendedCompanies: 2,
    rejectedCompanies: 1,
    totalUsers: 156,
    totalParts: 12540,
    monthlyGrowth: "+12%",
  };

  const recentActivity = [
    {
      id: 1,
      action: "Company Verified",
      company: "AutoParts Excellence Pvt Ltd",
      user: "Admin",
      timestamp: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "New Registration",
      company: "Metro Spare Parts Solutions",
      user: "System",
      timestamp: "5 hours ago",
      type: "info",
    },
    {
      id: 3,
      action: "Company Suspended",
      company: "Premium Auto Components",
      user: "Admin",
      timestamp: "1 day ago",
      type: "warning",
    },
    {
      id: 4,
      action: "User Account Created",
      company: "Delhi Auto Traders",
      user: "Admin",
      timestamp: "2 days ago",
      type: "info",
    },
  ];

  const pendingApprovals = [
    {
      id: "CMP002",
      name: "Metro Spare Parts Solutions",
      contactPerson: "Priya Sharma",
      submittedDate: "2024-01-20",
      priority: "Medium",
    },
    {
      id: "CMP006",
      name: "North Zone Auto Parts",
      contactPerson: "Vikram Singh",
      submittedDate: "2024-01-22",
      priority: "High",
    },
    {
      id: "CMP007",
      name: "South India Motors",
      contactPerson: "Ravi Kumar",
      submittedDate: "2024-01-24",
      priority: "Low",
    },
  ];

  const handleCreateCompany = (data: any) => {
    console.log("Creating company:", data);
    // Here you would typically send the data to your API
    setShowCreateForm(false);
    // Show success notification
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "info":
        return <Clock className="w-4 h-4 text-primary" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge className="status-pending">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  if (user.role !== "admin") {
    return (
      <Layout userRole={user.role} userName={user.name}>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground text-center">
              Company management is available only to system administrators.
            </p>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Company Management
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Admin-controlled company registration, verification, and management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Company
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Company</DialogTitle>
                  <DialogDescription>
                    Add a new company to the system with complete verification and user access setup.
                  </DialogDescription>
                </DialogHeader>
                <CompanyCreation
                  userRole={user.role}
                  onCancel={() => setShowCreateForm(false)}
                  onSave={handleCreateCompany}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.totalCompanies}</p>
                  <p className="text-xs text-muted-foreground">Total Companies</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">{overviewStats.monthlyGrowth}</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.pendingVerifications}</p>
                  <p className="text-xs text-muted-foreground">Pending Verifications</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Requires attention</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Across all companies</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.totalParts}</p>
                  <p className="text-xs text-muted-foreground">Total Parts Listed</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Active catalog items</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Company List - Takes 3 columns */}
          <div className="lg:col-span-3">
            <CompanyList userRole={user.role} />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingApprovals.map((company) => (
                  <div
                    key={company.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm leading-tight">
                          {company.name}
                        </h4>
                        {getPriorityBadge(company.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {company.contactPerson}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {company.submittedDate}
                      </p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingApprovals.length === 0 && (
                  <div className="text-center py-4">
                    <CheckCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      No pending approvals
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.company}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {activity.user}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
