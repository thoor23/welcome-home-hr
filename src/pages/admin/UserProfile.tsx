import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, Phone, MapPin, Building, Briefcase, Calendar, User, FileText } from "lucide-react";

const UserProfile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-background">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>
              <p className="text-muted-foreground">View and manage your profile information</p>
            </div>

            <div className="grid gap-6">
              {/* Profile Photo Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
                      </Avatar>
                      <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
                      <p className="text-muted-foreground">Software Engineer</p>
                      <Badge className="mt-2">Active</Badge>
                    </div>
                    <div className="ml-auto">
                      <Button>Edit Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value="John Doe" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value="john.doe@company.com" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value="+91 9876543210" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input value="15-03-1990" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Input value="Male" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Blood Group</Label>
                      <Input value="O+" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Employment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input value="EMP-001" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value="Engineering" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input value="Software Engineer" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Reporting Manager</Label>
                      <Input value="Jane Smith" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Joining Date</Label>
                      <Input value="01-01-2022" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Input value="Full Time" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address</Label>
                      <Textarea value="123 Main Street, Sector 15" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input value="Mumbai" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input value="Maharashtra" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input value="India" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Pincode</Label>
                      <Input value="400001" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contact Name</Label>
                      <Input value="Jane Doe" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Relation</Label>
                      <Input value="Spouse" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input value="+91 9876543211" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Aadhar Card</p>
                      <p className="font-medium text-foreground">XXXX-XXXX-1234</p>
                      <Button variant="link" className="p-0 h-auto text-primary">View</Button>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">PAN Card</p>
                      <p className="font-medium text-foreground">ABCDE1234F</p>
                      <Button variant="link" className="p-0 h-auto text-primary">View</Button>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Passport</p>
                      <p className="font-medium text-foreground">J1234567</p>
                      <Button variant="link" className="p-0 h-auto text-primary">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UserProfile;
