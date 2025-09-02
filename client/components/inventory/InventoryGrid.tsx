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
  Package,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Hash,
} from "lucide-react";
import { useState } from "react";

interface InventoryItem {
  id: string;
  partNumber: string;
  partName: string;
  category: string;
  partType: "new" | "oem" | "aftermarket" | "refurbished" | "used";
  currentStock: number;
  minStock: number;
  maxStock: number;
  avgCost: number;
  totalValue: number;
  location: string;
  lastUpdated: string;
  lastMovement: "in" | "out" | "adjustment";
  movementQty: number;
  supplier: string;
  serialNumbers?: string[];
  stockStatus: "healthy" | "low" | "critical" | "overstock";
}

interface InventoryGridProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function InventoryGrid({ userRole = "admin" }: InventoryGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPartType, setFilterPartType] = useState<string>("all");

  // Mock data for inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: "INV001",
      partNumber: "BP-ENG-001",
      partName: "Brake Pads Set - Front",
      category: "Brake System",
      partType: "oem",
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      avgCost: 2200,
      totalValue: 99000,
      location: "A-01-15",
      lastUpdated: "2024-01-22",
      lastMovement: "out",
      movementQty: 5,
      supplier: "AutoParts Excellence",
      stockStatus: "healthy",
    },
    {
      id: "INV002",
      partNumber: "EF-OIL-002",
      partName: "Engine Oil Filter",
      category: "Engine Parts",
      partType: "aftermarket",
      currentStock: 8,
      minStock: 15,
      maxStock: 200,
      avgCost: 380,
      totalValue: 3040,
      location: "B-02-08",
      lastUpdated: "2024-01-21",
      lastMovement: "out",
      movementQty: 12,
      supplier: "Metro Spare Parts",
      stockStatus: "low",
    },
    {
      id: "INV003",
      partNumber: "SP-SUS-003",
      partName: "Shock Absorber - Rear",
      category: "Suspension & Steering",
      partType: "new",
      currentStock: 2,
      minStock: 5,
      maxStock: 50,
      avgCost: 2800,
      totalValue: 5600,
      location: "C-01-22",
      lastUpdated: "2024-01-20",
      lastMovement: "out",
      movementQty: 3,
      supplier: "Premium Auto Components",
      stockStatus: "critical",
      serialNumbers: ["SA2024001", "SA2024002"],
    },
    {
      id: "INV004",
      partNumber: "HL-LED-004",
      partName: "LED Headlight Assembly",
      category: "Electrical Components",
      partType: "aftermarket",
      currentStock: 120,
      minStock: 20,
      maxStock: 80,
      avgCost: 7200,
      totalValue: 864000,
      location: "D-03-10",
      lastUpdated: "2024-01-19",
      lastMovement: "in",
      movementQty: 50,
      supplier: "Delhi Auto Traders",
      stockStatus: "overstock",
    },
    {
      id: "INV005",
      partNumber: "AC-COM-005",
      partName: "AC Compressor",
      category: "Cooling System",
      partType: "refurbished",
      currentStock: 25,
      minStock: 8,
      maxStock: 40,
      avgCost: 9500,
      totalValue: 237500,
      location: "E-01-05",
      lastUpdated: "2024-01-18",
      lastMovement: "in",
      movementQty: 10,
      supplier: "Chennai Motors",
      stockStatus: "healthy",
      serialNumbers: ["ACC2024001", "ACC2024002", "ACC2024003", "ACC2024004", "ACC2024005"],
    },
    {
      id: "INV006",
      partNumber: "TR-GBX-006",
      partName: "Transmission Gear Set",
      category: "Transmission Parts",
      partType: "used",
      currentStock: 3,
      minStock: 3,
      maxStock: 15,
      avgCost: 12000,
      totalValue: 36000,
      location: "F-02-18",
      lastUpdated: "2024-01-17",
      lastMovement: "adjustment",
      movementQty: -2,
      supplier: "North Zone Auto Parts",
      stockStatus: "healthy",
    },
  ];

  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));
  const partTypes = ["new", "oem", "aftermarket", "refurbished", "used"];
  const statusOptions = ["healthy", "low", "critical", "overstock"];

  const getStockStatusBadge = (status: InventoryItem["stockStatus"]) => {
    switch (status) {
      case "healthy":
        return <Badge className="status-verified">Healthy</Badge>;
      case "low":
        return <Badge className="status-pending">Low Stock</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "overstock":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Overstock</Badge>;
      default:
        return null;
    }
  };

  const getStockStatusIcon = (status: InventoryItem["stockStatus"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "low":
        return <TrendingDown className="w-4 h-4 text-warning" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "overstock":
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getPartTypeBadge = (type: InventoryItem["partType"]) => {
    switch (type) {
      case "new":
        return <Badge className="status-verified">New</Badge>;
      case "oem":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">OEM</Badge>;
      case "aftermarket":
        return <Badge variant="secondary">Aftermarket</Badge>;
      case "refurbished":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Refurbished</Badge>;
      case "used":
        return <Badge variant="outline">Used</Badge>;
      default:
        return null;
    }
  };

  const getMovementIcon = (movement: InventoryItem["lastMovement"]) => {
    switch (movement) {
      case "in":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "out":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "adjustment":
        return <Edit className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = 
      item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.stockStatus === filterStatus;
    const matchesPartType = filterPartType === "all" || item.partType === filterPartType;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPartType;
  });

  const statsData = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + item.totalValue, 0),
    lowStock: inventoryItems.filter(item => item.stockStatus === "low").length,
    criticalStock: inventoryItems.filter(item => item.stockStatus === "critical").length,
    overstock: inventoryItems.filter(item => item.stockStatus === "overstock").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{statsData.totalItems}</p>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{statsData.lowStock}</p>
                <p className="text-xs text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{statsData.criticalStock}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{statsData.overstock}</p>
                <p className="text-xs text-muted-foreground">Overstock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-success" />
              <div>
                <p className="text-lg font-bold">₹{(statsData.totalValue / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search parts, part numbers, locations, or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPartType} onValueChange={setFilterPartType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {partTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </div>

          {/* Inventory Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Information</TableHead>
                  <TableHead>Type & Category</TableHead>
                  <TableHead>Stock Levels</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Last Movement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.partName}</p>
                          <p className="text-xs text-muted-foreground">{item.partNumber}</p>
                          {item.serialNumbers && (
                            <div className="flex items-center gap-1 mt-1">
                              <Hash className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {item.serialNumbers.length} serial numbers
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getPartTypeBadge(item.partType)}
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.currentStock}</span>
                          <span className="text-xs text-muted-foreground">
                            / {item.maxStock}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              item.stockStatus === "critical" ? "bg-destructive" :
                              item.stockStatus === "low" ? "bg-warning" :
                              item.stockStatus === "overstock" ? "bg-orange-500" :
                              "bg-success"
                            }`}
                            style={{ 
                              width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Min: {item.minStock}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{item.location}</p>
                        <p className="text-xs text-muted-foreground">{item.supplier}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">₹{item.totalValue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          @₹{item.avgCost} each
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(item.lastMovement)}
                        <div>
                          <p className="text-sm">
                            {item.lastMovement === "in" ? "+" : item.lastMovement === "out" ? "-" : "±"}
                            {Math.abs(item.movementQty)}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.lastUpdated}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStockStatusIcon(item.stockStatus)}
                        {getStockStatusBadge(item.stockStatus)}
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="w-4 h-4 mr-2" />
                            Stock In
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Minus className="w-4 h-4 mr-2" />
                            Stock Out
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Adjust Stock
                          </DropdownMenuItem>
                          {item.serialNumbers && (
                            <DropdownMenuItem>
                              <Hash className="w-4 h-4 mr-2" />
                              Manage Serial Numbers
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

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No inventory items found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterCategory !== "all" || filterStatus !== "all" || filterPartType !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No inventory items have been added yet."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
