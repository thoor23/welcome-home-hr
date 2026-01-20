import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";

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
import AllEmails from "./pages/admin/AllEmails";
import EmailTemplates from "./pages/admin/EmailTemplates";
import LetterTemplates from "./pages/admin/LetterTemplates";
import EmailConfiguration from "./pages/admin/EmailConfiguration";
import EmailReport from "./pages/admin/EmailReport";
import GenerateLetter from "./pages/admin/GenerateLetter";
import AllEvents from "./pages/admin/AllEvents";
import EventsList from "./pages/admin/EventsList";
import EventCategories from "./pages/admin/EventCategories";
import EventReport from "./pages/admin/EventReport";
import AllTickets from "./pages/admin/AllTickets";
import MyTickets from "./pages/admin/MyTickets";
import TicketCategories from "./pages/admin/TicketCategories";
import SLASettings from "./pages/admin/SLASettings";
import KnowledgeBase from "./pages/admin/KnowledgeBase";
import SupportReport from "./pages/admin/SupportReport";
import AllDocuments from "./pages/admin/AllDocuments";
import MyDocuments from "./pages/admin/MyDocuments";
import DocumentCategories from "./pages/admin/DocumentCategories";
import DocumentSettings from "./pages/admin/DocumentSettings";
import DocumentReport from "./pages/admin/DocumentReport";
import AllAuditLogs from "./pages/admin/AllAuditLogs";
import ActivityLogs from "./pages/admin/ActivityLogs";
import DataChangeLogs from "./pages/admin/DataChangeLogs";
import SecurityLogs from "./pages/admin/SecurityLogs";
import SystemLogs from "./pages/admin/SystemLogs";
import APILogs from "./pages/admin/APILogs";
import AuditSettings from "./pages/admin/AuditSettings";
import CompanySettings from "./pages/admin/CompanySettings";
import UserProfile from "./pages/admin/UserProfile";
import PersonalSettings from "./pages/admin/PersonalSettings";
import ProfileUpdateRequest from "./pages/ProfileUpdateRequest";
import NotFound from "./pages/NotFound";
import ESSDashboard from "./pages/ess/Dashboard";
import ESSAttendanceToday from "./pages/ess/AttendanceToday";
import ESSAttendanceHistory from "./pages/ess/AttendanceHistory";
import ESSAttendanceRegularization from "./pages/ess/AttendanceRegularization";
import ESSLeaveBalance from "./pages/ess/LeaveBalance";
import ESSApplyLeave from "./pages/ess/ApplyLeave";
import ESSLeaveRequests from "./pages/ess/LeaveRequests";
import ESSLeaveHistory from "./pages/ess/LeaveHistory";
import ESSShiftSchedule from "./pages/ess/ShiftSchedule";
import ESSShiftSwapRequests from "./pages/ess/ShiftSwapRequests";
import ESSPayslips from "./pages/ess/Payslips";
import ESSSalaryDetails from "./pages/ess/SalaryDetails";
import ESSTaxDocuments from "./pages/ess/TaxDocuments";
import ESSExpenseSubmit from "./pages/ess/ExpenseSubmit";
import ESSExpenseClaims from "./pages/ess/ExpenseClaims";
import ESSDocuments from "./pages/ess/Documents";
import ESSAssets from "./pages/ess/Assets";
import ESSEvents from "./pages/ess/Events";
import ESSSupportTickets from "./pages/ess/SupportTickets";
import ESSNewTicket from "./pages/ess/NewTicket";
import ESSKnowledgeBase from "./pages/ess/KnowledgeBase";
import ESSSettings from "./pages/ess/Settings";
import ESSProfile from "./pages/ess/Profile";
import ESSNotifications from "./pages/ess/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class" storageKey="nexhr-theme">
      <SidebarProvider>
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
            <Route path="/admin/communications" element={<Navigate to="/admin/communications/all" replace />} />
            <Route path="/admin/communications/all" element={<AllEmails />} />
            <Route path="/admin/communications/generate" element={<GenerateLetter />} />
            <Route path="/admin/communications/email-templates" element={<EmailTemplates />} />
            <Route path="/admin/communications/letter-templates" element={<LetterTemplates />} />
            <Route path="/admin/communications/config" element={<EmailConfiguration />} />
            <Route path="/admin/communications/report" element={<EmailReport />} />
            <Route path="/admin/events" element={<Navigate to="/admin/events/calendar" replace />} />
            <Route path="/admin/events/calendar" element={<AllEvents />} />
            <Route path="/admin/events/list" element={<EventsList />} />
            <Route path="/admin/events/categories" element={<EventCategories />} />
            <Route path="/admin/events/report" element={<EventReport />} />
            <Route path="/admin/support" element={<Navigate to="/admin/support/all" replace />} />
            <Route path="/admin/support/all" element={<AllTickets />} />
            <Route path="/admin/support/my-tickets" element={<MyTickets />} />
            <Route path="/admin/support/categories" element={<TicketCategories />} />
            <Route path="/admin/support/sla" element={<SLASettings />} />
            <Route path="/admin/support/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/admin/support/report" element={<SupportReport />} />
            <Route path="/admin/documents" element={<Navigate to="/admin/documents/all" replace />} />
            <Route path="/admin/documents/all" element={<AllDocuments />} />
            <Route path="/admin/documents/my" element={<MyDocuments />} />
            <Route path="/admin/documents/categories" element={<DocumentCategories />} />
            <Route path="/admin/documents/settings" element={<DocumentSettings />} />
            <Route path="/admin/documents/report" element={<DocumentReport />} />
            <Route path="/admin/audit" element={<Navigate to="/admin/audit/all" replace />} />
            <Route path="/admin/audit/all" element={<AllAuditLogs />} />
            <Route path="/admin/audit/activity" element={<ActivityLogs />} />
            <Route path="/admin/audit/data" element={<DataChangeLogs />} />
            <Route path="/admin/audit/security" element={<SecurityLogs />} />
            <Route path="/admin/audit/system" element={<SystemLogs />} />
            <Route path="/admin/audit/api" element={<APILogs />} />
            <Route path="/admin/audit/settings" element={<AuditSettings />} />
            <Route path="/admin/settings" element={<CompanySettings />} />
            <Route path="/admin/profile" element={<UserProfile />} />
            <Route path="/admin/personal-settings" element={<PersonalSettings />} />
            <Route path="/profile-update-request" element={<ProfileUpdateRequest />} />
            {/* ESS Portal Routes */}
            <Route path="/ess" element={<Navigate to="/ess/dashboard" replace />} />
            <Route path="/ess/dashboard" element={<ESSDashboard />} />
            <Route path="/ess/attendance" element={<Navigate to="/ess/attendance/today" replace />} />
            <Route path="/ess/attendance/today" element={<ESSAttendanceToday />} />
            <Route path="/ess/attendance/history" element={<ESSAttendanceHistory />} />
            <Route path="/ess/attendance/regularization" element={<ESSAttendanceRegularization />} />
            <Route path="/ess/leaves" element={<Navigate to="/ess/leaves/balance" replace />} />
            <Route path="/ess/leaves/balance" element={<ESSLeaveBalance />} />
            <Route path="/ess/leaves/apply" element={<ESSApplyLeave />} />
            <Route path="/ess/leaves/requests" element={<ESSLeaveRequests />} />
            <Route path="/ess/leaves/history" element={<ESSLeaveHistory />} />
            <Route path="/ess/shifts" element={<Navigate to="/ess/shifts/schedule" replace />} />
            <Route path="/ess/shifts/schedule" element={<ESSShiftSchedule />} />
            <Route path="/ess/shifts/swap" element={<ESSShiftSwapRequests />} />
            <Route path="/ess/payroll" element={<Navigate to="/ess/payroll/payslips" replace />} />
            <Route path="/ess/payroll/payslips" element={<ESSPayslips />} />
            <Route path="/ess/payroll/salary" element={<ESSSalaryDetails />} />
            <Route path="/ess/payroll/tax" element={<ESSTaxDocuments />} />
            <Route path="/ess/expenses" element={<Navigate to="/ess/expenses/submit" replace />} />
            <Route path="/ess/expenses/submit" element={<ESSExpenseSubmit />} />
            <Route path="/ess/expenses/claims" element={<ESSExpenseClaims />} />
            <Route path="/ess/documents" element={<ESSDocuments />} />
            <Route path="/ess/assets" element={<ESSAssets />} />
            <Route path="/ess/events" element={<ESSEvents />} />
            <Route path="/ess/support" element={<Navigate to="/ess/support/tickets" replace />} />
            <Route path="/ess/support/tickets" element={<ESSSupportTickets />} />
            <Route path="/ess/support/new" element={<ESSNewTicket />} />
            <Route path="/ess/support/kb" element={<ESSKnowledgeBase />} />
            <Route path="/ess/settings" element={<ESSSettings />} />
            <Route path="/ess/profile" element={<ESSProfile />} />
            <Route path="/ess/notifications" element={<ESSNotifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SidebarProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
