"use client"

import { useState } from "react"

type Msg = { role: "user" | "assistant"; text: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userText = input
    setMessages((m) => [...m, { role: "user", text: userText }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.text || "(응답 없음)" },
      ])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "오류가 발생했습니다: " + String(err) },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">산재 상담 AI (데모)</h1>

      <div className="flex-1 space-y-3 mb-6 overflow-auto">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            예: "허리 디스크는 산재로 인정되나요?"
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded ${
              m.role === "user" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-gray-500 mb-1">
              {m.role === "user" ? "나" : "AI"}
            </div>
            <div className="whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded bg-gray-100">
            <div className="text-xs text-gray-500 mb-1">AI</div>
            <div className="text-gray-400">응답 생성 중...</div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          보내기
        </button>
      </form>
    </main>
  )
}
