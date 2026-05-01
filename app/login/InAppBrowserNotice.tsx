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
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 space-y-3">
      <div>
        <p className="font-semibold mb-1">
          ⚠️ {info.name} 인앱 브라우저에서는 Google 로그인이 차단됩니다.
        </p>
        <p className="text-xs leading-relaxed">
          Google 보안 정책으로 인앱 브라우저에서는 로그인할 수 없습니다.
          카카오 로그인은 그대로 사용 가능하며, Google 로그인은 외부 브라우저에서 열어 주세요.
        </p>
      </div>

      {info.isAndroid && (
        <button
          type="button"
          onClick={openInChrome}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-md px-3 py-2 transition"
        >
          Chrome으로 열기
        </button>
      )}

      {info.isIOS && (
        <p className="text-xs leading-relaxed bg-white/60 rounded-md px-3 py-2">
          📱 우측 상단 <span className="font-semibold">메뉴(⋯)</span> → <span className="font-semibold">"Safari로 열기"</span> 또는 <span className="font-semibold">"다른 브라우저로 열기"</span> 선택
        </p>
      )}
    </div>
  )
}
