/* ==========================================
   SimplyDo - Main JavaScript (Light Theme)
   ========================================== */

// ==========================================
// 1. Navigation Scroll Effect
// ==========================================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ==========================================
// 2. Mobile Menu
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open');

  const icon = mobileMenuBtn?.querySelector('svg');
  if (icon) {
    const isOpen = mobileMenu.classList.contains('open');
    icon.innerHTML = isOpen
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      const icon = mobileMenuBtn?.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  });
});

// ==========================================
// 3. Scroll Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up, .scale-in');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
  );

  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ==========================================
// 4. Smooth Scroll for Anchor Links
// ==========================================
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute('href').slice(1);
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (target) {
    e.preventDefault();
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
});

// ==========================================
// 5. Template Carousel
// ==========================================
function initCarousel() {
  const track = document.getElementById('template-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, slides.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);

    const slideWidth = slides[0].offsetWidth + 24; // gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // 도트 업데이트
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, slides.length - visibleCount);
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateCarousel();
  });

  // 도트 클릭
  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
    });
  });

  // 터치 스와이프 지원
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextBtn.click() : prevBtn.click();
    }
  });

  // 리사이즈 대응
  window.addEventListener('resize', updateCarousel);
}

// ==========================================
// 6. Template Order Buttons
// ==========================================
function initTemplateOrderButtons() {
  document.querySelectorAll('.template-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.product;
      const product = getProductById(productId);
      if (!product) return;

      // 폼 섹션 표시
      document.getElementById('template-order-section').classList.remove('hidden');
      document.getElementById('template-order-card').classList.remove('hidden');
      document.getElementById('template-order-confirmation').classList.add('hidden');
      document.getElementById('template-order-title').textContent = product.name;
      document.getElementById('template-product-name').value = product.name;

      // 옵션 카드 동적 렌더링
      renderOptionCards(product, 'template-options', 'template-price-value');

      // 폼으로 스크롤
      document.getElementById('template-order-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ==========================================
// 7. Option Card Rendering
// ==========================================
function renderOptionCards(product, containerId, priceDisplayId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  let isFirst = true;

  Object.entries(product.options).forEach(([key, opt]) => {
    const priceLabel = opt.priceLabel || formatPrice(opt.price);
    const card = document.createElement('label');
    card.className = `option-card${isFirst ? ' selected' : ''}`;
    card.dataset.option = key;
    card.innerHTML = `
      <input type="radio" name="option" value="${key}" class="hidden" ${isFirst ? 'checked' : ''}>
      <div class="option-card-badge">${opt.name}</div>
      <div class="text-xl font-bold text-navy mt-2">${priceLabel}</div>
      <div class="text-sm text-gray-500 mt-1">${opt.desc}</div>
    `;
    container.appendChild(card);

    if (isFirst) {
      document.getElementById(priceDisplayId).textContent = priceLabel;
    }
    isFirst = false;

    card.addEventListener('click', () => {
      container.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById(priceDisplayId).textContent = priceLabel;
    });
  });
}

// ==========================================
// 8. Form Submit (Template + Consulting)
// ==========================================
function handleOrderSubmit(e, type) {
  e.preventDefault();
  const form = e.target;

  // 필수 입력 검증
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  requiredFields.forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    }
  });

  // 이메일 형식 검증
  const emailField = form.querySelector('[type="email"]');
  if (emailField && !isValidEmail(emailField.value)) {
    emailField.classList.add('error');
    isValid = false;
  }

  if (!isValid) return;

  // 폼 데이터 수집
  const formData = new FormData(form);
  const data = {
    type: type,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    submittedAt: new Date().toISOString()
  };

  if (type === 'template') {
    data.product = formData.get('product');
    data.option = formData.get('option');
    data.message = formData.get('message') || '';
  } else if (type === 'consulting') {
    data.company = formData.get('company') || '';
    data.painPoint = formData.get('pain_point');
    data.currentTools = formData.get('current_tools');
    data.desiredOutcome = formData.get('desired_outcome') || '';
    data.message = formData.get('message') || '';
    data.product = '컨설팅';
    data.option = '1:1 온라인 미팅';
  }

  console.log('Order submitted:', data);

  // 제출 버튼 비활성화 (이중 클릭 방지)
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = '제출 중...';

  // Google Apps Script 연동
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyU48extpJX8Eb6NBjNFSOo5fHP8jnTGJ8FxKOJA-iU8FRU1PAQQlpaHTKLHNBHqb2P_A/exec';
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    showConfirmation(type);
  })
  .catch((error) => {
    console.error('Submit error:', error);
    alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showConfirmation(type) {
  if (type === 'template') {
    document.getElementById('template-order-card').classList.add('hidden');
    document.getElementById('template-order-confirmation').classList.remove('hidden');
  } else {
    document.getElementById('consulting-form').classList.add('hidden');
    document.getElementById('consulting-confirmation').classList.remove('hidden');
  }
}

// ==========================================
// 9. Showcase Video Lazy Play
// ==========================================
function initShowcaseVideos() {
  const videos = document.querySelectorAll('.showcase-mockup video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });

  videos.forEach(video => {
    video.pause();
    observer.observe(video);
  });
}

// ==========================================
// 10. Init All New Features
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initTemplateOrderButtons();
  initShowcaseVideos();
});
