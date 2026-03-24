/* ==========================================
   심플리Do - Product Data
   ========================================== */

const PRODUCTS = {
  // 심플리Build (맞춤 구축)
  custom: {
    simplybuild: {
      id: 'simplybuild',
      name: '맞춤 제작',
      category: 'custom',
      tagline: '자동화 연동부터 웹사이트 구축까지, 필요한 만큼만 선택하세요.',
      description: '비즈니스 규모와 필요에 맞는 자동화 시스템을 단계별로 구축합니다.',
      tiers: {
        standard: {
          name: '기본형',
          subtitle: '업무 효율화 환경 구축',
          desc: '흩어진 데이터를 한곳으로 모으고, 반복되는 기초 행정 업무를 자동화합니다.',
          features: [
            '고객 및 매출 관리: 학생/회원 DB 구축, 매출 및 미수금 현황 실시간 트래킹',
            '구글 플랫폼 연동: 구글폼 접수 시 시트 자동 기록, 고객 감사 메일 자동 발송',
            '스마트 워크 환경: 구글 캘린더 일정 자동 등록, 구글 드라이브 내 고객별/업체별 폴더 자동 생성 및 관리'
          ],
          target: '1인 기업가, 소규모 교습소, 관리가 필요한 개인 사업자',
          price: 250000,
          priceLabel: '250,000원'
        },
        deluxe: {
          name: '확장형',
          subtitle: '외부 서비스 연결',
          desc: '사용 중인 외부 서비스와 구글 시트를 연결하여 업무의 결을 하나로 통합합니다.',
          features: [
            'Standard 모든 기능 포함',
            '외부 메시징 연동: 문자/알림톡 발송, 텔레그램/슬랙/디스코드 실시간 업무 알림',
            '데이터 허브 구축: 노션 등 타 서비스와의 데이터 동기화, 외부 웹사이트 입력폼 데이터 시트 자동 저장',
            '협업 최적화: 팀원 간 실시간 상태값 동기화 및 모바일 최적화 화면 제공'
          ],
          target: '직원이 있는 학원, 매물 공유가 잦은 부동산, 외부 문의가 많은 서비스업',
          price: 390000,
          priceLabel: '390,000원'
        },
        premium: {
          name: 'AI 활용형',
          subtitle: '비즈니스에 맞는 AI 도입',
          desc: '생성형 AI를 업무 프로세스에 직접 이식하여 단순 반복을 넘어선 지능형 업무 보조를 수행합니다.',
          features: [
            'Deluxe 모든 기능 포함',
            '생성형 AI 커스터마이징: ChatGPT, Gemini API를 활용한 상담 내용 요약 및 자동 분류',
            '지능형 리마인드: 과거 데이터 분석으로 재구매/재수강 시점 자동 예측 및 안내 문구 생성',
            '전문가 전용 대시보드: 복잡한 데이터를 직관적인 시각화 차트로 구현하여 의사결정 지원'
          ],
          target: '데이터 기반 마케팅이 필요한 학원, 방대한 상담 기록 요약이 필요한 전문직',
          price: 600000,
          priceLabel: '600,000원~'
        }
      },
      price: null,
      priceType: 'custom'
    }
  },

  // 컨설팅
  consulting: {
    consulting: {
      id: 'consulting',
      name: '무료 상담',
      category: 'consulting',
      tagline: '막연했던 업무 자동화, 무엇부터 해야 할지 명확한 답을 드립니다.',
      description: '대표님의 비즈니스 현황을 1:1로 진단합니다. 현재의 병목 구간을 찾아내고, 최적의 자동화 방향을 안내해 드립니다.',
      process: [
        '사전 설문: 현재 업무 흐름과 가장 큰 고충 파악',
        '1:1 인터뷰 (Zoom/Google Meet, 60분): 화면 공유를 통한 상세 진단',
        '결과 리포트: AS-IS vs TO-BE 프로세스 비교 및 도입 로드맵 제안'
      ],
      roadmap: [
        '현재 업무 프로세스 Flow Chart 시각화',
        'Human Error 발생 구간 및 병목 파악',
        '단계별 도입 솔루션 및 기대효과 산출',
        '맞춤형 구축 견적 및 실행 계획 수립'
      ],
      note: '* 부담 없이 신청하세요. 상담 후 구축이 필요하시면 맞춤 견적을 안내해 드립니다.',
      price: 0,
      priceType: 'free'
    }
  }
};

// 리뷰 데이터
const REVIEWS = [
  {
    id: 1,
    text: '이렇게 세심하게 봐주시는 분이 계실 줄은 몰랐습니다. 비용을 감안하면 기대 이상, 몇 배 이상의 결과를 얻었습니다.',
    author: '이동*',
    source: '크몽 구매 고객',
    initial: '이'
  },
  {
    id: 2,
    text: '복잡한 프로젝트였으나 잘 마무리해 주셨고, 친절히 설명을 잘 해주셨습니다.',
    author: '열정***',
    source: '크몽 재구매 고객',
    initial: '열'
  },
  {
    id: 3,
    text: '원하는 바를 친절하고 정성껏 구현해 주셨습니다. 실력자이십니다!',
    author: '거대***',
    source: '크몽 구매 고객',
    initial: '거'
  },
  {
    id: 4,
    text: '제가 원하는 방향을 잘 이해하시고 친절히 해결하여 주십니다.',
    author: '열정***',
    source: '크몽 재구매 고객',
    initial: '열'
  },
  {
    id: 5,
    text: '최고라는 말로 부족합니다.',
    author: '아름***',
    source: '크몽 재구매 고객',
    initial: '아'
  }
];

// Helper: 상품 ID로 상품 찾기
function getProductById(productId) {
  for (const category of Object.values(PRODUCTS)) {
    if (category[productId]) {
      return category[productId];
    }
  }
  return null;
}

// Helper: 가격 포맷팅
function formatPrice(price) {
  if (price === null) return '협의';
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, REVIEWS, getProductById, formatPrice };
}
