import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LogFilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  showLogType?: boolean;
  logTypeOptions?: string[];
}

interface FilterState {
  logType: string;
  module: string;
  user: string;
  status: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
}

const modules = [
  "All Modules",
  "Dashboard",
  "Employees",
  "Attendance",
  "Payroll",
  "Leave",
  "Documents",
  "Authentication",
  "Settings",
];

const statuses = ["All Status", "Success", "Failed", "Warning", "Pending"];

export function LogFilterPanel({
  onFilterChange,
  showLogType = true,
  logTypeOptions = ["All Types", "Activity", "Data", "Security", "System", "API"],
}: LogFilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    logType: "All Types",
    module: "All Modules",
    user: "",
    status: "All Status",
    dateFrom: undefined,
    dateTo: undefined,
  });

  const handleFilterChange = (key: keyof FilterState, value: string | Date | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      logType: "All Types",
      module: "All Modules",
      user: "",
      status: "All Status",
      dateFrom: undefined,
      dateTo: undefined,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.logType !== "All Types" ||
    filters.module !== "All Modules" ||
    filters.user !== "" ||
    filters.status !== "All Status" ||
    filters.dateFrom !== undefined ||
    filters.dateTo !== undefined;

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {showLogType && (
          <div className="space-y-2">
            <Label>Log Type</Label>
            <Select
              value={filters.logType}
              onValueChange={(value) => handleFilterChange("logType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {logTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Module</Label>
          <Select
            value={filters.module}
            onValueChange={(value) => handleFilterChange("module", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem key={module} value={module}>
                  {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>User</Label>
          <Input
            placeholder="Search user..."
            value={filters.user}
            onChange={(e) => handleFilterChange("user", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.dateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateFrom ? format(filters.dateFrom, "PP") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateFrom}
                onSelect={(date) => handleFilterChange("dateFrom", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Date To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.dateTo && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateTo ? format(filters.dateTo, "PP") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateTo}
                onSelect={(date) => handleFilterChange("dateTo", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button size="sm" variant="secondary">
          Today
        </Button>
        <Button size="sm" variant="secondary">
          This Week
        </Button>
        <Button size="sm" variant="secondary">
          This Month
        </Button>
        <Button size="sm" variant="secondary">
          Errors Only
        </Button>
      </div>
    </div>
  );
}
