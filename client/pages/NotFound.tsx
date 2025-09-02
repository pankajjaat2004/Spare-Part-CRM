import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileQuestion,
  Home,
  ArrowLeft,
  Search,
} from 'lucide-react';

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-12 h-12 text-muted-foreground" />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex items-center gap-2">
            <a href="/">
              <Home className="w-4 h-4" />
              Back to Dashboard
            </a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="ghost" asChild className="justify-start h-auto p-3">
                <a href="/parts-catalog">
                  <div className="text-left">
                    <div className="font-medium">Parts Catalog</div>
                    <div className="text-xs text-muted-foreground">Browse and manage parts</div>
                  </div>
                </a>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-auto p-3">
                <a href="/inventory">
                  <div className="text-left">
                    <div className="font-medium">Inventory</div>
                    <div className="text-xs text-muted-foreground">Stock management</div>
                  </div>
                </a>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-auto p-3">
                <a href="/companies">
                  <div className="text-left">
                    <div className="font-medium">Companies</div>
                    <div className="text-xs text-muted-foreground">Manage dealers & vendors</div>
                  </div>
                </a>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-auto p-3">
                <a href="/reports">
                  <div className="text-left">
                    <div className="font-medium">Reports</div>
                    <div className="text-xs text-muted-foreground">Analytics & insights</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please contact the system administrator.
        </p>
      </div>
    </Layout>
  );
}
