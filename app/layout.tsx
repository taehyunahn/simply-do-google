import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "심플리Do | 구글 시트 자동화 & 랜딩페이지 제작",
  description:
    "반복되는 수작업을 구글 시트 하나로 자동화합니다. 랜딩페이지 제작, 고객관리 자동화까지.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <nav className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/landing">
              <Image
                src="/simplydo-logo2.png"
                alt="심플리Do"
                width={144}
                height={20}
                priority
              />
            </Link>

            <div className="flex items-center gap-8">
              <Link
                href="/landing"
                className="text-base font-medium text-[#121212] transition-colors hover:text-[var(--text-primary)]"
              >
                랜딩페이지
              </Link>
              <a
                href="https://www.youtube.com/channel/UC9RBkYFiy-FlRQqWRiMOBrg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-[#121212] transition-colors hover:text-[var(--text-primary)]"
              >
                YouTube
              </a>
              <a
                href="https://open.kakao.com/o/s613NWxh"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-primary-500)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-600)]"
              >
                무료 상담
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--border-default)] bg-[var(--bg-subtle)]">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">심플리Do</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-tertiary)]">
                  구글 시트 기반 업무 자동화 &amp; 랜딩페이지 제작
                </p>
              </div>
              <div className="flex gap-8 text-sm text-[var(--text-secondary)]">
                <Link href="/landing" className="hover:text-[var(--text-primary)]">
                  랜딩페이지
                </Link>
                <a
                  href="https://www.youtube.com/channel/UC9RBkYFiy-FlRQqWRiMOBrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)]"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-tertiary)]">
              &copy; 2026 심플리Do. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
