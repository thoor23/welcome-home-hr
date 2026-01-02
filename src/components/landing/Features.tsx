import { Users, CreditCard, Clock, Calendar, TrendingUp, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Centralized employee database with profiles, documents, and org charts. Onboard new hires in minutes.",
  },
  {
    icon: CreditCard,
    title: "Payroll Processing",
    description: "Automated payroll calculations, tax deductions, and direct deposits. Eliminate manual errors.",
  },
  {
    icon: Clock,
    title: "Time & Attendance",
    description: "Track work hours, breaks, and overtime with biometric integrations and mobile clock-in.",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description: "Streamlined leave requests, approvals, and balance tracking. Holiday calendars included.",
  },
  {
    icon: TrendingUp,
    title: "Performance Reviews",
    description: "Goal setting, 360° feedback, and performance appraisals. Develop your talent effectively.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Real-time dashboards, custom reports, and workforce analytics. Data-driven HR decisions.",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container-max relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Manage Your Workforce</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed to simplify HR processes and boost productivity across your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-8 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
