import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-background">
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 md:px-6">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Trusted by 2,000+ companies worldwide
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              Streamline Your{" "}
              <span className="text-primary">HR Operations</span>{" "}
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
                className="border-border hover:bg-secondary px-8 py-6 text-lg group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
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
            <div className="relative rounded-2xl overflow-hidden clean-card p-2">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop"
                alt="Team collaborating on HR tasks with modern dashboard"
                className="rounded-xl w-full h-auto object-cover"
              />
              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 clean-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Payroll Processed</div>
                    <div className="text-xs text-muted-foreground">234 employees</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-1/4 clean-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
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
