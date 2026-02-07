// GSAP Animations
gsap.registerPlugin();

// Hero Section entrance
gsap.from(".hero h1", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
gsap.from(".hero p", { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });

// Sections Scroll Trigger (simple fade in)
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(50px)";
    observer.observe(sec);
});

// Button hovers
document.querySelectorAll('.action-btn, .character-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, rotation: Math.random() * 5 - 2.5, duration: 0.2 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, rotation: 0, duration: 0.2 });
    });
});

// Background "Broken Heart" Rain - Canvas Animation
const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
const particleCount = 30;

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * height; // Start randomly on screen initially
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 20 + 10;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.text = Math.random() > 0.5 ? "💔" : "🥀";
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();


// Countdown Logic
const countdown = document.getElementById("countdown");
if (countdown) {
    const countdownDate = new Date("Feb 14, 2026 00:00:00").getTime();
    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            countdown.innerHTML = "<h2>Valentine's Day is here. Run.</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
        const hEl = document.getElementById("hours");
        if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
        const mEl = document.getElementById("minutes");
        if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        const sEl = document.getElementById("seconds");
        if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
}

// Character Selection Logic
const characters = {
    "single": "Your wallet is full, but your messages are empty. Enjoy the peace.",
    "situationship": "It's complicated? No, they just don't like you enough. Interpret that.",
    "forced": "Blink twice if you need help. We know you'd rather be gaming.",
    "exam": "Love is temporary. GPA is forever (until you fail)."
};

const buttons = document.querySelectorAll('.character-btn');
if (buttons.length > 0) {
    const statusText = document.getElementById('status-text');
    const adviceText = document.getElementById('ai-advice');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const charType = btn.getAttribute('data-char');
            statusText.innerText = btn.innerText;

            // Typewriter effect for advice
            const text = characters[charType];
            adviceText.innerText = "";
            let i = 0;

            if (window.typeWriterInterval) clearInterval(window.typeWriterInterval);

            window.typeWriterInterval = setInterval(() => {
                if (i < text.length) {
                    adviceText.innerText += text.charAt(i);
                    i++;
                } else {
                    clearInterval(window.typeWriterInterval);
                }
            }, 30);

            document.getElementById('character-status').classList.remove('hidden');
            gsap.from("#character-status", { duration: 0.5, scale: 0.8, opacity: 0, ease: "back.out(1.7)" });
        });
    });
}

// Rose Day Generator
function generateRose() {
    const roses = [
        "🌹 A NFT rose. It’s worth nothing now.",
        "🥀 A dead rose. It represents my faith in humanity.",
        "🥦 A broccoli bouquet. At least it's healthy.",
        "💐 A screenshot of a rose. Eco-friendly cheapskate."
    ];
    const result = roses[Math.floor(Math.random() * roses.length)];
    const resultBox = document.getElementById('rose-result');
    if (resultBox) {
        resultBox.innerText = result;
        resultBox.classList.remove('hidden');
        gsap.from(resultBox, { duration: 0.5, y: -10, opacity: 0, ease: "power2.out" });
    }
}

// Propose Day Generator
function draftProposal() {
    const proposals = [
        "I’m not saying I love you, but I’d pause my game for you. Briefly.",
        "Let's date until one of us realizes this was a trauma response.",
        "You're annoying, but in a way I can spiritually tolerate.",
        "Be my Valentine? I need someone to split the bill with."
    ];
    const result = proposals[Math.floor(Math.random() * proposals.length)];
    const resultBox = document.getElementById('proposal-result');
    if (resultBox) {
        resultBox.innerText = result;
        resultBox.classList.remove('hidden');
        gsap.from(resultBox, { duration: 0.5, y: -10, opacity: 0, ease: "power2.out" });
    }
}

// Chocolate Day Tracker
const chocoInput = document.getElementById('choco-count');
if (chocoInput) {
    chocoInput.addEventListener('input', function (e) {
        const count = e.target.value;
        const problems = count * 2.5;
        const resultSpan = document.getElementById('choco-result');
        resultSpan.innerText = `Problems ignored: ${Math.floor(problems)}`;

        if (count > 5) {
            gsap.to(resultSpan, { x: 5, duration: 0.1, yoyo: true, repeat: 5 });
        }
    });
}

// Runaway Button
const btn = document.getElementById('runaway-btn');
if (btn) {
    btn.addEventListener('mouseenter', () => {
        const x = Math.random() * (window.innerWidth - btn.offsetWidth);
        const y = Math.random() * (window.innerHeight - btn.offsetHeight);
        // Ensure it stays fixed relative to viewport
        btn.style.position = 'fixed';
        gsap.to(btn, { top: y, left: x, duration: 0.3, ease: "power2.out" });
        showToast("Nice try. Commitment is elusive.");
    });
}

// Toast System
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        gsap.to(toast, { opacity: 0, x: 100, duration: 0.5, onComplete: () => toast.remove() });
    }, 3000);
}

// Couple Filter
function applyCoupleFilter() {
    const fileInput = document.getElementById('couple-photo');
    const resultBox = document.getElementById('couple-result');

    resultBox.classList.remove('hidden'); // Ensure visible first
    resultBox.innerText = "Analyzing...";

    setTimeout(() => {
        if (!fileInput.files || fileInput.files.length === 0) {
            resultBox.innerHTML = "<strong>Error 404:</strong> Partner Not Found.<br>Please upload a photo first (or use a stock photo of happy people).";
            gsap.from(resultBox, { duration: 0.5, x: 10, ease: "shake" }); // Using a standard ease for now 
        } else {
            const roasts = [
                "Relationship sponsored by parental pressure and shared Netflix password.",
                "I see a lot of 'we need to talk' in your future.",
                "Cute. But I give it 3 months before one of you cheats.",
                "You look happy. It's disgusting. (Also, he's texting his ex)."
            ];
            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
            resultBox.innerHTML = `<strong>Analysis Complete:</strong><br>${randomRoast}`;
            gsap.from(resultBox, { duration: 0.5, scale: 1.2, ease: "elastic.out(1, 0.3)" });
            showToast("Ouch. The truth hurts.");
        }
    }, 1000); // Fake processing delay
}
