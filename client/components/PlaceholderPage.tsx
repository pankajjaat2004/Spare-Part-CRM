import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Construction,
  ArrowLeft,
  MessageCircle,
  Lightbulb,
} from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  features?: string[];
  userRole?: 'admin' | 'dealer' | 'company' | 'api' | 'customer';
  userName?: string;
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
  features = [],
  userRole = 'admin',
  userName = 'Admin User',
}: PlaceholderPageProps) {
  return (
    <Layout userRole={userRole} userName={userName}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </a>
          </Button>
        </div>

        {/* Main Content */}
        <Card className="border-dashed border-2">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <p className="text-muted-foreground text-lg">{description}</p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <Badge variant="secondary" className="status-pending">
              <Construction className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>

            {features.length > 0 && (
              <div className="max-w-md mx-auto">
                <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Planned Features
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                This module is currently under development. Continue prompting to help fill in the content for this page.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <a href="/">
                    Return to Dashboard
                  </a>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Request Feature
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <h4 className="font-semibold text-sm mb-2">Role-Based Access</h4>
            <p className="text-xs text-muted-foreground">
              This page will show different content based on your user role
            </p>
          </Card>
          <Card className="text-center p-4">
            <h4 className="font-semibold text-sm mb-2">Data Integration</h4>
            <p className="text-xs text-muted-foreground">
              Full integration with the CRM database and API system
            </p>
          </Card>
          <Card className="text-center p-4">
            <h4 className="font-semibold text-sm mb-2">Real-time Updates</h4>
            <p className="text-xs text-muted-foreground">
              Live data synchronization and instant notifications
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
