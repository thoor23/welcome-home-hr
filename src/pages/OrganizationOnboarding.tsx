import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Users, Building2, MapPin, Globe, UsersRound } from "lucide-react";

const OrganizationOnboarding = () => {
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization onboarding submitted", { orgName, industry, companySize, country, website });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-5xl min-h-[720px] clean-card shadow-xl overflow-hidden flex relative z-10">
        {/* Left Side - Illustration Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 left-8 w-12 h-12 bg-primary-foreground/10 rounded-full"></div>
            <div className="absolute top-16 right-16 w-8 h-8 bg-primary-foreground/20 rounded-full"></div>
            <div className="absolute top-32 left-12 w-10 h-10 bg-primary-foreground/10 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-32 left-8 w-14 h-14 bg-primary-foreground/10 rounded-lg"></div>
            <div className="absolute bottom-16 left-24 w-6 h-6 bg-primary-foreground/15 rounded-full"></div>
            <div className="absolute top-1/2 right-4 w-20 h-20 border-4 border-primary-foreground/20 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4 font-display">
              Set Up Your Organization
            </h1>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              Tell us about your organization to customize your NexHR experience and get started quickly.
            </p>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex gap-2">
            <div className="w-2 h-2 bg-primary-foreground/40 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-foreground/40 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Onboarding Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center bg-card">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">NexHR</span>
          </Link>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-display">Organization Details</h2>
            <p className="text-muted-foreground">
              Let's get your organization set up in just a few steps.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm">
            <div className="space-y-2">
              <label htmlFor="orgName" className="text-sm text-foreground font-medium">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="orgName"
                  type="text"
                  placeholder="Enter organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm text-foreground font-medium">
                Industry
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="bg-secondary border-border text-foreground focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="companySize" className="text-sm text-foreground font-medium">
                Company Size
              </label>
              <div className="relative">
                <UsersRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <Select value={companySize} onValueChange={setCompanySize}>
                  <SelectTrigger className="pl-10 bg-secondary border-border text-foreground focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm text-foreground font-medium">
                Country
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="country"
                  type="text"
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm text-foreground font-medium">
                Website <span className="text-muted-foreground">(Optional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              Complete Setup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationOnboarding;
