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
        lite: {
          name: '기본형',
          subtitle: '자동화 연동',
          desc: '기존 웹사이트에 자동화 엔진만 구축',
          features: [
            '입력폼 → 구글시트 데이터 수집 연동',
            '알림 채널 1개 연결 (이메일/슬랙/알림톡 중 택1)',
            '기본 데이터 정리 자동화'
          ],
          price: null,
          priceLabel: '협의'
        },
        standard: {
          name: '표준형',
          subtitle: '웹사이트 + 자동화',
          desc: '반응형 웹사이트 제작 + 실시간 알림 체계',
          features: [
            '맞춤형 반응형 웹사이트 제작',
            '입력폼 → 구글시트 → 다중 알림 (이메일 + 메신저)',
            '고객 요청 실시간 인지 체계'
          ],
          price: null,
          priceLabel: '협의'
        },
        pro: {
          name: '프리미엄',
          subtitle: '풀 시스템 구축',
          desc: '웹사이트 + 자동화 + 구글 생태계 풀 연동',
          features: [
            '표준형 전체 포함',
            '구글 드라이브/캘린더/닥스 멀티 플랫폼 연동',
            '대시보드 시각화 + 자동 리포트',
            '모바일 웹앱 UI (선택)'
          ],
          price: null,
          priceLabel: '협의'
        }
      },
      price: null,
      priceType: 'custom'
    }
  },

  // SimplyKit (템플릿)
  templates: {
    crm_template: {
      id: 'crm_template',
      name: '고객관리 자동화',
      category: 'template',
      badge: '솔라피 연동형',
      tagline: '따로 로그인하지 마세요. 시트에서 이름만 확인하고 바로 발송!',
      description: '솔라피(Solapi) API가 연동되어 있어, 시트에서 버튼 하나로 문자를 발송할 수 있습니다.',
      features: [
        '개별 발송 및 단체 문자 발송 기능',
        '자주 쓰는 문자 템플릿 저장 기능',
        '발송 성공/실패 여부 자동 기록',
        '충전 잔액 실시간 확인'
      ],
      note: '* 솔라피 계정 필요 (건당 비용 발생)',
      price: 89000,
      priceType: 'fixed',
      options: {
        standard: { name: 'Standard', price: 89000, desc: '파일 + 사용 가이드' },
        setup: { name: 'Setup', price: 139000, desc: '1:1 원격 세팅 지원' },
        custom: { name: 'Custom', price: null, desc: '기능 추가 (협의)' }
      }
    },
    invoice_template: {
      id: 'invoice_template',
      name: '견적서 자동화',
      category: 'template',
      badge: '견적서 자동화',
      tagline: '견적서·인보이스 작성부터 발송까지, 시트에서 클릭 한 번.',
      description: '구글 스프레드시트 기반 견적서 자동 생성 및 PDF 변환·이메일 발송 템플릿.',
      features: [
        '견적서 자동 생성 (구글 시트 기반)',
        'PDF 자동 변환 및 이메일 발송',
        '견적 이력 관리 및 상태 추적'
      ],
      price: 39000,
      priceType: 'fixed',
      options: {
        diy: { name: '실속형 (DIY)', price: 39000, desc: '템플릿 + 가이드 문서' },
        setup: { name: '전문가 세팅형', price: 99000, desc: '실속형 포함 + 1:1 원격 지원 및 세팅' },
        business: { name: '비즈니스 통합형', price: 290000, priceLabel: '290,000원~', desc: '실속형 포함 + 데이터 연동 커스텀 개발' }
      }
    }
  },

  // 컨설팅
  consulting: {
    consulting: {
      id: 'consulting',
      name: '업무 진단',
      category: 'consulting',
      tagline: '막연했던 업무 자동화, 무엇부터 해야 할지 명확한 답을 드립니다.',
      description: '대표님의 비즈니스 현황을 1:1로 정밀 진단합니다. 현재의 병목 구간을 찾아내고, 비용 절감과 매출 증대를 위한 최적의 자동화 설계를 제안해 드립니다.',
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
      note: '* 컨설팅 진행 후 실제 구축 서비스 이용 시, 컨설팅 비용은 전액 차감됩니다.',
      price: 150000,
      priceType: 'fixed'
    }
  }
};

// 리뷰 데이터
const REVIEWS = [
  {
    id: 1,
    text: '세심하게 봐주셔서 비용의 몇 배 이상의 결과를 얻었습니다.',
    author: 'User***',
    source: '크몽 구매 고객',
    initial: 'U'
  },
  {
    id: 2,
    text: '복잡한 프로젝트였으나 명확한 설명과 함께 잘 마무리해주셨습니다.',
    author: 'Kang***',
    source: '크몽 구매 고객',
    initial: 'K'
  },
  {
    id: 3,
    text: '최고라는 말로 부족합니다. 실력자이십니다.',
    author: 'Lee***',
    source: '크몽 구매 고객',
    initial: 'L'
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
