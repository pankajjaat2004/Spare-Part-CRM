import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Building,
  Shield,
  Bell,
  Database,
  Mail,
  Save,
  Users,
  Palette,
  Pencil,
} from "lucide-react";

export default function Settings() {
  const user = {
    name: "Admin User",
    role: "admin" as const,
  };

  const [isEditingCompany, setIsEditingCompany] = useState(false);

  return (
    <Layout userRole={user.role} userName={user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Configure CRM system parameters and preferences
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Company Information</CardTitle>
                <div className="flex items-center gap-2">
                  {!isEditingCompany ? (
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsEditingCompany(true)}>
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  ) : (
                    <Button className="flex items-center gap-2" onClick={() => setIsEditingCompany(false)}>
                      <Save className="w-4 h-4" />
                      Apply Changes
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="SpareParts CRM System" disabled={!isEditingCompany} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input id="gstNumber" defaultValue="27ABCDE1234F1Z5" disabled={!isEditingCompany} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="admin@spareparts.com" disabled={!isEditingCompany} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" disabled={!isEditingCompany} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea id="address" defaultValue="123 Business District, Mumbai, Maharashtra - 400001" disabled={!isEditingCompany} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-approve new parts</h4>
                    <p className="text-sm text-muted-foreground">Automatically approve parts from verified companies</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable API access</h4>
                    <p className="text-sm text-muted-foreground">Allow external systems to access via API</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance mode</h4>
                    <p className="text-sm text-muted-foreground">Temporarily disable system access</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session timeout</h4>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Input className="w-32" defaultValue="60" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests per hour)</Label>
                  <Input id="rateLimit" defaultValue="1000" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">IP whitelisting</h4>
                    <p className="text-sm text-muted-foreground">Restrict API access to specific IPs</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low stock alerts</h4>
                    <p className="text-sm text-muted-foreground">Email when items are low in stock</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New company registrations</h4>
                    <p className="text-sm text-muted-foreground">Notify when companies request access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">System alerts</h4>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic backups</h4>
                    <p className="text-sm text-muted-foreground">Schedule regular database backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select id="backupFrequency" className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                  <Input id="retentionPeriod" defaultValue="30" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Allow user registration</h4>
                    <p className="text-sm text-muted-foreground">Enable self-registration for customers</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email verification required</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultRole">Default User Role</Label>
                  <select id="defaultRole" className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>Customer</option>
                    <option>Company</option>
                    <option>Dealer</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Default Theme</Label>
                  <select id="theme" className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Company Logo URL</Label>
                  <Input id="logoUrl" placeholder="https://example.com/logo.png" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show branding</h4>
                    <p className="text-sm text-muted-foreground">Display company branding in interface</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
