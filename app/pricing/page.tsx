import Link from "next/link"

const features = [
  "산재 상담 무제한 (학습용 모킹)",
  "상담 결과 PDF 저장",
  "진행 상태 알림 (예정)",
]

export default function PricingPage() {
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-sm font-medium tracking-wide uppercase mb-2">
            Pricing
          </p>
          <h1 className="text-3xl font-bold">요금제</h1>
          <p className="text-slate-500 mt-3">
            지금은 학습용 모킹 결제입니다. 실제 결제는 발생하지 않습니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white px-8 py-6">
            <h2 className="text-xl font-semibold">프리미엄 1회</h2>
            <p className="text-slate-300 text-sm mt-1">한 번의 결제로 한 건의 상담</p>
          </div>
          <div className="px-8 py-8 space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-slate-900">₩1,000</span>
              <span className="text-slate-500">/회</span>
            </div>

            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/payment/success"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              결제하기 (모킹)
            </Link>

            <p className="text-xs text-slate-400 text-center pt-2 border-t border-slate-100">
              ※ 학습용 데모 — 클릭 시 결제 성공 페이지로 바로 이동합니다
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-center">
          <Link href="/chat" className="text-slate-500 hover:text-slate-900 underline">
            ← 챗으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  )
}
