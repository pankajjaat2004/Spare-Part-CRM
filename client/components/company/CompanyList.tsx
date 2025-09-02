import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  UserPlus,
  Ban,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

interface Company {
  id: string;
  name: string;
  gstNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: "pending" | "verified" | "suspended" | "rejected";
  registrationDate: string;
  lastActive: string;
  totalUsers: number;
  totalParts: number;
}

interface CompanyListProps {
  userRole?: "admin" | "dealer" | "company" | "api" | "customer";
}

export function CompanyList({ userRole = "admin" }: CompanyListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data for companies
  const companies: Company[] = [
    {
      id: "CMP001",
      name: "AutoParts Excellence Pvt Ltd",
      gstNumber: "27ABCDE1234F1Z5",
      contactPerson: "Rajesh Kumar",
      email: "rajesh@autoparts.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      state: "Maharashtra",
      status: "verified",
      registrationDate: "2024-01-15",
      lastActive: "2 hours ago",
      totalUsers: 5,
      totalParts: 1250,
    },
    {
      id: "CMP002",
      name: "Metro Spare Parts Solutions",
      gstNumber: "29FGHIJ5678K2L6",
      contactPerson: "Priya Sharma",
      email: "priya@metrospares.com",
      phone: "+91 87654 32109",
      city: "Bangalore",
      state: "Karnataka",
      status: "pending",
      registrationDate: "2024-01-20",
      lastActive: "1 day ago",
      totalUsers: 2,
      totalParts: 450,
    },
    {
      id: "CMP003",
      name: "Premium Auto Components",
      gstNumber: "06MNOPQ9012R3S7",
      contactPerson: "Amit Patel",
      email: "amit@premiumauto.com",
      phone: "+91 76543 21098",
      city: "Ahmedabad",
      state: "Gujarat",
      status: "suspended",
      registrationDate: "2024-01-10",
      lastActive: "1 week ago",
      totalUsers: 8,
      totalParts: 2100,
    },
    {
      id: "CMP004",
      name: "Delhi Auto Traders",
      gstNumber: "07TUVWX3456Y4Z8",
      contactPerson: "Suresh Gupta",
      email: "suresh@delhiauto.com",
      phone: "+91 65432 10987",
      city: "New Delhi",
      state: "Delhi",
      status: "verified",
      registrationDate: "2024-01-05",
      lastActive: "30 minutes ago",
      totalUsers: 12,
      totalParts: 3200,
    },
    {
      id: "CMP005",
      name: "Chennai Motors Pvt Ltd",
      gstNumber: "33ABCDE7890F5G1",
      contactPerson: "Lakshmi Raman",
      email: "lakshmi@chennaiotors.com",
      phone: "+91 54321 09876",
      city: "Chennai",
      state: "Tamil Nadu",
      status: "rejected",
      registrationDate: "2024-01-25",
      lastActive: "3 days ago",
      totalUsers: 0,
      totalParts: 0,
    },
  ];

  const getStatusIcon = (status: Company["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "suspended":
        return <Ban className="w-4 h-4 text-destructive" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Company["status"]) => {
    switch (status) {
      case "verified":
        return <Badge className="status-verified">Verified</Badge>;
      case "pending":
        return <Badge className="status-pending">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.gstNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || company.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statsData = {
    total: companies.length,
    verified: companies.filter(c => c.status === "verified").length,
    pending: companies.filter(c => c.status === "pending").length,
    suspended: companies.filter(c => c.status === "suspended").length,
    rejected: companies.filter(c => c.status === "rejected").length,
  };

  if (userRole !== "admin") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground text-center">
            Company management is available only to system administrators.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{statsData.total}</p>
                <p className="text-xs text-muted-foreground">Total Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{statsData.verified}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{statsData.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ban className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{statsData.suspended}</p>
                <p className="text-xs text-muted-foreground">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{statsData.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Company Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, GST numbers, or contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Status: {filterStatus === "all" ? "All" : filterStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All Companies
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("verified")}>
                    Verified
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("suspended")}>
                    Suspended
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Companies Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>GST Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users/Parts</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {company.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{company.contactPerson}</p>
                        <p className="text-xs text-muted-foreground">{company.email}</p>
                        <p className="text-xs text-muted-foreground">{company.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{company.city}</p>
                        <p className="text-xs text-muted-foreground">{company.state}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {company.gstNumber}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(company.status)}
                        {getStatusBadge(company.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <p className="text-sm font-medium">{company.totalUsers} users</p>
                        <p className="text-xs text-muted-foreground">{company.totalParts} parts</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-muted-foreground">{company.lastActive}</p>
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
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Company
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Manage Users
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {company.status === "verified" && (
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend Company
                            </DropdownMenuItem>
                          )}
                          {company.status === "suspended" && (
                            <DropdownMenuItem className="text-success">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Reactivate Company
                            </DropdownMenuItem>
                          )}
                          {company.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-success">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Company
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Reject Company
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No companies found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "No companies have been registered yet."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
