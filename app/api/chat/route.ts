import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

interface AIMemory {
  name?: string
  userPreferences?: Record<string, any>
  personalInfo?: Record<string, any>
  conversationContext?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    console.log("[v0] Using Groq integration with database storage")

    let currentConversationId = conversationId
    if (!currentConversationId) {
      const { data: newConversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        })
        .select()
        .single()

      if (convError) {
        console.error("[v0] Error creating conversation:", convError)
        return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
      }
      currentConversationId = newConversation.id
    }

    const { data: historyData, error: historyError } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", currentConversationId)
      .order("created_at", { ascending: true })
      .limit(20)

    if (historyError) {
      console.error("[v0] Error fetching history:", historyError)
      return NextResponse.json({ error: "Failed to fetch conversation history" }, { status: 500 })
    }

    const { data: memoryData, error: memoryError } = await supabase.from("ai_memory").select("*").eq("user_id", user.id)

    if (memoryError) {
      console.error("[v0] Error fetching memory:", memoryError)
    }

    const memory: AIMemory = {}
    if (memoryData) {
      memoryData.forEach((item) => {
        if (item.key === "name") {
          memory.name = item.value
        } else if (item.key.startsWith("preference_")) {
          memory.userPreferences = memory.userPreferences || {}
          memory.userPreferences[item.key] = item.value
        } else if (item.key === "conversationContext") {
          memory.conversationContext = JSON.parse(item.value)
        }
      })
    }

    let systemPrompt = `You are a specialized Legal AI Assistant for a government department's legal team. Your primary role is to assist with legal case management, provide legal information, and support departmental staff with legal queries.

CORE RESPONSIBILITIES:
1. **Legal Case Assistance**: Help with case research, document analysis, and case management workflows
2. **Legal Information**: Provide guidance on legal procedures, regulations, and departmental policies
3. **Staff Support**: Answer routine legal questions to reduce workload on legal staff
4. **Document Management**: Assist with legal document organization and retrieval

LEGAL EXPERTISE AREAS:
- Departmental legal procedures and policies
- Case law research and precedent analysis
- Regulatory compliance and interpretation
- Legal document drafting assistance
- Administrative law and government regulations
- Contract review and analysis
- Risk assessment and legal advisory

IMPORTANT GUIDELINES:
- Always maintain attorney-client privilege and confidentiality
- Provide accurate legal information but clarify when formal legal advice is needed
- Reference relevant case law, statutes, and regulations when applicable
- Escalate complex legal matters to human legal counsel
- Maintain detailed records of all interactions for audit purposes
- Follow data protection and privacy regulations strictly

COMMUNICATION STYLE:
- Professional and precise legal language
- Clear explanations of complex legal concepts
- Structured responses with proper legal citations
- Respectful and confidential tone appropriate for legal matters`

    // Add memory context to system prompt
    if (memory?.name) {
      systemPrompt += `\n\nIMPORTANT: Your name is ${memory.name}. Always remember and acknowledge this when relevant.`
    }

    if (memory?.userPreferences && Object.keys(memory.userPreferences).length > 0) {
      systemPrompt += `\n\nUser Preferences: ${Object.values(memory.userPreferences).join("; ")}`
    }

    if (memory?.conversationContext && memory.conversationContext.length > 0) {
      systemPrompt += `\n\nImportant Context: ${memory.conversationContext.join("; ")}`
    }

    systemPrompt += `

LEGAL DOCUMENT FORMATTING:
1. **Legal Citations**: Use proper Bluebook or jurisdiction-specific citation format
2. **Case References**: Include case name, court, year, and relevant page numbers
3. **Statutory References**: Cite statutes with full title, section, and subsection
4. **Regulatory Citations**: Reference CFR, state regulations with proper formatting
5. **Legal Memoranda**: Structure with Issue, Brief Answer, Facts, Discussion, Conclusion

CONFIDENTIALITY & SECURITY:
- All conversations are protected under attorney-client privilege
- Maintain strict confidentiality of case information and client data
- Log all interactions for legal audit and compliance purposes
- Never share confidential information outside authorized personnel
- Follow departmental data retention and destruction policies

MEMORY INSTRUCTIONS:
- Remember case details and client preferences for continuity
- Track important deadlines and case milestones
- Maintain context across legal consultations
- Reference previous legal advice and decisions when relevant

Always prioritize accuracy, confidentiality, and professional legal standards in all interactions.`

    const messages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...(historyData?.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })) || []),
      {
        role: "user" as const,
        content: message,
      },
    ]

    const { error: userMsgError } = await supabase.from("messages").insert({
      conversation_id: currentConversationId,
      role: "user",
      content: message,
    })

    if (userMsgError) {
      console.error("[v0] Error saving user message:", userMsgError)
    }

    console.log("[v0] Calling Groq API with model: llama-3.3-70b-versatile")

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages,
      temperature: 0.7,
      maxTokens: 2048,
    })

    const { error: assistantMsgError } = await supabase.from("messages").insert({
      conversation_id: currentConversationId,
      role: "assistant",
      content: text,
    })

    if (assistantMsgError) {
      console.error("[v0] Error saving assistant message:", assistantMsgError)
    }

    await extractAndSaveMemory(supabase, user.id, message, text)

    console.log("[v0] Successfully generated response and saved to database")
    return NextResponse.json({
      response: text,
      conversationId: currentConversationId,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate response",
      },
      { status: 500 },
    )
  }
}

async function extractAndSaveMemory(supabase: any, userId: string, userMessage: string, aiResponse: string) {
  try {
    // Extract name
    const namePatterns = [
      /(?:your name is|call you|name you) ([a-zA-Z]+)/i,
      /(?:i'll call you|i will call you) ([a-zA-Z]+)/i,
      /(?:you are|you're) ([a-zA-Z]+)/i,
    ]

    for (const pattern of namePatterns) {
      const match = userMessage.match(pattern)
      if (match && match[1]) {
        await supabase.from("ai_memory").upsert({
          user_id: userId,
          key: "name",
          value: match[1],
        })
        break
      }
    }

    // Extract preferences
    if (userMessage.toLowerCase().includes("i prefer") || userMessage.toLowerCase().includes("i like")) {
      const contextKey = `preference_${Date.now()}`
      await supabase.from("ai_memory").upsert({
        user_id: userId,
        key: contextKey,
        value: userMessage,
      })
    }

    // Extract important context
    if (userMessage.toLowerCase().includes("remember") || userMessage.toLowerCase().includes("important")) {
      const { data: existingContext } = await supabase
        .from("ai_memory")
        .select("value")
        .eq("user_id", userId)
        .eq("key", "conversationContext")
        .single()

      let contextArray = []
      if (existingContext) {
        try {
          contextArray = JSON.parse(existingContext.value)
        } catch (e) {
          contextArray = []
        }
      }

      contextArray = [...contextArray.slice(-4), userMessage]

      await supabase.from("ai_memory").upsert({
        user_id: userId,
        key: "conversationContext",
        value: JSON.stringify(contextArray),
      })
    }
  } catch (error) {
    console.error("[v0] Error saving memory:", error)
  }
}
