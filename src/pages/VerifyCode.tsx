import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Users, ArrowLeft } from "lucide-react";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification code submitted", { verificationCode });
  };

  const handleResend = () => {
    console.log("Resend code");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects - matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-5xl min-h-[720px] glass-card rounded-3xl shadow-2xl overflow-hidden flex relative z-10">
        {/* Left Side - Illustration Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-purple-500 p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 left-8 w-12 h-12 bg-white/20 rounded-full"></div>
            <div className="absolute top-16 right-16 w-8 h-8 bg-white/30 rounded-full"></div>
            <div className="absolute top-32 left-12 w-10 h-10 bg-white/10 rounded-lg transform rotate-12"></div>
            <div className="absolute top-24 right-8 w-6 h-6 bg-white/25 transform rotate-45"></div>
            <div className="absolute bottom-32 left-8 w-14 h-14 bg-white/10 rounded-lg"></div>
            <div className="absolute bottom-16 left-24 w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-20 left-32 w-6 h-6 bg-white/15 rounded-full"></div>
            <div className="absolute top-1/2 right-4 w-20 h-20 border-4 border-white/20 rounded-full"></div>
            <div className="absolute bottom-24 right-12 w-8 h-8 bg-transparent border-2 border-white/30 transform rotate-45"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4 font-display">
              Verify Your Email
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              We've sent a verification code to your email. Enter the code below to confirm your identity.
            </p>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex gap-2">
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Verification Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-card/50 backdrop-blur-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">NexHR</span>
          </Link>

          {/* Back Link */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-display">Enter Verification Code</h2>
            <p className="text-muted-foreground">
              We've sent a 6-digit code to your email address. Enter the code below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-foreground font-medium">
                Verification Code
              </label>
              <div className="flex gap-3 justify-between">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-semibold bg-secondary/50 border-border/50 text-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              Verify Code
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Resend Code
              </button>
            </p>
          </div>

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

export default VerifyCode;
