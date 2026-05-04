/* =============================================
   HAPPIT — Shared Components (nav + footer)
   Injected via data-include on every page
   ============================================= */

const AMAZON_URL = 'https://www.amazon.in/s?k=happit'; // ← replace with real store URL

/* ── Navigation ── */
const NAV_HTML = `
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo">
      <svg width="110" height="40" viewBox="0 0 220 72" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="72" rx="36" fill="#F4735A"/>
        <text x="110" y="51" text-anchor="middle"
          font-family="'Nunito',sans-serif" font-weight="900"
          font-size="38" fill="#FFF8F5" letter-spacing="-0.5">Happit</text>
      </svg>
    </a>

    <ul class="nav-links">
      <li class="nav-dropdown">
        <a href="pages/categories.html">Toys ▾</a>
        <div class="dropdown-menu">
          <a href="pages/categories.html"><span class="d-icon">🧩</span>Puzzles</a>
          <a href="pages/categories.html"><span class="d-icon">🎨</span>Arts &amp; Crafts</a>
          <a href="pages/categories.html"><span class="d-icon">📚</span>Learning Games</a>
          <a href="pages/categories.html"><span class="d-icon">🪀</span>Sensory Toys</a>
          <a href="pages/categories.html"><span class="d-icon">🎯</span>Activity Kits</a>
        </div>
      </li>
      <li><a href="pages/about.html">About Us</a></li>
      <li><a href="pages/safety.html">Safety</a></li>
      <li><a href="pages/reviews.html">Reviews</a></li>
      <li><a href="pages/faq.html">FAQ</a></li>
      <li><a href="pages/contact.html">Contact</a></li>
    </ul>

    <div class="nav-cta-group">
      <a href="${AMAZON_URL}" class="btn btn-amazon btn-sm" target="_blank" rel="noopener">
        🛒 Shop on Amazon
      </a>
      <button class="nav-hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="mobile-menu" id="mobileMenu">
    <a href="pages/categories.html">🧩 All Toys</a>
    <a href="pages/about.html">💛 About Us</a>
    <a href="pages/safety.html">🛡️ Safety</a>
    <a href="pages/reviews.html">⭐ Reviews</a>
    <a href="pages/faq.html">❓ FAQ</a>
    <a href="pages/contact.html">📬 Contact</a>
    <div class="mob-divider"></div>
    <a href="${AMAZON_URL}" class="btn btn-amazon" target="_blank" rel="noopener">🛒 Shop on Amazon</a>
  </div>
</nav>
`;

/* ── Footer ── */
const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-top">
    <div class="footer-brand">
      <svg class="footer-logo" width="100" height="36" viewBox="0 0 220 72" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="72" rx="36" fill="#F4735A"/>
        <text x="110" y="51" text-anchor="middle"
          font-family="'Nunito',sans-serif" font-weight="900"
          font-size="38" fill="#FFF8F5" letter-spacing="-0.5">Happit</text>
      </svg>
      <p>Joyful toys that spark imagination, boost creativity, and bring big smiles to kids aged 3–7. Made with love in India.</p>
      <div class="footer-socials">
        <a class="social-link" href="#" aria-label="Instagram">📸</a>
        <a class="social-link" href="#" aria-label="Facebook">💙</a>
        <a class="social-link" href="#" aria-label="YouTube">▶️</a>
        <a class="social-link" href="#" aria-label="Pinterest">📌</a>
      </div>
      <div class="footer-trust">
        <span class="footer-trust-badge">🏅 BIS Certified</span>
        <span class="footer-trust-badge">🌿 Non-toxic</span>
        <span class="footer-trust-badge">🇮🇳 Made in India</span>
      </div>
    </div>

    <div class="footer-col">
      <h5>Shop</h5>
      <a href="${AMAZON_URL}" target="_blank">All Toys</a>
      <a href="${AMAZON_URL}" target="_blank">Puzzles</a>
      <a href="${AMAZON_URL}" target="_blank">Arts &amp; Crafts</a>
      <a href="${AMAZON_URL}" target="_blank">Learning Games</a>
      <a href="${AMAZON_URL}" target="_blank">Sensory Toys</a>
      <a href="${AMAZON_URL}" target="_blank">Activity Kits</a>
      <a href="${AMAZON_URL}" target="_blank">Gift Sets</a>
    </div>

    <div class="footer-col">
      <h5>Company</h5>
      <a href="pages/about.html">About Happit</a>
      <a href="pages/safety.html">Safety &amp; Quality</a>
      <a href="pages/reviews.html">Reviews</a>
      <a href="pages/faq.html">FAQ</a>
      <a href="pages/contact.html">Contact Us</a>
      <a href="pages/privacy.html">Privacy Policy</a>
      <a href="pages/terms.html">Terms of Service</a>
    </div>

    <div class="footer-col footer-newsletter">
      <h5>Get Play Ideas 🎉</h5>
      <p>Join 5,000+ parents for activity ideas, new toy alerts &amp; exclusive offers.</p>
      <div class="footer-nl-form">
        <input class="footer-nl-input" type="email" placeholder="your@email.com" id="footerEmail"/>
        <button class="footer-nl-btn" onclick="subscribeFooter()">Subscribe ✨</button>
      </div>
    </div>
  </div>

  <hr class="footer-divider"/>

  <div class="footer-bottom">
    <p>© 2025 Happit. All rights reserved. Sold exclusively on Amazon India.</p>
    <div class="footer-bottom-links">
      <a href="pages/privacy.html">Privacy</a>
      <a href="pages/terms.html">Terms</a>
      <a href="pages/contact.html">Contact</a>
    </div>
  </div>
</footer>
`;

/* ── Inject & Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navHolder = document.getElementById('nav-placeholder');
  if (navHolder) navHolder.innerHTML = NAV_HTML;

  // Inject footer
  const footerHolder = document.getElementById('footer-placeholder');
  if (footerHolder) footerHolder.innerHTML = FOOTER_HTML;

  // Hamburger toggle
  setTimeout(() => {
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('open');
      });
    }

    // Navbar scroll shadow
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
      });
    }

    // Active link highlight
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    links.forEach(link => {
      if (link.href && window.location.href.includes(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  }, 0);
});

function subscribeFooter() {
  const email = document.getElementById('footerEmail');
  if (email && email.value.includes('@')) {
    email.value = '';
    email.placeholder = '🎉 You\'re subscribed!';
    setTimeout(() => { email.placeholder = 'your@email.com'; }, 3000);
  }
}
