import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Edit,
  Eye,
  Ban,
} from "lucide-react";

interface Offer {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  department: string;
  offeredSalary: string;
  joiningDate: string;
  offerSentDate: string;
  responseDeadline: string;
  status: string;
  benefits: string;
}

const mockOffers: Offer[] = [
  {
    id: "1",
    candidateName: "John Smith",
    candidateAvatar: "",
    jobTitle: "Senior Software Engineer",
    department: "Engineering",
    offeredSalary: "$140,000",
    joiningDate: "2024-02-15",
    offerSentDate: "2024-01-20",
    responseDeadline: "2024-01-27",
    status: "Sent",
    benefits: "Health, 401k, Stock Options",
  },
  {
    id: "2",
    candidateName: "Emily Johnson",
    candidateAvatar: "",
    jobTitle: "Product Manager",
    department: "Product",
    offeredSalary: "$125,000",
    joiningDate: "2024-02-01",
    offerSentDate: "2024-01-18",
    responseDeadline: "2024-01-25",
    status: "Accepted",
    benefits: "Health, 401k, Remote Work",
  },
  {
    id: "3",
    candidateName: "Michael Chen",
    candidateAvatar: "",
    jobTitle: "UI/UX Designer",
    department: "Design",
    offeredSalary: "$105,000",
    joiningDate: "2024-02-10",
    offerSentDate: "2024-01-15",
    responseDeadline: "2024-01-22",
    status: "Negotiating",
    benefits: "Health, 401k",
  },
  {
    id: "4",
    candidateName: "Sarah Williams",
    candidateAvatar: "",
    jobTitle: "Data Analyst",
    department: "Analytics",
    offeredSalary: "$95,000",
    joiningDate: "2024-02-20",
    offerSentDate: "2024-01-10",
    responseDeadline: "2024-01-17",
    status: "Rejected",
    benefits: "Health, 401k",
  },
  {
    id: "5",
    candidateName: "David Brown",
    candidateAvatar: "",
    jobTitle: "HR Coordinator",
    department: "Human Resources",
    offeredSalary: "$65,000",
    joiningDate: "2024-03-01",
    offerSentDate: "",
    responseDeadline: "",
    status: "Draft",
    benefits: "Health, 401k",
  },
  {
    id: "6",
    candidateName: "Lisa Anderson",
    candidateAvatar: "",
    jobTitle: "Senior Software Engineer",
    department: "Engineering",
    offeredSalary: "$135,000",
    joiningDate: "2024-02-05",
    offerSentDate: "2024-01-05",
    responseDeadline: "2024-01-12",
    status: "Expired",
    benefits: "Health, 401k, Stock Options",
  },
];

const statsData = [
  { title: "Total Offers", value: "28", icon: FileCheck, color: "text-primary" },
  { title: "Pending Response", value: "8", icon: Clock, color: "text-amber-500" },
  { title: "Accepted", value: "15", icon: CheckCircle, color: "text-emerald-500" },
  { title: "Declined", value: "5", icon: XCircle, color: "text-destructive" },
];

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidate: "",
    jobTitle: "",
    department: "",
    salary: "",
    joiningDate: "",
    deadline: "",
    benefits: "",
    notes: "",
  });

  const columns: Column<Offer>[] = [
    {
      key: "candidateName",
      header: "Candidate",
      sortable: true,
      searchable: true,
      render: (offer) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={offer.candidateAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {offer.candidateName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-foreground">{offer.candidateName}</div>
        </div>
      ),
    },
    {
      key: "jobTitle",
      header: "Position",
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
    },
    {
      key: "offeredSalary",
      header: "Offered Salary",
      sortable: true,
      render: (offer) => (
        <span className="font-semibold text-foreground">{offer.offeredSalary}</span>
      ),
    },
    {
      key: "joiningDate",
      header: "Joining Date",
      sortable: true,
      render: (offer) => new Date(offer.joiningDate).toLocaleDateString(),
    },
    {
      key: "offerSentDate",
      header: "Sent Date",
      render: (offer) => offer.offerSentDate ? new Date(offer.offerSentDate).toLocaleDateString() : "-",
    },
    {
      key: "responseDeadline",
      header: "Deadline",
      render: (offer) => offer.responseDeadline ? new Date(offer.responseDeadline).toLocaleDateString() : "-",
    },
    {
      key: "status",
      header: "Status",
      render: (offer) => {
        const statusColors: Record<string, string> = {
          Draft: "bg-muted text-muted-foreground border-muted",
          Sent: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          Accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Rejected: "bg-destructive/10 text-destructive border-destructive/20",
          Negotiating: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          Expired: "bg-muted text-muted-foreground border-muted",
        };
        return (
          <Badge className={statusColors[offer.status] || ""} variant="outline">
            {offer.status}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (offer) => (
        <div className="flex items-center gap-1">
          {offer.status === "Draft" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Send Offer"
              onClick={() => toast.success(`Offer sent to ${offer.candidateName}`)}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View Letter">
            <Eye className="h-4 w-4" />
          </Button>
          {(offer.status === "Draft" || offer.status === "Negotiating") && (
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {offer.status === "Sent" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              title="Withdraw"
              onClick={() => toast.error(`Offer withdrawn for ${offer.candidateName}`)}
            >
              <Ban className="h-4 w-4" />
            </Button>
          )}
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
        { label: "Analytics", value: "Analytics" },
        { label: "Human Resources", value: "Human Resources" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Draft", value: "Draft" },
        { label: "Sent", value: "Sent" },
        { label: "Accepted", value: "Accepted" },
        { label: "Rejected", value: "Rejected" },
        { label: "Negotiating", value: "Negotiating" },
        { label: "Expired", value: "Expired" },
      ],
    },
  ];

  const handleSubmit = () => {
    const newOffer: Offer = {
      id: String(offers.length + 1),
      candidateName: formData.candidate,
      candidateAvatar: "",
      jobTitle: formData.jobTitle,
      department: formData.department,
      offeredSalary: `$${formData.salary}`,
      joiningDate: formData.joiningDate,
      offerSentDate: "",
      responseDeadline: formData.deadline,
      status: "Draft",
      benefits: formData.benefits,
    };
    setOffers([...offers, newOffer]);
    setIsDialogOpen(false);
    setFormData({
      candidate: "",
      jobTitle: "",
      department: "",
      salary: "",
      joiningDate: "",
      deadline: "",
      benefits: "",
      notes: "",
    });
    toast.success("Offer created successfully");
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Offers</h1>
                  <p className="text-muted-foreground">Manage job offers and negotiations</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Offer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Create Offer</DialogTitle>
                      <DialogDescription>
                        Create a new job offer for a candidate
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="candidate">Candidate</Label>
                          <Select
                            value={formData.candidate}
                            onValueChange={(value) => setFormData({ ...formData, candidate: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select candidate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="John Smith">John Smith</SelectItem>
                              <SelectItem value="Emily Johnson">Emily Johnson</SelectItem>
                              <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Position</Label>
                          <Select
                            value={formData.jobTitle}
                            onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Senior Software Engineer">Senior Software Engineer</SelectItem>
                              <SelectItem value="Product Manager">Product Manager</SelectItem>
                              <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
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
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Salary ($)</Label>
                          <Input
                            id="salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            placeholder="e.g. 120000"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="joiningDate">Joining Date</Label>
                          <Input
                            id="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deadline">Response Deadline</Label>
                          <Input
                            id="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="benefits">Benefits</Label>
                        <Input
                          id="benefits"
                          value={formData.benefits}
                          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                          placeholder="e.g. Health, 401k, Stock Options"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any additional terms or notes..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Create Offer</Button>
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
                data={offers}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search offers..."
              />
      </div>
    </AdminLayout>
  );
}
