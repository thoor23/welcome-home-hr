import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";
import OrganizationOnboarding from "./pages/OrganizationOnboarding";
import Dashboard from "./pages/admin/Dashboard";
import AllEmployees from "./pages/admin/AllEmployees";
import DetailsRegularization from "./pages/admin/DetailsRegularization";
import ProfileUpdateRequest from "./pages/ProfileUpdateRequest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class" storageKey="nexhr-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/organization-onboarding" element={<OrganizationOnboarding />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/employees" element={<Navigate to="/admin/employees/all" replace />} />
            <Route path="/admin/employees/all" element={<AllEmployees />} />
            <Route path="/admin/employees/regularization" element={<DetailsRegularization />} />
            <Route path="/profile-update-request" element={<ProfileUpdateRequest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
