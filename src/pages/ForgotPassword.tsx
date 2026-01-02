import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Users, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for", { email });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-5xl min-h-[640px] clean-card shadow-xl overflow-hidden flex relative z-10">
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
              Reset Password
            </h1>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              Don't worry! It happens to the best of us. Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex gap-2">
            <div className="w-2 h-2 bg-primary-foreground/40 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-foreground/40 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
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
            <h2 className="text-2xl font-bold text-foreground mb-2 font-display">Forgot Password?</h2>
            <p className="text-muted-foreground">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {!isSubmitted ? (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-foreground font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Check your email</h3>
              <p className="text-muted-foreground">
                We've sent a password reset link to<br />
                <span className="text-foreground font-medium">{email}</span>
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 border-border hover:bg-secondary"
              >
                Try another email
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
