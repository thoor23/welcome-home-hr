import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Building2, 
  Briefcase, 
  Calendar, 
  Hash, 
  MapPin, 
  User, 
  Heart,
  Droplet,
  Home,
  GraduationCap,
  FileText,
  AlertCircle,
  Key
} from "lucide-react";
import type { Employee } from "@/pages/admin/Employees";

interface ViewEmployeeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee;
}

export function ViewEmployeeDrawer({
  open,
  onOpenChange,
  employee,
}: ViewEmployeeDrawerProps) {
  const getStatusBadge = (status: Employee["status"]) => {
    const variants = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      probation: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      notice: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      exit: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const labels = {
      active: "Active",
      probation: "Probation",
      notice: "Notice",
      exit: "Exit",
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) => (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-secondary shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-foreground break-words">{value || "Not specified"}</p>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Employee Details</SheetTitle>
          <SheetDescription>
            View complete information about the employee.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 pb-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={employee.profilePic} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {employee.name}
              </h3>
              <p className="text-muted-foreground">{employee.designation}</p>
              <div className="mt-2">{getStatusBadge(employee.status)}</div>
            </div>
          </div>

          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Mail} label="Email" value={employee.email} />
                <InfoItem icon={Phone} label="Phone" value={employee.phone} />
                <InfoItem icon={Calendar} label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
                <InfoItem icon={User} label="Gender" value={employee.gender ? employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1) : undefined} />
                <InfoItem icon={Heart} label="Marital Status" value={employee.maritalStatus ? employee.maritalStatus.charAt(0).toUpperCase() + employee.maritalStatus.slice(1) : undefined} />
                <InfoItem icon={Droplet} label="Blood Group" value={employee.bloodGroup} />
              </div>
              {employee.address && (
                <InfoItem icon={Home} label="Address" value={employee.address} />
              )}
            </CardContent>
          </Card>

          {/* Work Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Work Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Hash} label="Employee ID" value={employee.employeeId} />
                <InfoItem icon={Building2} label="Department" value={employee.department} />
                <InfoItem icon={Briefcase} label="Designation" value={employee.designation} />
                <InfoItem icon={MapPin} label="Location" value={employee.location} />
                <InfoItem icon={MapPin} label="Region" value={employee.region} />
                <InfoItem icon={User} label="Reporting Manager" value={employee.reportingManager} />
                <InfoItem icon={Briefcase} label="Employment Type" value={employee.employmentType ? employee.employmentType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-') : undefined} />
                <InfoItem icon={Calendar} label="Joining Date" value={formatDate(employee.joiningDate)} />
              </div>
            </CardContent>
          </Card>

          {/* Job History Card */}
          {employee.pastJobs && employee.pastJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {employee.pastJobs.map((job, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">{job.designation}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(job.startDate)} - {formatDate(job.endDate)}
                    </p>
                    {job.description && (
                      <p className="text-sm text-foreground">{job.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Card */}
          {employee.education && employee.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {employee.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-1">
                    <h4 className="font-medium text-foreground">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Year: {edu.year}</span>
                      {edu.grade && <span>Grade: {edu.grade}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Documents Card */}
          {employee.documents && employee.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employee.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact Card */}
          {employee.emergencyContact && employee.emergencyContact.name && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoItem icon={User} label="Name" value={employee.emergencyContact.name} />
                  <InfoItem icon={Heart} label="Relationship" value={employee.emergencyContact.relationship} />
                  <InfoItem icon={Phone} label="Phone" value={employee.emergencyContact.phone} />
                  {employee.emergencyContact.email && (
                    <InfoItem icon={Mail} label="Email" value={employee.emergencyContact.email} />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Portal Access Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="h-4 w-4" />
                Portal Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${employee.hasPortalAccess ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                <span className="text-foreground">
                  {employee.hasPortalAccess ? "Portal access enabled" : "Portal access disabled"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
