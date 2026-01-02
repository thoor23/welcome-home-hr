import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 md:px-6">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Trusted by 2,000+ companies worldwide
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Streamline Your{" "}
              <span className="gradient-text">HR Operations</span>{" "}
              Effortlessly
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              All-in-one HRMS platform to manage employees, payroll, attendance, and performance. 
              Save 10+ hours weekly on administrative tasks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 hover:bg-secondary/50 px-8 py-6 text-lg group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "98%", label: "Satisfaction" },
                { value: "4.9★", label: "App Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-card p-2 animate-float">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop"
                alt="Team collaborating on HR tasks with modern dashboard"
                className="rounded-xl w-full h-auto object-cover"
              />
              {/* Floating Cards */}
              <div className="absolute -left-6 top-1/4 glass-card p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-500 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Payroll Processed</div>
                    <div className="text-xs text-muted-foreground">234 employees</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 bottom-1/4 glass-card p-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">↑</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Efficiency</div>
                    <div className="text-xs text-muted-foreground">+45% this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
