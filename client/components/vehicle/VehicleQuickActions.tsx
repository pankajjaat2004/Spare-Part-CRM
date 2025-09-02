import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Plus,
  Car,
  Building,
  Calendar,
  GitBranch,
  Upload,
  Download,
  Search,
} from "lucide-react";

interface VehicleQuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  variant?: "default" | "secondary" | "outline";
}

interface VehicleQuickActionsProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function VehicleQuickActions({
  userRole = "admin",
}: VehicleQuickActionsProps) {
  const getQuickActions = (): VehicleQuickAction[] => {
    if (userRole === "admin") {
      return [
        {
          title: "Add New Vehicle",
          description: "Register a new vehicle model",
          icon: Plus,
          href: "/vehicle-master/new",
          variant: "default",
        },
        {
          title: "Manage Manufacturers",
          description: "Add or edit vehicle brands",
          icon: Building,
          href: "/vehicle-master/manufacturers",
          variant: "secondary",
        },
        {
          title: "Compatibility Matrix",
          description: "Map parts to vehicle models",
          icon: GitBranch,
          href: "/vehicle-master/compatibility",
          variant: "outline",
        },
        {
          title: "Bulk Import",
          description: "Import vehicles via CSV",
          icon: Upload,
          href: "/vehicle-master/import",
          variant: "outline",
        },
      ];
    } else if (userRole === "dealer") {
      return [
        {
          title: "Search Vehicles",
          description: "Find compatible vehicles",
          icon: Search,
          href: "/vehicle-master/search",
          variant: "default",
        },
        {
          title: "View Compatibility",
          description: "Check part compatibility",
          icon: GitBranch,
          href: "/vehicle-master/compatibility",
          variant: "secondary",
        },
        {
          title: "Export Data",
          description: "Download vehicle database",
          icon: Download,
          href: "/vehicle-master/export",
          variant: "outline",
        },
      ];
    } else {
      return [
        {
          title: "Search Vehicles",
          description: "Find your vehicle model",
          icon: Search,
          href: "/vehicle-master/search",
          variant: "default",
        },
        {
          title: "Browse by Make",
          description: "Explore vehicle brands",
          icon: Building,
          href: "/vehicle-master/browse",
          variant: "secondary",
        },
        {
          title: "Browse by Year",
          description: "Filter by model year",
          icon: Calendar,
          href: "/vehicle-master/years",
          variant: "outline",
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
              variant={action.variant || "outline"}
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
