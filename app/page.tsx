import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ── 히어로 ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <p className="text-sm font-medium text-primary-500">
          비즈니스를 이해하는 개발자
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
          복잡한 건 제가 통역할게요.
          <br />
          사장님은 사업에만 집중하세요.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
          경영학을 전공하고, 현장에서 일하다가, 직접 만들고 싶어서 개발을 배웠습니다.
          <br className="hidden sm:block" />
          개떡같이 말해도 찰떡같이 알아듣고, 딱 필요한 만큼만 만들어 드립니다.
        </p>
        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4">
          <p className="text-sm font-medium text-neutral-700">
            &quot;근데 진짜 실력은 있는 거 맞아요?&quot;
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500">
            <span>크몽 외주 12건 완료 · 리뷰 전원 5.0 만점</span>
            <span>KOICA AI-데이터 공모전 우수상 &apos;24</span>
            <span>산림공공 빅데이터 창업대회 우수상 &apos;22</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/landing"
            className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            랜딩페이지 치킨값에 만들기
          </Link>
          <Link
            href="/crm"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-500"
          >
            업무 자동화 알아보기
          </Link>
        </div>
      </section>

      {/* ── 서비스 개요 ── */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Services
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            이런 일을 합니다
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <ServiceCard
              href="/landing"
              title="랜딩페이지 제작"
              description="치킨값 22,000원에 제작, 유지비 0원. 무료 호스팅으로 배포하고, 도메인은 사장님 소유로."
              icon="LP"
              highlight="22,000원~"
            />
            <ServiceCard
              href="/crm"
              title="업무 자동화"
              description="이미 쓰고 계신 구글 시트 위에 자동화를 얹습니다. 새 프로그램 배울 필요 없어요."
              icon="AUTO"
            />
            <ServiceCard
              href="#about"
              title="교육 & 코칭"
              description="구글 시트 활용법, 바이브코딩까지. 직접 배워서 하고 싶은 분들을 위해."
              icon="EDU"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* ── 왜 심플리Do인가 ── */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Why SimplyDo
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            이렇게 일합니다
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Principle
              title="사장님 말을 알아듣습니다"
              description="기술 용어로 설명하지 않습니다. 사업 현장에서 직접 일한 사람이라 모호한 요구사항도 알아듣고, 사장님의 언어로 다시 설명드립니다."
            />
            <Principle
              title="적정기술을 연결합니다"
              description="최고급 기술을 과시하지 않습니다. 화려할 필요 없고, 직접 관리할 수 있을 만큼. 딱 맞는 수준으로 만들어 드립니다."
            />
            <Principle
              title="솔직하게 말합니다"
              description="안 되는 건 안 된다고, 이 정도면 충분하다고 말합니다. 과장된 약속 대신 결과물로 보여드립니다."
            />
          </div>
        </div>
      </section>

      {/* ── 소개 ── */}
      <section id="about" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            About
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            심플리Do를 만드는 사람
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-neutral-700">
            <p>
              경영학을 졸업하고, 종합상사에서 해외 장비 직수입을 했습니다.
              이후 해외에서 사무소 운영과 인력 관리를 하고, 돌아와서 HR SaaS 회사에서
              4년 가까이 풀스택 개발을 했습니다.
            </p>
            <p>
              어디서 일하든 같은 문제가 있었어요. 데이터가 흩어져 있고,
              사람이 직접 확인하고 옮겨야 하는 반복 작업.
              &quot;이걸 왜 매번 손으로 해야 하지?&quot; — 이 의문이 개발을 배우게 만들었습니다.
            </p>
            <p>
              지금도 부족한 게 많고, 매일 배우고 있습니다.
              다만 하나는 확실합니다 — 저는 공학 배경이 없는 분들과 말이 잘 통합니다.
              개발자와 사장님 사이에서 통역할 수 있는 사람, 그게 저입니다.
            </p>
          </div>
          <a
            href="https://www.youtube.com/channel/UC9RBkYFiy-FlRQqWRiMOBrg"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-700"
          >
            유튜브에서 과정을 솔직하게 공유하고 있습니다 &rarr;
          </a>

        </div>
      </section>
    </>
  );
}

function ServiceCard({
  href,
  title,
  description,
  icon,
  highlight,
  comingSoon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
  comingSoon?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-neutral-500 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-700">
          {icon}
        </div>
        {highlight && (
          <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg">
            {highlight}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">
        {title}
        {comingSoon && (
          <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
            준비중
          </span>
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-700">
        {description}
      </p>
      <span className="mt-4 text-sm font-medium text-primary-500 transition-colors group-hover:text-primary-700">
        자세히 보기 &rarr;
      </span>
    </Link>
  );
}

function Principle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">
        {description}
      </p>
    </div>
  );
}
