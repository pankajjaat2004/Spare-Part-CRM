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
  Grid,
  List,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Ban,
  Car,
  Star,
} from "lucide-react";
import { useState } from "react";

interface Part {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  partType: "new" | "oem" | "aftermarket" | "refurbished" | "used";
  hsnCode: string;
  price: number;
  stock: number;
  vehicleCompatibility: string[];
  images: string[];
  status: "pending" | "approved" | "rejected" | "discontinued";
  supplier: string;
  lastUpdated: string;
  approvedBy?: string;
  warranty: string;
  rating: number;
}

interface PartsGridProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

export function PartsGrid({ 
  userRole = "admin", 
  viewMode = "grid",
  onViewModeChange 
}: PartsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPartType, setFilterPartType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data for parts
  const parts: Part[] = [
    {
      id: "PRT001",
      partNumber: "BP-ENG-001",
      name: "Brake Pads Set - Front",
      description: "High-performance ceramic brake pads for front wheels",
      category: "Brake System",
      subCategory: "Brake Pads",
      partType: "oem",
      hsnCode: "87089990",
      price: 2500,
      stock: 45,
      vehicleCompatibility: ["Honda Civic 2019-2024", "Honda Accord 2018-2023"],
      images: ["/placeholder.svg"],
      status: "approved",
      supplier: "AutoParts Excellence Pvt Ltd",
      lastUpdated: "2024-01-20",
      approvedBy: "Admin",
      warranty: "12 months",
      rating: 4.5,
    },
    {
      id: "PRT002",
      partNumber: "EF-OIL-002",
      name: "Engine Oil Filter",
      description: "Premium oil filter for better engine protection",
      category: "Engine Parts",
      subCategory: "Oil & Filters",
      partType: "aftermarket",
      hsnCode: "84219990",
      price: 450,
      stock: 120,
      vehicleCompatibility: ["Toyota Camry 2020-2024", "Honda Civic 2019-2024"],
      images: ["/placeholder.svg"],
      status: "pending",
      supplier: "Metro Spare Parts Solutions",
      lastUpdated: "2024-01-22",
      warranty: "6 months",
      rating: 4.2,
    },
    {
      id: "PRT003",
      partNumber: "SP-SUS-003",
      name: "Shock Absorber - Rear",
      description: "Heavy-duty shock absorber for rear suspension",
      category: "Suspension & Steering",
      subCategory: "Shock Absorbers",
      partType: "new",
      hsnCode: "87088090",
      price: 3200,
      stock: 25,
      vehicleCompatibility: ["BMW 3 Series 2015-2020"],
      images: ["/placeholder.svg"],
      status: "approved",
      supplier: "Premium Auto Components",
      lastUpdated: "2024-01-18",
      approvedBy: "Admin",
      warranty: "24 months",
      rating: 4.8,
    },
    {
      id: "PRT004",
      partNumber: "HL-LED-004",
      name: "LED Headlight Assembly",
      description: "Full LED headlight with DRL and turn signals",
      category: "Electrical Components",
      subCategory: "Lighting",
      partType: "aftermarket",
      hsnCode: "85122000",
      price: 8500,
      stock: 12,
      vehicleCompatibility: ["Maruti Swift 2018-2023"],
      images: ["/placeholder.svg"],
      status: "rejected",
      supplier: "Delhi Auto Traders",
      lastUpdated: "2024-01-15",
      warranty: "18 months",
      rating: 3.9,
    },
    {
      id: "PRT005",
      partNumber: "AC-COM-005",
      name: "AC Compressor",
      description: "Remanufactured AC compressor with warranty",
      category: "Cooling System",
      subCategory: "AC Components",
      partType: "refurbished",
      hsnCode: "84148090",
      price: 12000,
      stock: 8,
      vehicleCompatibility: ["Hyundai i20 2014-2020"],
      images: ["/placeholder.svg"],
      status: "approved",
      supplier: "Chennai Motors Pvt Ltd",
      lastUpdated: "2024-01-10",
      approvedBy: "Vehicle Manager",
      warranty: "12 months",
      rating: 4.1,
    },
    {
      id: "PRT006",
      partNumber: "TR-GBX-006",
      name: "Transmission Gear Set",
      description: "Used transmission gear set in good condition",
      category: "Transmission Parts",
      subCategory: "Gear Components",
      partType: "used",
      hsnCode: "87089990",
      price: 15000,
      stock: 3,
      vehicleCompatibility: ["Tata Safari 2012-2017"],
      images: ["/placeholder.svg"],
      status: "discontinued",
      supplier: "North Zone Auto Parts",
      lastUpdated: "2024-01-05",
      warranty: "3 months",
      rating: 3.5,
    },
  ];

  const categories = [
    "Engine Parts",
    "Brake System", 
    "Suspension & Steering",
    "Electrical Components",
    "Cooling System",
    "Transmission Parts",
    "Body Parts",
    "Interior Components",
    "Fuel System",
    "Exhaust System"
  ];

  const partTypes = ["new", "oem", "aftermarket", "refurbished", "used"];
  const statusOptions = ["pending", "approved", "rejected", "discontinued"];

  const getPartTypeBadge = (type: Part["partType"]) => {
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

  const getStatusBadge = (status: Part["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="status-verified">Approved</Badge>;
      case "pending":
        return <Badge className="status-pending">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "discontinued":
        return <Badge variant="outline">Discontinued</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Part["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "discontinued":
        return <Ban className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const filteredParts = parts.filter((part) => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.vehicleCompatibility.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || part.category === filterCategory;
    const matchesPartType = filterPartType === "all" || part.partType === filterPartType;
    const matchesStatus = filterStatus === "all" || part.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesPartType && matchesStatus;
  });

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredParts.map((part) => (
        <Card key={part.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="p-4 pb-2">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-tight">{part.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                    {userRole === "admin" && (
                      <>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Part
                        </DropdownMenuItem>
                        {part.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-success">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-xs text-muted-foreground">{part.partNumber}</p>
              <div className="flex items-center gap-1">
                {getPartTypeBadge(part.partType)}
                {getStatusBadge(part.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {part.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">₹{part.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Stock: {part.stock}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{part.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Car className="w-3 h-3" />
                <span className="line-clamp-1">{part.vehicleCompatibility[0]}</span>
                {part.vehicleCompatibility.length > 1 && (
                  <span>+{part.vehicleCompatibility.length - 1} more</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2">
      {filteredParts.map((part) => (
        <Card key={part.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{part.name}</h3>
                      {getStatusIcon(part.status)}
                      {getPartTypeBadge(part.partType)}
                      {getStatusBadge(part.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{part.partNumber} • {part.category} • {part.subCategory}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{part.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">₹{part.price.toLocaleString()}</span>
                      <span>Stock: {part.stock}</span>
                      <span>HSN: {part.hsnCode}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{part.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                        {userRole === "admin" && (
                          <>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Part
                            </DropdownMenuItem>
                            {part.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-success">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search parts, part numbers, or vehicle compatibility..."
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
              {userRole === "admin" && (
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
              )}
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange?.("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange?.("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parts Display */}
      {filteredParts.length > 0 ? (
        viewMode === "grid" ? renderGridView() : renderListView()
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No parts found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || filterCategory !== "all" || filterPartType !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No parts have been added to the catalog yet."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
