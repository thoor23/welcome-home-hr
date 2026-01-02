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
import AttendanceOverview from "./pages/admin/AttendanceOverview";
import AllAttendance from "./pages/admin/AllAttendance";
import AttendanceRegularization from "./pages/admin/AttendanceRegularization";
import AttendanceRules from "./pages/admin/AttendanceRules";
import LeaveOverview from "./pages/admin/LeaveOverview";
import AllLeaves from "./pages/admin/AllLeaves";
import LeaveRequests from "./pages/admin/LeaveRequests";
import LeaveRules from "./pages/admin/LeaveRules";
import LeaveReport from "./pages/admin/LeaveReport";
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
            <Route path="/admin/attendance" element={<Navigate to="/admin/attendance/overview" replace />} />
            <Route path="/admin/attendance/overview" element={<AttendanceOverview />} />
            <Route path="/admin/attendance/all" element={<AllAttendance />} />
            <Route path="/admin/attendance/regularization" element={<AttendanceRegularization />} />
            <Route path="/admin/attendance/rules" element={<AttendanceRules />} />
            <Route path="/admin/leave" element={<Navigate to="/admin/leave/overview" replace />} />
            <Route path="/admin/leave/overview" element={<LeaveOverview />} />
            <Route path="/admin/leave/all" element={<AllLeaves />} />
            <Route path="/admin/leave/requests" element={<LeaveRequests />} />
            <Route path="/admin/leave/rules" element={<LeaveRules />} />
            <Route path="/admin/leave/report" element={<LeaveReport />} />
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
