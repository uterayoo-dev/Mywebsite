// UTER AYOO - CYBER PREMIUM PORTFOLIO
// Pure JavaScript - No Dependencies

document.addEventListener('DOMContentLoaded', () => {
    // ===== SMOOTH SCROLL NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== PARALLAX EFFECT =====
    const profileAvatar = document.querySelector('.profile-avatar');
    
    window.addEventListener('scroll', () => {
        if (profileAvatar) {
            const scrollY = window.pageYOffset;
            profileAvatar.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });

    // ===== SKILL BARS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s ease-out';
                            bar.style.width = width;
                        }, 100);
                    });
                    skillsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }

    // ===== BUTTON HOVER EFFECTS =====
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.3)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ===== PROJECT CARD HOVER =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(0, 255, 136, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statNumbers.forEach(stat => {
                        const finalValue = stat.textContent;
                        if (finalValue.includes('+')) {
                            const num = parseInt(finalValue);
                            let current = 0;
                            const increment = Math.ceil(num / 30);
                            
                            const counter = setInterval(() => {
                                current += increment;
                                if (current >= num) {
                                    stat.textContent = num + '+';
                                    clearInterval(counter);
                                } else {
                                    stat.textContent = current;
                                }
                            }, 50);
                        }
                    });
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(aboutSection);
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You can use this for a progress bar if needed
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
    });

    // ===== TYPEWRITER EFFECT FOR HERO =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        heroTitle.innerText = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                if (originalText[charIndex] === '\n') {
                    heroTitle.innerHTML += '<br>';
                } else {
                    heroTitle.innerHTML += originalText[charIndex];
                }
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // ===== RANDOM GLOW EFFECT =====
    const titleLines = document.querySelectorAll('.title-line');
    
    setInterval(() => {
        titleLines.forEach(line => {
            const randomGlow = Math.random() * 40 + 20;
            line.style.textShadow = `0 0 ${randomGlow}px rgba(0, 255, 136, 0.5)`;
        });
    }, 2000);

    // ===== GAME SECTION FOCUS =====
    const gameFrame = document.getElementById('game-frame');
    const gameSection = document.getElementById('game');

    if (gameFrame && gameSection) {
        gameSection.addEventListener('mouseenter', () => {
            document.body.style.overflow = 'hidden';
        });

        gameSection.addEventListener('mouseleave', () => {
            document.body.style.overflow = 'auto';
        });
    }

    // ===== MOBILE MENU TOGGLE (Future Enhancement) =====
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu) {
        navMenu.style.display = 'none';
    }

    // ===== CONSOLE MESSAGE =====
    console.log('%c🚀 UTER AYOO PORTFOLIO LOADED', 'color: #00ff88; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with pure HTML, CSS, and JavaScript', 'color: #0088ff; font-size: 12px;');
    console.log('%cLet\'s build something amazing together!', 'color: #ff0088; font-size: 12px;');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}
