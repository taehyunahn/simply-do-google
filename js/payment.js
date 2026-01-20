/* ==========================================
   SimplyDo - Payment Integration (Toss Payments)
   ========================================== */

// ==========================================
// 1. Configuration
// ==========================================

const CONFIG = {
  // 토스페이먼츠 클라이언트 키 (테스트용)
  // 실제 서비스 시 라이브 키로 교체 필요
  TOSS_CLIENT_KEY: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',

  // 결제 성공/실패 리다이렉트 URL
  SUCCESS_URL: window.location.origin + '/payment-success.html',
  FAIL_URL: window.location.origin + '/payment-fail.html',

  // Supabase 설정 (결제 승인 API 엔드포인트)
  // 실제 서비스 시 설정 필요
  API_BASE_URL: '', // 예: 'https://xxx.supabase.co/functions/v1'
};

// 토스페이먼츠 SDK 인스턴스
let tossPayments = null;

// 현재 결제 정보
let currentPayment = {
  productId: null,
  productName: '',
  amount: 0,
  selectedOption: null,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
};

// ==========================================
// 2. Initialization
// ==========================================

/**
 * 토스페이먼츠 SDK 초기화
 */
function initTossPayments() {
  if (typeof TossPayments !== 'undefined') {
    tossPayments = TossPayments(CONFIG.TOSS_CLIENT_KEY);
  } else {
    console.error('TossPayments SDK not loaded');
  }
}

/**
 * 정가 상품 결제 페이지 초기화
 */
function initPaymentPage() {
  initTossPayments();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');
  const optionKey = params.get('option');

  if (!productId) {
    showError();
    return;
  }

  // 상품 정보 조회
  const product = getProductById(productId);

  if (!product) {
    showError();
    return;
  }

  // 상품 정보 저장
  currentPayment.productId = productId;
  currentPayment.productName = product.name;
  currentPayment.amount = product.price || 0;

  // UI 업데이트
  renderProductInfo(product, optionKey);
  setupFormValidation();
  hideLoading();
  showPaymentForm();
}

/**
 * 커스텀 결제 페이지 초기화
 */
function initCustomPaymentPage() {
  initTossPayments();

  const params = new URLSearchParams(window.location.search);

  // URL 파라미터에서 결제 정보 추출
  const amount = parseInt(params.get('amount'));
  const name = params.get('name');
  const description = params.get('desc');
  const requestId = params.get('id');
  const expiresAt = params.get('expires');

  // 필수 파라미터 검증
  if (!amount || !name) {
    showError('결제 정보가 올바르지 않습니다.');
    return;
  }

  // 만료 시간 체크
  if (expiresAt) {
    const expireDate = new Date(expiresAt);
    if (expireDate < new Date()) {
      showExpired();
      return;
    }
  }

  // 결제 정보 저장
  currentPayment.productName = decodeURIComponent(name);
  currentPayment.amount = amount;

  // UI 업데이트
  document.getElementById('request-name').textContent = currentPayment.productName;
  document.getElementById('request-amount').textContent = formatPrice(amount);

  if (description) {
    document.getElementById('request-description').textContent = decodeURIComponent(description);
    document.getElementById('request-description-row').classList.remove('hidden');
  }

  setupFormValidation();
  hideLoading();
  showPaymentForm();
}

// ==========================================
// 3. UI Rendering
// ==========================================

/**
 * 상품 정보 렌더링
 */
function renderProductInfo(product, optionKey) {
  // 배지
  const badgeEl = document.getElementById('product-badge');
  if (product.badge) {
    badgeEl.textContent = product.badge;
    badgeEl.classList.remove('hidden');
  } else {
    badgeEl.classList.add('hidden');
  }

  // 상품명
  document.getElementById('product-name').textContent = product.name;

  // 태그라인
  document.getElementById('product-tagline').textContent = product.tagline || '';

  // 가격
  document.getElementById('product-price').textContent = formatPrice(product.price);

  // 옵션이 있는 경우
  if (product.options) {
    renderOptions(product.options, optionKey);
  }

  // 결제 금액 요약 업데이트
  updatePaymentSummary();
}

/**
 * 옵션 렌더링
 */
function renderOptions(options, selectedKey) {
  const optionSection = document.getElementById('option-section');
  const optionList = document.getElementById('option-list');

  optionSection.classList.remove('hidden');
  optionList.innerHTML = '';

  Object.entries(options).forEach(([key, option]) => {
    const isSelected = selectedKey === key || (!selectedKey && key === 'standard');
    const optionEl = document.createElement('label');
    optionEl.className = `flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
    }`;

    optionEl.innerHTML = `
      <div class="flex items-center space-x-3">
        <input type="radio" name="option" value="${key}" ${isSelected ? 'checked' : ''}
               class="w-5 h-5 text-blue-600 focus:ring-blue-500">
        <div>
          <span class="font-medium text-gray-900">${option.name}</span>
          <span class="text-sm text-gray-500 ml-2">${option.desc}</span>
        </div>
      </div>
      <span class="font-bold ${option.price ? 'text-blue-600' : 'text-gray-500'}">${formatPrice(option.price)}</span>
    `;

    // 이벤트 리스너
    const radio = optionEl.querySelector('input');
    radio.addEventListener('change', () => {
      // 스타일 업데이트
      document.querySelectorAll('#option-list label').forEach(el => {
        el.classList.remove('border-blue-500', 'bg-blue-50');
        el.classList.add('border-gray-200');
      });
      optionEl.classList.remove('border-gray-200');
      optionEl.classList.add('border-blue-500', 'bg-blue-50');

      // 결제 정보 업데이트
      currentPayment.selectedOption = key;
      currentPayment.amount = option.price;
      updatePaymentSummary();

      // 협의 옵션인 경우 결제 버튼 비활성화
      if (option.price === null) {
        document.getElementById('payment-button').disabled = true;
        document.getElementById('payment-button-text').textContent = '가격 협의 필요';
      } else {
        validateForm();
      }
    });

    optionList.appendChild(optionEl);

    // 초기 선택
    if (isSelected) {
      currentPayment.selectedOption = key;
      currentPayment.amount = option.price;
    }
  });
}

/**
 * 결제 금액 요약 업데이트
 */
function updatePaymentSummary() {
  document.getElementById('summary-product-price').textContent = formatPrice(currentPayment.amount);
  document.getElementById('summary-total').textContent = formatPrice(currentPayment.amount);
  document.getElementById('payment-button-text').textContent = `${formatPrice(currentPayment.amount)} 결제하기`;
}

// ==========================================
// 4. Form Validation
// ==========================================

/**
 * 폼 유효성 검사 설정
 */
function setupFormValidation() {
  const inputs = ['customer-name', 'customer-email', 'customer-phone'];
  const checkbox = document.getElementById('agree-terms');

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', validateForm);
      el.addEventListener('blur', validateForm);
    }
  });

  if (checkbox) {
    checkbox.addEventListener('change', validateForm);
  }
}

/**
 * 폼 유효성 검사
 */
function validateForm() {
  const name = document.getElementById('customer-name')?.value.trim();
  const email = document.getElementById('customer-email')?.value.trim();
  const phone = document.getElementById('customer-phone')?.value.trim();
  const agreed = document.getElementById('agree-terms')?.checked;

  const isValid = name && isValidEmail(email) && phone && agreed && currentPayment.amount > 0;

  // 고객 정보 저장
  currentPayment.customerName = name;
  currentPayment.customerEmail = email;
  currentPayment.customerPhone = phone;

  // 버튼 활성화/비활성화
  const button = document.getElementById('payment-button');
  if (button) {
    button.disabled = !isValid;
  }

  return isValid;
}

/**
 * 이메일 유효성 검사
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ==========================================
// 5. Payment Functions
// ==========================================

/**
 * 정가 상품 결제 요청
 */
async function requestPayment() {
  if (!validateForm()) {
    alert('모든 필수 정보를 입력해주세요.');
    return;
  }

  if (!tossPayments) {
    alert('결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  // 주문 ID 생성
  const orderId = generateOrderId();

  // 결제 버튼 로딩 상태
  setButtonLoading(true);

  try {
    await tossPayments.requestPayment('카드', {
      amount: currentPayment.amount,
      orderId: orderId,
      orderName: currentPayment.productName,
      customerName: currentPayment.customerName,
      customerEmail: currentPayment.customerEmail,
      successUrl: `${CONFIG.SUCCESS_URL}?orderId=${orderId}`,
      failUrl: CONFIG.FAIL_URL,
    });
  } catch (error) {
    // 사용자가 결제창을 닫은 경우
    if (error.code === 'USER_CANCEL') {
      console.log('사용자가 결제를 취소했습니다.');
    } else {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다: ' + error.message);
    }
    setButtonLoading(false);
  }
}

/**
 * 커스텀 금액 결제 요청
 */
async function requestCustomPayment() {
  if (!validateForm()) {
    alert('모든 필수 정보를 입력해주세요.');
    return;
  }

  if (!tossPayments) {
    alert('결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestId = params.get('id') || generateOrderId();

  setButtonLoading(true);

  try {
    await tossPayments.requestPayment('카드', {
      amount: currentPayment.amount,
      orderId: requestId,
      orderName: currentPayment.productName,
      customerName: currentPayment.customerName,
      customerEmail: currentPayment.customerEmail,
      successUrl: `${CONFIG.SUCCESS_URL}?orderId=${requestId}&custom=true`,
      failUrl: CONFIG.FAIL_URL,
    });
  } catch (error) {
    if (error.code === 'USER_CANCEL') {
      console.log('사용자가 결제를 취소했습니다.');
    } else {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다: ' + error.message);
    }
    setButtonLoading(false);
  }
}

/**
 * 결제 성공 처리
 */
async function handlePaymentSuccess() {
  const params = new URLSearchParams(window.location.search);
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');

  if (!paymentKey || !orderId || !amount) {
    showPaymentError('결제 정보가 올바르지 않습니다.');
    return;
  }

  try {
    // 서버에서 결제 승인 처리
    // 실제 서비스에서는 서버 API를 호출해야 합니다
    if (CONFIG.API_BASE_URL) {
      const response = await fetch(`${CONFIG.API_BASE_URL}/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: parseInt(amount),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '결제 승인에 실패했습니다.');
      }

      const result = await response.json();
      displayPaymentResult(result);
    } else {
      // 테스트 모드: 서버 없이 성공 화면 표시
      displayPaymentResult({
        orderId,
        orderName: params.get('orderName') || '상품',
        totalAmount: parseInt(amount),
        method: '카드',
        approvedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('결제 승인 오류:', error);
    showPaymentError(error.message);
  }
}

/**
 * 결제 결과 표시
 */
function displayPaymentResult(result) {
  document.getElementById('processing-state').classList.add('hidden');
  document.getElementById('success-state').classList.remove('hidden');

  document.getElementById('order-id').textContent = result.orderId;
  document.getElementById('order-name').textContent = result.orderName || '-';
  document.getElementById('order-amount').textContent = formatPrice(result.totalAmount);
  document.getElementById('payment-method').textContent = result.method || '카드';
  document.getElementById('payment-date').textContent = formatDate(result.approvedAt);
}

// ==========================================
// 6. UI State Functions
// ==========================================

function hideLoading() {
  document.getElementById('loading-state').classList.add('hidden');
}

function showPaymentForm() {
  document.getElementById('payment-form').classList.remove('hidden');
}

function showError(message) {
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('error-state').classList.remove('hidden');
  if (message) {
    const msgEl = document.getElementById('error-message');
    if (msgEl) msgEl.textContent = message;
  }
}

function showExpired() {
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('expired-state').classList.remove('hidden');
}

function showPaymentError(message) {
  document.getElementById('processing-state').classList.add('hidden');
  document.getElementById('error-state').classList.remove('hidden');
  if (message) {
    document.getElementById('error-message').textContent = message;
  }
}

function setButtonLoading(loading) {
  const button = document.getElementById('payment-button');
  const buttonText = document.getElementById('payment-button-text');

  if (loading) {
    button.disabled = true;
    buttonText.innerHTML = '<span class="spinner"></span> 처리 중...';
  } else {
    button.disabled = false;
    buttonText.textContent = `${formatPrice(currentPayment.amount)} 결제하기`;
  }
}

// ==========================================
// 7. Utility Functions
// ==========================================

/**
 * 주문 ID 생성
 */
function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SD${timestamp}${random}`;
}

/**
 * 가격 포맷팅
 */
function formatPrice(price) {
  if (price === null || price === undefined) return '협의';
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

/**
 * 날짜 포맷팅
 */
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// ==========================================
// 8. Custom Payment Link Generator (Admin)
// ==========================================

/**
 * 커스텀 결제 링크 생성 (관리자용)
 * @param {Object} options - 결제 옵션
 * @param {number} options.amount - 결제 금액
 * @param {string} options.name - 상품/서비스명
 * @param {string} [options.description] - 상세 설명
 * @param {number} [options.expiresInDays] - 만료 기한 (일)
 * @returns {string} 결제 링크
 */
function generatePaymentLink(options) {
  const { amount, name, description, expiresInDays = 7 } = options;

  const requestId = generateOrderId();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const params = new URLSearchParams({
    id: requestId,
    amount: amount.toString(),
    name: encodeURIComponent(name),
    expires: expiresAt.toISOString(),
  });

  if (description) {
    params.set('desc', encodeURIComponent(description));
  }

  return `${window.location.origin}/payment-request.html?${params.toString()}`;
}

// 콘솔에서 사용할 수 있도록 전역으로 노출
window.generatePaymentLink = generatePaymentLink;

/*
 * 사용 예시 (브라우저 콘솔에서):
 *
 * generatePaymentLink({
 *   amount: 150000,
 *   name: '업무 효율화 컨설팅',
 *   description: '1시간 화상 컨설팅 + 결과 리포트',
 *   expiresInDays: 3
 * });
 *
 * 결과: "https://simplydo.kr/payment-request.html?id=SD1234567890ABC&amount=150000&name=..."
 */
