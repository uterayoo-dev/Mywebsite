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
const colors = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#3b82f6", "#c084fc"];

function createParticle() {
  const p = document.createElement("div");
  p.classList.add("particle");
  const size = Math.random() * 6 + 2;
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = (Math.random() * 15 + 10) + "s";
  p.style.animationDelay = (Math.random() * 10) + "s";
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 25000);
}

setInterval(createParticle, 400);
for (let i = 0; i < 20; i++) createParticle();


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      const fills = entry.target.querySelectorAll(".skill-fill");
      fills.forEach(fill => {
        const width = fill.getAttribute("data-width");
        setTimeout(() => { fill.style.width = width + "%"; }, 200);
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


// ===== MUSIC PLAYER =====
const audio = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicBars = document.querySelector(".music-bars");
let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    musicToggle.textContent = "▶ Play";
    musicBars.classList.add("paused");
    isPlaying = false;
  } else {
    audio.play().then(() => {
      musicToggle.textContent = "⏸ Pause";
      musicBars.classList.remove("paused");
      isPlaying = true;
    }).catch(() => {
      alert("Click Play to start the music!");
    });
  }
});


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.style.boxShadow = "0 4px 30px rgba(124,58,237,0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});


// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute("href") === "#" + current ? "#c084fc" : "";
    link.style.background = link.getAttribute("href") === "#" + current ? "rgba(124,58,237,0.2)" : "";
  });
});


// ===== CLICK GAME =====
const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const gameMsg = document.getElementById("game-msg");

let score = 0;
let timeLeft = 15;
let gameTimer = null;
let moveTimer = null;
let gameRunning = false;

function moveTarget() {
  const areaW = gameArea.offsetWidth - 60;
  const areaH = gameArea.offsetHeight - 60;
  const x = Math.floor(Math.random() * areaW);
  const y = Math.floor(Math.random() * areaH);
  target.style.left = x + "px";
  target.style.top = y + "px";
}

function startGame() {
  if (gameRunning) return;
  score = 0;
  timeLeft = 15;
  scoreEl.textContent = "0";
  timeEl.textContent = "15";
  gameRunning = true;
  startBtn.textContent = "⏳ Playing...";
  startBtn.disabled = true;
  gameMsg.textContent = "";
  target.style.display = "block";
  moveTarget();

  moveTimer = setInterval(moveTarget, 900);
  gameTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(gameTimer);
  clearInterval(moveTimer);
  target.style.display = "none";
  gameRunning = false;
  startBtn.textContent = "▶ Play Again";
  startBtn.disabled = false;

  let msg = "";
  if (score >= 20) msg = "🏆 Amazing! You're a legend!";
  else if (score >= 12) msg = "⭐ Great job, Uter!";
  else if (score >= 6) msg = "👍 Nice try! Keep going!";
  else msg = "💪 Practice makes perfect!";

  gameMsg.innerHTML = `<div style="color:#c084fc; font-size:1rem;">Game Over!<br>Score: ${score}<br><span style="font-size:0.85rem;color:#94a3b8;">${msg}</span></div>`;

  for (let i = 0; i < 18; i++) {
    const conf = document.createElement("div");
    conf.style.cssText = `
      position: absolute;
      width: 8px; height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      top: 50%; left: 50%;
      pointer-events: none;
      z-index: 10;
      animation: confettiBurst 1s ease-out forwards;
      --dx: ${(Math.random() - 0.5) * 200}px;
      --dy: ${(Math.random() - 0.5) * 200}px;
    `;
    gameArea.appendChild(conf);
    setTimeout(() => conf.remove(), 1100);
  }
}

target.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  scoreEl.textContent = score;
  moveTarget();
  target.style.filter = "drop-shadow(0 0 30px #fff)";
  setTimeout(() => { target.style.filter = "drop-shadow(0 0 12px rgba(236,72,153,0.8))"; }, 100);
});

startBtn.addEventListener("click", startGame);

// ===== CONFETTI ANIMATION =====
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes confettiBurst {
    0% { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);