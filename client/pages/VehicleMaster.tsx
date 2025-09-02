import { Layout } from "@/components/layout/Layout";
import { VehicleStats } from "@/components/vehicle/VehicleStats";
import { RecentVehicles } from "@/components/vehicle/RecentVehicles";
import { VehicleQuickActions } from "@/components/vehicle/VehicleQuickActions";
import { ManufacturersOverview } from "@/components/vehicle/ManufacturersOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Car,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Download,
} from "lucide-react";

export default function VehicleMaster() {
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

  // Mock data for vehicle system overview
  const systemStatus = {
    dataQuality: "98.5%",
    lastSync: "15 minutes ago",
    activeConnections: 24,
    compatibilityAccuracy: "99.2%",
  };

  const vehicleTasks = [
    {
      id: 1,
      title: "Model Verification",
      count: 8,
      type: "warning",
      description: "New vehicles awaiting verification",
    },
    {
      id: 2,
      title: "Compatibility Updates",
      count: 156,
      type: "info",
      description: "Parts compatibility to review",
    },
    {
      id: 3,
      title: "Manufacturer Requests",
      count: 3,
      type: "warning",
      description: "New manufacturer applications",
    },
    {
      id: 4,
      title: "Data Quality",
      count: 1,
      type: "success",
      description: "All vehicle data validated",
    },
  ];

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Vehicle Master Management
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Car className="w-4 h-4" />
              Comprehensive vehicle database for accurate part categorization
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              Database Online
            </Badge>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Vehicles
            </Button>
          </div>
        </div>

        {/* Vehicle Statistics */}
        <VehicleStats userRole={user.role} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Vehicle Additions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentVehicles userRole={user.role} />
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div>
            <VehicleQuickActions userRole={user.role} />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vehicle Management Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Pending Tasks
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {vehicleTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        task.type === "warning"
                          ? "bg-warning/10"
                          : task.type === "info"
                            ? "bg-primary/10"
                            : "bg-success/10"
                      }`}
                    >
                      {task.type === "warning" ? (
                        <AlertTriangle className={`w-4 h-4 text-warning`} />
                      ) : task.type === "info" ? (
                        <Clock className={`w-4 h-4 text-primary`} />
                      ) : (
                        <CheckCircle className={`w-4 h-4 text-success`} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={task.type === "warning" ? "secondary" : "default"}
                    className={
                      task.type === "warning"
                        ? "status-pending"
                        : task.type === "info"
                          ? "status-pending"
                          : "status-verified"
                    }
                  >
                    {task.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Manufacturers Overview */}
          <ManufacturersOverview userRole={user.role} />
        </div>

        {/* System Status Footer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Vehicle Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-success">
                  {systemStatus.dataQuality}
                </div>
                <div className="text-xs text-muted-foreground">
                  Data Quality
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">
                  {systemStatus.activeConnections}
                </div>
                <div className="text-xs text-muted-foreground">
                  Active Connections
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-success">
                  {systemStatus.compatibilityAccuracy}
                </div>
                <div className="text-xs text-muted-foreground">
                  Compatibility Accuracy
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium text-muted-foreground">
                  {systemStatus.lastSync}
                </div>
                <div className="text-xs text-muted-foreground">Last Sync</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
