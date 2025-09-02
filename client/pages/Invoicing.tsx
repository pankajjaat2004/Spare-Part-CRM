import { Layout } from "@/components/layout/Layout";
import { InvoiceList } from "@/components/invoicing/InvoiceList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Download,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calculator,
} from "lucide-react";

export default function Invoicing() {
  // Mock user data - in real app this would come from auth context
  const user = {
    name: "Admin User",
    role: "admin" as const,
  };

  // Mock data for GST overview
  const gstOverview = {
    currentMonth: {
      totalSales: 2650000,
      cgstCollected: 238500,
      sgstCollected: 238500,
      igstCollected: 95400,
      totalGstCollected: 572400,
    },
    quarterSummary: {
      totalSales: 8200000,
      totalGst: 1476000,
      filingStatus: "completed",
      nextDueDate: "2024-02-20",
    },
  };

  const recentInvoices = [
    { number: "GST/2024/006", customer: "Tata Service Pune", amount: 35400, status: "draft" },
    { number: "GST/2024/005", customer: "Hyundai Service Chennai", amount: 70800, status: "paid" },
    { number: "GST/2024/004", customer: "Maruti Service Delhi", amount: 59040, status: "sent" },
    { number: "GST/2024/003", customer: "BMW Service Mumbai", amount: 18880, status: "overdue" },
  ];

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Invoicing & GST Management
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Basic GST-compliant billing with part type-based pricing
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              GST Compliant
            </Badge>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              GST Report
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* GST Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Current Month GST Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">₹{(gstOverview.currentMonth.totalSales / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground">Total Sales</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">₹{(gstOverview.currentMonth.totalGstCollected / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-muted-foreground">GST Collected</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">CGST Collected:</span>
                  <span className="text-sm font-medium">₹{gstOverview.currentMonth.cgstCollected.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">SGST Collected:</span>
                  <span className="text-sm font-medium">₹{gstOverview.currentMonth.sgstCollected.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">IGST Collected:</span>
                  <span className="text-sm font-medium">₹{gstOverview.currentMonth.igstCollected.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quarterly Filing Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">₹{(gstOverview.quarterSummary.totalSales / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground">Quarter Sales</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-success">₹{(gstOverview.quarterSummary.totalGst / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground">Quarter GST</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Filing Status:</span>
                  <Badge className="status-verified">Completed</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Next Due Date:</span>
                  <span className="text-sm font-medium">{gstOverview.quarterSummary.nextDueDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Invoice Management */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Invoice List - Takes 3 columns */}
          <div className="lg:col-span-3">
            <InvoiceList userRole={user.role} />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Recent Invoices Quick View */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentInvoices.map((invoice) => (
                  <div
                    key={invoice.number}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-xs">{invoice.number}</h4>
                        <Badge 
                          className={
                            invoice.status === "paid" ? "status-verified" :
                            invoice.status === "sent" ? "status-pending" :
                            invoice.status === "overdue" ? "bg-destructive text-destructive-foreground" :
                            "bg-secondary text-secondary-foreground"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {invoice.customer}
                      </p>
                      <p className="text-sm font-medium">
                        ₹{invoice.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* HSN Code Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Common HSN Codes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Engine Parts:</span>
                  <code className="bg-muted px-1 rounded">84099100</code>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Brake System:</span>
                  <code className="bg-muted px-1 rounded">87089990</code>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Electrical:</span>
                  <code className="bg-muted px-1 rounded">85122000</code>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Suspension:</span>
                  <code className="bg-muted px-1 rounded">87088090</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
