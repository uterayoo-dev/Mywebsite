// Uter Ayoo Portfolio - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
    });

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 16 + 'px';
            follower.style.top = e.clientY - 16 + 'px';
        }, 50);
    });

    // Cursor scale on hover
    const interactiveElements = document.querySelectorAll('a, button, .project-card-large, .skill-group');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.background = 'rgba(59, 130, 246, 0.2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#3b82f6';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = '#3b82f6';
        });
    });

    // 3. Scroll Progress Bar
    window.onscroll = function() { updateProgressBar() };

    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
        
        // Navbar scroll effect
        const nav = document.getElementById('main-nav');
        if (winScroll > 50) {
            nav.style.top = '10px';
            nav.style.width = '95%';
            nav.style.background = 'rgba(2, 6, 23, 0.95)';
        } else {
            nav.style.top = '20px';
            nav.style.width = '90%';
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    }

    // 4. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Game Focus Helper
    // Prevent arrow keys from scrolling the page when playing the game
    const gameIframe = document.getElementById('game-iframe');
    window.addEventListener("keydown", function(e) {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            // Only prevent if the mouse is over the game area or if it was recently clicked
            const rect = document.getElementById('game').getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Check if user is near the game section
                // We don't preventDefault globally to allow normal scrolling elsewhere
            }
        }
    }, false);

    // 6. Typing Effect for Hero Subtitle (Optional enhancement)
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.innerText;
    subtitle.innerText = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a small delay
    setTimeout(typeWriter, 1000);

    console.log("Uter Ayoo Portfolio - Systems Operational.");
});
