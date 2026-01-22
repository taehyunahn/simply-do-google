# CLAUDE.md - SimplyDo 프로젝트 지침서

> 이 파일은 Claude가 SimplyDo 프로젝트에서 작업할 때 참고하는 최상위 지침서입니다.

---

## 1. Project Overview

### 프로젝트 목적
**SimplyDo**는 구글 시트 기반 업무 자동화 솔루션을 판매하는 서비스 웹사이트입니다.

### 핵심 가치
- **영구 소유형 마이크로 ERP**: 월 구독료 없이 한 번 구매로 영구 사용
- **구글 시트 기반**: 친숙한 인터페이스, 유지보수 용이

### 서비스 카테고리 (3가지)
| 카테고리 | 설명 | 가격 모델 |
|----------|------|-----------|
| **Custom (프로그램 구축)** | 1:1 맞춤 개발 (CRM, 웹앱) | 협의가 |
| **Templates (템플릿)** | 즉시 사용 가능한 디지털 제품 | 고정가 (₩59,000~₩139,000) |
| **Consulting (컨설팅)** | 업무 효율화 진단 | 고정가 (₩150,000) |

### 핵심 기능
- 랜딩페이지 (서비스 소개, 고객 리뷰, 브랜드 스토리)
- 상품 모달 시스템 (상세 정보 팝업)
- 결제 시스템 (토스페이먼츠 연동)
- 반응형 디자인 (모바일/태블릿/데스크톱)

### 현재 상태
- **Alpha**: 프론트엔드 완성, 결제 백엔드 미연동
- **다음 목표**: Supabase 연동 및 결제 승인 API 구현

---

## 2. Tech Stack

### Frontend
| 기술 | 버전/방식 | 용도 |
|------|-----------|------|
| HTML5 | 정적 | 페이지 구조 |
| Tailwind CSS | CDN | 유틸리티 스타일링 |
| Custom CSS | `/css/style.css` | 커스텀 컴포넌트, 애니메이션 |
| Vanilla JavaScript | ES6+ | 인터랙션 로직 |
| Pretendard | CDN (cdn.jsdelivr.net) | 한국어 타이포그래피 |

### Backend (계획/진행 중)
| 기술 | 상태 | 용도 |
|------|------|------|
| Supabase | 미연동 | 데이터베이스, 인증 |
| Supabase Edge Functions | 미구현 | 결제 승인 API |
| 토스페이먼츠 SDK v1 | 테스트 모드 | 결제 처리 |

### Hosting
| 기술 | 상태 | 용도 |
|------|------|------|
| GitHub | 연동됨 | 소스 관리 |
| Netlify | 배포 예정 | 정적 호스팅 |

### 외부 의존성 (CDN)
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Pretendard Font (실제 사용 CDN은 index.html 참조) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/...">

<!-- 토스페이먼츠 -->
<script src="https://js.tosspayments.com/v1/payment"></script>
```

---

## 3. Coding Standards

### 3.1 파일 구조
```
simplydo_website/
├── css/
│   └── style.css           # 모든 커스텀 CSS
├── js/
│   ├── data.js             # 데이터 레이어 (PRODUCTS, REVIEWS)
│   ├── main.js             # UI 로직 (모달, 캐러셀, 애니메이션)
│   └── payment.js          # 결제 로직
├── assets/images/          # 이미지 파일
├── docs/                   # 기획 문서
├── index.html              # 메인 페이지
├── payment*.html           # 결제 관련 페이지
├── CLAUDE.md               # 이 파일
└── PLAN.md                 # 작업 계획서
```

### 3.2 명명 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| HTML ID | 케밥 케이스 | `modal-backdrop`, `mobile-menu-btn` |
| CSS 클래스 | 케밥 케이스 | `fade-in-up`, `card-hover` |
| CSS 변수 | 케밥 케이스 | `--primary-500`, `--gray-900` |
| JS 함수 | 카멜 케이스 | `openModal()`, `initCarousels()` |
| JS 상수 | 대문자 스네이크 | `PRODUCTS`, `CONFIG` |
| JS 변수 | 카멜 케이스 | `selectedOption`, `currentSlide` |

### 3.3 아키텍처 패턴

**모듈 분리 기반 설계 (Module Separation Pattern)**

> 이 프로젝트는 빌드 도구 없이 `<script>` 태그로 JS 파일을 로드합니다.
> 따라서 **로드 순서**가 중요합니다: `data.js` → `main.js` → `payment.js`

```
┌─────────────────────────────────────────────────────┐
│                    index.html                        │
│            (Presentation + Script 로드)              │
└─────────────────────┬───────────────────────────────┘
                      │ 전역 스코프 공유
          ┌───────────┼───────────┐
          ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ data.js  │→│ main.js  │→│payment.js│
    │ (Data)   │ │  (UI)    │ │(Payment) │
    │ 1st load │ │ 2nd load │ │ 3rd load │
    └──────────┘ └──────────┘ └──────────┘
```

**각 모듈의 책임**
| 모듈 | 책임 | 의존성 |
|------|------|--------|
| `data.js` | 상품/리뷰 데이터 정의, Helper 함수 | 없음 |
| `main.js` | UI 이벤트, DOM 조작, 애니메이션 | `data.js` |
| `payment.js` | 결제 플로우, 토스페이먼츠 SDK | `data.js` |

**전역 스코프 노출 규칙**
- 다른 모듈에서 사용할 함수/상수만 전역으로 노출
- 내부 전용 함수는 즉시실행함수(IIFE) 또는 클로저로 캡슐화

### 3.4 데이터 구조 패턴

**상품 데이터 스키마** (JSDoc 형식)
```javascript
/**
 * @typedef {Object} ProductOption
 * @property {string} name - 옵션명
 * @property {number} price - 가격
 * @property {string} desc - 설명
 */

/**
 * @typedef {Object} Product
 * @property {string} id - 고유 식별자 (예: 'crm_template')
 * @property {string} name - 상품명
 * @property {'custom'|'templates'|'consulting'} category - 카테고리
 * @property {string} tagline - 한 줄 설명
 * @property {string} description - 상세 설명
 * @property {string[]} features - 특징 목록
 * @property {number|null} price - 가격 (null = 협의가)
 * @property {Object.<string, ProductOption>} [options] - 템플릿 전용: 가격 옵션
 * @property {string[]} [process] - 컨설팅 전용: 진행 단계
 */

// 실제 구조 예시
const PRODUCTS = {
  templates: {
    crm_template: {
      id: 'crm_template',
      name: '스마트 CRM & 대량문자',
      category: 'templates',
      price: null,  // options로 가격 분화
      options: {
        standard: { name: 'Standard', price: 89000, desc: '...' },
        setup: { name: 'Setup', price: 139000, desc: '...' }
      }
    }
  }
}
```

**새 상품 추가 시 체크리스트**
1. `data.js`의 `PRODUCTS` 객체에 상품 추가
2. 카테고리에 맞는 필수 필드 확인 (options/process)
3. `index.html`에 상품 카드 HTML 추가
4. 모달 테스트 (`openModal('상품id')` 콘솔 실행)

### 3.5 유틸리티 패턴

**Helper 함수** (`data.js`)
```javascript
// 상품 ID로 상품 조회
getProductById(productId) → product | null

// 가격 포매팅
formatPrice(price) → "89,000원" | "협의"
```

**모달 패턴** (`main.js`)
```javascript
// 모달 열기 - 상품 ID 기반
openModal(productId)

// 카테고리별 다른 컨텐츠 생성
generateModalContent(product) → HTML string
```

**결제 패턴** (`payment.js`)
```javascript
// 주문 ID 생성: SD + timestamp + random
generateOrderId() → "SD1705900000000abc123"

// 결제 링크 생성 (관리자용)
generatePaymentLink({ amount, orderId, orderName, customerName })
```

### 3.6 CSS 애니메이션 클래스

| 클래스 | 효과 |
|--------|------|
| `.fade-in-up` | 아래에서 위로 페이드인 |
| `.scale-in` | 확대되며 나타남 |
| `.slide-in-left` | 왼쪽에서 슬라이드 |
| `.slide-in-right` | 오른쪽에서 슬라이드 |
| `.visible` | Intersection Observer가 추가 (트리거) |

### 3.7 CSS 변수 (Color Palette)

```css
--primary-500: #2563eb;    /* 메인 블루 */
--primary-600: #1d4ed8;    /* 호버 블루 */
--accent-500: #6366f1;     /* 인디고 */
--success-500: #10b981;    /* 성공 (에메랄드) */
--gray-900: #111827;       /* 텍스트 */
--gray-600: #4b5563;       /* 서브텍스트 */
```

---

## 4. Workflow

### 4.1 작업 시작 전

1. **CLAUDE.md 확인**: 프로젝트 컨텍스트 파악
2. **PLAN.md 확인/생성**: 작업 계획 수립
3. **관련 파일 읽기**: 수정할 파일의 현재 상태 확인

### 4.2 PLAN.md 활용

**PLAN.md 구조**
```markdown
# PLAN.md - [작업 제목]

## 목표
[작업의 목적]

## 작업 항목
- [ ] 항목 1
- [ ] 항목 2
- [x] 완료된 항목

## 변경 파일
- `파일명`: 변경 내용

## 스펙 변경사항
[CLAUDE.md에 동기화할 내용 - 새 패턴, 새 함수, 구조 변경 등]

## 참고사항
[주의점, 의존성 등]
```

**작업 절차**
```
1. PLAN.md 생성/업데이트 (작업 계획)
     ↓
2. 코드 수정 (계획에 따라)
     ↓
3. PLAN.md 체크박스 업데이트
     ↓
4. ⚠️ CLAUDE.md 스펙 동기화 (필수!)
     ↓
5. PLAN.md 삭제 또는 아카이브
```

### 4.3 CLAUDE.md 스펙 동기화 (필수)

> **⚠️ 중요: PLAN.md 작업이 완료될 때마다 반드시 이 파일을 업데이트해야 합니다.**

**동기화 체크리스트**
| 변경 유형 | 업데이트 섹션 | 예시 |
|-----------|---------------|------|
| 새 라이브러리 추가 | Tech Stack | Supabase 연동 완료 |
| 새 JS 파일 생성 | 파일 구조, Quick Reference | `js/admin.js` 추가 |
| 새 함수/패턴 도입 | Coding Standards | 새 Helper 함수 |
| 새 명령어 | Common Commands | 새 배포 스크립트 |
| 상품 구조 변경 | 데이터 구조 패턴 | 필드 추가/삭제 |
| TODO 항목 완료 | 미완성 작업 | 체크박스 업데이트 |

**동기화하지 않으면 발생하는 문제**
- 다음 작업 시 Claude가 outdated 정보로 작업
- 일관성 없는 코드 패턴 발생
- 존재하지 않는 함수/파일 참조 오류

### 4.4 파일 생성 규칙

> **AI가 새 파일을 생성할 때는 직접 전체 코드를 작성하기보다,
> 가능한 경우 스크립트나 템플릿을 활용합니다.**

**규칙 1: 반복 구조는 스크립트로 생성**
```bash
# 예: 여러 HTML 페이지를 일괄 생성해야 할 때
# 직접 작성 X → 생성 스크립트 작성 후 실행

# generate-pages.sh
for page in about contact faq; do
  cat template.html | sed "s/{{PAGE}}/$page/g" > "$page.html"
done
```

**규칙 2: 데이터 기반 코드는 data.js 수정 우선**
```javascript
// 새 상품 추가 시
// 잘못된 방법: index.html에 직접 HTML 작성
// 올바른 방법: data.js에 데이터 추가 → 렌더링 함수가 자동 처리
```

**규칙 3: 설정 파일은 예시 + 설명 제공**
```bash
# 환경변수 파일 생성 시
# .env 직접 작성 X → .env.example 생성 + 설정 가이드 제공
```

**규칙 4: 대용량 파일은 점진적 생성**
- 100줄 이상의 새 파일: 골격 먼저 → 섹션별 추가
- 사용자 확인 후 다음 단계 진행

### 4.5 기존 CLAUDE.md 업데이트 트리거

다음 상황에서 이 파일을 **반드시** 업데이트:

- **새로운 기술 추가**: Tech Stack 섹션
- **새로운 패턴 도입**: Coding Standards 섹션
- **새로운 명령어**: Common Commands 섹션
- **주요 아키텍처 변경**: 관련 섹션
- **상품 구조 변경**: 데이터 구조 패턴
- **PLAN.md 작업 완료**: 해당 작업의 스펙 변경사항

### 4.6 Git 커밋 컨벤션

```
[타입]: 간단한 설명 (한글 또는 영문)

타입:
- feat: 새 기능 추가
- fix: 버그 수정
- style: UI/스타일 변경 (기능 변화 없음)
- refactor: 리팩토링 (기능 변화 없음)
- docs: 문서 변경
- chore: 빌드, 설정 등 기타 작업
```

**예시**
```bash
git commit -m "feat: 컨설팅 상품 모달 추가"
git commit -m "fix: 모바일 메뉴 z-index 수정"
git commit -m "docs: CLAUDE.md 스펙 동기화"
```

---

## 5. Common Commands

### 5.1 개발 서버

```bash
# Python 간이 서버 (포트 8000)
python3 -m http.server 8000

# Node.js live-server (자동 새로고침)
npx live-server

# VS Code Live Server 확장 사용 권장
```

### 5.2 Git 작업

```bash
# 상태 확인
git status

# 변경사항 커밋
git add [파일명]
git commit -m "[타입]: 설명"

# 원격 푸시
git push origin main
```

### 5.3 Netlify 배포

```bash
# Netlify CLI 설치 (최초 1회)
npm install -g netlify-cli

# 로그인
netlify login

# 수동 배포
netlify deploy --prod

# 또는 GitHub 연동 시 자동 배포 (권장)
```

### 5.4 Supabase (향후)

```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# Edge Function 배포
supabase functions deploy [function-name]
```

### 5.5 토스페이먼츠

```javascript
// 키 위치: js/payment.js → CONFIG.TOSS_CLIENT_KEY
// 현재 상태: 테스트 모드 (test_ck_... 형식)

// 라이브 전환 체크리스트:
// 1. 토스페이먼츠 콘솔에서 라이브 키 발급
// 2. CONFIG.TOSS_CLIENT_KEY 값 교체
// 3. 결제 승인 서버 API 연동 확인 (필수!)
// 4. 테스트 결제 → 라이브 결제 전환

// ⚠️ 주의: 라이브 키는 절대 이 문서나 Git에 직접 커밋하지 않음
// 환경변수 또는 Netlify 환경설정 사용 권장
```

---

## 6. 주요 파일 Quick Reference

| 파일 | 역할 | 주요 함수/상수 |
|------|------|----------------|
| `js/data.js` | 상품 데이터 | `PRODUCTS`, `REVIEWS`, `getProductById()` |
| `js/main.js` | UI 로직 | `openModal()`, `Carousel` 클래스 |
| `js/payment.js` | 결제 | `requestPayment()`, `CONFIG` |
| `css/style.css` | 스타일 | CSS 변수, 애니메이션 클래스 |
| `index.html` | 메인 페이지 | 섹션: hero, story, services, reviews |

---

## 7. 미완성 작업 (TODO)

### 우선순위 높음
- [ ] Supabase 프로젝트 생성 및 연동
- [ ] 결제 승인 Edge Function 구현
- [ ] Footer 사업자 정보 추가

### 우선순위 중간
- [ ] 에러 핸들링 강화
- [ ] 로딩 상태 UI
- [ ] 이메일 확인 자동화

### 우선순위 낮음
- [ ] 관리자 대시보드
- [ ] SEO 최적화
- [ ] 성능 모니터링

---

---

## 8. 변경 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026-01-22 | 최초 작성 |
| 2026-01-22 | 시니어 리뷰: 모호한 기술 명세 개선, 파일 생성 규칙 추가, 스펙 동기화 지침 강화 |

*마지막 업데이트: 2026-01-22*
