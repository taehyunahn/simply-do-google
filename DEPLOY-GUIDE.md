# Netlify 무료 배포 가이드

이 문서는 SimplyDo 웹사이트를 Netlify를 통해 무료로 배포하는 방법을 안내합니다.

---

## 목차
1. [사전 준비](#사전-준비)
2. [배포 방법 선택](#배포-방법-선택)
3. [방법 1: 드래그 앤 드롭 배포](#방법-1-드래그-앤-드롭-배포-가장-빠름)
4. [방법 2: GitHub 연동 배포](#방법-2-github-연동-배포-권장)
5. [방법 3: Netlify CLI 배포](#방법-3-netlify-cli-배포)
6. [배포 후 설정](#배포-후-설정)
7. [커스텀 도메인 연결](#커스텀-도메인-연결)
8. [문제 해결](#문제-해결)

---

## 사전 준비

### 필요한 것
- Netlify 계정 (무료): https://app.netlify.com/signup
- 이 프로젝트 폴더 전체

### 프로젝트 구조 확인
```
simplydo_website/
├── index.html          # 메인 페이지
├── payment.html        # 결제 페이지
├── css/
│   └── style.css       # 스타일시트
├── js/
│   ├── main.js         # 메인 스크립트
│   └── products.js     # 상품 데이터
└── assets/             # 이미지 등 (있는 경우)
```

---

## 배포 방법 선택

| 방법 | 난이도 | 장점 | 단점 |
|------|--------|------|------|
| 드래그 앤 드롭 | ⭐ 쉬움 | 즉시 배포 가능 | 수동 업데이트 필요 |
| GitHub 연동 | ⭐⭐ 보통 | 자동 배포, 버전 관리 | GitHub 계정 필요 |
| Netlify CLI | ⭐⭐ 보통 | 터미널에서 빠른 배포 | CLI 설치 필요 |

---

## 방법 1: 드래그 앤 드롭 배포 (가장 빠름)

### 1단계: Netlify 로그인
1. https://app.netlify.com 접속
2. 계정이 없다면 **Sign up** 클릭 (GitHub, GitLab, Email 중 선택)
3. 로그인 후 **Sites** 탭으로 이동

### 2단계: 폴더 업로드
1. 화면에 보이는 점선 영역 확인 (또는 **Add new site** → **Deploy manually**)
2. `simplydo_website` 폴더 전체를 드래그하여 점선 영역에 드롭
3. 업로드 완료까지 대기 (보통 수 초)

### 3단계: 배포 완료
- 자동으로 URL 생성: `https://random-name-12345.netlify.app`
- **Site settings**에서 사이트 이름 변경 가능

### 업데이트 방법
1. Sites → 해당 사이트 선택
2. **Deploys** 탭 클릭
3. 수정된 폴더를 다시 드래그 앤 드롭

---

## 방법 2: GitHub 연동 배포 (권장)

### 1단계: GitHub 저장소 생성

```bash
# 프로젝트 폴더에서 Git 초기화
cd simplydo_website
git init

# .gitignore 파일 생성 (선택사항)
echo ".DS_Store" > .gitignore
echo "*.log" >> .gitignore

# 모든 파일 추가 및 커밋
git add .
git commit -m "Initial commit: SimplyDo website"
```

### 2단계: GitHub에 저장소 생성
1. https://github.com/new 접속
2. Repository name: `simplydo-website` (원하는 이름)
3. Public 또는 Private 선택
4. **Create repository** 클릭

### 3단계: 로컬 저장소를 GitHub에 연결

```bash
# GitHub 저장소 URL로 변경하세요
git remote add origin https://github.com/YOUR_USERNAME/simplydo-website.git
git branch -M main
git push -u origin main
```

### 4단계: Netlify에서 GitHub 연동
1. https://app.netlify.com 로그인
2. **Add new site** → **Import an existing project**
3. **GitHub** 선택 → 권한 승인
4. `simplydo-website` 저장소 선택

### 5단계: 배포 설정
```
Branch to deploy: main
Build command: (비워두기)
Publish directory: (비워두기 또는 . 입력)
```

6. **Deploy site** 클릭

### 자동 배포
- 이후 GitHub에 push할 때마다 자동으로 새 버전 배포
```bash
git add .
git commit -m "Update: 변경 내용"
git push
```

---

## 방법 3: Netlify CLI 배포

### 1단계: Netlify CLI 설치

```bash
# npm 사용
npm install -g netlify-cli

# 또는 yarn 사용
yarn global add netlify-cli
```

### 2단계: Netlify 로그인

```bash
netlify login
# 브라우저가 열리면 권한 승인
```

### 3단계: 사이트 초기화 및 배포

```bash
cd simplydo_website

# 새 사이트 생성 및 배포
netlify deploy --prod

# 질문에 답변:
# ? What would you like to do? Create & configure a new site
# ? Team: (팀 선택)
# ? Site name: simplydo-website (원하는 이름)
# ? Publish directory: . (현재 폴더)
```

### 빠른 배포 (이후)

```bash
# 프로덕션 배포
netlify deploy --prod

# 미리보기 배포 (테스트용)
netlify deploy
```

---

## 배포 후 설정

### 사이트 이름 변경
1. **Site settings** → **Site details** → **Change site name**
2. 원하는 이름 입력 (예: `simplydo`)
3. URL이 `https://simplydo.netlify.app`으로 변경됨

### HTTPS 설정
- Netlify는 기본적으로 무료 SSL 인증서 자동 적용
- **Domain settings** → **HTTPS** 에서 확인 가능

### 리다이렉트 설정 (선택사항)
프로젝트 루트에 `_redirects` 파일 생성:
```
# 404 페이지 처리
/*    /index.html   200
```

또는 `netlify.toml` 파일 생성:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 커스텀 도메인 연결

### 1단계: 도메인 추가
1. **Domain settings** → **Add custom domain**
2. 도메인 입력 (예: `simplydo.co.kr`)
3. **Verify** 클릭

### 2단계: DNS 설정

#### 옵션 A: Netlify DNS 사용 (권장)
1. 도메인 등록 업체에서 네임서버를 Netlify로 변경:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

#### 옵션 B: 외부 DNS 사용
도메인 등록 업체의 DNS 설정에서:
```
# A 레코드 (루트 도메인)
@    A    75.2.60.5

# CNAME 레코드 (www 서브도메인)
www  CNAME  your-site-name.netlify.app
```

### 3단계: SSL 인증서
- 커스텀 도메인 연결 후 자동으로 Let's Encrypt SSL 인증서 발급
- 발급까지 수 분 소요될 수 있음

---

## 문제 해결

### 배포 실패 시
1. **Deploys** 탭에서 에러 로그 확인
2. 파일명에 한글이나 특수문자가 있는지 확인
3. 파일 경로가 올바른지 확인 (대소문자 구분)

### 페이지가 안 보일 때
- `index.html`이 루트 폴더에 있는지 확인
- 브라우저 캐시 삭제 후 새로고침

### CSS/JS가 적용 안 될 때
- 파일 경로 확인 (상대 경로 사용 권장)
- 브라우저 개발자 도구 → Network 탭에서 404 에러 확인

### 커스텀 도메인 연결 문제
- DNS 전파에 최대 48시간 소요될 수 있음
- https://dnschecker.org 에서 DNS 전파 상태 확인

---

## Netlify 무료 플랜 제한

| 항목 | 무료 제공량 |
|------|-------------|
| 대역폭 | 100GB/월 |
| 빌드 시간 | 300분/월 |
| 사이트 수 | 무제한 |
| 팀 멤버 | 1명 |
| Forms | 100건/월 |
| Functions | 125,000 요청/월 |

일반적인 정적 웹사이트는 무료 플랜으로 충분합니다.

---

## 유용한 링크

- Netlify 공식 문서: https://docs.netlify.com
- Netlify 상태 페이지: https://www.netlifystatus.com
- Netlify 커뮤니티: https://answers.netlify.com

---

*마지막 업데이트: 2026-01-20*
