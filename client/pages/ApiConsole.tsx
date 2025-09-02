import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Code,
  Key,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  Users,
  Database,
  Shield,
} from "lucide-react";

export default function ApiConsole() {
  const user = {
    name: "Admin User",
    role: "admin" as const,
  };

  const apiStats = {
    totalRequests: 15420,
    successfulRequests: 14891,
    failedRequests: 529,
    averageResponseTime: 245,
    activeApiKeys: 12,
    rateLimitHits: 45,
  };

  const endpoints = [
    { path: "/api/parts/search", method: "GET", description: "Search parts catalog", usage: 3420 },
    { path: "/api/inventory/check", method: "GET", description: "Check stock levels", usage: 2890 },
    { path: "/api/orders/create", method: "POST", description: "Create new order", usage: 1560 },
    { path: "/api/invoices/list", method: "GET", description: "List invoices", usage: 980 },
    { path: "/api/vehicles/compatibility", method: "GET", description: "Check compatibility", usage: 760 },
  ];

  const recentApiCalls = [
    { timestamp: "2024-01-22 14:30:15", endpoint: "/api/parts/search", status: 200, responseTime: 185, client: "AutoDealer Pro" },
    { timestamp: "2024-01-22 14:29:42", endpoint: "/api/inventory/check", status: 200, responseTime: 120, client: "Parts Portal" },
    { timestamp: "2024-01-22 14:28:33", endpoint: "/api/orders/create", status: 401, responseTime: 45, client: "Mobile App" },
    { timestamp: "2024-01-22 14:27:18", endpoint: "/api/vehicles/compatibility", status: 200, responseTime: 310, client: "Web Client" },
  ];

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">API Console</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Enable B2B/B2C vendor integration through RESTful APIs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="status-verified">
              <CheckCircle className="w-3 h-3 mr-1" />
              API Online
            </Badge>
            <Button className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Generate API Key
            </Button>
          </div>
        </div>

        {/* API Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{apiStats.totalRequests.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{((apiStats.successfulRequests / apiStats.totalRequests) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{apiStats.averageResponseTime}ms</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{apiStats.activeApiKeys}</p>
                  <p className="text-xs text-muted-foreground">Active Keys</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Testing Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Tester</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Endpoint</label>
                <Input placeholder="/api/parts/search" />
              </div>
              <div>
                <label className="text-sm font-medium">Method</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Headers</label>
                <Textarea placeholder='{"Authorization": "Bearer your-api-key"}' rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Request Body</label>
                <Textarea placeholder='{"query": "brake pads", "limit": 10}' rows={4} />
              </div>
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-xs overflow-auto">
{`{
  "status": "success",
  "data": {
    "parts": [
      {
        "id": "BP-ENG-001",
        "name": "Brake Pads Set - Front",
        "price": 2500,
        "stock": 45,
        "type": "oem"
      }
    ],
    "total": 1,
    "page": 1
  },
  "response_time": "245ms"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle>Popular API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((endpoint, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{endpoint.path}</code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                        {endpoint.method}
                      </Badge>
                    </TableCell>
                    <TableCell>{endpoint.description}</TableCell>
                    <TableCell>{endpoint.usage.toLocaleString()} calls</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent API Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Client</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApiCalls.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs">{call.timestamp}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{call.endpoint}</code>
                    </TableCell>
                    <TableCell>
                      <Badge className={call.status === 200 ? "status-verified" : "bg-destructive text-destructive-foreground"}>
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{call.responseTime}ms</TableCell>
                    <TableCell>{call.client}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
