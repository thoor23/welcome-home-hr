import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, Building2, 
  Camera, Save, Edit2, X, AlertCircle, Heart, Shield, GraduationCap,
  CreditCard, FileText
} from "lucide-react";
import { toast } from "sonner";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  alternatePhone: string;
  address: string;
}

interface EmploymentInfo {
  employeeId: string;
  department: string;
  designation: string;
  reportingTo: string;
  employmentType: string;
  joiningDate: string;
  workLocation: string;
  workEmail: string;
}

const ESSProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    dateOfBirth: "1990-05-15",
    gender: "male",
    maritalStatus: "married",
    bloodGroup: "O+",
    nationality: "American",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    pincode: "10001",
    country: "United States",
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Sarah Anderson",
      relationship: "Spouse",
      phone: "+1 (555) 234-5678",
      alternatePhone: "",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
    },
    {
      id: "2",
      name: "Michael Anderson",
      relationship: "Father",
      phone: "+1 (555) 345-6789",
      alternatePhone: "+1 (555) 456-7890",
      address: "456 Oak Avenue, Brooklyn, NY 11201",
    },
  ]);

  const employmentInfo: EmploymentInfo = {
    employeeId: "EMP-2024-001",
    department: "Engineering",
    designation: "Senior Software Engineer",
    reportingTo: "Jane Smith (Engineering Manager)",
    employmentType: "Full-time",
    joiningDate: "2022-03-01",
    workLocation: "New York HQ",
    workEmail: "john.anderson@company.com",
  };

  const handleSave = () => {
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  const handlePhotoChange = () => {
    toast.info("Photo upload functionality coming soon");
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">View and manage your personal information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground">
                    JA
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full shadow-md"
                    onClick={handlePhotoChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h2>
                <p className="text-lg text-muted-foreground">{employmentInfo.designation}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="secondary" className="gap-1">
                    <Building2 className="h-3 w-3" />
                    {employmentInfo.department}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Briefcase className="h-3 w-3" />
                    {employmentInfo.employmentType}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {employmentInfo.workLocation}
                  </Badge>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {personalInfo.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {personalInfo.phone}
                  </span>
                </div>
              </div>

              {/* Employee ID Card */}
              <div className="hidden lg:block">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Employee ID</p>
                    <p className="text-lg font-bold font-mono">{employmentInfo.employeeId}</p>
                    <Separator className="my-2" />
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-medium">
                      {new Date(employmentInfo.joiningDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4 hidden sm:block" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="emergency" className="gap-2">
              <Heart className="h-4 w-4 hidden sm:block" />
              Emergency
            </TabsTrigger>
            <TabsTrigger value="employment" className="gap-2">
              <Briefcase className="h-4 w-4 hidden sm:block" />
              Employment
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.firstName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.lastName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.lastName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">
                      {new Date(personalInfo.dateOfBirth).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  {isEditing ? (
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(value) =>
                        setPersonalInfo({ ...personalInfo, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium py-2 capitalize">{personalInfo.gender}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Marital Status</Label>
                  {isEditing ? (
                    <Select
                      value={personalInfo.maritalStatus}
                      onValueChange={(value) =>
                        setPersonalInfo({ ...personalInfo, maritalStatus: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium py-2 capitalize">{personalInfo.maritalStatus}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Blood Group</Label>
                  {isEditing ? (
                    <Select
                      value={personalInfo.bloodGroup}
                      onValueChange={(value) =>
                        setPersonalInfo({ ...personalInfo, bloodGroup: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.bloodGroup}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Nationality</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.nationality}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, nationality: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.nationality}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>Your contact details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <p className="text-sm font-medium py-2 text-muted-foreground">{personalInfo.email}</p>
                  <p className="text-xs text-muted-foreground">Contact HR to update email</p>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Alternate Phone</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.alternatePhone}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, alternatePhone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.alternatePhone || "-"}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address Information
                </CardTitle>
                <CardDescription>Your residential address</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                  <Label>Street Address</Label>
                  {isEditing ? (
                    <Textarea
                      value={personalInfo.address}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, address: e.target.value })
                      }
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.address}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.city}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, city: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>State / Province</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.state}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, state: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.state}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Postal / ZIP Code</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.pincode}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, pincode: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.pincode}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  {isEditing ? (
                    <Input
                      value={personalInfo.country}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, country: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium py-2">{personalInfo.country}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">Keep your emergency contacts up to date</p>
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmergencyContacts([
                      ...emergencyContacts,
                      {
                        id: Date.now().toString(),
                        name: "",
                        relationship: "",
                        phone: "",
                        alternatePhone: "",
                        address: "",
                      },
                    ]);
                  }}
                >
                  Add Contact
                </Button>
              )}
            </div>

            {emergencyContacts.map((contact, index) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Heart className="h-5 w-5 text-destructive" />
                      Emergency Contact {index + 1}
                    </CardTitle>
                    {isEditing && emergencyContacts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() =>
                          setEmergencyContacts(emergencyContacts.filter((c) => c.id !== contact.id))
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={contact.name}
                        onChange={(e) => {
                          const updated = emergencyContacts.map((c) =>
                            c.id === contact.id ? { ...c, name: e.target.value } : c
                          );
                          setEmergencyContacts(updated);
                        }}
                        placeholder="Contact name"
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{contact.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    {isEditing ? (
                      <Select
                        value={contact.relationship}
                        onValueChange={(value) => {
                          const updated = emergencyContacts.map((c) =>
                            c.id === contact.id ? { ...c, relationship: value } : c
                          );
                          setEmergencyContacts(updated);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Father">Father</SelectItem>
                          <SelectItem value="Mother">Mother</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium py-2">{contact.relationship}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    {isEditing ? (
                      <Input
                        value={contact.phone}
                        onChange={(e) => {
                          const updated = emergencyContacts.map((c) =>
                            c.id === contact.id ? { ...c, phone: e.target.value } : c
                          );
                          setEmergencyContacts(updated);
                        }}
                        placeholder="Phone number"
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{contact.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Alternate Phone</Label>
                    {isEditing ? (
                      <Input
                        value={contact.alternatePhone}
                        onChange={(e) => {
                          const updated = emergencyContacts.map((c) =>
                            c.id === contact.id ? { ...c, alternatePhone: e.target.value } : c
                          );
                          setEmergencyContacts(updated);
                        }}
                        placeholder="Alternate phone"
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{contact.alternatePhone || "-"}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Address</Label>
                    {isEditing ? (
                      <Input
                        value={contact.address}
                        onChange={(e) => {
                          const updated = emergencyContacts.map((c) =>
                            c.id === contact.id ? { ...c, address: e.target.value } : c
                          );
                          setEmergencyContacts(updated);
                        }}
                        placeholder="Address"
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{contact.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Employment Tab */}
          <TabsContent value="employment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Employment Details
                </CardTitle>
                <CardDescription>Your employment information (read-only)</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Employee ID</Label>
                  <p className="text-sm font-medium py-2 font-mono">{employmentInfo.employeeId}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.department}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Designation</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.designation}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Reporting Manager</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.reportingTo}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Employment Type</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.employmentType}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Joining Date</Label>
                  <p className="text-sm font-medium py-2">
                    {new Date(employmentInfo.joiningDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Work Location</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.workLocation}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Work Email</Label>
                  <p className="text-sm font-medium py-2">{employmentInfo.workEmail}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documents
                </CardTitle>
                <CardDescription>Your uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "ID Proof", status: "Verified", icon: CreditCard },
                    { name: "Address Proof", status: "Verified", icon: MapPin },
                    { name: "Education Certificate", status: "Pending", icon: GraduationCap },
                    { name: "Experience Letter", status: "Verified", icon: Briefcase },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                    >
                      <div className="p-2 rounded-lg bg-background">
                        <doc.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <Badge
                          variant={doc.status === "Verified" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
};

export default ESSProfile;
