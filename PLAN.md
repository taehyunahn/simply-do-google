# SimplyDo 결제 시스템 마이그레이션 계획

## 토스페이먼츠 → 포트원(PortOne) 전환

---

## 1. 현재 시스템 분석

### 1.1 사용 중인 파일
| 파일 | 역할 |
|------|------|
| `js/payment.js` | 토스페이먼츠 SDK 연동 및 결제 로직 |
| `payment.html` | 정가 상품 결제 페이지 |
| `payment-request.html` | 커스텀 금액 결제 페이지 |
| `payment-success.html` | 결제 성공 처리 페이지 |
| `payment-fail.html` | 결제 실패 처리 페이지 |

### 1.2 현재 토스페이먼츠 구현 방식
```javascript
// SDK 로드
<script src="https://js.tosspayments.com/v1/payment"></script>

// 초기화
const tossPayments = TossPayments('test_ck_xxx');

// 결제 요청
await tossPayments.requestPayment('카드', {
  amount: 10000,
  orderId: 'order-id',
  orderName: '상품명',
  customerName: '고객명',
  customerEmail: 'email@example.com',
  successUrl: 'https://example.com/success',
  failUrl: 'https://example.com/fail',
});
```

### 1.3 결제 플로우
```
사용자 → payment.html → 토스 결제창 → 결제 완료
                                         ↓
                            payment-success.html (paymentKey, orderId, amount)
                                         ↓
                            서버 API 호출 (결제 승인)
```

---

## 2. 포트원 소개

### 2.1 포트원이란?
- 국내 주요 PG사(이니시스, KCP, 토스페이먼츠, 나이스페이, 카카오페이 등)를 통합 연동
- 단일 SDK로 여러 PG사 사용 가능
- 관리자 콘솔에서 결제 내역 통합 관리

### 2.2 포트원 사용의 장점
1. **PG사 유연성**: 필요 시 PG사 변경이 쉬움
2. **통합 관리**: 여러 PG사 결제를 한 곳에서 관리
3. **간편결제 지원**: 카카오페이, 네이버페이, 토스페이 등 간편결제 통합
4. **웹훅 지원**: 결제 상태 변경 시 서버로 알림
5. **REST API**: 결제 조회, 취소 등 서버 기능 제공

---

## 3. 마이그레이션 작업 목록

### 3.1 사전 준비
- [ ] 포트원 가입 및 상점 생성
- [ ] PG사 계약 (기존 토스페이먼츠 사용 가능)
- [ ] 포트원 콘솔에서 PG사 연동 설정
- [ ] 가맹점 식별코드(Merchant ID) 확인
- [ ] 채널 키(Channel Key) 확인

### 3.2 코드 변경 작업

#### A. SDK 교체
**변경 전 (토스페이먼츠)**
```html
<script src="https://js.tosspayments.com/v1/payment"></script>
```

**변경 후 (포트원 V2)**
```html
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
```

#### B. 초기화 방식 변경
**변경 전**
```javascript
const tossPayments = TossPayments('test_ck_xxx');
```

**변경 후**
```javascript
// 포트원은 별도 초기화 불필요
// 각 결제 요청 시 storeId 전달
```

#### C. 결제 요청 함수 변경
**변경 전**
```javascript
await tossPayments.requestPayment('카드', {
  amount: currentPayment.amount,
  orderId: orderId,
  orderName: currentPayment.productName,
  customerName: currentPayment.customerName,
  customerEmail: currentPayment.customerEmail,
  successUrl: CONFIG.SUCCESS_URL,
  failUrl: CONFIG.FAIL_URL,
});
```

**변경 후**
```javascript
const response = await PortOne.requestPayment({
  storeId: CONFIG.PORTONE_STORE_ID,
  channelKey: CONFIG.PORTONE_CHANNEL_KEY,
  paymentId: orderId,
  orderName: currentPayment.productName,
  totalAmount: currentPayment.amount,
  currency: 'KRW',
  payMethod: 'CARD',
  customer: {
    fullName: currentPayment.customerName,
    email: currentPayment.customerEmail,
    phoneNumber: currentPayment.customerPhone,
  },
  redirectUrl: CONFIG.SUCCESS_URL,
});
```

#### D. 결제 결과 처리 변경
**변경 전 (URL 파라미터)**
```javascript
const paymentKey = params.get('paymentKey');
const orderId = params.get('orderId');
const amount = params.get('amount');
```

**변경 후 (콜백 또는 리다이렉트)**
```javascript
// 방법 1: 콜백 방식
const response = await PortOne.requestPayment({...});
if (response.code === undefined) {
  // 결제 성공
  const paymentId = response.paymentId;
  // 서버에서 결제 검증
} else {
  // 결제 실패
  console.error(response.message);
}

// 방법 2: 리다이렉트 방식
// redirectUrl로 이동 후 URL 파라미터에서 paymentId 추출
```

### 3.3 수정 대상 파일

| 파일 | 수정 내용 |
|------|----------|
| `js/payment.js` | SDK 초기화, 결제 요청 함수, 결제 결과 처리 전체 수정 |
| `payment.html` | SDK 스크립트 URL 변경 |
| `payment-request.html` | SDK 스크립트 URL 변경 |
| `payment-success.html` | SDK 스크립트 제거 (불필요), 결과 파싱 로직 수정 |
| `payment-fail.html` | 에러 코드/메시지 포맷 수정 |

---

## 4. 설정 값 변경

### 4.1 기존 CONFIG 객체
```javascript
const CONFIG = {
  TOSS_CLIENT_KEY: 'test_ck_xxx',
  SUCCESS_URL: '...',
  FAIL_URL: '...',
  API_BASE_URL: '...',
};
```

### 4.2 새로운 CONFIG 객체
```javascript
const CONFIG = {
  // 포트원 설정
  PORTONE_STORE_ID: 'store-xxx',      // 포트원 상점 ID
  PORTONE_CHANNEL_KEY: 'channel-xxx', // 결제 채널 키

  // 리다이렉트 URL
  SUCCESS_URL: window.location.origin + '/payment-success.html',
  FAIL_URL: window.location.origin + '/payment-fail.html',

  // 서버 API (결제 검증용)
  API_BASE_URL: '',
};
```

---

## 5. 보안 고려사항 (필수)

### 5.1 포트원이 제공하는 보안

포트원은 다음 보안 인증을 보유하고 있습니다:
- **PCI-DSS Level 1**: 카드 업계 글로벌 보안 표준 최고 등급
- **ISMS**: 정보보호 관리체계 인증
- **ISO 27001**: 국제 정보보안 표준

#### 토큰화(Tokenization) 방식
```
사용자 카드정보 → PG사 서버 (직접 전달)
                      ↓
              토큰/빌링키 발급
                      ↓
              내 서버 (토큰만 수신)
```
- 카드 정보는 PG사 서버로 직접 전달
- 내 서버에는 실제 카드번호가 전달되지 않음
- 서버 해킹 시에도 카드정보 유출 불가

### 5.2 개발자가 반드시 구현해야 할 보안 (사후 검증)

#### 위변조 공격 시나리오
```
⚠️ 위험: 브라우저 개발자 도구로 결제 금액 조작
예: 10,000원 상품 → 100원으로 변조 후 결제 시도
```

#### 필수 구현: 서버사이드 결제 검증
```javascript
// ❌ 잘못된 방식: 클라이언트만 믿는 경우
// 프론트엔드에서 받은 금액을 그대로 신뢰

// ✅ 올바른 방식: 서버에서 재검증
async function verifyPayment(paymentId, expectedAmount) {
  // 1. 포트원 API로 실제 결제 금액 조회
  const response = await fetch(
    `https://api.portone.io/v2/payments/${paymentId}`,
    {
      headers: {
        'Authorization': `PortOne ${API_SECRET}`
      }
    }
  );
  const { payment } = await response.json();

  // 2. DB에 저장된 원래 상품 가격과 비교
  if (payment.totalAmount !== expectedAmount) {
    // 3. 금액 불일치 시 즉시 결제 취소
    await cancelPayment(paymentId, '결제 금액 위변조 감지');
    throw new Error('결제 금액이 일치하지 않습니다.');
  }

  // 4. 검증 통과 시에만 주문 확정
  return payment;
}
```

#### 검증 흐름
```
1. 결제 완료 → paymentId 수신
2. 서버에서 포트원 API 호출 → 실제 결제 금액 조회
3. DB의 원래 상품 가격과 비교
4. 불일치 시 → 즉시 결제 취소
5. 일치 시 → 주문 확정
```

### 5.3 API 키 관리

#### Secret Key 보안
```
⚠️ 절대 금지: 클라이언트 코드(JS)에 Secret Key 노출

// ❌ 위험: 프론트엔드 코드
const API_SECRET = 'portone_secret_xxx'; // 절대 안됨!

// ✅ 안전: 서버 환경변수
// .env 파일 (서버에서만 접근)
PORTONE_API_SECRET=portone_secret_xxx
```

#### 환경변수 구분
| 키 | 노출 가능 여부 | 용도 |
|----|---------------|------|
| `storeId` | O (프론트엔드) | 결제 요청 시 사용 |
| `channelKey` | O (프론트엔드) | 결제 채널 식별 |
| `API_SECRET` | X (서버만) | 결제 조회/취소 API |

### 5.4 Webhook 보안

#### Webhook이란?
- 결제 완료 시 포트원이 내 서버로 알림 전송
- 브라우저가 닫혀도 결제 결과 수신 가능

#### IP 검증 (권장)
```javascript
// 포트원 공식 IP 대역에서만 Webhook 수신
const PORTONE_IPS = [
  '52.78.x.x',
  '13.125.x.x',
  // 포트원 문서에서 최신 IP 확인 필요
];

function verifyWebhookSource(req) {
  const clientIP = req.headers['x-forwarded-for'] || req.ip;
  return PORTONE_IPS.some(ip => clientIP.startsWith(ip));
}
```

### 5.5 보안 체크리스트

#### 필수 구현
- [ ] 서버사이드 결제 금액 검증
- [ ] API Secret 환경변수 관리
- [ ] HTTPS 사용

#### 권장 구현
- [ ] Webhook IP 검증
- [ ] 결제 로그 기록
- [ ] 이상 결제 모니터링 알림

### 5.6 직접 PG 연동 vs 포트원 비교

| 항목 | 직접 PG 연동 | 포트원 연동 |
|------|-------------|------------|
| 보안 책임 | 개발자가 모든 보안 규정 준수 | 포트원이 인증 및 규격 대행 |
| 카드 데이터 | 서버 노출 위험 (관리 미숙 시) | 토큰화로 서버 노출 원천 차단 |
| 보안 업데이트 | 보안 패치 직접 수행 | 포트원이 중앙에서 자동 업데이트 |
| PCI-DSS | 직접 인증 취득 필요 | 포트원 인증으로 대행 |

---

## 6. 서버 측 변경 (결제 검증)

### 6.1 결제 검증 API 수정
기존 토스페이먼츠 결제 승인 API 대신 포트원 결제 조회 API 사용

**포트원 결제 조회 API**
```
GET https://api.portone.io/v2/payments/{paymentId}
Authorization: PortOne {API_SECRET}
```

### 6.2 응답 형식 차이
```javascript
// 포트원 응답 예시
{
  "payment": {
    "id": "payment-xxx",
    "status": "PAID",
    "totalAmount": 10000,
    "orderName": "상품명",
    "method": {
      "type": "CARD",
      "card": {
        "name": "삼성카드"
      }
    }
  }
}
```

---

## 7. 마이그레이션 단계

### Phase 1: 준비 (개발 환경)
1. 포트원 계정 생성 및 테스트 상점 설정
2. 포트원 테스트 채널 설정 (토스페이먼츠 테스트)
3. 개발 환경에서 코드 수정

### Phase 2: 개발 및 테스트
1. `js/payment.js` 전면 수정
2. HTML 파일들 SDK 스크립트 교체
3. 결제 플로우 테스트 (테스트 모드)
   - 정가 상품 결제 테스트
   - 커스텀 금액 결제 테스트
   - 결제 실패 케이스 테스트

### Phase 3: 서버 API 및 보안 구현 (필수)
1. **결제 금액 검증 API 구현** (위변조 방지)
2. 포트원 결제 조회 API 연동
3. 웹훅 엔드포인트 추가 (권장)
4. API Secret 환경변수 설정

### Phase 4: 운영 배포
1. 포트원 운영 채널 설정
2. 운영 환경 설정 값 교체
3. 배포 및 모니터링

---

## 8. 테스트 체크리스트

### 8.1 결제 기능
- [ ] 정가 상품 결제 (payment.html)
- [ ] 커스텀 금액 결제 (payment-request.html)
- [ ] 옵션 선택 후 결제
- [ ] 결제 취소 시 처리

### 8.2 결제 수단
- [ ] 신용카드 결제
- [ ] 체크카드 결제
- [ ] 간편결제 (카카오페이, 네이버페이 등)

### 8.3 결과 페이지
- [ ] 결제 성공 페이지 표시
- [ ] 결제 실패 페이지 표시
- [ ] 오류 메시지 정상 표시

### 8.4 엣지 케이스
- [ ] 결제 중 브라우저 닫기
- [ ] 결제 중 새로고침
- [ ] 만료된 결제 링크 접근

### 8.5 보안 테스트 (필수)
- [ ] **결제 금액 위변조 테스트**: 브라우저에서 금액 조작 후 서버 검증 확인
- [ ] **금액 불일치 시 자동 취소 확인**
- [ ] API Secret이 클라이언트에 노출되지 않는지 확인
- [ ] HTTPS 통신 확인

---

## 9. 롤백 계획

마이그레이션 후 문제 발생 시:
1. `js/payment.js` 이전 버전으로 복구
2. HTML 파일 SDK 스크립트 복원
3. CONFIG 설정 값 복원

**권장**: Git 브랜치로 작업하여 롤백 용이하게 관리

---

## 10. 참고 자료

- [포트원 공식 문서](https://developers.portone.io/)
- [포트원 V2 SDK](https://developers.portone.io/sdk/ko/v2-sdk/readme)
- [결제 요청 API](https://developers.portone.io/api/rest-v2/payment)
- [포트원 콘솔](https://admin.portone.io/)

---

## 11. 예상 작업 범위 요약

| 항목 | 변경 수준 | 비고 |
|------|----------|------|
| `js/payment.js` | 전면 수정 (약 200줄) | SDK 교체 |
| `payment.html` | 1줄 (SDK URL) | |
| `payment-request.html` | 1줄 (SDK URL) | |
| `payment-success.html` | 소규모 수정 (결과 파싱) | |
| `payment-fail.html` | 소규모 수정 (에러 포맷) | |
| **서버 API (필수)** | **신규 구현** | **결제 금액 검증** |
| 환경변수 설정 | 신규 | API Secret 관리 |

---

*작성일: 2026-01-18*
