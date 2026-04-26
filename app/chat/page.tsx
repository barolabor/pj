"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type Msg = { role: "user" | "assistant"; text: string }

const quickPrompts = [
  "허리 디스크가 산재로 인정되나요?",
  "출퇴근길 사고도 산재 신청이 가능한가요?",
  "산재 신청 절차를 알려주세요",
]

function ChatInner() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get("q") ?? ""
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function send(text: string) {
    if (!text.trim() || loading) return
    setMessages((m) => [...m, { role: "user", text }])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const raw = await res.text()
      let data: any = {}
      try {
        data = raw ? JSON.parse(raw) : {}
      } catch {
        data = { error: `JSON 파싱 실패. status=${res.status}.` }
      }
      if (!res.ok || data.error) {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: `[서버 오류 ${res.status}] ${data.error || "(빈 응답)"}` },
        ])
      } else {
        setMessages((m) => [...m, { role: "assistant", text: data.text || "(응답 없음)" }])
      }
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: "[네트워크 오류] " + String(err) }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQ) send(initialQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ])

  return (
    <main className="flex-1 flex flex-col">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">
        <h1 className="text-xl font-semibold mb-1">상담 시작</h1>
        <p className="text-sm text-slate-500 mb-6">
          사고 경위, 증상, 치료 경과 등을 편하게 말씀해 주세요.
        </p>

        <div className="flex-1 space-y-4 mb-4 overflow-auto">
          {messages.length === 0 && !loading && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 mb-3 font-medium">어떤 상황인가요?</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="text-sm border border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-full px-3 py-1.5 text-slate-700 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  나
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                AI
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"></span>
                </span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex items-end gap-2"
        >
          <textarea
            className="flex-1 resize-none px-3 py-2 text-sm focus:outline-none bg-transparent"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="메시지 입력... (Shift+Enter로 줄바꿈)"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl px-4 py-2 transition"
          >
            보내기
          </button>
        </form>
      </div>
    </main>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-500 text-sm">로딩...</div>}>
      <ChatInner />
    </Suspense>
  )
}
