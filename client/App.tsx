import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VehicleMaster from "./pages/VehicleMaster";
import Companies from "./pages/Companies";
import PartsCatalog from "./pages/PartsCatalog";
import Inventory from "./pages/Inventory";
import Invoicing from "./pages/Invoicing";
import ApiConsole from "./pages/ApiConsole";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehicle-master" element={<VehicleMaster />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/parts-catalog" element={<PartsCatalog />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/api-console" element={<ApiConsole />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
