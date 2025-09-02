import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Download,
  TrendingUp,
  Package,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Filter,
  Clock,
} from "lucide-react";

export default function Reports() {
  const user = {
    name: "Admin User",
    role: "admin" as const,
  };

  const reportCategories = [
    {
      title: "Sales Reports",
      icon: DollarSign,
      reports: [
        { name: "Monthly Sales Summary", description: "Sales breakdown by month", format: "PDF, Excel" },
        { name: "Part Type Performance", description: "Sales by part type classification", format: "PDF, Excel" },
        { name: "Customer Analysis", description: "Top customers and buying patterns", format: "PDF, Excel" },
        { name: "Regional Sales", description: "Sales distribution by state/region", format: "PDF, Excel" },
      ]
    },
    {
      title: "Inventory Reports", 
      icon: Package,
      reports: [
        { name: "Stock Level Summary", description: "Current inventory levels and alerts", format: "PDF, Excel" },
        { name: "Movement Analysis", description: "Stock in/out patterns and trends", format: "PDF, Excel" },
        { name: "Low Stock Alert", description: "Items requiring reorder", format: "PDF, Excel" },
        { name: "Inventory Valuation", description: "Total inventory worth by category", format: "PDF, Excel" },
      ]
    },
    {
      title: "GST Compliance",
      icon: FileText,
      reports: [
        { name: "GSTR-1 Report", description: "Outward supplies for GST filing", format: "Excel, JSON" },
        { name: "GSTR-3B Summary", description: "Monthly return summary", format: "PDF, Excel" },
        { name: "HSN Summary", description: "HSN-wise tax summary", format: "Excel" },
        { name: "Tax Collection Report", description: "CGST, SGST, IGST breakdown", format: "PDF, Excel" },
      ]
    },
    {
      title: "Company Management",
      icon: Users,
      reports: [
        { name: "Company Performance", description: "Company-wise sales and activity", format: "PDF, Excel" },
        { name: "Verification Status", description: "Company verification and compliance", format: "PDF, Excel" },
        { name: "User Activity", description: "User login and activity patterns", format: "Excel" },
        { name: "API Usage", description: "API calls and integration usage", format: "PDF, Excel" },
      ]
    }
  ];

  const quickStats = {
    totalReports: 127,
    monthlyReports: 45,
    scheduledReports: 12,
    downloadedToday: 8,
  };

  const recentReports = [
    { name: "Monthly Sales Summary - January 2024", generated: "2024-01-22", size: "2.3 MB", format: "PDF" },
    { name: "Low Stock Alert Report", generated: "2024-01-22", size: "1.1 MB", format: "Excel" },
    { name: "GSTR-3B Summary - Q3 2023", generated: "2024-01-21", size: "890 KB", format: "PDF" },
    { name: "Company Performance Report", generated: "2024-01-20", size: "3.2 MB", format: "Excel" },
  ];

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Simple reporting and GST compliance reports
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </Button>
            <Button className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{quickStats.totalReports}</p>
                  <p className="text-xs text-muted-foreground">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{quickStats.monthlyReports}</p>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{quickStats.scheduledReports}</p>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{quickStats.downloadedToday}</p>
                  <p className="text-xs text-muted-foreground">Downloaded Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Formats: {report.format}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Generate
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Generated: {report.generated}</span>
                        <span>•</span>
                        <span>Size: {report.size}</span>
                        <span>•</span>
                        <Badge variant="outline">{report.format}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
