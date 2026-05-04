/* =============================================
   HAPPIT — Hero Mini Game: Catch the Toys!
   ============================================= */

(function () {
  const TOYS   = ['🧸','🎨','🧩','🪀','🎲','🎯','⭐','🌈','🎪','🎠','🏀','🎭'];
  const BW     = 72;

  let score=0, lives=3, combo=0, gameActive=false;
  let falling=[], raf=null, lastSpawn=0, spawnInterval=1400;
  let basketX=0, targetX=0;

  const canvas   = document.getElementById('gameCanvas');
  const basket   = document.getElementById('gameBasket');
  const scoreEl  = document.getElementById('gameScore');
  const livesEl  = document.getElementById('gameLives');
  const startScr = document.getElementById('gameStart');
  const cursorDot= document.getElementById('gameCursor');

  if (!canvas) return; // not on homepage

  function W() { return canvas.offsetWidth; }
  function H() { return canvas.offsetHeight; }

  function renderLives() {
    if (!livesEl) return;
    livesEl.innerHTML = [0,1,2].map(i => `<span style="font-size:18px">${i < lives ? '❤️' : '🩶'}</span>`).join('');
  }

  function spawn() {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;font-size:30px;user-select:none;pointer-events:none;
      filter:drop-shadow(0 3px 6px rgba(0,0,0,.10));
      animation:toyWiggle ${1.2 + Math.random()}s ease-in-out infinite alternate;`;
    el.textContent = TOYS[Math.floor(Math.random() * TOYS.length)];
    const x = Math.random() * (W() - 44) + 4;
    el.style.left = x + 'px';
    el.style.top  = '-44px';
    canvas.appendChild(el);
    const speed = 1.6 + Math.random() * 1.6 + (score / 100) * 0.5;
    falling.push({ el, x, y: -44, speed, caught: false });
  }

  function burst(x, y) {
    ['✨','⭐','🌟','💛','🎉'].forEach((em, i) => {
      const p = document.createElement('div');
      const dx = (Math.random() - 0.5) * 90;
      const dy = -(Math.random() * 80 + 20);
      p.style.cssText = `position:absolute;font-size:18px;pointer-events:none;
        left:${x}px;top:${y}px;
        animation:burstPop 0.75s ease-out forwards;
        --dx:${dx}px;--dy:${dy}px;`;
      p.textContent = em;
      canvas.appendChild(p);
      setTimeout(() => p.remove(), 800);
    });
  }

  function showCombo() {
    document.querySelector('.game-combo')?.remove();
    if (combo < 2) return;
    const b = document.createElement('div');
    b.className = 'game-combo';
    b.style.cssText = `position:absolute;top:44px;left:50%;transform:translateX(-50%);
      background:#F4735A;color:white;border-radius:50px;padding:5px 18px;
      font-weight:900;font-size:15px;z-index:10;white-space:nowrap;
      animation:comboBadge 0.9s ease-out forwards;
      font-family:'Baloo 2',cursive;`;
    const msg = combo >= 6 ? `🔥 x${combo} LEGENDARY!` : combo >= 4 ? `⚡ x${combo} On Fire!` : `✨ x${combo} Combo!`;
    b.textContent = msg;
    canvas.appendChild(b);
    setTimeout(() => b.remove(), 950);
  }

  function flashMiss() {
    const f = document.createElement('div');
    f.style.cssText = `position:absolute;inset:0;background:rgba(220,50,50,.12);
      pointer-events:none;animation:missFlash .4s ease-out forwards;border-radius:inherit;`;
    canvas.appendChild(f);
    setTimeout(() => f.remove(), 450);
  }

  function endGame() {
    gameActive = false;
    cancelAnimationFrame(raf);
    falling.forEach(f => f.el.remove());
    falling = [];

    const grade = score >= 150 ? { e:'🏆', t:'Champion!', sub:'You\'re a toy-catching legend!' }
                : score >= 80  ? { e:'🌟', t:'Superstar!', sub:'The kids would be impressed!' }
                :                { e:'🧸', t:'Nice try!',  sub:'Happit toys make real play this fun!' };

    const end = document.createElement('div');
    end.id = 'gameEnd';
    end.style.cssText = `position:absolute;inset:0;display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:12px;
      background:rgba(255,250,248,.96);z-index:20;border-radius:inherit;
      text-align:center;padding:24px;`;
    end.innerHTML = `
      <div style="font-size:64px;animation:floatAnim 2s ease-in-out infinite">${grade.e}</div>
      <div style="font-family:'Baloo 2',cursive;font-size:26px;font-weight:800;color:#2D2318">${grade.t}</div>
      <div style="font-size:22px;font-weight:900;color:#F4735A;font-family:'Baloo 2',cursive">${score} pts</div>
      <p style="font-size:13px;color:#7B5A48;max-width:210px;line-height:1.5">${grade.sub}</p>
      <button onclick="window.happitGame.start()" style="
        background:#F4735A;color:white;border:none;
        padding:13px 28px;border-radius:50px;
        font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;
        cursor:pointer;box-shadow:0 6px 20px rgba(244,115,90,.35);
        transition:all .2s;margin-top:4px">
        Play Again 🎮
      </button>
      <a href="https://www.amazon.in/s?k=happit" target="_blank" rel="noopener"
        style="font-size:13px;color:#F4735A;font-weight:800;text-decoration:none;
        border:2px solid #F4735A;padding:8px 18px;border-radius:50px;transition:all .2s">
        Shop Real Toys 🛒
      </a>`;
    canvas.appendChild(end);
  }

  function loop(ts) {
    if (!gameActive) return;
    raf = requestAnimationFrame(loop);

    basketX += (targetX - basketX) * 0.16;
    const clampedX = Math.max(0, Math.min(W() - BW, basketX));
    basket.style.left = clampedX + 'px';

    if (ts - lastSpawn > spawnInterval) {
      spawn();
      lastSpawn = ts;
      spawnInterval = Math.max(550, spawnInterval - 14);
    }

    const bTop = H() - 56, bRight = clampedX + BW;

    for (let i = falling.length - 1; i >= 0; i--) {
      const f = falling[i];
      f.y += f.speed;
      f.el.style.top = f.y + 'px';

      if (!f.caught && f.y + 32 >= bTop && f.x + 24 >= clampedX && f.x <= bRight) {
        f.caught = true;
        f.el.remove();
        falling.splice(i, 1);
        combo++;
        const pts = combo >= 4 ? 20 : combo >= 2 ? 14 : 10;
        score += pts;
        scoreEl.textContent = score + ' pts';
        burst(f.x + 15, bTop);
        showCombo();
        basket.style.transform = 'scale(1.18)';
        setTimeout(() => { basket.style.transform = ''; }, 180);
        continue;
      }

      if (f.y > H() + 10) {
        f.el.remove();
        falling.splice(i, 1);
        lives--;
        combo = 0;
        renderLives();
        flashMiss();
        basket.style.animation = 'basketShake 0.4s ease';
        setTimeout(() => { basket.style.animation = ''; }, 420);
        if (lives <= 0) { endGame(); return; }
      }
    }
  }

  // ── Controls ──
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    targetX = mx - BW / 2;
    if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = (e.clientY - r.top) + 'px'; cursorDot.style.display = 'block'; }
  });
  canvas.addEventListener('mouseleave', () => { if (cursorDot) cursorDot.style.display = 'none'; });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    targetX = e.touches[0].clientX - r.left - BW / 2;
  }, { passive: false });

  // ── Public API ──
  window.happitGame = {
    start() {
      document.getElementById('gameEnd')?.remove();
      if (startScr) startScr.style.display = 'none';
      score = 0; lives = 3; combo = 0;
      spawnInterval = 1400; lastSpawn = 0; falling = [];
      basketX = targetX = W() / 2 - BW / 2;
      scoreEl.textContent = '0 pts';
      renderLives();
      gameActive = true;
      raf = requestAnimationFrame(loop);
    }
  };

  // Inject animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toyWiggle { 0%{transform:rotate(-8deg)} 100%{transform:rotate(8deg)} }
    @keyframes burstPop  { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
    @keyframes comboBadge{ 0%{opacity:0;transform:translateX(-50%) scale(.7)} 30%{opacity:1;transform:translateX(-50%) scale(1.1)} 70%{opacity:1;transform:translateX(-50%) scale(1) translateY(-4px)} 100%{opacity:0;transform:translateX(-50%) scale(.85) translateY(-18px)} }
    @keyframes missFlash  { 0%{opacity:1} 100%{opacity:0} }
    @keyframes basketShake{ 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
    @keyframes floatAnim  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    #gameCanvas { cursor:none; }
  `;
  document.head.appendChild(style);
})();
