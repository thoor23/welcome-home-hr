import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Users,
  UserCheck,
  UserX,
  Briefcase,
  Eye,
  Calendar,
  Edit,
  Archive,
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  currentCompany: string;
  expectedSalary: string;
  appliedJobs: number;
  status: string;
  lastUpdated: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "",
    email: "alex.t@email.com",
    phone: "+1 (555) 111-2222",
    skills: ["React", "TypeScript", "Node.js"],
    experience: 5,
    currentCompany: "Tech Corp",
    expectedSalary: "$130k",
    appliedJobs: 2,
    status: "Active",
    lastUpdated: "2024-01-20",
  },
  {
    id: "2",
    name: "Jessica Lee",
    avatar: "",
    email: "j.lee@email.com",
    phone: "+1 (555) 222-3333",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    experience: 7,
    currentCompany: "Innovation Inc",
    expectedSalary: "$150k",
    appliedJobs: 1,
    status: "Active",
    lastUpdated: "2024-01-19",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    avatar: "",
    email: "m.johnson@email.com",
    phone: "+1 (555) 333-4444",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    experience: 4,
    currentCompany: "Design Studio",
    expectedSalary: "$100k",
    appliedJobs: 3,
    status: "Passive",
    lastUpdated: "2024-01-15",
  },
  {
    id: "4",
    name: "Rachel Kim",
    avatar: "",
    email: "r.kim@email.com",
    phone: "+1 (555) 444-5555",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: 6,
    currentCompany: "Data Systems",
    expectedSalary: "$140k",
    appliedJobs: 1,
    status: "Hired",
    lastUpdated: "2024-01-10",
  },
  {
    id: "5",
    name: "Tom Wilson",
    avatar: "",
    email: "t.wilson@email.com",
    phone: "+1 (555) 555-6666",
    skills: ["Java", "Spring", "Microservices"],
    experience: 8,
    currentCompany: "Enterprise Solutions",
    expectedSalary: "$160k",
    appliedJobs: 0,
    status: "Blacklisted",
    lastUpdated: "2024-01-05",
  },
];

const statsData = [
  { title: "Total Candidates", value: "342", icon: Users, color: "text-primary" },
  { title: "Active", value: "256", icon: UserCheck, color: "text-emerald-500" },
  { title: "Hired", value: "48", icon: Briefcase, color: "text-blue-500" },
  { title: "Blacklisted", value: "12", icon: UserX, color: "text-destructive" },
];

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",
  });

  const columns: Column<Candidate>[] = [
    {
      key: "name",
      header: "Candidate",
      sortable: true,
      searchable: true,
      render: (candidate) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {candidate.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{candidate.name}</div>
            <div className="text-xs text-muted-foreground">{candidate.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "skills",
      header: "Skills",
      render: (candidate) => (
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "experience",
      header: "Experience",
      sortable: true,
      render: (candidate) => `${candidate.experience} years`,
    },
    {
      key: "currentCompany",
      header: "Current Company",
    },
    {
      key: "expectedSalary",
      header: "Expected Salary",
      sortable: true,
    },
    {
      key: "appliedJobs",
      header: "Applied Jobs",
      sortable: true,
      render: (candidate) => (
        <Badge variant="secondary">{candidate.appliedJobs}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (candidate) => {
        const statusColors: Record<string, string> = {
          Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Passive: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          Hired: "bg-primary/10 text-primary border-primary/20",
          Blacklisted: "bg-destructive/10 text-destructive border-destructive/20",
        };
        return (
          <Badge className={statusColors[candidate.status] || ""} variant="outline">
            {candidate.status}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (candidate) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View Profile">
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Schedule Interview"
            onClick={() => toast.success(`Interview scheduled for ${candidate.name}`)}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Archive">
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Passive", value: "Passive" },
        { label: "Hired", value: "Hired" },
        { label: "Blacklisted", value: "Blacklisted" },
      ],
    },
  ];

  const handleSubmit = () => {
    const newCandidate: Candidate = {
      id: String(candidates.length + 1),
      name: formData.name,
      avatar: "",
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills.split(",").map((s) => s.trim()),
      experience: parseInt(formData.experience) || 0,
      currentCompany: formData.currentCompany,
      expectedSalary: formData.expectedSalary,
      appliedJobs: 0,
      status: "Active",
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setCandidates([...candidates, newCandidate]);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      currentCompany: "",
      expectedSalary: "",
    });
    toast.success("Candidate added successfully");
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
                  <h1 className="text-2xl font-bold text-foreground">Candidates</h1>
                  <p className="text-muted-foreground">Manage candidate pool and talent database</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Candidate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Candidate</DialogTitle>
                      <DialogDescription>
                        Add a new candidate to the talent pool
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@email.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience (years)</Label>
                          <Input
                            id="experience"
                            type="number"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="5"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          placeholder="React, TypeScript, Node.js"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentCompany">Current Company</Label>
                          <Input
                            id="currentCompany"
                            value={formData.currentCompany}
                            onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expectedSalary">Expected Salary</Label>
                          <Input
                            id="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                            placeholder="$100k"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Add Candidate</Button>
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
                data={candidates}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search candidates..."
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
