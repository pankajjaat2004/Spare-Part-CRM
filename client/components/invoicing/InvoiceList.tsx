import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Ban,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerGstin: string;
  customerState: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paymentMethod: string;
  items: InvoiceItem[];
  notes?: string;
  createdBy: string;
}

interface InvoiceItem {
  partNumber: string;
  partName: string;
  partType: "new" | "oem" | "aftermarket" | "refurbished" | "used";
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxableValue: number;
  taxRate: number;
  warranty: string;
}

interface InvoiceListProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function InvoiceList({ userRole = "admin" }: InvoiceListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPeriod, setFilterPeriod] = useState<string>("30_days");

  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: "INV001",
      invoiceNumber: "GST/2024/001",
      customerName: "XYZ Motors Pvt Ltd",
      customerGstin: "27ABCDE1234F1Z5",
      customerState: "Maharashtra",
      issueDate: "2024-01-22",
      dueDate: "2024-02-06",
      totalAmount: 11800,
      taxAmount: 1800,
      cgst: 900,
      sgst: 900,
      igst: 0,
      status: "sent",
      paymentMethod: "Bank Transfer",
      createdBy: "Sales User",
      items: [
        {
          partNumber: "BP-ENG-001",
          partName: "Brake Pads Set - Front",
          partType: "oem",
          hsnCode: "87089990",
          quantity: 2,
          unitPrice: 2500,
          discount: 0,
          taxableValue: 5000,
          taxRate: 18,
          warranty: "12 months",
        },
      ],
      notes: "Rush delivery requested",
    },
    {
      id: "INV002",
      invoiceNumber: "GST/2024/002",
      customerName: "Auto Service Center",
      customerGstin: "29FGHIJ5678K2L6",
      customerState: "Karnataka",
      issueDate: "2024-01-21",
      dueDate: "2024-02-05",
      totalAmount: 5664,
      taxAmount: 864,
      cgst: 0,
      sgst: 0,
      igst: 864,
      status: "paid",
      paymentMethod: "UPI",
      createdBy: "Sales User",
      items: [
        {
          partNumber: "EF-OIL-002",
          partName: "Engine Oil Filter",
          partType: "aftermarket",
          hsnCode: "84219990",
          quantity: 12,
          unitPrice: 450,
          discount: 200,
          taxableValue: 4800,
          taxRate: 18,
          warranty: "6 months",
        },
      ],
    },
    {
      id: "INV003",
      invoiceNumber: "GST/2024/003",
      customerName: "BMW Service Mumbai",
      customerGstin: "27MNOPQ9012R3S7",
      customerState: "Maharashtra",
      issueDate: "2024-01-20",
      dueDate: "2024-02-04",
      totalAmount: 18880,
      taxAmount: 2880,
      cgst: 1440,
      sgst: 1440,
      igst: 0,
      status: "overdue",
      paymentMethod: "Cheque",
      createdBy: "Sales Manager",
      items: [
        {
          partNumber: "SP-SUS-003",
          partName: "Shock Absorber - Rear",
          partType: "new",
          hsnCode: "87088090",
          quantity: 5,
          unitPrice: 3200,
          discount: 0,
          taxableValue: 16000,
          taxRate: 18,
          warranty: "24 months",
        },
      ],
    },
    {
      id: "INV004",
      invoiceNumber: "GST/2024/004",
      customerName: "Maruti Service Delhi",
      customerGstin: "07TUVWX3456Y4Z8",
      customerState: "Delhi",
      issueDate: "2024-01-19",
      dueDate: "2024-02-03",
      totalAmount: 59040,
      taxAmount: 9040,
      cgst: 0,
      sgst: 0,
      igst: 9040,
      status: "sent",
      paymentMethod: "NEFT",
      createdBy: "Sales User",
      items: [
        {
          partNumber: "HL-LED-004",
          partName: "LED Headlight Assembly",
          partType: "aftermarket",
          hsnCode: "85122000",
          quantity: 6,
          unitPrice: 8500,
          discount: 1000,
          taxableValue: 50000,
          taxRate: 18,
          warranty: "18 months",
        },
      ],
    },
    {
      id: "INV005",
      invoiceNumber: "GST/2024/005",
      customerName: "Hyundai Service Chennai",
      customerGstin: "33ABCDE7890F5G1",
      customerState: "Tamil Nadu",
      issueDate: "2024-01-18",
      dueDate: "2024-02-02",
      totalAmount: 70800,
      taxAmount: 10800,
      cgst: 0,
      sgst: 0,
      igst: 10800,
      status: "paid",
      paymentMethod: "Bank Transfer",
      createdBy: "Sales Manager",
      items: [
        {
          partNumber: "AC-COM-005",
          partName: "AC Compressor",
          partType: "refurbished",
          hsnCode: "84148090",
          quantity: 5,
          unitPrice: 12000,
          discount: 0,
          taxableValue: 60000,
          taxRate: 18,
          warranty: "12 months",
        },
      ],
    },
    {
      id: "INV006",
      invoiceNumber: "GST/2024/006",
      customerName: "Tata Service Pune",
      customerGstin: "27YZABCD1234E5F6",
      customerState: "Maharashtra",
      issueDate: "2024-01-17",
      dueDate: "2024-02-01",
      totalAmount: 35400,
      taxAmount: 5400,
      cgst: 2700,
      sgst: 2700,
      igst: 0,
      status: "draft",
      paymentMethod: "Cash",
      createdBy: "Sales User",
      items: [
        {
          partNumber: "TR-GBX-006",
          partName: "Transmission Gear Set",
          partType: "used",
          hsnCode: "87089990",
          quantity: 2,
          unitPrice: 15000,
          discount: 0,
          taxableValue: 30000,
          taxRate: 18,
          warranty: "3 months",
        },
      ],
    },
  ];

  const statusOptions = ["draft", "sent", "paid", "overdue", "cancelled"];
  const periodOptions = [
    { value: "7_days", label: "Last 7 days" },
    { value: "30_days", label: "Last 30 days" },
    { value: "90_days", label: "Last 3 months" },
    { value: "current_year", label: "Current Year" },
    { value: "all", label: "All time" },
  ];

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <Badge className="status-verified">Paid</Badge>;
      case "sent":
        return <Badge className="status-pending">Sent</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "sent":
        return <Clock className="w-4 h-4 text-primary" />;
      case "draft":
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "cancelled":
        return <Ban className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerGstin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statsData = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    paidInvoices: invoices.filter(inv => inv.status === "paid").length,
    overdueInvoices: invoices.filter(inv => inv.status === "overdue").length,
    draftInvoices: invoices.filter(inv => inv.status === "draft").length,
    totalTax: invoices.reduce((sum, inv) => sum + inv.taxAmount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{statsData.totalInvoices}</p>
                <p className="text-xs text-muted-foreground">Total Invoices</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">This period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹{(statsData.totalAmount / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total Amount</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-success">₹{(statsData.totalTax / 1000).toFixed(0)}K tax</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{statsData.paidInvoices}</p>
                <p className="text-xs text-muted-foreground">Paid</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">
                {((statsData.paidInvoices / statsData.totalInvoices) * 100).toFixed(0)}% collection
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{statsData.overdueInvoices}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-destructive">Needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invoice Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices, customers, or GSTIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>GST Breakdown</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.items.length} item{invoice.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{invoice.customerName}</p>
                        <p className="text-xs text-muted-foreground">{invoice.customerGstin}</p>
                        <p className="text-xs text-muted-foreground">{invoice.customerState}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">Issued: {invoice.issueDate}</p>
                        <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">₹{invoice.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          +₹{invoice.taxAmount.toLocaleString()} tax
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {invoice.cgst > 0 && (
                          <p className="text-xs">CGST: ₹{invoice.cgst}</p>
                        )}
                        {invoice.sgst > 0 && (
                          <p className="text-xs">SGST: ₹{invoice.sgst}</p>
                        )}
                        {invoice.igst > 0 && (
                          <p className="text-xs">IGST: ₹{invoice.igst}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}
                        {getStatusBadge(invoice.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{invoice.paymentMethod}</p>
                        <p className="text-xs text-muted-foreground">
                          By: {invoice.createdBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          {invoice.status === "draft" && (
                            <>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="w-4 h-4 mr-2" />
                                Send Invoice
                              </DropdownMenuItem>
                            </>
                          )}
                          {invoice.status === "sent" && (
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                          {invoice.status === "overdue" && (
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No invoices have been created yet."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
