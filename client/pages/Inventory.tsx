import { Layout } from "@/components/layout/Layout";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import { StockMovements } from "@/components/inventory/StockMovements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download,
  Search,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

export default function Inventory() {
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

  // Mock data for inventory dashboard overview
  const overviewStats = {
    totalItems: 156,
    totalValue: 4250000, // ₹42.5L
    lowStockItems: 8,
    criticalStockItems: 3,
    overstockItems: 12,
    recentMovements: 45,
    monthlyTurnover: 2.3,
    avgDaysToSell: 45,
  };

  const recentLowStockAlerts = [
    {
      id: "LSA001",
      partNumber: "EF-OIL-002",
      partName: "Engine Oil Filter",
      currentStock: 8,
      minStock: 15,
      category: "Engine Parts",
      urgency: "high",
    },
    {
      id: "LSA002",
      partNumber: "SP-SUS-003", 
      partName: "Shock Absorber - Rear",
      currentStock: 2,
      minStock: 5,
      category: "Suspension & Steering",
      urgency: "critical",
    },
    {
      id: "LSA003",
      partNumber: "BP-FR-008",
      partName: "Front Brake Disc",
      currentStock: 12,
      minStock: 20,
      category: "Brake System",
      urgency: "medium",
    },
    {
      id: "LSA004",
      partNumber: "AC-FIL-005",
      partName: "AC Filter",
      currentStock: 18,
      minStock: 25,
      category: "Cooling System",
      urgency: "low",
    },
  ];

  const topValueItems = [
    {
      partNumber: "HL-LED-004",
      partName: "LED Headlight Assembly",
      stock: 120,
      unitValue: 7200,
      totalValue: 864000,
    },
    {
      partNumber: "AC-COM-005",
      partName: "AC Compressor",
      stock: 25,
      unitValue: 9500,
      totalValue: 237500,
    },
    {
      partNumber: "BP-ENG-001",
      partName: "Brake Pads Set - Front",
      stock: 45,
      unitValue: 2200,
      totalValue: 99000,
    },
    {
      partNumber: "TR-GBX-006",
      partName: "Transmission Gear Set",
      stock: 3,
      unitValue: 12000,
      totalValue: 36000,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Stock Out",
      part: "Brake Pads Set - Front",
      quantity: -5,
      timestamp: "2 hours ago",
      type: "out",
    },
    {
      id: 2,
      action: "Stock In",
      part: "LED Headlight Assembly",
      quantity: 50,
      timestamp: "4 hours ago",
      type: "in",
    },
    {
      id: 3,
      action: "Low Stock Alert",
      part: "Engine Oil Filter",
      quantity: 8,
      timestamp: "6 hours ago",
      type: "alert",
    },
    {
      id: 4,
      action: "Adjustment",
      part: "Transmission Gear Set",
      quantity: -2,
      timestamp: "1 day ago",
      type: "adjustment",
    },
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="status-pending">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "in":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "out":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "adjustment":
        return <Package className="w-4 h-4 text-primary" />;
      default:
        return <Package className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Basic inventory tracking with simple part type organization
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              Inventory Online
            </Badge>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Bulk Import
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.totalItems}</p>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Across all categories</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">₹{(overviewStats.totalValue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">Total Value</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Current inventory worth</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.lowStockItems + overviewStats.criticalStockItems}</p>
                  <p className="text-xs text-muted-foreground">Alerts</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-destructive">{overviewStats.criticalStockItems} critical</span>
                <span className="text-xs text-muted-foreground"> • </span>
                <span className="text-xs text-warning">{overviewStats.lowStockItems} low</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{overviewStats.monthlyTurnover}x</p>
                  <p className="text-xs text-muted-foreground">Turnover Rate</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">{overviewStats.avgDaysToSell} days avg</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Current Inventory
            </TabsTrigger>
            <TabsTrigger value="movements" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Stock Movements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Inventory Grid - Takes 3 columns */}
              <div className="lg:col-span-3">
                <InventoryGrid userRole={user.role} />
              </div>

              {/* Sidebar - Takes 1 column */}
              <div className="space-y-6">
                {/* Low Stock Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Low Stock Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentLowStockAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm leading-tight">
                              {alert.partName}
                            </h4>
                            {getUrgencyBadge(alert.urgency)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {alert.partNumber} • {alert.category}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Current: {alert.currentStock}</span>
                            <span className="text-muted-foreground">Min: {alert.minStock}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                alert.urgency === "critical" ? "bg-destructive" :
                                alert.urgency === "high" ? "bg-warning" :
                                "bg-orange-500"
                              }`}
                              style={{ 
                                width: `${Math.min((alert.currentStock / alert.minStock) * 100, 100)}%` 
                              }}
                            />
                          </div>
                          <Button size="sm" variant="outline" className="w-full h-6 text-xs">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Value Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Top Value Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topValueItems.map((item, index) => (
                      <div key={item.partNumber} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.partName}</p>
                          <p className="text-xs text-muted-foreground">{item.partNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.stock} × ₹{item.unitValue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{(item.totalValue / 1000).toFixed(0)}K</p>
                        </div>
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
                          {activity.quantity && (
                            <p className={`text-xs ${
                              activity.quantity > 0 ? "text-success" : "text-destructive"
                            }`}>
                              {activity.quantity > 0 ? "+" : ""}{activity.quantity} units
                            </p>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="movements" className="space-y-6">
            <StockMovements userRole={user.role} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
