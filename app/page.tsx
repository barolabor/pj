import Link from "next/link"

const suggestions = [
  "허리 디스크가 산재로 인정되나요?",
  "출퇴근길 교통사고도 산재 신청 가능한가요?",
  "산재 신청 절차를 알려주세요",
  "회사가 산재 신청을 막아도 되나요?",
]

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <p className="text-blue-300 text-sm font-medium tracking-wide uppercase mb-3">
            AI for Workers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl">
            산업재해보상,<br className="sm:hidden" /> AI에게 먼저 물어보세요.
          </h1>
          <p className="mt-5 text-slate-300 text-lg max-w-2xl">
            복잡한 법령과 절차를 친절한 한국어로. 사고·질병·신청 절차에 대한 1차 상담을 무료로 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              상담 시작하기
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-200 hover:bg-slate-800 px-6 py-3 rounded-lg font-semibold transition"
            >
              어떻게 쓰나요?
            </Link>
          </div>
        </div>
      </section>

      {/* Suggested prompts */}
      <section className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-medium text-slate-700 mb-3">자주 묻는 질문으로 바로 시작</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {suggestions.map((q) => (
              <Link
                key={q}
                href={`/chat?q=${encodeURIComponent(q)}`}
                className="group flex items-center justify-between border border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg px-4 py-3 text-sm text-slate-700 transition"
              >
                <span>{q}</span>
                <span className="text-slate-400 group-hover:text-blue-500" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">1</div>
            <h3 className="font-semibold mb-1">사실관계 정리</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              사고 경위·증상·치료 경과를 자연스러운 대화로 정리합니다.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">2</div>
            <h3 className="font-semibold mb-1">관련 정보 안내</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              산재 인정 기준과 절차를 사례에 맞춰 친절히 설명합니다.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">3</div>
            <h3 className="font-semibold mb-1">다음 행동 가이드</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              필요한 자료, 신청 경로, 전문가 연결까지 안내합니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
