import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Building,
  Calendar,
  GitBranch,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface VehicleStatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down";
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  status?: "success" | "warning" | "error" | "info";
}

function VehicleStatCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  status,
}: VehicleStatCardProps) {
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
            {change.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-success mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive mr-1" />
            )}
            <span
              className={`text-xs ${
                change.trend === "up" ? "text-success" : "text-destructive"
              }`}
            >
              {change.value}
            </span>
          </div>
        )}
        {status && (
          <div className="mt-2">
            <Badge
              variant={
                status === "success"
                  ? "default"
                  : status === "warning"
                    ? "secondary"
                    : "destructive"
              }
              className={`text-xs ${
                status === "success"
                  ? "status-verified"
                  : status === "warning"
                    ? "status-pending"
                    : "status-rejected"
              }`}
            >
              {status === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
              {status === "warning" && (
                <AlertTriangle className="w-3 h-3 mr-1" />
              )}
              {status === "error" && <AlertTriangle className="w-3 h-3 mr-1" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface VehicleStatsProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function VehicleStats({ userRole = "admin" }: VehicleStatsProps) {
  // Mock data for vehicle master statistics
  const statsData = [
    {
      title: "Vehicle Models",
      value: "3,247",
      change: { value: "+45 new this month", trend: "up" as const },
      icon: Car,
      description: "Across all manufacturers",
    },
    {
      title: "Manufacturers",
      value: "89",
      change: { value: "+2 added this quarter", trend: "up" as const },
      icon: Building,
      description: "Active vehicle brands",
    },
    {
      title: "Model Years",
      value: "25",
      icon: Calendar,
      description: "From 1999 to 2024",
      status: "success" as const,
    },
    {
      title: "Compatibility Entries",
      value: "127K",
      change: { value: "+2.8K this month", trend: "up" as const },
      icon: GitBranch,
      description: "Part-vehicle mappings",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <VehicleStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
