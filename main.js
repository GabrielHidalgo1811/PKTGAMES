// ========== WHATSAPP ==========
const WA_NUMBER = '56972128346'; // PKT.Games

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ========== MODAL CAROUSELS ==========
let modalCarouselIntervals = {};

function startModalCarousel(id) {
  stopModalCarousel(id);
  modalCarouselIntervals[id] = setInterval(() => {
    nextModalSlide(id);
  }, 5000);
}

function stopModalCarousel(id) {
  if (modalCarouselIntervals[id]) {
    clearInterval(modalCarouselIntervals[id]);
    delete modalCarouselIntervals[id];
  }
}

function nextModalSlide(id) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.modal-carousel-slide');
  if (slides.length <= 1) return;
  
  let activeIndex = 0;
  slides.forEach((slide, i) => {
    if (slide.classList.contains('active')) activeIndex = i;
    slide.classList.remove('active');
  });
  
  const nextIndex = (activeIndex + 1) % slides.length;
  slides[nextIndex].classList.add('active');
  
  startModalCarousel(id);
}

function prevModalSlide(id) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.modal-carousel-slide');
  if (slides.length <= 1) return;
  
  let activeIndex = 0;
  slides.forEach((slide, i) => {
    if (slide.classList.contains('active')) activeIndex = i;
    slide.classList.remove('active');
  });
  
  const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  slides[prevIndex].classList.add('active');
  
  startModalCarousel(id);
}

// ========== MODALES ==========
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  const carousel = modal.querySelector('.modal-carousel-wrap');
  if (carousel) startModalCarousel(carousel.id);
  
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  
  const carousel = modal.querySelector('.modal-carousel-wrap');
  if (carousel) stopModalCarousel(carousel.id);
}

function closeModalOutside(event, id) {
  if (event.target === document.getElementById(id)) {
    closeModal(id);
  }
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      closeModal(m.id);
    });
  }
});

// Keyboard activation for module cards (Enter / Space)
document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ========== HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.module-card, .step-card, .trust-banner, .section-header');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ${i * 0.07}s ease, transform 0.55s ${i * 0.07}s ease`;
  observer.observe(el);
});

// ========== SMOOTH SCROLL (anchors) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== HERO CAROUSEL ==========
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

if (slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}
