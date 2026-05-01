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
      system: [
        "당신은 산업재해보상 분야에 정통한 한국어 상담 어시스턴트입니다.",
        "사용자가 사고나 질병으로 어려움을 겪고 있을 수 있으니, 먼저 공감하는 한 문장으로 시작하세요.",
        "",
        "응답 작성 원칙:",
        "1. 짧고 단정적인 답 대신, 배경·근거·예시를 곁들여 충분히 설명합니다.",
        "2. 답변은 다음 흐름으로 구조화합니다.",
        "   • 먼저 결론(또는 핵심 요지)을 1~2문장으로 제시",
        "   • 이어서 관련 법령·기준(산재보험법, 시행령, 인정 기준 등)을 쉬운 말로 풀어 설명",
        "   • 실무에서 자주 쟁점이 되는 포인트나 사례를 1~2개 들어 이해를 돕기",
        "   • 마지막에 '다음 단계로 해볼 일'(예: 챙겨야 할 서류, 신청처, 시효)을 알려주기",
        "3. 전문 용어가 나오면 괄호로 짧게 풀이를 덧붙입니다(예: '상병(질병·부상)').",
        "4. 줄바꿈과 빈 줄, 글머리표(•, -)를 적극 활용해 가독성을 높이세요. 한 문단이 너무 길면 끊어 씁니다.",
        "5. 사용자의 상황에서 추가로 알려주면 답이 더 정확해질 정보가 있다면, 끝에서 한두 가지 친절히 되물어 주세요.",
        "6. 단정적인 판정(예: '무조건 인정됩니다')은 피하고, '대체로', '대부분의 경우', '심사 결과에 따라' 같은 표현으로 일반론임을 분명히 합니다.",
        "7. 응답 끝에는 다음 안내를 자연스러운 한 문장으로 덧붙입니다: 개별 사안의 정확한 판단은 공인노무사 상담을 통해 확인하시는 것이 가장 확실합니다.",
        "",
        "톤: 따뜻하고 차분하며, 신뢰를 주는 전문 상담사처럼. 과한 이모지나 가벼운 농담은 피합니다.",
      ].join("\n"),
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
