import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Clock,
  CheckCircle2,
  FileText,
  Wallet,
  Package,
  Monitor,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface ClearanceTask {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  approvedBy?: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const employees = [
  { id: "1", name: "Neha Singh", employeeId: "EMP-2024-045", department: "Marketing", exitType: "Resignation", lwd: "2026-01-31" },
  { id: "2", name: "Vikram Rao", employeeId: "EMP-2020-012", department: "Operations", exitType: "Retirement", lwd: "2026-02-28" },
  { id: "3", name: "Sanjay Kumar", employeeId: "EMP-2023-078", department: "Engineering", exitType: "Termination", lwd: "2026-01-15" },
];

const initialTasks: ClearanceTask[] = [
  { id: "1", name: "Return Laptop/PC", category: "Assets", completed: true, approvedBy: "IT Team" },
  { id: "2", name: "Return ID Card", category: "Assets", completed: true, approvedBy: "HR" },
  { id: "3", name: "Return Access Cards", category: "Assets", completed: false },
  { id: "4", name: "Revoke Email Access", category: "IT", completed: false },
  { id: "5", name: "Revoke System Access", category: "IT", completed: false },
  { id: "6", name: "Knowledge Transfer", category: "HR", completed: true, approvedBy: "Manager" },
  { id: "7", name: "Exit Interview", category: "HR", completed: true, approvedBy: "HR" },
  { id: "8", name: "Clear Pending Expenses", category: "Finance", completed: true, approvedBy: "Finance" },
  { id: "9", name: "Full & Final Settlement", category: "Finance", completed: false },
  { id: "10", name: "Experience Letter", category: "HR", completed: false },
  { id: "11", name: "Relieving Letter", category: "HR", completed: false },
  { id: "12", name: "Gratuity Processing", category: "Finance", completed: false },
];

const initialComments: Comment[] = [
  { id: "1", author: "HR Team", text: "Exit interview completed. Feedback documented.", timestamp: "2026-01-20 10:30 AM" },
  { id: "2", author: "IT Support", text: "Laptop returned and verified. All data backed up.", timestamp: "2026-01-21 02:15 PM" },
  { id: "3", author: "Finance Team", text: "Pending expense claims of ₹5,000 cleared.", timestamp: "2026-01-22 11:00 AM" },
];

const ExitClearance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [tasks, setTasks] = useState<ClearanceTask[]>(initialTasks);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [rehireEligible, setRehireEligible] = useState(true);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed, approvedBy: !t.completed ? "You" : undefined } : t))
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
  }, {} as Record<string, ClearanceTask[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Assets":
        return <Package className="h-4 w-4" />;
      case "IT":
        return <Monitor className="h-4 w-4" />;
      case "Finance":
        return <Wallet className="h-4 w-4" />;
      case "HR":
        return <User className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const fnfPreview = {
    basicSalary: 45000,
    leavesEncashed: 12500,
    bonus: 15000,
    deductions: 5000,
    total: 67500,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Exit Clearance</h1>
                <p className="text-muted-foreground mt-1">Manage individual employee exit process</p>
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
                  <CardTitle className="text-lg">Exit Information</CardTitle>
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
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Exit Type: {selectedEmployee.exitType}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">LWD: {new Date(selectedEmployee.lwd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Notice: 30 days</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Clearance Progress</span>
                      <span className="text-sm text-muted-foreground">{completedTasks}/{tasks.length} tasks</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{progress}% complete</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label htmlFor="rehire" className="text-sm font-medium">Rehire Eligible</Label>
                      <p className="text-xs text-muted-foreground">Can be rehired in future</p>
                    </div>
                    <Switch
                      id="rehire"
                      checked={rehireEligible}
                      onCheckedChange={setRehireEligible}
                    />
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
                    {progress === 100 ? "Clearance Complete" : progress > 0 ? "In Progress" : "Not Started"}
                  </Badge>
                </CardContent>
              </Card>

              {/* Tasks and F&F */}
              <Card className="lg:col-span-2">
                <Tabs defaultValue="clearance" className="w-full">
                  <CardHeader className="pb-0">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="clearance">Clearance</TabsTrigger>
                      <TabsTrigger value="fnf">F&F Preview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <TabsContent value="clearance" className="mt-0">
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
                                    {task.approvedBy && (
                                      <Badge variant="secondary" className="text-xs">
                                        {task.approvedBy}
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="fnf" className="mt-0">
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-medium mb-4">Full & Final Settlement Preview</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Basic Salary (Pro-rata)</span>
                              <span className="font-medium">₹{fnfPreview.basicSalary.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Leaves Encashed (5 days)</span>
                              <span className="font-medium">₹{fnfPreview.leavesEncashed.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Bonus</span>
                              <span className="font-medium">₹{fnfPreview.bonus.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-red-500">
                              <span className="text-sm">Deductions</span>
                              <span className="font-medium">-₹{fnfPreview.deductions.toLocaleString()}</span>
                            </div>
                            <div className="border-t pt-3 flex items-center justify-between">
                              <span className="font-semibold">Total F&F Amount</span>
                              <span className="font-bold text-lg text-primary">₹{fnfPreview.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => toast.success("F&F processing initiated")}>
                            Process F&F
                          </Button>
                          <Button variant="outline" onClick={() => toast.info("Detailed breakdown coming soon")}>
                            View Details
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                          * This is a preliminary estimate. Final amount may vary based on pending clearances.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
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
                          placeholder="Add a note..."
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExitClearance;
