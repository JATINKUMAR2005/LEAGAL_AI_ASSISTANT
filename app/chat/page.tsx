"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Home, Trash2, Copy, RotateCcw, Settings, MessageSquare, Mail } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI assistant. I'm here to help you with any questions or tasks you might have. What would you like to talk about today?",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          conversationId: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error while processing your request. Please try again.",
        role: "assistant",
        timestamp: getCurrentTime(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your AI assistant. I'm here to help you with any questions or tasks you might have. What would you like to talk about today?",
        role: "assistant",
        timestamp: getCurrentTime(),
      },
    ])
    setConversationId(null)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const regenerateResponse = async (messageIndex: number) => {
    if (messageIndex === 0) return // Don't regenerate the first message

    const messageToRegenerate = messages[messageIndex]
    if (messageToRegenerate.role !== "assistant") return

    const previousUserMessage = messages[messageIndex - 1]
    if (!previousUserMessage || previousUserMessage.role !== "user") return

    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: previousUserMessage.content,
          conversationId: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const newMessage: Message = {
        ...messageToRegenerate,
        content: data.response,
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev.slice(0, messageIndex), newMessage, ...prev.slice(messageIndex + 1)])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-accent/5 flex flex-col relative overflow-hidden pt-16">
      <Header />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Chat Data Stream Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 1400 900">
              <defs>
                <pattern id="chatGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect width="60" height="60" fill="none" stroke="rgb(139,90,43)" strokeWidth="0.5" />
                  <circle cx="30" cy="30" r="1" fill="rgb(139,90,43)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#chatGrid)" />
            </svg>
          </div>

          {/* Floating AI Processing Indicators */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 left-80 w-1 h-1 bg-accent/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-primary/15 rounded-full animate-pulse"></div>
            <div className="absolute top-60 right-1/4 w-2 h-2 bg-accent/25 rounded-full animate-ping"></div>
          </div>

          {/* Neural Network Lines */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-8">
            <svg className="w-full h-full" viewBox="0 0 600 900">
              <g stroke="rgb(139,90,43)" strokeWidth="1" fill="none" opacity="0.3">
                <path
                  d="M100,100 Q300,200 500,100 T500,300 Q300,400 100,300 T100,500 Q300,600 500,500 T500,700"
                  className="animate-pulse"
                />
                <circle cx="100" cy="100" r="3" fill="rgb(139,90,43)" className="animate-pulse" />
                <circle
                  cx="300"
                  cy="200"
                  r="2"
                  fill="rgb(199,155,122)"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <circle
                  cx="500"
                  cy="100"
                  r="3"
                  fill="rgb(139,90,43)"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-card/80 backdrop-blur-sm border-r border-border/50 flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] z-10 shadow-lg">
          <div className="p-4 border-b border-border/50">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="flex-1 p-4 relative">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 256 600">
                <defs>
                  <pattern id="sidebarPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="16" cy="16" r="1" fill="rgb(139,90,43)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sidebarPattern)" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-6 relative z-10">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Chat Session</h2>
            </div>

            <div className="space-y-2 relative z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="w-full justify-start gap-2 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
                Clear Chat
              </Button>

              <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/contact">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </Button>

              <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent" disabled>
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>

          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {messages.length - 1} messages
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col ml-64 relative z-10">
          {/* Header */}
          <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-primary/10 to-accent/10">
                  <Bot className="w-5 h-5 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-lg">AI Assistant</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {isLoading ? "Typing..." : "Online"}
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 pb-32 relative">
            <div className="absolute inset-0 opacity-3">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <g stroke="rgb(139,90,43)" strokeWidth="0.5" fill="none">
                  <path
                    d="M0,150 Q400,100 800,150 M0,300 Q400,250 800,300 M0,450 Q400,400 800,450"
                    className="animate-pulse"
                  />
                </g>
              </svg>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              {messages.map((message, index) => (
                <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? "bg-gradient-to-br from-accent/10 to-accent/20"
                          : "bg-gradient-to-br from-primary/10 to-primary/20"
                      }
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-accent" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex-1 max-w-2xl ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block p-4 rounded-lg relative group shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                          : "bg-muted/80 backdrop-blur-sm border border-border/30"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-strong:font-semibold prose-ul:my-2 prose-ol:my-2 prose-li:my-1"
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      )}

                      {/* Message Actions */}
                      <div
                        className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ${
                          message.role === "user" ? "left-2" : "right-2"
                        }`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 hover:bg-background/20"
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        {message.role === "assistant" && index > 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 hover:bg-background/20"
                            onClick={() => regenerateResponse(index)}
                            disabled={isLoading}
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div
                      className={`text-xs text-muted-foreground mt-1 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="bg-card/80 backdrop-blur-sm border-t border-border/50 p-4 fixed bottom-0 left-64 right-0 z-20 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 min-h-[44px] max-h-32 resize-none rounded-md border border-input/50 bg-background/80 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = "auto"
                    target.style.height = Math.min(target.scrollHeight, 128) + "px"
                  }}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="px-6 shadow-sm">
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              <div className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send, Shift + Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
