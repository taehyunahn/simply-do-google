# SimplyDo 웹사이트 개선 계획

## 1. 현재 상태 분석

### 현재 구조
```
simplydo_website/
├── DOCS.md        # 기획 문서
└── index.html     # 단일 HTML 파일 (591줄, 모든 CSS/JS 인라인)
```

### 현재 구현된 기능
- 원페이지 랜딩페이지 (Tailwind CSS CDN)
- 반응형 네비게이션 (모바일 메뉴)
- 서비스 소개 섹션 (프로그램 구축, 템플릿, 컨설팅)
- 모달 팝업 (상세 정보)
- 리뷰 섹션

### 미구현 사항
- 결제 시스템
- 백엔드 서버
- 데이터베이스 연동
- 사업자 정보 표시 (Footer)

---

## 2. 권장 파일 구조

### 프론트엔드 (정적 호스팅용)
```
simplydo_website/
├── index.html                 # 메인 랜딩페이지
├── payment.html               # 결제 페이지
├── payment-request.html       # 커스텀 결제 요청 페이지 (협의된 금액)
├── payment-success.html       # 결제 완료 페이지
├── payment-fail.html          # 결제 실패 페이지
│
├── css/
│   └── style.css              # 커스텀 스타일 (Tailwind는 CDN 유지 or 빌드)
│
├── js/
│   ├── main.js                # 공통 스크립트 (모달, 메뉴 등)
│   ├── payment.js             # 토스페이먼츠 결제 로직
│   └── supabase.js            # Supabase 클라이언트 설정
│
├── assets/
│   ├── images/                # 로고, 아이콘 등
│   └── fonts/                 # 웹폰트 (선택사항)
│
└── docs/
    ├── DOCS.md                # 기획 문서
    └── IDEA.md                # 이 파일
```

### 백엔드 (서버리스 함수 - Supabase Edge Functions 또는 Vercel Functions)
```
functions/
├── create-payment/            # 결제 생성 API
├── confirm-payment/           # 결제 승인 API
├── create-custom-payment/     # 커스텀 금액 결제 링크 생성
└── webhook-payment/           # 결제 완료 웹훅 처리
```

---

## 3. 기술 스택 권장

| 구분 | 권장 기술 | 이유 |
|------|-----------|------|
| **호스팅** | Netlify | 무료 SSL, 자동 배포, Edge Functions 지원 |
| **결제** | 토스페이먼츠 | 국내 최적화, 간편한 연동, 합리적인 수수료 |
| **데이터베이스** | Supabase | 무료 티어 충분, PostgreSQL 기반, 실시간 기능 |
| **인증** | 필요시 Supabase Auth | 관리자 페이지 접근용 (선택) |

---

## 4. 토스페이먼츠 결제 시스템 구현

### 4.1 토스페이먼츠 가입 및 설정
1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com/) 가입
2. **사업자 정보 등록**: 심플리Do (아내 명의 개인사업자)
3. API 키 발급:
   - 테스트 클라이언트 키
   - 테스트 시크릿 키
   - 라이브 클라이언트 키 (심사 후)
   - 라이브 시크릿 키 (심사 후)

### 4.2 결제 플로우

#### A. 정해진 금액 상품 결제
```
[사용자] → [상품 선택] → [결제하기 클릭]
                              ↓
[토스페이먼츠 SDK] → 결제창 열림 → 결제 진행
                              ↓
[결제 성공] → [Supabase에 주문 저장] → [성공 페이지 이동]
```

#### B. 협의된 금액 결제 (관리자 → 고객에게 링크 발송)
```
[관리자] 고객과 협의 후 금액 결정
    ↓
[관리자 페이지] 결제 링크 생성 (orderId, 금액, 상품명 입력)
    ↓
[고객에게 링크 전달] (카카오톡, 이메일 등)
    ↓
[고객] 링크 클릭 → 결제 페이지 → 결제 완료
```

### 4.3 결제 연동 코드 예시

```javascript
// js/payment.js
const clientKey = 'test_ck_xxx'; // 토스페이먼츠 클라이언트 키
const tossPayments = TossPayments(clientKey);

// 정해진 금액 상품 결제
async function requestPayment(product) {
  const orderId = 'ORDER_' + Date.now();

  await tossPayments.requestPayment('카드', {
    amount: product.price,
    orderId: orderId,
    orderName: product.name,
    customerName: '구매자',
    successUrl: window.location.origin + '/payment-success.html',
    failUrl: window.location.origin + '/payment-fail.html',
  });
}

// 커스텀 금액 결제 (URL 파라미터로 전달받음)
function requestCustomPayment() {
  const params = new URLSearchParams(window.location.search);
  const amount = parseInt(params.get('amount'));
  const orderName = params.get('orderName');
  const orderId = params.get('orderId');

  tossPayments.requestPayment('카드', {
    amount,
    orderId,
    orderName,
    successUrl: window.location.origin + '/payment-success.html',
    failUrl: window.location.origin + '/payment-fail.html',
  });
}
```

### 4.4 결제 승인 (서버 사이드 필수)

```javascript
// Supabase Edge Function: confirm-payment
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

serve(async (req) => {
  const { paymentKey, orderId, amount } = await req.json();

  const secretKey = Deno.env.get('TOSS_SECRET_KEY');
  const encryptedSecretKey = btoa(secretKey + ':');

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encryptedSecretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const result = await response.json();

  if (response.ok) {
    // Supabase에 결제 정보 저장
    // ... (아래 섹션 참고)
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

---

## 5. Supabase 데이터베이스 설계

### 5.1 테이블 구조

```sql
-- 상품 테이블
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,  -- 원 단위
  category VARCHAR(50),    -- 'template', 'custom', 'consulting'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 주문/결제 테이블
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(100) UNIQUE NOT NULL,  -- 토스페이먼츠 orderId
  payment_key VARCHAR(200),               -- 토스페이먼츠 paymentKey

  -- 상품 정보
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,

  -- 구매자 정보
  customer_name VARCHAR(100),
  customer_email VARCHAR(200),
  customer_phone VARCHAR(20),

  -- 결제 상태
  status VARCHAR(20) DEFAULT 'pending',   -- pending, paid, cancelled, refunded
  payment_method VARCHAR(50),             -- 카드, 가상계좌 등

  -- 커스텀 결제 여부
  is_custom_payment BOOLEAN DEFAULT false,
  custom_payment_note TEXT,               -- 협의 내용 메모

  -- 시간
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,

  -- 메타데이터
  metadata JSONB
);

-- 커스텀 결제 요청 테이블 (관리자가 생성)
CREATE TABLE custom_payment_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id VARCHAR(100) UNIQUE NOT NULL,

  -- 결제 정보
  amount INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,

  -- 고객 정보
  customer_name VARCHAR(100),
  customer_contact VARCHAR(200),  -- 이메일 또는 전화번호

  -- 상태
  status VARCHAR(20) DEFAULT 'pending',  -- pending, sent, paid, expired
  expires_at TIMESTAMP,

  -- 연결된 주문
  order_id UUID REFERENCES orders(id),

  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5.2 RLS (Row Level Security) 정책
```sql
-- 주문은 누구나 생성 가능 (결제 시)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- 주문 조회는 본인 이메일로만 (또는 관리자)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    customer_email = auth.jwt() ->> 'email'
    OR auth.role() = 'admin'
  );
```

---

## 6. 결제 페이지 UI 설계

### 6.1 정해진 금액 상품 결제 페이지 (payment.html)

```
┌─────────────────────────────────────────────────┐
│  SimplyDo                                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  주문 상품                               │   │
│  │  ─────────────────────────────────────   │   │
│  │  스마트 CRM & 대량문자 (Standard)        │   │
│  │  ₩89,000                                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  구매자 정보                             │   │
│  │  ─────────────────────────────────────   │   │
│  │  이름    [________________]              │   │
│  │  이메일  [________________]              │   │
│  │  연락처  [________________]              │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│           [  ₩89,000 결제하기  ]               │
│                                                 │
│  ───────────────────────────────────────────   │
│  판매자: 심플리Do | 대표: OOO                   │
│  사업자등록번호: XXX-XX-XXXXX                   │
│  문의: contact@simplydo.kr                     │
└─────────────────────────────────────────────────┘
```

### 6.2 협의 금액 결제 요청 페이지 (payment-request.html)
- URL 예시: `https://simplydo.kr/payment-request.html?id=REQ_abc123`
- 관리자가 생성한 결제 요청 정보를 Supabase에서 조회
- 고객이 결제 버튼 클릭 시 토스페이먼츠 결제창 호출

---

## 7. 관리자 기능 (선택사항)

간단한 관리자 페이지가 필요하다면:

### 7.1 커스텀 결제 링크 생성기
```
┌─────────────────────────────────────────────────┐
│  [관리자] 결제 요청 생성                         │
├─────────────────────────────────────────────────┤
│  상품명    [________________]                   │
│  금액      [________________] 원                │
│  고객명    [________________]                   │
│  메모      [____________________________]       │
│                                                 │
│            [ 결제 링크 생성 ]                    │
│                                                 │
│  ─────────────────────────────────────────────  │
│  생성된 링크:                                   │
│  https://simplydo.kr/pay/REQ_abc123            │
│                        [복사] [카카오톡 공유]    │
└─────────────────────────────────────────────────┘
```

### 7.2 주문 현황 대시보드
- 최근 주문 목록
- 결제 상태 확인
- 매출 통계

---

## 8. 디자인 개선 제안

### 8.1 현재 문제점
- 색상 톤이 다양하여 통일감 부족 (파랑, 보라, 초록 혼용)
- 히어로 섹션 시각적 임팩트 부족
- Footer에 사업자 정보 누락

### 8.2 개선 방향

#### 색상 팔레트 통일
```css
:root {
  --primary: #2563eb;       /* 메인 블루 */
  --primary-dark: #1d4ed8;
  --primary-light: #dbeafe;
  --accent: #0ea5e9;        /* 포인트 스카이블루 */
  --gray-900: #111827;
  --gray-600: #4b5563;
  --gray-100: #f3f4f6;
}
```

#### 신뢰도 향상 요소
- 크몽 리뷰 5.0 배지를 더 눈에 띄게
- 실제 작업 사례 스크린샷 추가
- 사업자 정보를 Footer에 명확히 표기

#### Footer 사업자 정보 (필수 표기사항)
```html
<footer>
  <div class="business-info">
    <p>상호: 심플리Do | 대표: [아내 성함]</p>
    <p>사업자등록번호: XXX-XX-XXXXX</p>
    <p>통신판매업신고: 제XXXX-서울XX-XXXX호</p>
    <p>주소: [사업장 주소]</p>
    <p>문의: contact@simplydo.kr</p>
  </div>
</footer>
```

---

## 9. 단계별 구현 로드맵

### Phase 1: 기반 작업 (필수)
- [ ] 파일 구조 분리 (HTML, CSS, JS)
- [ ] 토스페이먼츠 개발자 계정 생성
- [ ] Supabase 프로젝트 생성 및 테이블 구축
- [ ] Footer 사업자 정보 추가

### Phase 2: 결제 시스템 구현
- [ ] 테스트 모드 결제 연동
- [ ] 결제 페이지 UI 구현
- [ ] 결제 성공/실패 페이지 구현
- [ ] Supabase Edge Function으로 결제 승인 API 구현
- [ ] 주문 데이터 저장 로직 구현

### Phase 3: 커스텀 결제 기능
- [ ] 커스텀 결제 요청 생성 기능 (관리자용)
- [ ] 결제 요청 페이지 구현
- [ ] 결제 링크 생성 및 공유 기능

### Phase 4: 운영 준비
- [ ] 토스페이먼츠 라이브 심사 신청
- [ ] 도메인 연결 (simplydo.kr 등)
- [ ] SSL 인증서 확인
- [ ] 실결제 테스트

### Phase 5: 선택 기능
- [ ] 관리자 대시보드
- [ ] 이메일 알림 (결제 완료 시)
- [ ] 카카오 알림톡 연동

---

## 10. 보안 고려사항

### 필수 사항
1. **시크릿 키는 서버에서만 사용**: 클라이언트 키만 프론트엔드에 노출
2. **결제 승인은 반드시 서버에서**: Edge Function 활용
3. **금액 검증**: 결제 승인 시 서버에서 금액 재검증
4. **HTTPS 필수**: Vercel/Netlify 자동 적용

### 환경변수 설정 (Supabase Edge Functions)
```
TOSS_SECRET_KEY=test_sk_xxxxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

---

## 11. 비용 예상

| 항목 | 비용 |
|------|------|
| 도메인 (.kr) | 연 ~20,000원 |
| Vercel 호스팅 | 무료 (Hobby 플랜) |
| Supabase | 무료 (Free 티어) |
| 토스페이먼츠 수수료 | 결제액의 2.5~3.5% |

---

## 12. 시작하기

### 즉시 해야 할 작업
1. 토스페이먼츠 개발자 가입 및 테스트 API 키 발급
2. Supabase 프로젝트 생성
3. 파일 구조 분리 작업 시작
4. Footer에 사업자 정보 추가

### 필요한 정보
- [ ] 사업자등록번호
- [ ] 통신판매업 신고번호
- [ ] 사업장 주소
- [ ] 대표자명 (아내)
- [ ] 고객 문의용 이메일

---

*이 문서는 프로젝트 진행 상황에 따라 업데이트됩니다.*
