import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  Calendar,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  FileText,
  Upload,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  dueDate: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const employees = [
  { id: "1", name: "Rahul Verma", employeeId: "EMP-2026-001", department: "Engineering", joiningDate: "2026-01-15" },
  { id: "2", name: "Sneha Reddy", employeeId: "EMP-2026-002", department: "Marketing", joiningDate: "2026-01-10" },
  { id: "3", name: "Amit Patel", employeeId: "EMP-2026-003", department: "Operations", joiningDate: "2026-01-20" },
];

const initialTasks: Task[] = [
  { id: "1", name: "Submit ID Proof", category: "Documents", completed: true, dueDate: "2026-01-18" },
  { id: "2", name: "Bank Account Details", category: "Documents", completed: true, dueDate: "2026-01-20" },
  { id: "3", name: "Laptop/PC Provisioning", category: "IT Setup", completed: true, dueDate: "2026-01-17" },
  { id: "4", name: "Email Account Creation", category: "IT Setup", completed: true, dueDate: "2026-01-16" },
  { id: "5", name: "Policy Acknowledgment", category: "HR Formalities", completed: false, dueDate: "2026-01-22" },
  { id: "6", name: "Orientation Training", category: "Training", completed: false, dueDate: "2026-01-20" },
  { id: "7", name: "ID Card Issuance", category: "Admin", completed: false, dueDate: "2026-01-22" },
  { id: "8", name: "Assign Reporting Manager", category: "HR Formalities", completed: true, dueDate: "2026-01-16" },
  { id: "9", name: "Workspace Allocation", category: "Admin", completed: true, dueDate: "2026-01-17" },
  { id: "10", name: "Introduce to Team", category: "HR Formalities", completed: true, dueDate: "2026-01-18" },
  { id: "11", name: "System Access Setup", category: "IT Setup", completed: false, dueDate: "2026-01-19" },
];

const initialComments: Comment[] = [
  { id: "1", author: "Priya Sharma", text: "Welcome aboard! Please complete the document submission by EOD.", timestamp: "2026-01-15 10:30 AM" },
  { id: "2", author: "IT Support", text: "Laptop has been configured and is ready for pickup.", timestamp: "2026-01-16 02:15 PM" },
  { id: "3", author: "Rahul Verma", text: "Thank you! Picked up the laptop today.", timestamp: "2026-01-16 04:00 PM" },
];

const NewHireOnboarding = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    toast.success("Task updated");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: String(Date.now()),
      author: "You",
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    toast.success("Comment added");
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Documents":
        return <FileText className="h-4 w-4" />;
      case "IT Setup":
        return <Upload className="h-4 w-4" />;
      case "Training":
        return <Clock className="h-4 w-4" />;
      case "HR Formalities":
        return <User className="h-4 w-4" />;
      case "Admin":
        return <Building2 className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">New Hire Onboarding</h1>
                <p className="text-muted-foreground mt-1">Manage individual employee onboarding process</p>
              </div>
              <Select
                value={selectedEmployee.id}
                onValueChange={(value) => setSelectedEmployee(employees.find((e) => e.id === value) || employees[0])}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employeeId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Employee Info Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Employee Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" alt={selectedEmployee.name} />
                      <AvatarFallback className="text-lg">
                        {selectedEmployee.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedEmployee.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.employeeId}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedEmployee.department}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joining: {new Date(selectedEmployee.joiningDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedEmployee.name.toLowerCase().replace(" ", ".")}@company.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{completedTasks}/{tasks.length} tasks</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{progress}% complete</p>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      progress === 100
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : progress > 0
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                    }
                  >
                    {progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
                  </Badge>
                </CardContent>
              </Card>

              {/* Tasks and Activity */}
              <Card className="lg:col-span-2">
                <Tabs defaultValue="tasks" className="w-full">
                  <CardHeader className="pb-0">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <TabsContent value="tasks" className="mt-0">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-6">
                          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
                            <div key={category}>
                              <div className="flex items-center gap-2 mb-3">
                                {getCategoryIcon(category)}
                                <h4 className="font-medium text-sm">{category}</h4>
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {categoryTasks.filter((t) => t.completed).length}/{categoryTasks.length}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                {categoryTasks.map((task) => (
                                  <div
                                    key={task.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-secondary/50 transition-colors"
                                  >
                                    <Checkbox
                                      id={task.id}
                                      checked={task.completed}
                                      onCheckedChange={() => handleTaskToggle(task.id)}
                                    />
                                    <Label
                                      htmlFor={task.id}
                                      className={`flex-1 cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {task.name}
                                    </Label>
                                    <span className="text-xs text-muted-foreground">
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="documents" className="mt-0">
                      <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop files here, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Upload Documents
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm mb-3">Uploaded Documents</h4>
                          {["ID_Proof.pdf", "Bank_Details.pdf", "Address_Proof.pdf"].map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="flex-1 text-sm">{doc}</span>
                              <Badge variant="secondary" className="text-xs">Verified</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="comments" className="mt-0">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4 mb-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {comment.author.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="flex gap-2 pt-4 border-t">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <Button size="icon" onClick={handleAddComment} className="shrink-0">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
            </Card>
          </div>
        </AdminLayout>
      );
};

export default NewHireOnboarding;
