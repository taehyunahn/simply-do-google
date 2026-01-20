/* ==========================================
   SimplyDo - Main JavaScript
   ========================================== */

// ==========================================
// 1. DOM Elements
// ==========================================
const backdrop = document.getElementById('modal-backdrop');
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// ==========================================
// 2. Modal Functions
// ==========================================

/**
 * 상품 상세 모달 열기
 * @param {string} productId - 상품 ID
 */
function openModal(productId) {
  const product = getProductById(productId);

  if (!product) {
    console.error('Product not found:', productId);
    return;
  }

  // 모달 제목 설정
  modalTitle.innerText = product.name;

  // 모달 콘텐츠 생성
  modalContent.innerHTML = generateModalContent(product);

  // 모달 표시
  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');

  // 애니메이션 적용 (약간의 딜레이 필요)
  setTimeout(() => {
    backdrop.classList.remove('opacity-0');
    modal.classList.remove('opacity-0', 'scale-95');
    modal.classList.add('opacity-100', 'scale-100');
  }, 10);

  // 배경 스크롤 방지
  document.body.style.overflow = 'hidden';
}

/**
 * 모달 닫기
 */
function closeModal() {
  backdrop.classList.add('opacity-0');
  modal.classList.remove('opacity-100', 'scale-100');
  modal.classList.add('opacity-0', 'scale-95');

  setTimeout(() => {
    backdrop.classList.add('hidden');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

/**
 * 상품 정보로 모달 콘텐츠 HTML 생성
 * @param {Object} product - 상품 객체
 * @returns {string} HTML 문자열
 */
function generateModalContent(product) {
  let html = '';

  // 카테고리별 다른 레이아웃
  if (product.category === 'custom') {
    // 프로그램 구축
    if (product.whyWebApp) {
      html += `
        <p class="mb-4"><strong>[왜 웹앱인가요?]</strong></p>
        <p class="mb-4 text-sm">${product.whyWebApp}</p>
      `;
    }
    html += `
      <p class="mb-4"><strong>[주요 기능]</strong></p>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-sm">
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
    if (product.note) {
      html += `<p>${product.note}</p>`;
    }

  } else if (product.category === 'template') {
    // 템플릿
    html += `
      <p class="mb-4">${product.description}</p>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-sm">
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
    if (product.note) {
      html += `<p class="text-xs text-gray-400">${product.note}</p>`;
    }
    // 가격 옵션 테이블
    if (product.options) {
      html += `
        <div class="mt-6 pt-4 border-t border-gray-100">
          <p class="font-bold mb-3">가격 옵션</p>
          <div class="space-y-2">
            ${Object.entries(product.options).map(([key, opt]) => `
              <a href="payment.html?product=${product.id}&option=${key}"
                 class="flex justify-between items-center text-sm py-3 px-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition group ${opt.price === null ? 'pointer-events-none opacity-60' : ''}">
                <div>
                  <span class="font-medium text-gray-900">${opt.name}</span>
                  <span class="text-gray-500 ml-2">${opt.desc}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-blue-600">${formatPrice(opt.price)}</span>
                  ${opt.price !== null ? '<svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>' : ''}
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

  } else if (product.category === 'consulting') {
    // 컨설팅
    html += `
      <p class="mb-4"><strong>[진행 과정]</strong></p>
      <ol class="list-decimal pl-5 space-y-2 mb-4 text-sm">
        ${product.process.map(p => `<li>${p}</li>`).join('')}
      </ol>
      <p class="text-blue-600 font-bold">"${product.tagline}"</p>
    `;
    if (product.note) {
      html += `<p class="mt-4 text-xs text-gray-500">${product.note}</p>`;
    }
    // 컨설팅 결제 버튼
    if (product.price) {
      html += `
        <div class="mt-6 pt-4 border-t border-gray-100">
          <a href="payment.html?product=${product.id}"
             class="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition">
            ${formatPrice(product.price)} 결제하기
          </a>
        </div>
      `;
    }
  }

  return html;
}

// ==========================================
// 3. Mobile Menu
// ==========================================

/**
 * 모바일 메뉴 토글
 */
function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
}

// ==========================================
// 4. Smooth Scroll (for anchor links)
// ==========================================

/**
 * 부드러운 스크롤 네비게이션
 * @param {string} targetId - 대상 섹션 ID
 */
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    // 모바일 메뉴 닫기
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  }
}

// ==========================================
// 5. Event Listeners
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 모바일 메뉴 버튼 클릭
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // 모달 배경 클릭 시 닫기
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 모바일 메뉴 링크 클릭 시 메뉴 닫기
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
});

// ==========================================
// 6. Navbar Scroll Effect (Optional)
// ==========================================

let lastScrollY = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // 네비게이션 그림자 효과
  if (nav) {
    if (currentScrollY > 10) {
      nav.classList.add('shadow-md');
    } else {
      nav.classList.remove('shadow-md');
    }
  }

  lastScrollY = currentScrollY;
});

// ==========================================
// 7. Scroll Animations (Intersection Observer)
// ==========================================

/**
 * 스크롤 애니메이션 초기화
 * 요소가 뷰포트에 들어올 때 'visible' 클래스 추가
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .scale-in, .slide-in-left, .slide-in-right'
  );

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// DOMContentLoaded 후 스크롤 애니메이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

// ==========================================
// 8. Utility Functions
// ==========================================

/**
 * 외부 링크 열기
 * @param {string} url - URL
 */
function openExternalLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * 클립보드에 텍스트 복사
 * @param {string} text - 복사할 텍스트
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert('복사되었습니다!');
  } catch (err) {
    console.error('복사 실패:', err);
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('복사되었습니다!');
  }
}

// ==========================================
// 9. Typing Animation
// ==========================================

/**
 * Hero 섹션 타이핑 애니메이션
 */
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = ["가장 우아한", "비용 걱정 없는", "익숙하고 강력한", "본질에 집중하는"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 100 : 200);
    }
  }

  type();
}

// DOMContentLoaded 후 타이핑 애니메이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initCarousels();
});

// ==========================================
// 10. Carousel System
// ==========================================

/**
 * 캐러셀 시스템 초기화
 * 자동 슬라이드, 터치/스와이프 지원, 호버 시 일시정지
 */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(container => {
    const carousel = new Carousel(container);
    carousel.init();
  });
}

class Carousel {
  constructor(container) {
    this.container = container;
    this.viewport = container.querySelector('.carousel-viewport');
    this.track = container.querySelector('.carousel-track');
    this.items = container.querySelectorAll('.carousel-item');
    this.prevBtn = container.querySelector('.carousel-prev');
    this.nextBtn = container.querySelector('.carousel-next');
    this.indicatorsContainer = container.querySelector('.carousel-indicators');

    this.currentIndex = 0;
    this.itemsToShow = 2;
    this.autoplayInterval = null;
    this.autoplayDelay = 4000;
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  init() {
    if (!this.track || this.items.length === 0) return;

    this.updateItemsToShow();
    this.createIndicators();
    this.bindEvents();
    this.startAutoplay();
    this.updateButtons();
  }

  updateItemsToShow() {
    this.itemsToShow = window.innerWidth < 768 ? 1 : 2;
  }

  createIndicators() {
    if (!this.indicatorsContainer) return;

    const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
    this.indicatorsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `슬라이드 ${i + 1}로 이동`);
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    this.container.addEventListener('focusin', () => this.pause());
    this.container.addEventListener('focusout', () => this.resume());

    this.viewport.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.viewport.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateItemsToShow();
        this.createIndicators();
        this.goToSlide(0);
      }, 200);
    });

    this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
      this.prev();
    } else if (e.key === 'ArrowRight') {
      this.next();
    }
  }

  prev() {
    const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
    this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
    this.updateCarousel();
  }

  next() {
    const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
    this.currentIndex = (this.currentIndex + 1) % totalSlides;
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    if (window.innerWidth < 768) {
      return;
    }

    const gap = parseInt(getComputedStyle(this.track).gap) || 32;
    const itemWidth = this.items[0].offsetWidth;
    const offset = this.currentIndex * (itemWidth * this.itemsToShow + gap * this.itemsToShow);

    this.track.style.transform = `translateX(-${offset}px)`;

    this.updateIndicators();
    this.updateButtons();
  }

  updateIndicators() {
    const indicators = this.indicatorsContainer?.querySelectorAll('.carousel-indicator');
    if (!indicators) return;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }

  updateButtons() {
    const totalSlides = Math.ceil(this.items.length / this.itemsToShow);

    if (this.prevBtn) {
      this.prevBtn.disabled = false;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = false;
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }
}
