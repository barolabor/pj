import { signIn } from "@/auth"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-sm text-slate-500 mt-1">
            상담 내역을 저장하고 이어서 보려면 로그인이 필요합니다.
          </p>
        </div>
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/chat" })
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-50 rounded-lg px-4 py-3 font-medium transition"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 10.2v3.6h5.05c-.21 1.13-1.55 3.32-5.05 3.32-3.04 0-5.52-2.51-5.52-5.62S8.96 5.88 12 5.88c1.73 0 2.89.74 3.55 1.37l2.42-2.33C16.46 3.5 14.4 2.5 12 2.5 6.83 2.5 2.7 6.63 2.7 11.5S6.83 20.5 12 20.5c6.93 0 9.3-4.86 9.3-9.36 0-.62-.07-1.1-.16-1.94H12z"
              />
            </svg>
            <span>Google로 계속하기</span>
          </button>
        </form>
        <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-100">
          <Link href="/" className="hover:text-slate-700">← 홈으로</Link>
        </div>
      </div>
    </main>
  )
}
