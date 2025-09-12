"use client"

import { Button } from "@/components/ui/button"
import { Scale, Github, Mail, Phone, Brain } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 overflow-hidden">
      <div className="absolute inset-0">
        {/* AI Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <defs>
              <pattern id="footerCircuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M10,10 L70,10 L70,70 L10,70 Z" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="10" cy="10" r="2" fill="white" />
                <circle cx="70" cy="10" r="2" fill="white" />
                <circle cx="70" cy="70" r="2" fill="white" />
                <circle cx="10" cy="70" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerCircuit)" />
          </svg>
        </div>

        {/* Floating AI Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-20 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-ping"></div>
        </div>

        {/* AI Brain Icon */}
        <div className="absolute top-8 right-8 opacity-5">
          <Brain className="w-32 h-32 animate-pulse" />
        </div>

        {/* Data Flow Lines */}
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1200 100">
            <g stroke="white" strokeWidth="1" fill="none">
              <path d="M0,50 Q300,20 600,50 T1200,50" className="animate-pulse" />
              <path d="M0,70 Q300,40 600,70 T1200,70" className="animate-pulse" style={{ animationDelay: "1s" }} />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Scale className="w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold">LegalAI Assistant</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md text-pretty">
              Streamline your legal department operations with our specialized AI assistant. Get instant access to case
              information and legal guidance 24/7.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 shadow-sm"
                asChild
              >
                <a href="mailto:legal-support@department.gov" aria-label="Email Legal Department">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 shadow-sm"
                asChild
              >
                <a href="tel:+1-555-LEGAL-AI" aria-label="Call Legal Department">
                  <Phone className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 shadow-sm"
                asChild
              >
                <a
                  href="https://github.com/legal-department/ai-assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#features" className="hover:text-primary-foreground transition-colors">
                  Case Management
                </a>
              </li>
              <li>
                <a href="/legal-database" className="hover:text-primary-foreground transition-colors">
                  Legal Database
                </a>
              </li>
              <li>
                <a href="/case-precedents" className="hover:text-primary-foreground transition-colors">
                  Case Precedents
                </a>
              </li>
              <li>
                <a href="/legal-procedures" className="hover:text-primary-foreground transition-colors">
                  Procedures Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Legal Department</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                  Contact Legal Team
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-protection" className="hover:text-primary-foreground transition-colors">
                  Data Protection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 Legal Department AI Assistant. All rights reserved. | Confidential Legal System</p>
        </div>
      </div>
    </footer>
  )
}
