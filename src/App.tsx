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
import Departments from "./pages/admin/Departments";
import Designations from "./pages/admin/Designations";
import EmploymentTypes from "./pages/admin/EmploymentTypes";
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
import SalaryStructure from "./pages/admin/SalaryStructure";
import GeneratePayslip from "./pages/admin/GeneratePayslip";
import PayslipTemplate from "./pages/admin/PayslipTemplate";
import PayrollReport from "./pages/admin/PayrollReport";
import EmployeeSalaries from "./pages/admin/EmployeeSalaries";
import JobPostings from "./pages/admin/JobPostings";
import Applications from "./pages/admin/Applications";
import Candidates from "./pages/admin/Candidates";
import Interviews from "./pages/admin/Interviews";
import Offers from "./pages/admin/Offers";
import RecruitmentReport from "./pages/admin/RecruitmentReport";
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
            <Route path="/admin/employees/departments" element={<Departments />} />
            <Route path="/admin/employees/designations" element={<Designations />} />
            <Route path="/admin/employees/types" element={<EmploymentTypes />} />
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
            <Route path="/admin/payroll" element={<Navigate to="/admin/payroll/salaries" replace />} />
            <Route path="/admin/payroll/salaries" element={<EmployeeSalaries />} />
            <Route path="/admin/payroll/salary-structure" element={<SalaryStructure />} />
            <Route path="/admin/payroll/generate" element={<GeneratePayslip />} />
            <Route path="/admin/payroll/template" element={<PayslipTemplate />} />
            <Route path="/admin/payroll/report" element={<PayrollReport />} />
            <Route path="/admin/recruitment" element={<Navigate to="/admin/recruitment/jobs" replace />} />
            <Route path="/admin/recruitment/jobs" element={<JobPostings />} />
            <Route path="/admin/recruitment/applications" element={<Applications />} />
            <Route path="/admin/recruitment/candidates" element={<Candidates />} />
            <Route path="/admin/recruitment/interviews" element={<Interviews />} />
            <Route path="/admin/recruitment/offers" element={<Offers />} />
            <Route path="/admin/recruitment/report" element={<RecruitmentReport />} />
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
