import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted", formData);
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">HRMS Portal</span>
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Get started with NexHR today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-slate-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateField("agreeToTerms", checked as boolean)}
                className="mt-0.5 border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side - Illustration Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-emerald-500 p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Orange circle top-left */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-orange-400 rounded-full opacity-90"></div>
            {/* Teal circle top-right */}
            <div className="absolute top-16 right-16 w-8 h-8 bg-teal-300 rounded-full opacity-80"></div>
            {/* Dark square */}
            <div className="absolute top-32 left-12 w-10 h-10 bg-slate-800 rounded-lg transform rotate-12"></div>
            {/* Yellow diamond */}
            <div className="absolute top-24 right-8 w-6 h-6 bg-yellow-400 transform rotate-45"></div>
            {/* Bottom decorations */}
            <div className="absolute bottom-32 left-8 w-14 h-14 bg-slate-700 rounded-lg"></div>
            <div className="absolute bottom-16 left-24 w-6 h-6 bg-teal-300 rounded-full"></div>
            <div className="absolute bottom-20 left-32 w-6 h-6 bg-teal-400 rounded-full"></div>
            {/* Large circle outline */}
            <div className="absolute top-1/2 right-4 w-20 h-20 border-4 border-teal-400/50 rounded-full"></div>
            {/* Diamond bottom-right */}
            <div className="absolute bottom-24 right-12 w-8 h-8 bg-transparent border-2 border-teal-300/60 transform rotate-45"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Join Our Platform
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Create an account and unlock powerful tools to streamline your workforce operations.
            </p>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
