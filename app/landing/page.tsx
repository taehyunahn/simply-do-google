import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "랜딩페이지 제작 | 심플리Do",
  description:
    "치킨값 22,000원에 랜딩페이지 제작. 유지비 0원. 24시간 이내 작업 완료.",
};

export default function LandingPage() {
  return (
    <>
      {/* ── 1. 히어로 ── */}
      <section className="relative min-h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover blur-[2px]"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex min-h-[832px] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center ">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            홈페이지,
            <br />
            치킨 한 마리 값에 만들어 드립니다.
          </h1>
          <h2 className="mt-4 text-lg leading-relaxed text-white/80 sm:text-xl">
            아직 SNS로만 홍보하시나요? <br />
            홈페이지가 있어야 검색으로 새로운 고객이 계속 들어와요
          </h2>

          <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
            <PriceCard
              label="제작비"
              price="22,000원"
              description="24시간 이내 작업 완료"
            />
            <PriceCard
              label="호스팅 배포"
              price="무료"
              description="도메인만 직접 구매"
            />
            <PriceCard
              label="유지보수"
              price="직접 가능"
              description={"유튜브 영상 가이드\n의뢰 시 커피 한 잔 4,500원"}
            />
          </div>

          <div className="mt-8">
            <a
              href="https://open.kakao.com/o/s613NWxh"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              카카오톡으로 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. 야매 아니냐구요? ── */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            야매 아니냐구요?
          </h2>

          <div className="mt-10 space-y-8">
            <CredBlock
              title="HR SaaS 회사 SW 엔지니어 · 2022년 ~ 2026년"
              description="기업용 인사관리 시스템을 만드는 팀에서 프론트엔드, 백엔드, DB까지 풀스택으로 개발했습니다."
            />
            <CredBlock
              title="1인 개발 스튜디오 운영 · 크몽 12건 완료, 리뷰 전원 만점"
              description="학원, 병원, 부동산, 파티룸 등 다양한 업종의 웹사이트와 자동화 시스템을 구축해 왔습니다."
            >
              <div className="mt-4">
                <Image
                  src="/review-kmong.png"
                  alt="크몽 리뷰 - 전원 5.0 만점"
                  width={800}
                  height={800}
                  className="w-1/2 rounded-lg"
                />
              </div>
            </CredBlock>
            <CredBlock
              title="AI·데이터 활용 공모전 수상 2회"
              description="2024 KOICA AI-데이터 활용 공모전 우수상, 2022 산림공공 빅데이터 창업 경진대회 우수상."
            >
              <div className="mt-4">
                <Image
                  src="/award-koica.jpg"
                  alt="KOICA AI-데이터 활용 공모전 우수상 수상"
                  width={1200}
                  height={800}
                  className="w-1/2 rounded-lg"
                />
              </div>
            </CredBlock>
          </div>
        </div>
      </section>

      {/* ── 3. 어떻게 이렇게 저렴하냐구요? ── */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            저렴하게 판매하는 이유,
            <br />
            솔직히 말씀드립니다.
          </h2>

          <div className="mt-10 space-y-10">
            <ReasonBlock
              number="1"
              title="랜딩페이지 제작, 솔직히 쉬워요."
              body="쇼핑몰이나 게시판이 있는 복잡한 홈페이지가 아닙니다. 우리 가게, 우리 회사를 간단히 소개하는 랜딩페이지는 복잡할 게 없어요. 개발자로서 전체 윤곽을 잡고, 요구사항을 정리하고, AI를 보조 도구로 쓰면 빠르게 만들어 드릴 수 있습니다. 무료 호스팅을 쓰면 관리비도 따로 안 들고요."
            />
            <ReasonBlock
              number="2"
              title="여러분을 빨리 돕는 게, 제 본업을 강화시킵니다."
              body="저는 업무 효율화와 자동화에 특화된 개발자예요. 반복되는 업무를 빠르게 처리하는 프로그램을 만드는 게 본업입니다. 그러려면 직접 고객을 만나고, 작업을 체계화하는 경험이 필요해요. 여러분을 빠르고 정확하게 도와드리는 게 제 본업을 더 강화시키는 거니까, 서로 윈윈이죠."
            />
            <ReasonBlock
              number="3"
              title="다른 분들 돕는 거, 진짜 재밌어요."
              body="저에겐 작은 기술이 누군가에겐 큰 효용이 되는 순간을 자주 경험했어요. 서로 잘하는 걸 나누고, 그게 서로의 성장을 돕는 것. 이게 진짜 재밌고 보람 있거든요. 그래서 이 가격에 하는 겁니다."
            />
          </div>
        </div>
      </section>

      {/* ── 4. 이렇게 진행합니다 ── */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            이렇게 진행합니다
          </h2>

          <div className="mt-8 space-y-6">
            <ProcessStep
              number="1"
              title="카톡으로 가볍게 문의주세요"
              description="장황하게 설명하실 필요 없어요. 제가 질문드릴게요. 전화가 부담스러우시면 메시지도 괜찮아요. 두서없이 말씀하셔도 괜찮습니다. 개떡같이 말씀하셔도 찰떡같이 알아들을 테니까요. (AI 도움도 받아서 요약·정리하니까 맘 편히 쏟아내세요)"
            />
            <ProcessStep
              number="2"
              title="요구사항 정의서를 보내드립니다"
              description="정리한 내용을 보내드리면 피드백 주세요. 확정 주시면 그대로 작업합니다. 미팅 이후 24시간 이내에 작업 완료해 드립니다."
            />
            <ProcessStep
              number="3"
              title="제작자가 초래한 에러는 평생 AS"
              description='도망가면 어떻게 하냐구요? 제 유튜브 채널에 오셔서 신고하세요. 채널까지 버리고 도망가진 않을게요.'
            />
            <ProcessStep
              number="4"
              title="사소한 수정은 직접 하실 수 있어요"
              description="문구 수정, 이미지 변경 방법을 유튜브로 설명드립니다. 이마저도 어렵다? 스타벅스 커피 한 잔 값으로 작업해 드릴게요."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-neutral-200 bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            치킨값으로 시작해 보세요
          </h2>
          <p className="mt-3 text-neutral-400">
            궁금한 점 편하게 남겨주세요.
          </p>
          <a
            href="https://open.kakao.com/o/s613NWxh"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            카카오톡으로 문의하기
          </a>
        </div>
      </section>
    </>
  );
}

function PriceCard({
  label,
  price,
  description,
}: {
  label: string;
  price: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-neutral-900">{price}</p>
      <p className="mt-1 whitespace-pre-line text-sm text-neutral-500">{description}</p>
    </div>
  );
}

function ImagePlaceholder({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100 text-sm text-neutral-400 ${
        wide ? "h-48 w-full" : "h-40 w-56"
      }`}
    >
      {label}
    </div>
  );
}

function CredBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{description}</p>
      {children}
    </div>
  );
}

function ReasonBlock({
  number,
  title,
  body,
}: {
  number?: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-5">
      {number && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
          {number}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-700">
          {body}
        </p>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-700">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          {description}
        </p>
      </div>
    </div>
  );
}
