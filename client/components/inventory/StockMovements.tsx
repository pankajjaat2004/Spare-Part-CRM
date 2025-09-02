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
  TrendingUp,
  TrendingDown,
  Edit,
  Search,
  Filter,
  Eye,
  Plus,
  Download,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface StockMovement {
  id: string;
  date: string;
  time: string;
  partNumber: string;
  partName: string;
  movementType: "stock_in" | "stock_out" | "adjustment" | "transfer" | "return";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference: string;
  user: string;
  location: string;
  notes?: string;
  serialNumbers?: string[];
}

interface StockMovementsProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function StockMovements({ userRole = "admin" }: StockMovementsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMovementType, setFilterMovementType] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("7_days");

  // Mock data for stock movements
  const stockMovements: StockMovement[] = [
    {
      id: "MOV001",
      date: "2024-01-22",
      time: "14:30",
      partNumber: "BP-ENG-001",
      partName: "Brake Pads Set - Front",
      movementType: "stock_out",
      quantity: -5,
      previousStock: 50,
      newStock: 45,
      reason: "Sale",
      reference: "SO-2024-001",
      user: "Sales User",
      location: "A-01-15",
      notes: "Sold to customer XYZ Motors",
    },
    {
      id: "MOV002",
      date: "2024-01-22",
      time: "10:15",
      partNumber: "EF-OIL-002",
      partName: "Engine Oil Filter",
      movementType: "stock_out",
      quantity: -12,
      previousStock: 20,
      newStock: 8,
      reason: "Sale",
      reference: "SO-2024-002",
      user: "Sales User",
      location: "B-02-08",
    },
    {
      id: "MOV003",
      date: "2024-01-21",
      time: "16:45",
      partNumber: "HL-LED-004",
      partName: "LED Headlight Assembly",
      movementType: "stock_in",
      quantity: 50,
      previousStock: 70,
      newStock: 120,
      reason: "Purchase",
      reference: "PO-2024-015",
      user: "Inventory Manager",
      location: "D-03-10",
      notes: "Received from Delhi Auto Traders",
    },
    {
      id: "MOV004",
      date: "2024-01-21",
      time: "09:20",
      partNumber: "SP-SUS-003",
      partName: "Shock Absorber - Rear",
      movementType: "stock_out",
      quantity: -3,
      previousStock: 5,
      newStock: 2,
      reason: "Sale",
      reference: "SO-2024-003",
      user: "Sales User",
      location: "C-01-22",
      serialNumbers: ["SA2024003", "SA2024004", "SA2024005"],
    },
    {
      id: "MOV005",
      date: "2024-01-20",
      time: "11:30",
      partNumber: "AC-COM-005",
      partName: "AC Compressor",
      movementType: "stock_in",
      quantity: 10,
      previousStock: 15,
      newStock: 25,
      reason: "Purchase",
      reference: "PO-2024-012",
      user: "Inventory Manager",
      location: "E-01-05",
      serialNumbers: ["ACC2024006", "ACC2024007", "ACC2024008", "ACC2024009", "ACC2024010"],
    },
    {
      id: "MOV006",
      date: "2024-01-19",
      time: "13:15",
      partNumber: "TR-GBX-006",
      partName: "Transmission Gear Set",
      movementType: "adjustment",
      quantity: -2,
      previousStock: 5,
      newStock: 3,
      reason: "Damage",
      reference: "ADJ-2024-001",
      user: "Quality Inspector",
      location: "F-02-18",
      notes: "2 units found damaged during inspection",
    },
    {
      id: "MOV007",
      date: "2024-01-19",
      time: "08:45",
      partNumber: "BP-ENG-001",
      partName: "Brake Pads Set - Front",
      movementType: "return",
      quantity: 2,
      previousStock: 48,
      newStock: 50,
      reason: "Customer Return",
      reference: "RET-2024-001",
      user: "Sales User",
      location: "A-01-15",
      notes: "Customer returned unused items",
    },
    {
      id: "MOV008",
      date: "2024-01-18",
      time: "15:00",
      partNumber: "EF-OIL-002",
      partName: "Engine Oil Filter",
      movementType: "transfer",
      quantity: -5,
      previousStock: 25,
      newStock: 20,
      reason: "Branch Transfer",
      reference: "TR-2024-001",
      user: "Inventory Manager",
      location: "B-02-08",
      notes: "Transferred to Branch B",
    },
  ];

  const movementTypes = ["stock_in", "stock_out", "adjustment", "transfer", "return"];
  const dateRanges = [
    { value: "1_day", label: "Last 24 hours" },
    { value: "7_days", label: "Last 7 days" },
    { value: "30_days", label: "Last 30 days" },
    { value: "90_days", label: "Last 3 months" },
    { value: "all", label: "All time" },
  ];

  const getMovementTypeBadge = (type: StockMovement["movementType"]) => {
    switch (type) {
      case "stock_in":
        return <Badge className="status-verified">Stock In</Badge>;
      case "stock_out":
        return <Badge variant="destructive">Stock Out</Badge>;
      case "adjustment":
        return <Badge className="status-pending">Adjustment</Badge>;
      case "transfer":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Transfer</Badge>;
      case "return":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Return</Badge>;
      default:
        return null;
    }
  };

  const getMovementIcon = (type: StockMovement["movementType"]) => {
    switch (type) {
      case "stock_in":
      case "return":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "stock_out":
      case "transfer":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "adjustment":
        return <Edit className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch = 
      movement.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMovementType = filterMovementType === "all" || movement.movementType === filterMovementType;
    
    // Date filtering logic would go here
    const matchesDateRange = true; // Simplified for demo
    
    return matchesSearch && matchesMovementType && matchesDateRange;
  });

  const movementStats = {
    totalMovements: stockMovements.length,
    stockInCount: stockMovements.filter(m => m.movementType === "stock_in").length,
    stockOutCount: stockMovements.filter(m => m.movementType === "stock_out").length,
    adjustmentCount: stockMovements.filter(m => m.movementType === "adjustment").length,
    netMovement: stockMovements.reduce((sum, m) => sum + m.quantity, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{movementStats.totalMovements}</p>
                <p className="text-xs text-muted-foreground">Total Movements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{movementStats.stockInCount}</p>
                <p className="text-xs text-muted-foreground">Stock In</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{movementStats.stockOutCount}</p>
                <p className="text-xs text-muted-foreground">Stock Out</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{movementStats.adjustmentCount}</p>
                <p className="text-xs text-muted-foreground">Adjustments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {movementStats.netMovement > 0 ? "+" : ""}{movementStats.netMovement}
                </p>
                <p className="text-xs text-muted-foreground">Net Movement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Movements Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Stock Movement History
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Movement
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search movements, parts, references, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterMovementType} onValueChange={setFilterMovementType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Movement Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {movementTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Part Information</TableHead>
                  <TableHead>Movement Type</TableHead>
                  <TableHead>Quantity Change</TableHead>
                  <TableHead>Stock Levels</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{movement.date}</p>
                        <p className="text-xs text-muted-foreground">{movement.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{movement.partName}</p>
                        <p className="text-xs text-muted-foreground">{movement.partNumber}</p>
                        <p className="text-xs text-muted-foreground">{movement.location}</p>
                        {movement.serialNumbers && (
                          <p className="text-xs text-muted-foreground">
                            Serial: {movement.serialNumbers.join(", ")}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.movementType)}
                        {getMovementTypeBadge(movement.movementType)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{movement.reason}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${
                          movement.quantity > 0 ? "text-success" : "text-destructive"
                        }`}>
                          {movement.quantity > 0 ? "+" : ""}{movement.quantity}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          <span className="text-muted-foreground">{movement.previousStock}</span>
                          <span className="mx-1">→</span>
                          <span className="font-medium">{movement.newStock}</span>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{movement.reference}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{movement.user}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        {movement.notes && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {movement.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMovements.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No movements found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterMovementType !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No stock movements recorded yet."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
