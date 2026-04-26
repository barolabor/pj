import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">산재 상담 AI</h1>
      <p className="text-gray-600 text-lg">근로자를 위한 AI 산업재해보상 상담 (데모)</p>
      <Link
        href="/chat"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 text-lg"
      >
        챗 시작하기 →
      </Link>
    </main>
  )
}
