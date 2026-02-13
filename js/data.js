/* ==========================================
   SimplyDo - Product Data
   ========================================== */

const PRODUCTS = {
  // 프로그램 구축 (Custom Build)
  custom: {
    crm_custom: {
      id: 'crm_custom',
      name: '구글 시트 기반 고객관리 자동화',
      category: 'custom',
      tagline: '엑셀 작업에 뺏기던 하루 3시간을 돌려드립니다.',
      description: '단순 입력을 넘어 데이터 간 유기적 연동, 대시보드 시각화, 자동 보고서 생성까지 포함된 풀 패키지 자동화 시스템입니다.',
      features: [
        '고객 DB 구조화 및 유효성 검사 (전화번호 포맷 등)',
        '상담 이력 타임라인 기록 및 조회',
        '조건별(미납, 만기 등) 고객 자동 필터링 대시보드',
        '일일/월간 현황 자동 리포트 생성 (PDF/Email)'
      ],
      note: '단순한 엑셀 파일이 아닙니다. 별도의 프로그램 설치 없이 구글 시트만으로 작동하는 <strong>초경량 ERP 시스템</strong>을 구축해 드립니다.',
      price: null, // 협의
      priceType: 'custom'
    },
    webapp_custom: {
      id: 'webapp_custom',
      name: '구글 시트 기반 웹앱 (Mobile-First)',
      category: 'custom',
      tagline: '내 손안의 관리자 페이지, 앱 설치 없이 바로 쓰세요.',
      description: '현장 업무가 많은 업종을 위해 시트 데이터를 DB로 활용하여, 모바일에서 체크박스 하나로 업무를 처리하는 전용 UI를 구축합니다.',
      features: [
        'AppSheet 또는 Glide를 활용한 네이티브 앱 수준의 UI',
        'QR코드 스캔, 사진 업로드, 서명 기능 연동 가능',
        '실시간 구글 시트 데이터 동기화',
        '직원별 권한 관리 (관리자/사용자 모드)'
      ],
      whyWebApp: '현장에서 노트북을 켜고 엑셀을 수정하는 것은 불가능합니다. 모바일 화면에 최적화된 버튼과 입력폼으로 현장 업무를 즉시 데이터화하세요.',
      price: null,
      priceType: 'custom'
    }
  },

  // 템플릿 (Digital Products)
  templates: {
    crm_template: {
      id: 'crm_template',
      name: '스마트 CRM & 대량문자',
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
    keyword_template: {
      id: 'keyword_template',
      name: '키워드 마스터',
      category: 'template',
      badge: 'SEO 전략',
      tagline: '상위 노출, 운에 맡기지 마세요. 데이터가 알려주는 키워드만 골라 씁니다.',
      description: '블로그 상위 노출을 위한 황금 키워드를 찾아드립니다.',
      features: [
        '검색량 대비 문서 수가 적은 블루오션 키워드 추출',
        '연관 검색어 자동 수집',
        '키워드별 경쟁 강도(상/중/하) 자동 분석'
      ],
      price: 69000,
      priceType: 'fixed',
      options: {
        standard: { name: 'Standard', price: 69000, desc: '파일 + 사용 가이드' },
        setup: { name: 'Setup', price: 109000, desc: '1:1 원격 세팅 지원' }
      }
    },
    youtube_template: {
      id: 'youtube_template',
      name: '유튜브 인텔리전스',
      category: 'template',
      badge: '경쟁사 분석',
      tagline: '경쟁 채널의 성공 방정식을 1분 만에 엑셀로 추출합니다.',
      description: '경쟁 채널을 분석하여 터지는 콘텐츠의 법칙을 발견하세요.',
      features: [
        '채널 URL 입력 시 조회수/좋아요/댓글 분석',
        '채널 평균 조회수 대비 급상승 영상 추출 (알고리즘 수혜 영상)',
        '썸네일 및 제목 키워드 패턴 분석'
      ],
      price: 59000,
      priceType: 'fixed',
      options: {
        standard: { name: 'Standard', price: 59000, desc: '파일 + 사용 가이드' },
        setup: { name: 'Setup', price: 99000, desc: '1:1 원격 세팅 지원' }
      }
    },
    reminder_template: {
      id: 'reminder_template',
      name: '자동 리마인더',
      category: 'template',
      badge: '캐시플로우 관리',
      tagline: '미납 안내, 미안해하며 직접 하지 마세요. AI 비서가 정중하게 대신 보냅니다.',
      description: '사람이 직접 하기 껄끄러운 미납 안내, 예약 확인을 봇(Bot)에게 맡기세요.',
      features: [
        '날짜 조건(D-3, D-Day 등)에 따른 자동 메시지 발송',
        '카카오톡 알림톡 또는 문자 메시지 연동',
        '발송 로그 자동 저장'
      ],
      price: 79000,
      priceType: 'fixed',
      options: {
        standard: { name: 'Standard', price: 79000, desc: '파일 + 사용 가이드' },
        setup: { name: 'Setup', price: 129000, desc: '1:1 원격 세팅 지원' }
      }
    },
    invoice_template: {
      id: 'invoice_template',
      name: 'SimplyInvoice',
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
      name: '업무 효율화 진단 컨설팅',
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
