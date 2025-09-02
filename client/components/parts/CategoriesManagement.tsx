import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  Hash,
  ChevronRight,
  ChevronDown,
  Search,
} from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  hsnCode: string;
  parentId?: string;
  level: number;
  totalParts: number;
  activeParts: number;
  createdAt: string;
  lastUpdated: string;
}

interface CategoriesManagementProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function CategoriesManagement({ userRole = "admin" }: CategoriesManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    hsnCode: "",
    parentId: "",
  });

  // Mock data for categories with hierarchical structure
  const categories: Category[] = [
    // Primary Categories
    {
      id: "CAT001",
      name: "Engine Parts",
      description: "All engine-related components and accessories",
      hsnCode: "84099100",
      level: 0,
      totalParts: 1250,
      activeParts: 1180,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-20",
    },
    {
      id: "CAT001_001",
      name: "Engine Oil & Filters",
      description: "Oil filters, air filters, fuel filters",
      hsnCode: "84219990",
      parentId: "CAT001",
      level: 1,
      totalParts: 320,
      activeParts: 305,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-18",
    },
    {
      id: "CAT001_002",
      name: "Spark Plugs & Ignition",
      description: "Spark plugs, ignition coils, ignition modules",
      hsnCode: "85111000",
      parentId: "CAT001",
      level: 1,
      totalParts: 180,
      activeParts: 170,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-15",
    },
    {
      id: "CAT001_003",
      name: "Pistons & Rings",
      description: "Engine pistons, piston rings, connecting rods",
      hsnCode: "84099100",
      parentId: "CAT001",
      level: 1,
      totalParts: 95,
      activeParts: 88,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-12",
    },
    {
      id: "CAT002",
      name: "Brake System",
      description: "Brake components and related parts",
      hsnCode: "87089990",
      level: 0,
      totalParts: 890,
      activeParts: 845,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-19",
    },
    {
      id: "CAT002_001",
      name: "Brake Pads",
      description: "Front and rear brake pads for all vehicle types",
      hsnCode: "87089990",
      parentId: "CAT002",
      level: 1,
      totalParts: 425,
      activeParts: 410,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-19",
    },
    {
      id: "CAT002_002",
      name: "Brake Discs & Rotors",
      description: "Brake discs, rotors, and related hardware",
      hsnCode: "87089990",
      parentId: "CAT002",
      level: 1,
      totalParts: 280,
      activeParts: 265,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-17",
    },
    {
      id: "CAT003",
      name: "Suspension & Steering",
      description: "Suspension components and steering parts",
      hsnCode: "87088090",
      level: 0,
      totalParts: 650,
      activeParts: 620,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-16",
    },
    {
      id: "CAT003_001",
      name: "Shock Absorbers",
      description: "Front and rear shock absorbers and struts",
      hsnCode: "87088090",
      parentId: "CAT003",
      level: 1,
      totalParts: 220,
      activeParts: 210,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-16",
    },
    {
      id: "CAT004",
      name: "Electrical Components",
      description: "Electrical and electronic parts",
      hsnCode: "85122000",
      level: 0,
      totalParts: 1120,
      activeParts: 1050,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-21",
    },
    {
      id: "CAT004_001",
      name: "Lighting",
      description: "Headlights, taillights, indicators, and bulbs",
      hsnCode: "85122000",
      parentId: "CAT004",
      level: 1,
      totalParts: 380,
      activeParts: 360,
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-21",
    },
  ];

  const primaryCategories = categories.filter(cat => cat.level === 0);
  const subCategories = categories.filter(cat => cat.level === 1);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getSubCategories = (parentId: string) => {
    return subCategories.filter(cat => cat.parentId === parentId);
  };

  const handleCreateCategory = () => {
    console.log("Creating category:", newCategory);
    setShowCreateDialog(false);
    setNewCategory({ name: "", description: "", hsnCode: "", parentId: "" });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.hsnCode.includes(searchTerm)
  );

  if (userRole !== "admin") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground text-center">
            Category management is available only to system administrators.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Category Management
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                      Add a new category or sub-category to the parts catalog structure.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name *</Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter category name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Textarea
                        id="categoryDescription"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of this category"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hsnCode">HSN Code *</Label>
                      <Input
                        id="hsnCode"
                        value={newCategory.hsnCode}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, hsnCode: e.target.value }))}
                        placeholder="Enter HSN code for GST classification"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentCategory">Parent Category (Optional)</Label>
                      <select
                        id="parentCategory"
                        value={newCategory.parentId}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, parentId: e.target.value }))}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">None (Primary Category)</option>
                        {primaryCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateCategory}>
                        Create Category
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Categories Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{primaryCategories.length}</p>
                <p className="text-xs text-muted-foreground">Primary Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-secondary-600" />
              <div>
                <p className="text-2xl font-bold">{subCategories.length}</p>
                <p className="text-xs text-muted-foreground">Sub-Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.totalParts, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Parts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{new Set(categories.map(cat => cat.hsnCode)).size}</p>
                <p className="text-xs text-muted-foreground">Unique HSN Codes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Hierarchy Display */}
      <Card>
        <CardHeader>
          <CardTitle>Category Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {primaryCategories
              .filter(category => 
                !searchTerm || 
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getSubCategories(category.id).some(sub => 
                  sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  sub.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((category) => (
              <div key={category.id} className="border rounded-lg">
                {/* Primary Category */}
                <div 
                  className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                    <FolderOpen className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        HSN: {category.hsnCode}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {category.activeParts}/{category.totalParts} parts
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Sub-Category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Sub-Categories */}
                {expandedCategories.has(category.id) && (
                  <div className="border-t bg-muted/20">
                    {getSubCategories(category.id).map((subCategory) => (
                      <div 
                        key={subCategory.id} 
                        className="flex items-center justify-between p-4 pl-16 hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-secondary-600" />
                          <div>
                            <h4 className="font-medium">{subCategory.name}</h4>
                            <p className="text-sm text-muted-foreground">{subCategory.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              HSN: {subCategory.hsnCode}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {subCategory.activeParts}/{subCategory.totalParts} parts
                            </p>
                          </div>
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
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Sub-Category
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Sub-Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                    {getSubCategories(category.id).length === 0 && (
                      <div className="p-4 pl-16 text-sm text-muted-foreground">
                        No sub-categories yet.{" "}
                        <Button variant="link" className="p-0 h-auto">
                          Add the first sub-category
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {primaryCategories.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first category.
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Category
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
