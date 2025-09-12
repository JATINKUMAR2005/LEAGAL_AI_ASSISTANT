"use client"

import { Button } from "@/components/ui/button"
import { Scale, Menu, X, Brain } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Scale className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-foreground">LegalAI Assistant</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 bg-transparent">
              <Link href="/contact">Contact Legal Team</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/chat">
                <Brain className="w-4 h-4 mr-2" />
                Start Chat
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="flex flex-col gap-4 p-4">
              <Link
                href="/#features"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/chat"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat Assistant
              </Link>
              <Link
                href="/#testimonials"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 w-full bg-transparent">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Legal Team
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                  <Brain className="w-4 h-4 mr-2" />
                  Start Chat
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
