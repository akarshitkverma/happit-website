/* =============================================
   HAPPIT — Main JS (homepage interactions)
   ============================================= */

/* ── Scroll animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Product carousel ── */
function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prev  = document.getElementById(prevId);
  const next  = document.getElementById(nextId);
  if (!track) return;

  let idx = 0;
  const getVisible = () => window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const cardWidth  = () => track.children[0]?.offsetWidth + 24 || 340;
  const maxIdx     = () => Math.max(0, track.children.length - getVisible());

  function goTo(n) {
    idx = Math.max(0, Math.min(n, maxIdx()));
    track.style.transform = `translateX(-${idx * cardWidth()}px)`;
  }

  if (prev) prev.addEventListener('click', () => goTo(idx - 1));
  if (next) next.addEventListener('click', () => goTo(idx + 1));

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
  track.addEventListener('touchend',   e => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) goTo(idx + (dx > 0 ? 1 : -1));
  });
}

/* ── Star rating average display ── */
function renderStars(rating, container) {
  if (!container) return;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<span class="star full">★</span>';
    else if (i === full && half) html += '<span class="star half">½</span>';
    else html += '<span class="star empty">☆</span>';
  }
  container.innerHTML = html;
}

/* ── Newsletter subscription ── */
function initNewsletter(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type=email]');
    const btn   = form.querySelector('button');
    if (!input || !input.value.includes('@')) return;
    btn.textContent = '🎉 Subscribed!';
    btn.style.background = '#2D8C70';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe ✨'; btn.style.background = ''; }, 4000);
  });
}

/* ── Floating background shapes ── */
function createBgShapes(containerId, count = 6) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const colors = ['#FDDDD6','#D4F0E8','#EDE7F9','#FFF3CC','#D9EEFF'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 60 + Math.random() * 160;
    el.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      background:${colors[i % colors.length]};
      opacity:${0.3 + Math.random() * 0.3};
      top:${Math.random() * 90}%; left:${Math.random() * 90}%;
      animation: float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * -4}s infinite;
    `;
    c.appendChild(el);
  }
}

/* ── Lazy image shimmer ── */
document.querySelectorAll('img[data-src]').forEach(img => {
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      io.disconnect();
    }
  });
  io.observe(img);
});

/* ── Init on load ── */
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('productTrack', 'prodPrev', 'prodNext');
  initNewsletter('nlForm');
  createBgShapes('bgShapes');
});
