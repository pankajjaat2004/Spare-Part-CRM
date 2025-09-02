import { Layout } from "@/components/layout/Layout";
import { PartsGrid } from "@/components/parts/PartsGrid";
import { CategoriesManagement } from "@/components/parts/CategoriesManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Package,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderOpen,
  Upload,
  Download,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function PartsCatalog() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
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
    totalParts: 3580,
    pendingApprovals: 45,
    approvedParts: 3210,
    rejectedParts: 25,
    categories: 28,
    subCategories: 156,
    suppliers: 24,
    monthlyGrowth: "+18%",
    averageRating: 4.3,
    totalViews: 89420,
  };

  const recentActivity = [
    {
      id: 1,
      action: "Part Approved",
      part: "Brake Pads Set - Front",
      supplier: "AutoParts Excellence",
      timestamp: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "New Part Submission",
      part: "Engine Oil Filter",
      supplier: "Metro Spare Parts",
      timestamp: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      action: "Category Updated",
      part: "Electrical Components",
      supplier: "System",
      timestamp: "6 hours ago",
      type: "info",
    },
    {
      id: 4,
      action: "Part Rejected",
      part: "LED Headlight Assembly",
      supplier: "Delhi Auto Traders",
      timestamp: "1 day ago",
      type: "warning",
    },
  ];

  const partTypeStats = [
    { type: "New", count: 1450, percentage: 40.5, color: "text-success" },
    { type: "OEM", count: 890, percentage: 24.9, color: "text-blue-600" },
    { type: "Aftermarket", count: 750, percentage: 21.0, color: "text-secondary-600" },
    { type: "Refurbished", count: 320, percentage: 8.9, color: "text-yellow-600" },
    { type: "Used", count: 170, percentage: 4.7, color: "text-muted-foreground" },
  ];

  const topCategories = [
    { name: "Engine Parts", parts: 1250, growth: "+12%" },
    { name: "Electrical Components", parts: 1120, growth: "+8%" },
    { name: "Brake System", parts: 890, growth: "+15%" },
    { name: "Suspension & Steering", parts: 650, growth: "+6%" },
    { name: "Cooling System", parts: 420, growth: "+22%" },
  ];

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

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Parts Catalog Management
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Comprehensive parts database with category structure and approval workflow
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              Catalog Online
            </Badge>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Bulk Import
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Catalog
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Part
            </Button>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.totalParts.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Parts</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
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
                  <p className="text-2xl font-bold">{overviewStats.pendingApprovals}</p>
                  <p className="text-xs text-muted-foreground">Pending Approvals</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Requires review</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.categories}</p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
                <FolderOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">{overviewStats.subCategories} sub-categories</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.averageRating}</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">{overviewStats.totalViews.toLocaleString()} views</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="parts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parts" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Parts Catalog
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Parts Grid - Takes 3 columns */}
              <div className="lg:col-span-3">
                <PartsGrid 
                  userRole={user.role} 
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>

              {/* Sidebar - Takes 1 column */}
              <div className="space-y-6">
                {/* Part Type Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Part Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {partTypeStats.map((stat) => (
                      <div key={stat.type} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{stat.type}</span>
                          <span className="text-sm text-muted-foreground">{stat.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-current ${stat.color}`}
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{stat.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topCategories.map((category, index) => (
                      <div key={category.name} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.parts} parts</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.growth}
                        </Badge>
                      </div>
                    ))}
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
                            {activity.part}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {activity.supplier}
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
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoriesManagement userRole={user.role} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
