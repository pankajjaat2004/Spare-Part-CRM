import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Settings, User, ArrowRight } from "lucide-react";

interface VehicleItem {
  id: string;
  make: string;
  model: string;
  year: string;
  variant?: string;
  addedBy: string;
  addedTime: string;
  status: "active" | "pending" | "review";
  compatibilityCount: number;
}

interface RecentVehiclesProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function RecentVehicles({ userRole = "admin" }: RecentVehiclesProps) {
  // Mock data for recent vehicle additions
  const recentVehicles: VehicleItem[] = [
    {
      id: "1",
      make: "Honda",
      model: "Civic Type R",
      year: "2024",
      variant: "FL5 2.0L Turbo",
      addedBy: "Admin",
      addedTime: "10 minutes ago",
      status: "active",
      compatibilityCount: 245,
    },
    {
      id: "2",
      make: "Toyota",
      model: "Camry Hybrid",
      year: "2024",
      variant: "XV70 2.5L Hybrid",
      addedBy: "Vehicle Manager",
      addedTime: "1 hour ago",
      status: "pending",
      compatibilityCount: 0,
    },
    {
      id: "3",
      make: "BMW",
      model: "3 Series",
      year: "2024",
      variant: "G20 320i",
      addedBy: "Admin",
      addedTime: "2 hours ago",
      status: "active",
      compatibilityCount: 189,
    },
    {
      id: "4",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: "2024",
      variant: "W206 C200",
      addedBy: "Vehicle Manager",
      addedTime: "3 hours ago",
      status: "review",
      compatibilityCount: 156,
    },
    {
      id: "5",
      make: "Audi",
      model: "A4",
      year: "2024",
      variant: "B10 40 TFSI",
      addedBy: "Admin",
      addedTime: "5 hours ago",
      status: "active",
      compatibilityCount: 203,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "default" as const, className: "status-verified" },
      pending: { variant: "secondary" as const, className: "status-pending" },
      review: { variant: "secondary" as const, className: "status-pending" },
    };

    const config = statusMap[status as keyof typeof statusMap];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Recent Vehicle Additions
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Car className="w-4 h-4 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {vehicle.make} {vehicle.model}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {vehicle.year} • {vehicle.variant}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {vehicle.addedTime}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {vehicle.addedBy}
                    </span>
                    {vehicle.compatibilityCount > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Settings className="w-3 h-3" />
                          {vehicle.compatibilityCount} parts
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {getStatusBadge(vehicle.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
