import { useState, useEffect } from "react";
import { Users, CreditCard, Clock, Calendar, TrendingUp, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Centralized employee database with profiles, documents, and org charts. Onboard new hires in minutes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    icon: CreditCard,
    title: "Payroll Processing",
    description: "Automated payroll calculations, tax deductions, and direct deposits. Eliminate manual errors.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    icon: Clock,
    title: "Time & Attendance",
    description: "Track work hours, breaks, and overtime with biometric integrations and mobile clock-in.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description: "Streamlined leave requests, approvals, and balance tracking. Holiday calendars included.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "Performance Reviews",
    description: "Goal setting, 360° feedback, and performance appraisals. Develop your talent effectively.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Real-time dashboards, custom reports, and workforce analytics. Data-driven HR decisions.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
];

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, features.length - slidesPerView);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="features" className="section-padding relative overflow-hidden">
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border-border/50 bg-secondary/50 hover:bg-secondary disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 rounded-full border-border/50 bg-secondary/50 hover:bg-secondary disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Slider */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 24 / slidesPerView}px))`,
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 24 / slidesPerView}px)` }}
                >
                  <div className="group glass-card overflow-hidden hover-lift cursor-pointer h-full">
                    {/* Feature Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-border/30">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
