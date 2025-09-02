import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Building, TrendingUp, ArrowRight } from "lucide-react";

interface Manufacturer {
  id: string;
  name: string;
  logo?: string;
  modelCount: number;
  compatibilityCount: number;
  marketShare: number;
  growth: {
    value: string;
    trend: "up" | "down";
  };
  status: "active" | "featured" | "new";
}

interface ManufacturersOverviewProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function ManufacturersOverview({
  userRole = "admin",
}: ManufacturersOverviewProps) {
  // Mock data for top manufacturers
  const manufacturers: Manufacturer[] = [
    {
      id: "1",
      name: "Toyota",
      modelCount: 427,
      compatibilityCount: 15420,
      marketShare: 18.5,
      growth: { value: "+12%", trend: "up" },
      status: "featured",
    },
    {
      id: "2",
      name: "Honda",
      modelCount: 312,
      compatibilityCount: 12890,
      marketShare: 15.2,
      growth: { value: "+8%", trend: "up" },
      status: "featured",
    },
    {
      id: "3",
      name: "BMW",
      modelCount: 298,
      compatibilityCount: 11560,
      marketShare: 12.8,
      growth: { value: "+15%", trend: "up" },
      status: "featured",
    },
    {
      id: "4",
      name: "Mercedes-Benz",
      modelCount: 267,
      compatibilityCount: 10890,
      marketShare: 11.4,
      growth: { value: "+9%", trend: "up" },
      status: "active",
    },
    {
      id: "5",
      name: "Audi",
      modelCount: 234,
      compatibilityCount: 9450,
      marketShare: 9.8,
      growth: { value: "+6%", trend: "up" },
      status: "active",
    },
    {
      id: "6",
      name: "Hyundai",
      modelCount: 189,
      compatibilityCount: 7230,
      marketShare: 8.1,
      growth: { value: "+22%", trend: "up" },
      status: "new",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      featured: {
        variant: "default" as const,
        className: "bg-primary text-primary-foreground",
      },
      new: { variant: "secondary" as const, className: "status-pending" },
      active: { variant: "outline" as const, className: "" },
    };

    const config = statusMap[status as keyof typeof statusMap];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
        {status === "featured"
          ? "Featured"
          : status === "new"
            ? "New"
            : "Active"}
      </Badge>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Top Manufacturers
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {manufacturers.map((manufacturer, index) => (
          <div key={manufacturer.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{manufacturer.name}</h4>
                    {getStatusBadge(manufacturer.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{manufacturer.modelCount} models</span>
                    <span>
                      {manufacturer.compatibilityCount.toLocaleString()} parts
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">
                  {manufacturer.marketShare}%
                </div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="w-3 h-3" />
                  {manufacturer.growth.value}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Market Share</span>
                <span>{manufacturer.marketShare}%</span>
              </div>
              <Progress value={manufacturer.marketShare} className="h-2" />
            </div>

            {index < manufacturers.length - 1 && (
              <div className="border-b border-border"></div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
