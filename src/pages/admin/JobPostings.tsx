import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  Edit,
  XCircle,
  Copy,
  Trash2,
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
  postedDate: string;
  deadline: string;
  status: string;
  applicationsCount: number;
}

const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "New York",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salaryRange: "$120k - $150k",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    status: "Open",
    applicationsCount: 45,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salaryRange: "$100k - $130k",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    status: "Open",
    applicationsCount: 32,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    department: "Design",
    location: "San Francisco",
    jobType: "Contract",
    experienceLevel: "Senior",
    salaryRange: "$90k - $120k",
    postedDate: "2024-01-05",
    deadline: "2024-01-25",
    status: "Closed",
    applicationsCount: 28,
  },
  {
    id: "4",
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Chicago",
    jobType: "Part-time",
    experienceLevel: "Entry-level",
    salaryRange: "$40k - $55k",
    postedDate: "2024-01-18",
    deadline: "2024-02-18",
    status: "Draft",
    applicationsCount: 0,
  },
  {
    id: "5",
    title: "Data Analyst",
    department: "Analytics",
    location: "Boston",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salaryRange: "$80k - $100k",
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
    status: "Open",
    applicationsCount: 18,
  },
];

const statsData = [
  { title: "Total Jobs", value: "24", icon: Briefcase, color: "text-primary" },
  { title: "Open Positions", value: "18", icon: CheckCircle, color: "text-emerald-500" },
  { title: "Applications", value: "156", icon: FileText, color: "text-blue-500" },
  { title: "Positions Filled", value: "6", icon: Users, color: "text-amber-500" },
];

export default function JobPostings() {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    deadline: "",
  });

  const columns: Column<JobPosting>[] = [
    {
      key: "title",
      header: "Job Title",
      sortable: true,
      searchable: true,
      render: (job) => (
        <div className="font-medium text-foreground">{job.title}</div>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
    },
    {
      key: "jobType",
      header: "Job Type",
      render: (job) => (
        <Badge variant="outline">{job.jobType}</Badge>
      ),
    },
    {
      key: "experienceLevel",
      header: "Experience",
      sortable: true,
    },
    {
      key: "salaryRange",
      header: "Salary Range",
    },
    {
      key: "deadline",
      header: "Deadline",
      sortable: true,
      render: (job) => new Date(job.deadline).toLocaleDateString(),
    },
    {
      key: "applicationsCount",
      header: "Applications",
      sortable: true,
      render: (job) => (
        <Badge variant="secondary">{job.applicationsCount}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (job) => {
        const statusColors: Record<string, string> = {
          Open: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Closed: "bg-destructive/10 text-destructive border-destructive/20",
          Draft: "bg-muted text-muted-foreground border-muted",
        };
        return (
          <Badge className={statusColors[job.status] || ""} variant="outline">
            {job.status}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (job) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
          {job.status === "Open" && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
              <XCircle className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Product", value: "Product" },
        { label: "Design", value: "Design" },
        { label: "Human Resources", value: "Human Resources" },
        { label: "Analytics", value: "Analytics" },
      ],
    },
    {
      key: "jobType",
      label: "Job Type",
      options: [
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Contract", value: "Contract" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Draft", value: "Draft" },
      ],
    },
  ];

  const handleSubmit = () => {
    const newJob: JobPosting = {
      id: String(jobs.length + 1),
      title: formData.title,
      department: formData.department,
      location: formData.location,
      jobType: formData.jobType,
      experienceLevel: formData.experienceLevel,
      salaryRange: `$${formData.salaryMin} - $${formData.salaryMax}`,
      postedDate: new Date().toISOString().split("T")[0],
      deadline: formData.deadline,
      status: "Draft",
      applicationsCount: 0,
    };
    setJobs([...jobs, newJob]);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      department: "",
      location: "",
      jobType: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      description: "",
      requirements: "",
      deadline: "",
    });
    toast.success("Job posting created successfully");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Job Postings</h1>
                  <p className="text-muted-foreground">Manage job openings and postings</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Job Posting</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new job posting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Senior Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) => setFormData({ ...formData, department: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Product">Product</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Human Resources">Human Resources</SelectItem>
                              <SelectItem value="Analytics">Analytics</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, Remote"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobType">Job Type</Label>
                          <Select
                            value={formData.jobType}
                            onValueChange={(value) => setFormData({ ...formData, jobType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience Level</Label>
                          <Select
                            value={formData.experienceLevel}
                            onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Entry-level">Entry-level</SelectItem>
                              <SelectItem value="Mid-level">Mid-level</SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Lead">Lead</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deadline">Application Deadline</Label>
                          <Input
                            id="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="salaryMin">Salary Min ($)</Label>
                          <Input
                            id="salaryMin"
                            value={formData.salaryMin}
                            onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                            placeholder="e.g. 80000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salaryMax">Salary Max ($)</Label>
                          <Input
                            id="salaryMax"
                            value={formData.salaryMax}
                            onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                            placeholder="e.g. 120000"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe the role and responsibilities..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          placeholder="List the required skills and qualifications..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Create Job</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Data Table */}
              <DataTable
                data={jobs}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search jobs..."
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
