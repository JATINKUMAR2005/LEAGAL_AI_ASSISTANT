"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Clock, Shield, FileSearch, Users, Database } from "lucide-react"

const features = [
  {
    icon: Scale,
    title: "Legal Expertise",
    description: "Specialized knowledge in departmental legal procedures, case law, and regulatory compliance.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock access to legal information and case assistance for urgent matters.",
  },
  {
    icon: Shield,
    title: "Secure & Confidential",
    description: "Attorney-client privilege protection with encrypted communications and secure data handling.",
  },
  {
    icon: FileSearch,
    title: "Case Research",
    description: "Instant access to case precedents, legal documents, and departmental case history.",
  },
  {
    icon: Users,
    title: "Staff Support",
    description: "Assists legal staff with repetitive queries, case preparation, and document management.",
  },
  {
    icon: Database,
    title: "Case Management",
    description: "Integrated case tracking, deadline monitoring, and legal document organization.",
  },
]

export function Features() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-muted/30 via-background to-accent/5 overflow-hidden">
      <div className="absolute inset-0">
        {/* Data Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <defs>
              <pattern id="dataGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="rgb(139,90,43)" strokeWidth="0.5" />
                <circle cx="25" cy="25" r="1" fill="rgb(139,90,43)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dataGrid)" />
          </svg>
        </div>

        {/* Floating AI Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute top-48 right-24 w-1 h-1 bg-accent/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-primary/15 rounded-full animate-pulse"></div>
          <div className="absolute top-72 right-1/3 w-2 h-2 bg-accent/25 rounded-full animate-ping"></div>
        </div>

        {/* AI Processing Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <g stroke="rgb(139,90,43)" strokeWidth="1" fill="none">
              <path d="M0,100 Q400,150 800,100" className="animate-pulse" />
              <path d="M0,300 Q400,250 800,300" className="animate-pulse" style={{ animationDelay: "1s" }} />
              <path d="M0,500 Q400,450 800,500" className="animate-pulse" style={{ animationDelay: "2s" }} />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Why Choose Our JUSTIBOT?</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover how our specialized AI transforms legal department operations and case management efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
