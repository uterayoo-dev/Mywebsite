// ===== PLAYLIST =====
// Free royalty-free tracks that work in any browser.
// To add God's Plan, Blue by Yung Kai, Babydoll etc:
// download the MP3s, put them in the same folder,
// then replace the src values below with the filenames e.g. "gods_plan.mp3"
const playlist = [
  {
    title: "Chill Vibes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    art: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=40&h=40&fit=crop"
  },
  {
    title: "Late Night Drive",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    art: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=40&h=40&fit=crop"
  },
  {
    title: "Galaxy Dreams",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    art: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=40&h=40&fit=crop"
  },
  {
    title: "Midnight Flow",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=40&h=40&fit=crop"
  },
  {
    title: "Ocean Breeze",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    art: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=40&h=40&fit=crop"
  },
  {
    title: "Summer Haze",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    art: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=40&h=40&fit=crop"
  }
];

let currentTrack = 0;
let isPlaying = false;

const audio       = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicBars   = document.getElementById("musicBars");
const trackName   = document.getElementById("music-track-name");
const albumArt    = document.getElementById("albumArt");
const prevBtn     = document.getElementById("prevTrack");
const nextBtn     = document.getElementById("nextTrack");

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackName.textContent = track.title;
  albumArt.src = track.art;
  if (isPlaying) {
    audio.play().catch(() => {});
  }
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
    }).catch(() => {
      alert("Click Play to start the music!");
    });
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

// Auto-advance to next song when current one ends
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  if (!isPlaying) {
    isPlaying = true;
    musicToggle.innerHTML = "&#9646;&#9646; Pause";
    musicBars.classList.remove("paused");
  }
});

// Load the first track on startup
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
const colors = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#3b82f6", "#c084fc"];

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


// ===== CLICK GAME =====
const startBtn = document.getElementById("start-btn");
const scoreEl  = document.getElementById("score");
const timeEl   = document.getElementById("time");
const target   = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const gameMsg  = document.getElementById("game-msg");

let score = 0, timeLeft = 15;
let gameTimer = null, moveTimer = null, gameRunning = false;

function moveTarget() {
  const x = Math.floor(Math.random() * (gameArea.offsetWidth  - 60));
  const y = Math.floor(Math.random() * (gameArea.offsetHeight - 60));
  target.style.left = x + "px";
  target.style.top  = y + "px";
}

function startGame() {
  if (gameRunning) return;
  score = 0;
  timeLeft = 15;
  scoreEl.textContent = "0";
  timeEl.textContent  = "15";
  gameRunning = true;
  startBtn.textContent = "Playing...";
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
  startBtn.textContent = "Play Again";
  startBtn.disabled = false;

  const msg =
    score >= 20 ? "Amazing! You are a legend!" :
    score >= 12 ? "Great job, Uter!" :
    score >= 6  ? "Nice try! Keep going!" :
                  "Practice makes perfect!";

  gameMsg.innerHTML = `<div style="color:#c084fc;font-size:1rem;">
    Game Over!<br>Score: ${score}<br>
    <span style="font-size:0.85rem;color:#94a3b8;">${msg}</span>
  </div>`;

  // Confetti burst
  for (let i = 0; i < 20; i++) {
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
      --dx: ${(Math.random() - 0.5) * 220}px;
      --dy: ${(Math.random() - 0.5) * 220}px;
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
  setTimeout(() => {
    target.style.filter = "drop-shadow(0 0 12px rgba(236,72,153,0.8))";
  }, 100);
});

startBtn.addEventListener("click", startGame);


// ===== CONFETTI KEYFRAMES =====
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes confettiBurst {
    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);