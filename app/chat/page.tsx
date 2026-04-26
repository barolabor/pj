"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"

function extractText(m: any): string {
  if (Array.isArray(m?.parts)) {
    const text = m.parts
      .filter((p: any) => p?.type === "text")
      .map((p: any) => p?.text ?? "")
      .join("")
    if (text) return text
  }
  if (typeof m?.content === "string") return m.content
  if (Array.isArray(m?.content)) {
    return m.content
      .filter((p: any) => p?.type === "text")
      .map((p: any) => p?.text ?? "")
      .join("")
  }
  return ""
}

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat()
  const [input, setInput] = useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput("")
  }

  const isBusy = status === "streaming" || status === "submitted"

  return (
    <main className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">산재 상담 AI (데모)</h1>

      <div className="flex-1 space-y-3 mb-6 overflow-auto">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">예: "허리 디스크는 산재로 인정되나요?"</p>
        )}
        {messages.map((m: any) => {
          const text = extractText(m)
          return (
            <div
              key={m.id}
              className={`p-3 rounded ${m.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <div className="text-xs text-gray-500 mb-1">
                {m.role === "user" ? "나" : "AI"}
              </div>
              <div className="whitespace-pre-wrap">
                {text || <span className="text-gray-400 text-sm">(응답 처리중...)</span>}
              </div>
            </div>
          )
        })}
        {isBusy && (
          <p className="text-xs text-gray-400">생성 중...</p>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
          disabled={isBusy}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isBusy || !input.trim()}
        >
          보내기
        </button>
      </form>
    </main>
  )
}
