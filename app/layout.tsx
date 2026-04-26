import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "산재 상담 AI",
  description: "근로자를 위한 AI 산업재해보상 상담",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 text-white text-sm font-bold">
                재
              </span>
              <span>산재 상담 AI</span>
            </Link>
            <nav className="text-sm flex items-center gap-5 text-slate-300">
              <Link href="/" className="hover:text-white">
                홈
              </Link>
              <Link href="/chat" className="hover:text-white">
                상담하기
              </Link>
              {session?.user ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="text-slate-200 hidden sm:inline">
                    {session.user.name ?? "사용자"}
                  </span>
                  <button className="hover:text-white">로그아웃</button>
                </form>
              ) : (
                <Link href="/login" className="hover:text-white">
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </header>

        <div className="flex-1 flex flex-col">{children}</div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-5 text-xs text-slate-500 leading-relaxed">
            본 서비스는 정보 제공을 목적으로 하며 법률 자문이 아닙니다. 정확한
            판단과 신청은 공인노무사 또는 근로복지공단 상담을 권장합니다.
          </div>
        </footer>
      </body>
    </html>
  );
}
