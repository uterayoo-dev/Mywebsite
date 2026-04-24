// ===== PLAYLIST =====
const playlist = [
  { title: "Chill Vibes",    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Late Night Drive", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Galaxy Dreams",  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Midnight Flow",  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Ocean Breeze",   src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Summer Haze",    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

const audio       = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicBars   = document.getElementById("musicBars");
const trackName   = document.getElementById("music-track-name");
const prevBtn     = document.getElementById("prevTrack");
const nextBtn     = document.getElementById("nextTrack");

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackName.textContent = track.title;
  if (isPlaying) audio.play().catch(() => {});
}

function playPause() {
  if (isPlaying) {
    audio.pause();
    musicToggle.innerHTML = "&#9654; Play";
    musicBars.classList.add("paused");
    isPlaying = false;
  } else {
    audio.play().then(() => {
      musicToggle.innerHTML = "&#9646;&#9646; Pause";
      musicBars.classList.remove("paused");
      isPlaying = true;
    }).catch(() => alert("Click Play to start the music!"));
  }
}

musicToggle.addEventListener("click", playPause);
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  if (!isPlaying) {
    isPlaying = true;
    musicToggle.innerHTML = "&#9646;&#9646; Pause";
    musicBars.classList.remove("paused");
  }
});
loadTrack(0);


// ===== TYPING ANIMATION =====
const nameText = "Uter Ayoo";
let charIndex = 0;
const typedEl = document.getElementById("typedName");
function typeWriter() {
  if (charIndex < nameText.length) {
    typedEl.textContent += nameText[charIndex];
    charIndex++;
    setTimeout(typeWriter, 120);
  }
}
window.addEventListener("load", () => setTimeout(typeWriter, 400));


// ===== FLOATING PARTICLES =====
const particleContainer = document.getElementById("particles");
const colors = ["#7c3aed","#ec4899","#06b6d4","#f59e0b","#3b82f6","#c084fc"];
function createParticle() {
  const p = document.createElement("div");
  p.classList.add("particle");
  const size = Math.random() * 6 + 2;
  p.style.width  = size + "px";
  p.style.height = size + "px";
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = (Math.random() * 15 + 10) + "s";
  p.style.animationDelay    = (Math.random() * 10) + "s";
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 25000);
}
setInterval(createParticle, 400);
for (let i = 0; i < 20; i++) createParticle();


// ===== SCROLL REVEAL + SKILL BARS =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".skill-fill").forEach(fill => {
        const width = fill.getAttribute("data-width");
        setTimeout(() => { fill.style.width = width + "%"; }, 200);
      });
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));


// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 80
    ? "0 4px 30px rgba(124,58,237,0.3)"
    : "none";
});


// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    const active = link.getAttribute("href") === "#" + current;
    link.style.color      = active ? "#c084fc" : "";
    link.style.background = active ? "rgba(124,58,237,0.2)" : "";
  });
});


// ===== ROCKET SHOOTER GAME =====
const canvas   = document.getElementById("game-canvas");
const ctx      = canvas.getContext("2d");
const startBtn = document.getElementById("start-btn");
const scoreEl  = document.getElementById("score");
const timeEl   = document.getElementById("time");
const livesEl  = document.getElementById("lives");
const gameMsg  = document.getElementById("game-msg");

let gameRunning = false;
let score = 0, timeLeft = 30, lives = 3;
let gameTimer = null, spawnInterval = null, animFrame = null;

let rocket    = { x: 0, y: 0, angle: 0 };
let mouseX    = 0, mouseY = 0;
let bullets   = [];
let asteroids = [];
let particles2 = [];
let bgStars   = [];

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width || 700;
  canvas.height = 340;
}

function initStars() {
  bgStars = [];
  for (let i = 0; i < 80; i++) {
    bgStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3
    });
  }
}

function spawnAsteroid() {
  const side = Math.floor(Math.random() * 4);
  let x, y, vx, vy;
  const speed = 1.2 + Math.random() * 2;
  if (side === 0) {
    x = Math.random() * canvas.width; y = -20;
    vx = (Math.random() - 0.5) * 2; vy = speed;
  } else if (side === 1) {
    x = canvas.width + 20; y = Math.random() * canvas.height;
    vx = -speed; vy = (Math.random() - 0.5) * 2;
  } else if (side === 2) {
    x = Math.random() * canvas.width; y = canvas.height + 20;
    vx = (Math.random() - 0.5) * 2; vy = -speed;
  } else {
    x = -20; y = Math.random() * canvas.height;
    vx = speed; vy = (Math.random() - 0.5) * 2;
  }
  const size     = 18 + Math.random() * 22;
  const rot      = Math.random() * Math.PI * 2;
  const rotSpeed = (Math.random() - 0.5) * 0.06;
  const hue      = Math.floor(Math.random() * 60) + 10;
  asteroids.push({ x, y, vx, vy, size, rot, rotSpeed, hue, hp: size > 30 ? 2 : 1 });
}

function spawnExplosion(x, y, hue) {
  for (let i = 0; i < 18; i++) {
    const angle = (Math.PI * 2 / 18) * i + Math.random() * 0.3;
    const speed = Math.random() * 3 + 1;
    particles2.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      hue
    });
  }
}

function drawBackground() {
  ctx.fillStyle = "rgba(5,2,18,0.95)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bgStars.forEach(s => {
    ctx.save();
    ctx.globalAlpha = s.alpha * (0.7 + Math.sin(Date.now() * 0.002 + s.x) * 0.3);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawRocket(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);

  // Flame
  const flameGrad = ctx.createLinearGradient(0, 16, 0, 32);
  flameGrad.addColorStop(0, "rgba(255,150,50,0.9)");
  flameGrad.addColorStop(1, "rgba(255,50,0,0)");
  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.moveTo(-5, 18);
  ctx.lineTo(0, 28 + Math.random() * 6);
  ctx.lineTo(5, 18);
  ctx.closePath();
  ctx.fill();

  // Body
  const bodyGrad = ctx.createLinearGradient(-8, -18, 8, 18);
  bodyGrad.addColorStop(0, "#c084fc");
  bodyGrad.addColorStop(0.5, "#7c3aed");
  bodyGrad.addColorStop(1, "#4c1d95");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(8, 10);
  ctx.lineTo(0, 16);
  ctx.lineTo(-8, 10);
  ctx.closePath();
  ctx.fill();

  // Window
  ctx.fillStyle = "#67e8f9";
  ctx.beginPath();
  ctx.arc(0, -4, 4, 0, Math.PI * 2);
  ctx.fill();

  // Outline glow
  ctx.shadowColor = "#a78bfa";
  ctx.shadowBlur  = 14;
  ctx.strokeStyle = "#c084fc";
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(8, 10);
  ctx.lineTo(0, 16);
  ctx.lineTo(-8, 10);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

function drawAsteroid(a) {
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rot);

  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, a.size);
  grad.addColorStop(0, `hsl(${a.hue},60%,55%)`);
  grad.addColorStop(1, `hsl(${a.hue},40%,25%)`);
  ctx.fillStyle   = grad;
  ctx.strokeStyle = `hsl(${a.hue},50%,70%)`;
  ctx.lineWidth   = 1.5;
  ctx.shadowColor = `hsl(${a.hue},80%,60%)`;
  ctx.shadowBlur  = 8;

  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const ang = (Math.PI * 2 / 8) * i;
    const r   = a.size * (0.75 + Math.sin(i * 3.7) * 0.25);
    if (i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
    else         ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBullet(b) {
  ctx.save();
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur  = 12;
  const grad = ctx.createLinearGradient(b.x, b.y - 8, b.x, b.y + 8);
  grad.addColorStop(0, "#f472b6");
  grad.addColorStop(1, "#7c3aed");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(b.x, b.y, 3, 7, b.angle, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCrosshair(x, y) {
  ctx.save();
  ctx.strokeStyle = "rgba(192,132,252,0.7)";
  ctx.lineWidth   = 1.5;
  ctx.shadowColor = "#c084fc";
  ctx.shadowBlur  = 8;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 18, y); ctx.lineTo(x - 14, y);
  ctx.moveTo(x + 14, y); ctx.lineTo(x + 18, y);
  ctx.moveTo(x, y - 18); ctx.lineTo(x, y - 14);
  ctx.moveTo(x, y + 14); ctx.lineTo(x, y + 18);
  ctx.stroke();
  ctx.restore();
}

function gameLoop() {
  if (!gameRunning) return;

  drawBackground();

  // Rocket stays at bottom center and aims at mouse
  rocket.x = canvas.width / 2;
  rocket.y = canvas.height - 40;
  rocket.angle = Math.atan2(mouseY - rocket.y, mouseX - rocket.x);
  drawRocket(rocket.x, rocket.y, rocket.angle);

  drawCrosshair(mouseX, mouseY);

  // Move and draw bullets; remove off-screen
  bullets = bullets.filter(b =>
    b.x > -10 && b.x < canvas.width + 10 &&
    b.y > -10 && b.y < canvas.height + 10
  );
  bullets.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    drawBullet(b);
  });

  // Move and draw asteroids
  asteroids.forEach(a => {
    a.x += a.vx;
    a.y += a.vy;
    a.rot += a.rotSpeed;
    drawAsteroid(a);
  });

  // Bullet vs asteroid collision
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    for (let ai = asteroids.length - 1; ai >= 0; ai--) {
      const b  = bullets[bi];
      const a  = asteroids[ai];
      if (!b || !a) continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      if (Math.sqrt(dx * dx + dy * dy) < a.size * 0.85) {
        spawnExplosion(a.x, a.y, a.hue);
        bullets.splice(bi, 1);
        a.hp--;
        if (a.hp <= 0) {
          asteroids.splice(ai, 1);
          score++;
          scoreEl.textContent = score;
        }
        break;
      }
    }
  }

  // Asteroids that escape cost a life
  const margin = 80;
  const escaped = asteroids.filter(a =>
    a.x < -margin || a.x > canvas.width + margin ||
    a.y < -margin || a.y > canvas.height + margin
  );
  if (escaped.length > 0) {
    asteroids = asteroids.filter(a =>
      !(a.x < -margin || a.x > canvas.width + margin ||
        a.y < -margin || a.y > canvas.height + margin)
    );
    lives = Math.max(0, lives - escaped.length);
    livesEl.textContent = lives;
    if (lives <= 0) { endGame(); return; }
  }

  // Update and draw explosion particles
  particles2.forEach(p => {
    p.x   += p.vx;
    p.y   += p.vy;
    p.vx  *= 0.92;
    p.vy  *= 0.92;
    p.life -= 0.035;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle   = `hsl(${p.hue},90%,60%)`;
    ctx.shadowColor = `hsl(${p.hue},90%,60%)`;
    ctx.shadowBlur  = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  particles2 = particles2.filter(p => p.life > 0);

  animFrame = requestAnimationFrame(gameLoop);
}

function startGame() {
  if (gameRunning) return;
  resizeCanvas();
  initStars();
  score = 0; timeLeft = 30; lives = 3;
  scoreEl.textContent = "0";
  timeEl.textContent  = "30";
  livesEl.textContent = "3";
  bullets    = [];
  asteroids  = [];
  particles2 = [];
  gameRunning = true;
  gameMsg.textContent = "";
  startBtn.textContent = "Playing...";
  startBtn.disabled = true;

  spawnInterval = setInterval(() => {
    if (!gameRunning) { clearInterval(spawnInterval); return; }
    spawnAsteroid();
    if (Math.random() < 0.3) spawnAsteroid();
  }, 900);

  gameTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  gameLoop();
}

function endGame() {
  gameRunning = false;
  clearInterval(gameTimer);
  clearInterval(spawnInterval);
  cancelAnimationFrame(animFrame);
  startBtn.textContent = "Play Again 🚀";
  startBtn.disabled = false;

  const msg =
    score >= 30 ? "Incredible! Ace Pilot! 🌟" :
    score >= 20 ? "Amazing! You're a star! ⭐" :
    score >= 12 ? "Great job, Uter! 🚀" :
    score >= 6  ? "Nice try! Keep shooting! 🎯" :
                  "Practice makes perfect! 💫";

  gameMsg.innerHTML = `<span style="color:#c084fc;">Game Over! · Score: ${score}</span><br>
    <span style="font-size:0.85rem;color:#94a3b8;">${msg}</span>`;

  drawBackground();
  ctx.save();
  ctx.fillStyle   = "#c084fc";
  ctx.font        = "bold 28px Orbitron, monospace";
  ctx.textAlign   = "center";
  ctx.shadowColor = "#c084fc";
  ctx.shadowBlur  = 24;
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 16);
  ctx.font        = "18px Poppins, sans-serif";
  ctx.fillStyle   = "#f472b6";
  ctx.shadowColor = "#f472b6";
  ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
  ctx.restore();
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = (e.clientX - rect.left) * (canvas.width  / rect.width);
  mouseY = (e.clientY - rect.top)  * (canvas.height / rect.height);
});

canvas.addEventListener("click", () => {
  if (!gameRunning) return;
  const angle = rocket.angle;
  const speed = 14;
  bullets.push({
    x: rocket.x + Math.cos(angle) * 22,
    y: rocket.y + Math.sin(angle) * 22,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle
  });
});

startBtn.addEventListener("click", startGame);
window.addEventListener("resize", () => { if (!gameRunning) resizeCanvas(); });
resizeCanvas();
initStars();
drawBackground();