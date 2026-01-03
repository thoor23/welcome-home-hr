import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Send,
  Download,
  Save,
  Eye,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const letterTypes = [
  "Offer Letter",
  "Appointment Letter",
  "Confirmation Letter",
  "Promotion Letter",
  "Transfer Letter",
  "Salary Revision Letter",
  "Warning Letter",
  "Show Cause Notice",
  "Termination Letter",
  "Relieving Letter",
  "Experience Letter",
  "Internship Certificate",
  "Bonus Letter",
  "Increment Letter",
  "No Objection Certificate",
];

const templates: Record<string, { subject: string; body: string }> = {
  "Offer Letter": {
    subject: "Job Offer - {{position}} Position at {{company_name}}",
    body: `Dear {{candidate_name}},

We are pleased to offer you the position of {{position}} at {{company_name}}.

Details:
- Designation: {{position}}
- Department: {{department}}
- CTC: {{salary}} per annum
- Joining Date: {{joining_date}}

Please confirm your acceptance within 7 days by signing and returning the enclosed copy.

We look forward to welcoming you to our team.

Best regards,
{{hr_name}}
Human Resources
{{company_name}}`,
  },
  "Relieving Letter": {
    subject: "Relieving Letter - {{employee_name}}",
    body: `To Whom It May Concern,

This is to certify that {{employee_name}} (Employee ID: {{employee_id}}) was employed with {{company_name}} as {{designation}} from {{joining_date}} to {{lwd}}.

During their tenure, they handled their responsibilities professionally. All company assets have been returned and all dues have been settled.

We hereby relieve {{employee_name}} from all duties and responsibilities effective {{lwd}}.

We wish them all the best for their future endeavors.

For {{company_name}}

{{hr_name}}
HR Manager`,
  },
  "Experience Letter": {
    subject: "Experience Certificate - {{employee_name}}",
    body: `To Whom It May Concern,

This is to certify that {{employee_name}} was employed with {{company_name}} as {{designation}} from {{joining_date}} to {{lwd}}.

During their tenure of {{experience_years}} years, they demonstrated excellent skills, dedication, and professionalism. They contributed significantly to the organization and worked collaboratively with their team.

We wish them success in all their future endeavors and recommend them for any suitable position.

For {{company_name}}

{{hr_name}}
HR Manager`,
  },
};

const employees = [
  { id: "EMP001", name: "John Smith", email: "john.smith@email.com", designation: "Software Engineer", department: "Engineering" },
  { id: "EMP002", name: "Neha Singh", email: "neha.singh@email.com", designation: "Marketing Manager", department: "Marketing" },
  { id: "EMP003", name: "Rahul Verma", email: "rahul.verma@email.com", designation: "Sales Executive", department: "Sales" },
  { id: "EMP004", name: "Priya Sharma", email: "priya.sharma@email.com", designation: "HR Executive", department: "HR" },
  { id: "EMP005", name: "Amit Patel", email: "amit.patel@email.com", designation: "Operations Lead", department: "Operations" },
];

const GenerateLetter = () => {
  const [letterType, setLetterType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleLetterTypeChange = (type: string) => {
    setLetterType(type);
    if (templates[type]) {
      setSubject(templates[type].subject);
      setContent(templates[type].body);
    } else {
      setSubject("");
      setContent("");
    }
  };

  const handleEmployeeChange = (empId: string) => {
    setSelectedEmployee(empId);
    const employee = employees.find((e) => e.id === empId);
    if (employee && content) {
      let updatedContent = content;
      updatedContent = updatedContent.replace(/\{\{employee_name\}\}/g, employee.name);
      updatedContent = updatedContent.replace(/\{\{candidate_name\}\}/g, employee.name);
      updatedContent = updatedContent.replace(/\{\{employee_id\}\}/g, employee.id);
      updatedContent = updatedContent.replace(/\{\{designation\}\}/g, employee.designation);
      updatedContent = updatedContent.replace(/\{\{position\}\}/g, employee.designation);
      updatedContent = updatedContent.replace(/\{\{department\}\}/g, employee.department);
      updatedContent = updatedContent.replace(/\{\{company_name\}\}/g, "NexHR Technologies");
      updatedContent = updatedContent.replace(/\{\{hr_name\}\}/g, "Sarah Johnson");
      updatedContent = updatedContent.replace(/\{\{date\}\}/g, new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }));
      setContent(updatedContent);

      let updatedSubject = subject;
      updatedSubject = updatedSubject.replace(/\{\{employee_name\}\}/g, employee.name);
      updatedSubject = updatedSubject.replace(/\{\{candidate_name\}\}/g, employee.name);
      updatedSubject = updatedSubject.replace(/\{\{position\}\}/g, employee.designation);
      updatedSubject = updatedSubject.replace(/\{\{company_name\}\}/g, "NexHR Technologies");
      setSubject(updatedSubject);
    }
  };

  const handleReset = () => {
    if (letterType && templates[letterType]) {
      setSubject(templates[letterType].subject);
      setContent(templates[letterType].body);
      setSelectedEmployee("");
    }
  };

  const handleSaveDraft = () => {
    toast.success("Letter saved as draft");
  };

  const handleDownload = () => {
    toast.success("Letter downloaded as PDF");
  };

  const handleSend = () => {
    const employee = employees.find((e) => e.id === selectedEmployee);
    if (employee) {
      toast.success(`Letter sent to ${employee.email}`);
    } else {
      toast.error("Please select an employee");
    }
  };

  const selectedEmployeeData = employees.find((e) => e.id === selectedEmployee);
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Generate Letter</h1>
                <p className="text-muted-foreground">Create and send official letters and documents</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Letter Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Letter Type</Label>
                        <Select value={letterType} onValueChange={handleLetterTypeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select letter type" />
                          </SelectTrigger>
                          <SelectContent>
                            {letterTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Select Employee/Candidate</Label>
                        <Select value={selectedEmployee} onValueChange={handleEmployeeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((emp) => (
                              <SelectItem key={emp.id} value={emp.id}>
                                {emp.name} ({emp.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Letter subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Letter Content</Label>
                      {showPreview ? (
                        <div className="bg-muted/30 border rounded-lg p-6 min-h-[400px] whitespace-pre-wrap font-serif">
                          {content || "Select a letter type and employee to preview content"}
                        </div>
                      ) : (
                        <Textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Letter content..."
                          className="min-h-[400px]"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline" onClick={handleDownload} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={handleSend} className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send via Email
                  </Button>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {selectedEmployeeData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recipient Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedEmployeeData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employee ID</p>
                        <p className="font-medium">{selectedEmployeeData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedEmployeeData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Designation</p>
                        <p className="font-medium">{selectedEmployeeData.designation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{selectedEmployeeData.department}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Available Variables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><code className="bg-muted px-1 rounded">{"{{employee_name}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{employee_id}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{designation}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{department}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{company_name}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{joining_date}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{lwd}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{salary}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{hr_name}}"}</code></p>
                      <p><code className="bg-muted px-1 rounded">{"{{date}}"}</code></p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Select a letter type to load the template</li>
                      <li>• Choose an employee to auto-fill variables</li>
                      <li>• Edit the content as needed before sending</li>
                      <li>• Preview before final submission</li>
                      <li>• Save as draft to continue later</li>
                    </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </AdminLayout>
  );
};

export default GenerateLetter;
