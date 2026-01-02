import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 29,
    yearlyPrice: 24,
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

const PricingCard = ({ plan, index, isYearly }: { plan: typeof plans[0]; index: number; isYearly: boolean }) => (
  <div
    className={cn(
      "group relative rounded-2xl transition-all duration-500 h-full",
      "animate-fade-in",
      plan.popular ? "md:scale-105 md:-my-4" : ""
    )}
    style={{ animationDelay: `${index * 150}ms` }}
  >
    {/* Highlight Border */}
    <div className={cn(
      "absolute -inset-[1px] rounded-2xl transition-opacity duration-500",
      plan.popular 
        ? "bg-border opacity-100" 
        : "bg-border/50 opacity-0 group-hover:opacity-100"
    )} />

    {/* Card Content */}
    <div className={cn(
      "relative glass-card p-8 flex flex-col h-full rounded-2xl transition-all duration-500",
      "group-hover:shadow-lg group-hover:shadow-border/10",
      plan.popular ? "shadow-lg shadow-border/10" : ""
    )}>
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-foreground text-background">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        {plan.name}
      </h3>

      <p className="text-muted-foreground text-sm mb-6">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-8">
        {plan.monthlyPrice !== null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-display font-bold text-foreground transition-all duration-300">
              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
            </span>
            <span className="text-muted-foreground">/month</span>
          </div>
        ) : (
          <span className="text-3xl font-display font-bold text-foreground">
            Custom Pricing
          </span>
        )}
        {plan.monthlyPrice !== null && isYearly && (
          <p className="text-sm text-muted-foreground mt-1">
            <span className="line-through">${plan.monthlyPrice}</span>
            <span className="text-green-400 ml-2">Save ${(plan.monthlyPrice - plan.yearlyPrice!) * 12}/year</span>
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-secondary border border-border">
              <Check className="w-3 h-3 text-foreground" />
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
            ? "bg-foreground hover:bg-foreground/90 text-background"
            : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
        )}
      >
        {plan.cta}
      </Button>
    </div>
  </div>
);

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

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {plans.map((plan, index) => (
                <CarouselItem key={plan.name}>
                  <div className="pt-6 pb-2">
                    <PricingCard plan={plan} index={index} isYearly={isYearly} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
