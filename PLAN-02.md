# PLAN-02: 콘텐츠 섹션 슬라이드 캐러셀 구현 계획

## 목표
- Video Guide Section과 Insight Column Section에 자동 슬라이드 캐러셀 적용
- 각 섹션 아이템 2개 → 5개로 확장
- 현재 카드 사이즈 유지하며 가로 슬라이드로 생동감 부여

---

## 현재 상태 분석

### Video Guide Section (index.html 428-488번 라인)
- 구조: `grid md:grid-cols-2 gap-8`
- 아이템 수: 2개
- 아이템 내용: YouTube 영상 썸네일 + 제목 + 설명

### Insight Column Section (index.html 491-538번 라인)
- 구조: `grid md:grid-cols-2 gap-6`
- 아이템 수: 2개
- 아이템 내용: 블로그 카드 (태그 + 날짜 + 제목 + 설명)

---

## 구현 계획

### 1단계: 슬라이드 컨테이너 구조 변경

**Video Guide Section**
- 기존 grid 레이아웃 → flexbox 기반 슬라이드 컨테이너로 변경
- 뷰포트에는 2개 카드만 보이도록 설정 (현재 사이즈 유지)
- overflow-hidden으로 나머지 카드 숨김

**Insight Column Section**
- 동일한 방식으로 flexbox 슬라이드 컨테이너 적용
- 뷰포트에 2개 카드 표시

### 2단계: 아이템 확장 (2개 → 5개)

**Video Guide Section**
- 기존 2개 영상 유지
- 추가 3개 영상 슬롯 생성 (YouTube 링크/썸네일 필요)
- 각 아이템 너비: 50% (데스크탑), 100% (모바일)

**Insight Column Section**
- 기존 2개 블로그 카드 유지
- 추가 3개 블로그 카드 슬롯 생성 (블로그 링크 필요)
- 각 아이템 너비: 50% (데스크탑), 100% (모바일)

### 3단계: CSS 스타일 추가 (css/style.css)

**필요한 스타일**
- `.slide-container`: 슬라이드 래퍼 스타일
- `.slide-track`: 실제 슬라이드되는 트랙
- `.slide-item`: 개별 아이템 스타일
- 트랜지션 애니메이션 (smooth sliding)

### 4단계: JavaScript 자동 슬라이드 로직 (js/main.js)

**기능 구현**
- 자동 슬라이드: 일정 간격(예: 4-5초)으로 다음 아이템으로 이동
- 무한 루프: 마지막 아이템 후 첫 번째로 자연스럽게 순환
- 호버 시 일시정지: 사용자가 카드 위에 마우스 올리면 슬라이드 멈춤
- 터치/스와이프 지원: 모바일에서 좌우 스와이프로 수동 이동

**선택적 기능**
- 인디케이터 점(dots): 현재 위치 표시
- 좌우 화살표 버튼: 수동 이동 컨트롤

### 5단계: 반응형 처리

**데스크탑 (md 이상)**
- 한 번에 2개 카드 표시
- 슬라이드 시 2개씩 이동 또는 1개씩 이동

**모바일 (md 미만)**
- 한 번에 1개 카드 표시
- 슬라이드 시 1개씩 이동

---

## 수정 대상 파일

| 파일 | 수정 내용 |
|------|----------|
| `index.html` | 섹션 구조 변경, 아이템 3개 추가 (각 섹션) |
| `css/style.css` | 슬라이드 관련 스타일 추가 |
| `js/main.js` | 자동 슬라이드 로직 추가 |

---

## 고려사항

### 성능
- CSS transform 사용 (GPU 가속)
- requestAnimationFrame 활용
- 이미지 lazy loading 적용

### 접근성
- 키보드 네비게이션 지원
- aria-label 추가
- reduced-motion 미디어 쿼리 대응 (애니메이션 비활성화 옵션)

### 추가 콘텐츠 필요
- Video Guide: 추가 3개 YouTube 영상 URL
- Insight Column: 추가 3개 블로그 포스트 URL

---

## 구현 방식 선택지

### Option A: 순수 CSS + JavaScript (권장)
- 외부 라이브러리 없이 직접 구현
- 가벼움, 커스터마이징 자유도 높음
- 현재 프로젝트 구조와 일관성 유지

### Option B: 라이브러리 사용 (Swiper.js 등)
- 빠른 구현, 다양한 기능 내장
- 추가 의존성 발생
- 번들 사이즈 증가

---

## 예상 작업 순서

1. index.html 섹션 구조 변경
2. css/style.css 슬라이드 스타일 추가
3. js/main.js 자동 슬라이드 로직 구현
4. 추가 콘텐츠(영상/블로그) 삽입
5. 반응형 테스트
6. 성능 및 접근성 검토
