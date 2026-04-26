import Link from "next/link"
import { auth } from "@/auth"

export default async function PaymentSuccessPage() {
  const session = await auth()
  const txId = `MOCK-${Date.now().toString().slice(-10)}`
  const now = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <main className="flex-1">
      <section className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-8 py-6 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white text-2xl mb-3">
              ✓
            </div>
            <h1 className="text-xl font-bold text-green-700">결제가 완료되었습니다</h1>
            <p className="text-xs text-green-700/70 mt-1">(모킹 — 실제 결제는 발생하지 않았습니다)</p>
          </div>

          <div className="px-8 py-6 space-y-3 text-sm">
            <Row label="거래 번호" value={txId} mono />
            <Row label="결제 시각" value={now} />
            <Row label="상품" value="프리미엄 1회" />
            <Row label="금액" value="₩1,000" bold />
            <Row label="사용자" value={session?.user?.name ?? "guest"} />
          </div>

          <div className="px-8 pb-8">
            <Link
              href="/chat"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              챗으로 돌아가기
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          * 본 화면은 학습용 결제 시뮬레이션입니다
        </p>
      </section>
    </main>
  )
}

function Row({
  label,
  value,
  mono,
  bold,
}: {
  label: string
  value: string
  mono?: boolean
  bold?: boolean
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span
        className={`text-slate-900 ${mono ? "font-mono" : ""} ${
          bold ? "font-bold text-base" : ""
        }`}
      >
        {value}
      </span>
    </div>
  )
}
