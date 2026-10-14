// Padaria Santa Joana — interações do protótipo

document.addEventListener('DOMContentLoaded', () => {
  // Ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header muda de aparência ao rolar
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Hero: fundo em carrossel automático (loop), texto fixo por cima
  const heroSection = document.getElementById('heroCarousel');
  if (heroSection) {
    const bgSlides = Array.from(heroSection.querySelectorAll('.hero-bg-slide'));
    if (bgSlides.length > 1) {
      let current = 0;
      setInterval(() => {
        bgSlides[current].classList.remove('is-active');
        current = (current + 1) % bgSlides.length;
        bgSlides[current].classList.add('is-active');
      }, 5000);
    }
  }

  // Abas de produtos (Pães / Açaí / Almoço / Kit Festa)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.carousel[data-panel]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabButtons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      panels.forEach(p => {
        p.hidden = p.dataset.panel !== target;
      });
    });
  });

  // Setas do carrossel — cada .carousel-wrap controla o próprio carrossel
  // (produtos tem várias abas escondidas dentro do mesmo wrap; depoimentos
  // tem um único carrossel), então as setas nunca disparam o carrossel errado.
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const prevBtn = wrap.querySelector('.carousel-btn.prev');
    const nextBtn = wrap.querySelector('.carousel-btn.next');
    const scrollWrap = (dir) => {
      const active = wrap.querySelector('.carousel:not([hidden])');
      if (!active) return;
      const card = active.querySelector('.product-card, .testimonial-card');
      const gap = parseFloat(getComputedStyle(active).gap) || 22;
      const cardWidth = (card?.offsetWidth || 260) + gap;
      active.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    };
    prevBtn?.addEventListener('click', () => scrollWrap(-1));
    nextBtn?.addEventListener('click', () => scrollWrap(1));
  });
});
