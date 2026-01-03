import { useState, useMemo } from "react";
import { format } from "date-fns";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Eye, MoreHorizontal, CalendarIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string;
  todaysShift: string;
  workHours: string;
  status: "present" | "absent" | "late" | "half-day" | "on-leave";
}

const initialRecords: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    department: "Engineering",
    date: "2024-01-15",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    breakTime: "1h 0m",
    todaysShift: "9:00 AM - 6:00 PM",
    workHours: "9h 0m",
    status: "present",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    department: "Marketing",
    date: "2024-01-14",
    checkIn: "09:45 AM",
    checkOut: "06:30 PM",
    breakTime: "45m",
    todaysShift: "9:00 AM - 6:00 PM",
    workHours: "8h 45m",
    status: "late",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    department: "HR",
    date: "2024-01-13",
    checkIn: "—",
    checkOut: "—",
    breakTime: "—",
    todaysShift: "9:00 AM - 6:00 PM",
    workHours: "0h 0m",
    status: "absent",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    department: "Sales",
    date: "2024-01-12",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    breakTime: "30m",
    todaysShift: "9:00 AM - 6:00 PM",
    workHours: "4h 0m",
    status: "half-day",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Jessica Brown",
    employeeEmail: "jessica.brown@company.com",
    department: "Engineering",
    date: "2024-01-11",
    checkIn: "—",
    checkOut: "—",
    breakTime: "—",
    todaysShift: "10:00 AM - 7:00 PM",
    workHours: "0h 0m",
    status: "on-leave",
  },
];

const AllAttendance = () => {
  const [allRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Filter records by date range
  const records = useMemo(() => {
    if (!dateRange.from && !dateRange.to) {
      return allRecords;
    }
    return allRecords.filter((record) => {
      const recordDate = new Date(record.date);
      if (dateRange.from && dateRange.to) {
        return recordDate >= dateRange.from && recordDate <= dateRange.to;
      }
      if (dateRange.from) {
        return recordDate >= dateRange.from;
      }
      if (dateRange.to) {
        return recordDate <= dateRange.to;
      }
      return true;
    });
  }, [allRecords, dateRange]);

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    const variants = {
      present: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      absent: "bg-red-500/10 text-red-500 border-red-500/20",
      late: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "half-day": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "on-leave": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };

    const labels = {
      present: "Present",
      absent: "Absent",
      late: "Late",
      "half-day": "Half Day",
      "on-leave": "On Leave",
    };

    const dots = {
      present: "bg-emerald-500",
      absent: "bg-red-500",
      late: "bg-amber-500",
      "half-day": "bg-blue-500",
      "on-leave": "bg-purple-500",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} gap-1.5`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const exportCsv = () => {
    const headers = ["Employee Name", "Employee ID", "Department", "Date", "Check In", "Check Out", "Break", "Today's Shift", "Work Hours", "Status"];
    const rows = records.map((r) => [
      r.employeeName,
      r.employeeId,
      r.department,
      r.date,
      r.checkIn,
      r.checkOut,
      r.breakTime,
      r.todaysShift,
      r.workHours,
      r.status,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<AttendanceRecord>[] = [
    {
      key: "employeeName",
      header: "Employee",
      searchable: true,
      sortable: true,
      render: (record) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={record.profilePic} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {record.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{record.employeeName}</p>
            <p className="text-sm text-muted-foreground">{record.employeeEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "employeeId",
      header: "Employee ID",
      searchable: true,
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "department",
      header: "Department",
      searchable: true,
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (record) => formatDate(record.date),
    },
    {
      key: "checkIn",
      header: "Check In",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "checkOut",
      header: "Check Out",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "breakTime",
      header: "Break",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "todaysShift",
      header: "Today's Shift",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "workHours",
      header: "Work Hours",
      sortable: true,
      className: "text-foreground whitespace-nowrap font-medium",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => getStatusBadge(record.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                toast.info(`Viewing attendance for ${record.employeeName}`);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Present", value: "present" },
        { label: "Absent", value: "absent" },
        { label: "Late", value: "late" },
        { label: "Half Day", value: "half-day" },
        { label: "On Leave", value: "on-leave" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
        { label: "Sales", value: "Sales" },
      ],
    },
    {
      key: "todaysShift",
      label: "Shift",
      options: [
        { label: "9:00 AM - 6:00 PM", value: "9:00 AM - 6:00 PM" },
        { label: "10:00 AM - 7:00 PM", value: "10:00 AM - 7:00 PM" },
        { label: "8:00 AM - 5:00 PM", value: "8:00 AM - 5:00 PM" },
        { label: "Night Shift", value: "10:00 PM - 7:00 AM" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">All Attendance</h1>
          <p className="text-muted-foreground mt-1">View and manage employee attendance records</p>
        </div>
        
        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "From Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <span className="text-muted-foreground">to</span>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "To Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          {(dateRange.from || dateRange.to) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDateRange({ from: undefined, to: undefined })}
              className="h-9 w-9"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <DataTable
        data={records}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search attendance..."
        selectable
        toolbarActions={
          <Button variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        }
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        getRowId={(record) => record.id}
      />
    </AdminLayout>
  );
};

export default AllAttendance;