"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Scale, MessageSquare, Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

export function ChatDemo() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleChatAccess = () => {
    if (user) {
      router.push("/chat")
    } else {
      router.push("/auth/login")
    }
  }

  if (loading) {
    return (
      <section
        id="chat-demo"
        className="relative py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-background via-muted/20 to-accent/5 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-24 w-3 h-3 bg-accent/40 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
            <Card className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] flex flex-col bg-card/80 backdrop-blur-sm">
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="chat-demo"
      className="relative py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-background via-muted/20 to-accent/5 overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <g stroke="rgb(139,90,43)" strokeWidth="1" fill="none" opacity="0.3">
              <circle cx="200" cy="150" r="30" className="animate-pulse" />
              <circle cx="500" cy="100" r="25" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
              <circle cx="800" cy="200" r="35" className="animate-pulse" style={{ animationDelay: "1s" }} />
              <circle cx="300" cy="400" r="28" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
              <circle cx="700" cy="450" r="32" className="animate-pulse" style={{ animationDelay: "2s" }} />

              <path
                d="M200,150 L500,100 L800,200 M300,400 L700,450 M200,150 L300,400 M500,100 L700,450"
                className="animate-pulse"
              />
            </g>
          </svg>
        </div>

        {/* Floating AI Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-accent/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary/50 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-accent/30 rounded-full animate-pulse"></div>
        </div>

        {/* Data Stream Lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 300 600">
            <g stroke="rgb(139,90,43)" strokeWidth="2" fill="none">
              <path
                d="M0,50 Q150,100 300,50 T300,200 Q150,250 0,200 T0,350 Q150,400 300,350 T300,500"
                className="animate-pulse"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance mb-3 sm:mb-4 lg:mb-6">
            Legal Case Assistant
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground text-pretty max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
            Get instant assistance with legal cases, document research, and departmental procedures.
          </p>
        </div>

        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
          <Card className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] flex flex-col bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shrink-0">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg">JUSTIBOT</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="cardPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="rgb(139,90,43)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cardPattern)" />
                </svg>
              </div>

              {user ? (
                <div className="text-center space-y-4 relative z-10">
                  <div className="relative">
                    <MessageSquare className="w-12 h-12 mx-auto text-primary" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      Welcome Back!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Access your secure legal consultation interface
                    </p>
                    <Button onClick={handleChatAccess} size="lg" className="shadow-lg">
                      Open Legal Assistant
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 relative z-10">
                  <LogIn className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Secure Legal Department Access</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign in with your departmental credentials to access confidential legal case information
                    </p>
                    <div className="space-x-2">
                      <Button onClick={handleChatAccess} className="shadow-lg">
                        Department Sign In
                      </Button>
                      <Button variant="outline" onClick={() => router.push("/auth/sign-up")}>
                        Request Access
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
