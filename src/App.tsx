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
import Locations from "./pages/admin/Locations";
import AllAssets from "./pages/admin/AllAssets";
import AssetCategories from "./pages/admin/AssetCategories";
import AssetAssignments from "./pages/admin/AssetAssignments";
import AssetMaintenance from "./pages/admin/AssetMaintenance";
import AssetReport from "./pages/admin/AssetReport";
import AllExpenses from "./pages/admin/AllExpenses";
import ExpenseCategories from "./pages/admin/ExpenseCategories";
import ExpenseClaims from "./pages/admin/ExpenseClaims";
import ExpenseApprovals from "./pages/admin/ExpenseApprovals";
import ExpenseReport from "./pages/admin/ExpenseReport";
import AllInvoices from "./pages/admin/AllInvoices";
import GenerateInvoice from "./pages/admin/GenerateInvoice";
import InvoiceTemplate from "./pages/admin/InvoiceTemplate";
import BillingRequests from "./pages/admin/BillingRequests";
import BillingApprovals from "./pages/admin/BillingApprovals";
import BillingAllocations from "./pages/admin/BillingAllocations";
import BillingCategories from "./pages/admin/BillingCategories";
import BillingReport from "./pages/admin/BillingReport";
import AllShifts from "./pages/admin/AllShifts";
import ShiftAssignments from "./pages/admin/ShiftAssignments";
import ShiftSchedule from "./pages/admin/ShiftSchedule";
import ShiftSwaps from "./pages/admin/ShiftSwaps";
import ShiftReport from "./pages/admin/ShiftReport";
import OnboardingOverview from "./pages/admin/OnboardingOverview";
import OnboardingTasks from "./pages/admin/OnboardingTasks";
import NewHireOnboarding from "./pages/admin/NewHireOnboarding";
import OnboardingReport from "./pages/admin/OnboardingReport";
import OffboardingOverview from "./pages/admin/OffboardingOverview";
import OffboardingTasks from "./pages/admin/OffboardingTasks";
import ExitClearance from "./pages/admin/ExitClearance";
import OffboardingReport from "./pages/admin/OffboardingReport";
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
            <Route path="/admin/employees/locations" element={<Locations />} />
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
            <Route path="/admin/assets" element={<Navigate to="/admin/assets/all" replace />} />
            <Route path="/admin/assets/all" element={<AllAssets />} />
            <Route path="/admin/assets/categories" element={<AssetCategories />} />
            <Route path="/admin/assets/assignments" element={<AssetAssignments />} />
            <Route path="/admin/assets/maintenance" element={<AssetMaintenance />} />
            <Route path="/admin/assets/report" element={<AssetReport />} />
            <Route path="/admin/expenses" element={<Navigate to="/admin/expenses/all" replace />} />
            <Route path="/admin/expenses/all" element={<AllExpenses />} />
            <Route path="/admin/expenses/categories" element={<ExpenseCategories />} />
            <Route path="/admin/expenses/claims" element={<ExpenseClaims />} />
            <Route path="/admin/expenses/approvals" element={<ExpenseApprovals />} />
            <Route path="/admin/expenses/report" element={<ExpenseReport />} />
            <Route path="/admin/billing" element={<Navigate to="/admin/billing/invoices" replace />} />
            <Route path="/admin/billing/invoices" element={<AllInvoices />} />
            <Route path="/admin/billing/generate-invoice" element={<GenerateInvoice />} />
            <Route path="/admin/billing/invoice-template" element={<InvoiceTemplate />} />
            <Route path="/admin/billing/requests" element={<BillingRequests />} />
            <Route path="/admin/billing/approvals" element={<BillingApprovals />} />
            <Route path="/admin/billing/allocations" element={<BillingAllocations />} />
            <Route path="/admin/billing/categories" element={<BillingCategories />} />
            <Route path="/admin/billing/report" element={<BillingReport />} />
            <Route path="/admin/shifts" element={<Navigate to="/admin/shifts/all" replace />} />
            <Route path="/admin/shifts/all" element={<AllShifts />} />
            <Route path="/admin/shifts/assignments" element={<ShiftAssignments />} />
            <Route path="/admin/shifts/schedule" element={<ShiftSchedule />} />
            <Route path="/admin/shifts/swaps" element={<ShiftSwaps />} />
            <Route path="/admin/shifts/report" element={<ShiftReport />} />
            <Route path="/admin/onboarding" element={<Navigate to="/admin/onboarding/overview" replace />} />
            <Route path="/admin/onboarding/overview" element={<OnboardingOverview />} />
            <Route path="/admin/onboarding/new" element={<NewHireOnboarding />} />
            <Route path="/admin/onboarding/tasks" element={<OnboardingTasks />} />
            <Route path="/admin/onboarding/report" element={<OnboardingReport />} />
            <Route path="/admin/offboarding" element={<Navigate to="/admin/offboarding/overview" replace />} />
            <Route path="/admin/offboarding/overview" element={<OffboardingOverview />} />
            <Route path="/admin/offboarding/clearance" element={<ExitClearance />} />
            <Route path="/admin/offboarding/tasks" element={<OffboardingTasks />} />
            <Route path="/admin/offboarding/report" element={<OffboardingReport />} />
            <Route path="/profile-update-request" element={<ProfileUpdateRequest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
