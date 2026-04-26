import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      )
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        "당신은 친절한 한국어 AI 어시스턴트입니다. 산업재해보상에 관한 일반 정보를 안내해 주세요. 정확한 판단은 공인노무사 상담을 권유하세요.",
      prompt: message,
    })

    return Response.json({ text })
  } catch (err: any) {
    console.error("API /chat error:", err)
    return Response.json(
      { error: err?.message || String(err) },
      { status: 500 }
    )
  }
}
