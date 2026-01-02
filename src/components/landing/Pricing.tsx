import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: Zap,
    accentColor: "from-blue-500 to-cyan-400",
    glowColor: "group-hover:shadow-blue-500/25",
    features: [
      "Up to 25 employees",
      "Employee management",
      "Basic attendance tracking",
      "Leave management",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses with advanced needs",
    monthlyPrice: 59,
    yearlyPrice: 49,
    icon: Sparkles,
    accentColor: "from-primary to-purple-400",
    glowColor: "group-hover:shadow-primary/30",
    features: [
      "Up to 100 employees",
      "Everything in Starter",
      "Payroll processing",
      "Performance reviews",
      "Custom reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: null,
    yearlyPrice: null,
    icon: Crown,
    accentColor: "from-amber-500 to-orange-400",
    glowColor: "group-hover:shadow-amber-500/25",
    features: [
      "Unlimited employees",
      "Everything in Professional",
      "Advanced analytics",
      "API access",
      "SSO & SAML",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-max relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn(
              "text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors duration-300",
                isYearly ? "bg-primary" : "bg-secondary"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-foreground transition-all duration-300 shadow-lg",
                  isYearly ? "left-8" : "left-1"
                )}
              />
            </button>
            <span className={cn(
              "text-sm font-medium transition-colors",
              isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Yearly
            </span>
            <span className="ml-2 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "group relative rounded-2xl transition-all duration-500",
                "animate-fade-in",
                plan.popular ? "md:scale-105 md:-my-4" : ""
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Border */}
              <div className={cn(
                "absolute -inset-[1px] rounded-2xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
                plan.accentColor
              )} />
              <div className={cn(
                "absolute -inset-[1px] rounded-2xl bg-gradient-to-b transition-opacity duration-500",
                plan.popular ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                plan.accentColor
              )} />

              {/* Card Content */}
              <div className={cn(
                "relative glass-card p-8 flex flex-col h-full rounded-2xl transition-shadow duration-500",
                plan.glowColor,
                plan.popular ? "shadow-xl" : ""
              )}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-semibold",
                      "bg-gradient-to-r text-primary-foreground",
                      plan.accentColor
                    )}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                    plan.accentColor
                  )}>
                    <plan.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  {plan.monthlyPrice !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className={cn(
                        "text-5xl font-display font-bold transition-all duration-300",
                        "bg-clip-text text-transparent bg-gradient-to-r",
                        plan.accentColor
                      )}>
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  ) : (
                    <span className={cn(
                      "text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r",
                      plan.accentColor
                    )}>
                      Custom Pricing
                    </span>
                  )}
                  {plan.monthlyPrice !== null && isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="line-through">${plan.monthlyPrice}</span>
                      <span className="text-green-400 ml-2">Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year</span>
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br",
                        plan.accentColor
                      )}>
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={cn(
                    "w-full py-6 font-semibold transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-r hover:opacity-90 text-primary-foreground " + plan.accentColor
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground group-hover:bg-gradient-to-r group-hover:text-primary-foreground group-hover:" + plan.accentColor
                  )}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
