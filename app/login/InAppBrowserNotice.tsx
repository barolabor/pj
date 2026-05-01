"use client"

import { useEffect, useState } from "react"

type Info = {
  name: string
  isAndroid: boolean
  isIOS: boolean
}

const PATTERNS: Array<[string, RegExp]> = [
  ["카카오톡", /KAKAOTALK/i],
  ["네이버", /NAVER\(inapp|naver/i],
  ["라인", /Line\//i],
  ["인스타그램", /Instagram/i],
  ["페이스북", /FBAN|FBAV/i],
  ["다음", /Daum/i],
]

function detect(): Info | null {
  if (typeof window === "undefined") return null
  const ua = navigator.userAgent
  const isAndroid = /Android/i.test(ua)
  const isIOS = /iPhone|iPad|iPod/i.test(ua)
  for (const [name, re] of PATTERNS) {
    if (re.test(ua)) return { name, isAndroid, isIOS }
  }
  return null
}

export default function InAppBrowserNotice() {
  const [info, setInfo] = useState<Info | null>(null)

  useEffect(() => {
    setInfo(detect())
  }, [])

  if (!info) return null

  const openInChrome = () => {
    const cleanUrl = window.location.href.replace(/^https?:\/\//, "")
    window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 space-y-3">
      <div className="space-y-1.5">
        <p className="font-semibold flex items-center gap-1.5">
          <span aria-hidden>💡</span>
          Google 로그인을 사용하시려면 잠깐만요
        </p>
        <p className="text-xs leading-relaxed text-amber-800">
          지금은 <span className="font-medium">{info.name} 앱 안의 브라우저</span>로 접속하신 상태예요.
          이 환경에서는 Google이 보안상 로그인을 막아두고 있어서, 아래 방법 중 편하신 쪽으로 진행해 주세요.
        </p>
      </div>

      <div className="bg-white/70 rounded-lg p-3 space-y-2 text-xs leading-relaxed">
        <p className="flex gap-2">
          <span className="font-semibold shrink-0">방법 1.</span>
          <span>위쪽 <span className="font-semibold">"카카오로 계속하기"</span> 버튼으로 바로 로그인 (가장 간편해요)</span>
        </p>
        <p className="flex gap-2">
          <span className="font-semibold shrink-0">방법 2.</span>
          <span>
            {info.isAndroid && <>아래 <span className="font-semibold">Chrome으로 열기</span> 버튼을 눌러 Chrome에서 다시 열기</>}
            {info.isIOS && <>우측 상단 <span className="font-semibold">메뉴(⋯)</span> → <span className="font-semibold">"Safari로 열기"</span>를 선택해 Safari에서 다시 열기</>}
            {!info.isAndroid && !info.isIOS && <>브라우저 메뉴에서 "다른 브라우저로 열기"를 선택해 외부 브라우저에서 다시 열기</>}
          </span>
        </p>
      </div>

      {info.isAndroid && (
        <button
          type="button"
          onClick={openInChrome}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg px-3 py-2.5 transition shadow-sm"
        >
          Chrome으로 열기
        </button>
      )}
    </div>
  )
}
