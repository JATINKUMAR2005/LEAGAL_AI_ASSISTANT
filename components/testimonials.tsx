"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Brain } from "lucide-react"

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Legal Department Manager",
    content:
      "This AI assistant has transformed our case management workflow. Staff can now access legal information instantly, reducing response times by 60%.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Senior Legal Counsel",
    content:
      "The AI's understanding of legal procedures and case precedents is impressive. It's like having a junior associate available 24/7.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Compliance Officer",
    content:
      "We've significantly reduced repetitive legal queries from staff. The AI handles routine questions perfectly, letting us focus on complex cases.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0">
        {/* Testimonial Network Pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <g stroke="rgb(139,90,43)" strokeWidth="1" fill="none" opacity="0.2">
              <circle cx="300" cy="200" r="50" className="animate-pulse" />
              <circle cx="600" cy="150" r="40" className="animate-pulse" style={{ animationDelay: "1s" }} />
              <circle cx="900" cy="250" r="45" className="animate-pulse" style={{ animationDelay: "2s" }} />

              <path d="M300,200 L600,150 L900,250 M300,200 L600,400 M600,150 L900,400" className="animate-pulse" />
            </g>
          </svg>
        </div>

        {/* Floating Quote Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-24 left-16 w-3 h-3 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute top-48 right-20 w-2 h-2 bg-accent/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-accent/25 rounded-full animate-ping"></div>
        </div>

        {/* AI Brain Pattern */}
        <div className="absolute top-10 right-10 opacity-5">
          <Brain className="w-24 h-24 text-primary animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">What Legal Professionals Say</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            See how our Legal AI Assistant is transforming departmental operations and case management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90"
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="20" fill="none" stroke="rgb(139,90,43)" strokeWidth="1" />
                    <circle cx="32" cy="32" r="3" fill="rgb(139,90,43)" />
                  </svg>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
