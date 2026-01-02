import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "NexHR transformed our HR operations. We've reduced administrative tasks by 60% and our team can now focus on what matters most – our employees.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "The payroll automation alone saved us countless hours. The platform is intuitive, and the support team is incredibly responsive. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "People Operations Manager",
    company: "Innovate Co.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "We evaluated several HRMS platforms, and NexHR stood out with its comprehensive features and seamless user experience. Best decision we made.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => (
  <div className="clean-card p-8 hover-lift h-full">
    {/* Rating */}
    <div className="flex gap-1 mb-6">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 fill-amber-400 text-amber-400"
        />
      ))}
    </div>

    {/* Content */}
    <p className="text-foreground leading-relaxed mb-8">
      "{testimonial.content}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
      />
      <div>
        <div className="font-semibold text-foreground">
          {testimonial.name}
        </div>
        <div className="text-sm text-muted-foreground">
          {testimonial.role} at {testimonial.company}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding relative bg-secondary/30">
      <div className="container-max relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by{" "}
            <span className="text-primary">HR Teams Everywhere</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about their experience with NexHR.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
