"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Scale, Shield, Brain, Cpu, Network } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { useEffect, useState } from "react"

export function Hero() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [supabase])

  const handleStartConsultation = () => {
    if (isAuthenticated) {
      router.push("/chat")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-accent/10 overflow-hidden">
      <div className="absolute inset-0">
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="rgb(139,90,43)" strokeWidth="1" />
                <circle cx="10" cy="10" r="2" fill="rgb(139,90,43)" />
                <circle cx="90" cy="10" r="2" fill="rgb(139,90,43)" />
                <circle cx="90" cy="90" r="2" fill="rgb(139,90,43)" />
                <circle cx="10" cy="90" r="2" fill="rgb(139,90,43)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        {/* Floating AI Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-accent/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-1 h-1 bg-primary/50 rounded-full animate-ping"></div>
          <div className="absolute top-60 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-primary/20 rounded-full animate-ping"></div>
        </div>

        {/* Neural Network Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            <g stroke="rgb(139,90,43)" strokeWidth="1" fill="none">
              <path d="M50,50 Q200,100 350,50 T350,200 Q200,250 50,200 T50,350 Q200,400 350,350 T350,500" />
              <circle cx="50" cy="50" r="4" fill="rgb(139,90,43)" />
              <circle cx="200" cy="100" r="3" fill="rgb(199,155,122)" />
              <circle cx="350" cy="50" r="4" fill="rgb(139,90,43)" />
              <circle cx="350" cy="200" r="3" fill="rgb(199,155,122)" />
              <circle cx="200" cy="250" r="4" fill="rgb(139,90,43)" />
              <circle cx="50" cy="200" r="3" fill="rgb(199,155,122)" />
            </g>
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-card/60"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Enhanced AI Imagery */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 backdrop-blur-sm border border-border/20 shadow-2xl">
              <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10">
                {/* AI Brain with Data Streams */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <Brain className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <div className="absolute -inset-4 border-2 border-accent/30 rounded-full animate-spin"></div>
                    <div className="absolute -inset-8 border border-primary/20 rounded-full animate-ping"></div>
                    <div className="absolute -inset-12 border border-accent/10 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Enhanced Floating AI Elements */}
                <div className="absolute top-16 left-16 animate-float">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Scale className="w-8 h-8 text-accent-foreground" />
                  </div>
                </div>

                <div className="absolute top-20 right-20 animate-float-delayed">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Cpu className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>

                <div className="absolute bottom-20 left-20 animate-float">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Network className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                <div className="absolute bottom-16 right-16 animate-float-delayed">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Shield className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>

                {/* Data Flow Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(139,90,43)" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="rgb(199,155,122)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="rgb(139,90,43)" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="rgb(139,90,43)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#lineGradient)" strokeWidth="2" fill="none">
                    <path
                      d="M200,200 L100,100 M200,200 L300,100 M200,200 L100,300 M200,200 L300,300"
                      className="animate-pulse"
                    />
                    <path
                      d="M200,200 L50,200 M200,200 L350,200 M200,200 L200,50 M200,200 L200,350"
                      className="animate-pulse"
                    />
                  </g>
                  {/* Animated Data Pulses */}
                  <circle r="3" fill="url(#pulseGradient)" className="animate-ping">
                    <animateMotion dur="3s" repeatCount="indefinite">
                      <path d="M200,200 L100,100" />
                    </animateMotion>
                  </circle>
                </svg>

                {/* AI Processing Indicators */}
                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>
              </div>

              {/* Enhanced AI Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-card/60 to-card/30 rounded-xl backdrop-blur-sm border border-border/20">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-xs text-muted-foreground">AI Accuracy</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-card/60 to-card/30 rounded-xl backdrop-blur-sm border border-border/20">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-card/60 to-card/30 rounded-xl backdrop-blur-sm border border-border/20">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-xs text-muted-foreground">Cases Solved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              AI-Powered Legal Assistant
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6 leading-tight">
              Your Legal Department's
              <span className="text-primary block mt-2">AI Assistant</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed max-w-xl lg:max-w-none">
              Streamline legal case management with our specialized AI assistant. Get instant access to case
              information, legal guidance, and departmental support 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group shadow-lg"
                onClick={handleStartConsultation}
              >
                Start Legal Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                View Case Database
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Secure & Confidential
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-accent" />
                Legal Compliance
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" />
                AI-Powered Insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
