// Anti-Valentine 2026 - Unhinged Script
// Now with 100% more emotional damage.

// GSAP Registration
gsap.registerPlugin();

/* --- MOOD SWITCH LOGIC --- */
function toggleMood() {
    const isRealistic = document.getElementById('mood-switch').checked;
    const body = document.body;
    const moodLabel = document.getElementById('mood-label');

    if (isRealistic) {
        body.classList.remove('mood-romantic');
        body.classList.add('mood-realistic');
        moodLabel.innerText = "Realistic Mode 💀";
        updateTextContent('data-realistic');
        showToast("Welcome to the real world.", "toxic");
    } else {
        body.classList.remove('mood-realistic');
        body.classList.add('mood-romantic');
        moodLabel.innerText = "Romantic Mode ✨";
        updateTextContent('data-romantic');
        showToast("Delusion restored.", "romantic");
    }
}

function updateTextContent(attribute) {
    const elements = document.querySelectorAll(`[${attribute}]`);
    elements.forEach(el => {
        el.innerText = el.getAttribute(attribute);
    });
}

function triggerLove() {
    const isRealistic = document.getElementById('mood-switch').checked;
    if (isRealistic) {
        alert("Error 404: Love not found. Try lowering your standards.");
    } else {
        confettiEffect();
    }
}

function confettiEffect() {
    showToast("🎉 Yay! Enjoy your temporary serotonin! 🎉");
}

/* --- NOTIFICATION SYSTEM --- */
const notifications = {
    romantic: [
        "💖 Someone is thinking about you!",
        "✨ Love is in the air.",
        "🌹 Don't forget to buy flowers!",
        "💌 You have a new secret admirer."
    ],
    realistic: [
        "💔 Your ex just viewed your profile.",
        "💀 3 people are pretending to be happy.",
        "💳 Your wallet is crying.",
        "🚩 Red flag detected in your DMs.",
        "📉 Mental stability dropping..."
    ]
};

function startNotifications() {
    const bar = document.getElementById('fake-notification-bar');
    const text = document.getElementById('notification-text');
    if (!bar || !text) return;

    setInterval(() => {
        const isRealistic = document.body.classList.contains('mood-realistic');
        const pool = isRealistic ? notifications.realistic : notifications.romantic;
        const randomMsg = pool[Math.floor(Math.random() * pool.length)];

        gsap.to(bar, {
            y: -50, duration: 0.5, onComplete: () => {
                text.innerText = randomMsg;
                gsap.to(bar, { y: 0, duration: 0.5 });
            }
        });
    }, 5000);
}

/* --- MENTAL STABILITY BAR --- */
window.addEventListener('scroll', () => {
    const bar = document.getElementById('stability-bar');
    const score = document.getElementById('stability-score');
    if (!bar || !score) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const stability = Math.max(0, 100 - Math.round(scrollPercent * 100));

    bar.style.width = `${stability}%`;
    score.innerText = `${stability}%`;

    if (stability < 30) bar.style.backgroundColor = "red";
    else if (stability < 60) bar.style.backgroundColor = "orange";
    else bar.style.backgroundColor = "#00cc66";
});

/* --- EASTER EGGS --- */
let keySequence = [];
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    if (keySequence.length > konami.length) keySequence.shift();
    if (JSON.stringify(keySequence) === JSON.stringify(konami)) {
        alert("Cheating? Just like your ex. 🚩");
    }
});

/* --- UTILITIES & FEATURES --- */
function showToast(message, type = "normal") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    if (type === "toxic") {
        toast.style.borderLeftColor = "red";
        toast.style.color = "red";
    }

    container.appendChild(toast);
    gsap.from(toast, { x: 100, opacity: 0, duration: 0.5 });
    setTimeout(() => {
        gsap.to(toast, { opacity: 0, x: 100, duration: 0.5, onComplete: () => toast.remove() });
    }, 3000);
}

// Countdown
const countdown = document.getElementById("countdown-timer");
if (countdown) {
    const countdownDate = new Date("Feb 14, 2026 00:00:00").getTime();
    setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days"); if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
        const hEl = document.getElementById("hours"); if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
        const mEl = document.getElementById("minutes"); if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        const sEl = document.getElementById("seconds"); if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
}

// Text Translator
function translateText() {
    const input = document.getElementById('text-input').value;
    const resultBox = document.getElementById('translation-result');
    const isRealistic = document.body.classList.contains('mood-realistic');
    const translations = {
        "k": isRealistic ? "I hate you but I'm too lazy to type." : "They're just busy!",
        "haha": isRealistic ? "Conversation terminated." : "They think you're funny!",
        "wyd": isRealistic ? "I'm bored, entertain me." : "Thinking of you!",
        "busy": isRealistic ? "Watching Netflix without you." : "Working hard for our future!",
        "see": isRealistic ? "It's a no." : "Checking their schedule!"
    };
    if (input) {
        resultBox.innerHTML = `<strong>Translation:</strong><br>${translations[input] || "Unknown signal."}`;
        resultBox.classList.remove('hidden');
        gsap.from(resultBox, { duration: 0.5, y: -10, opacity: 0 });
    } else {
        showToast("Select a text first!");
    }
}

// Simp-o-Meter
function checkSimpLevel() {
    const checks = document.querySelectorAll('.simp-check:checked');
    const resultBox = document.getElementById('simp-result');
    const level = checks.length * 33;
    const isRealistic = document.body.classList.contains('mood-realistic');
    let verdict = "";
    if (level === 0) verdict = isRealistic ? "Cold hearted. Good." : "Playing hard to get?";
    else if (level <= 60) verdict = isRealistic ? "Recovering Simp." : "Lovebirds alert!";
    else verdict = isRealistic ? "Down Bad. Seek help immediately." : "True Love!";
    resultBox.innerHTML = `<strong>Level: ${level}%</strong><br>${verdict}`;
    resultBox.classList.remove('hidden');
    gsap.from(resultBox, { duration: 0.5, scale: 0.9, opacity: 0 });
}

// Wheel
function spinWheel() {
    const wheel = document.getElementById('wheel-container');
    const resultBox = document.getElementById('wheel-result');
    const innerText = document.getElementById('wheel');
    const rotation = Math.floor(Math.random() * 1000) + 720;
    gsap.to(wheel, {
        rotation: rotation, duration: 3, ease: "power4.out",
        onComplete: () => {
            const isRealistic = document.body.classList.contains('mood-realistic');
            const fates = isRealistic
                ? ["Cat Person", "TikTok Addict", "Forever Alone", "Gym Rat", "Gamer Hermit"]
                : ["Soulmate Soon", "Movie Romance", "Rich Partner", "Happy Life", "Cute Dog"];
            const fate = fates[Math.floor(Math.random() * fates.length)];
            innerText.innerText = fate;
            gsap.set(wheel, { rotation: 0 });
            resultBox.innerText = `Destiny: ${fate}`;
            resultBox.classList.remove('hidden');
            gsap.from(resultBox, { duration: 0.5, y: 10, opacity: 0 });
        }
    });
}

// Meme Resume
const storyData = [
    { question: "It's 11 PM. Your toxic ex views your story.", options: [{ text: "Stalk them back", skill: "Stalking - Pro" }, { text: "Post a thirst trap", skill: "Attention Seeking" }] },
    { question: "Valentine's Day Plan?", options: [{ text: "Table for one", skill: "Independence" }, { text: "Cry in shower", skill: "Hydration Expert" }] }
];
let currentStoryIndex = 0;
let userSkills = [];
function startStoryMode() {
    currentStoryIndex = 0; userSkills = [];
    document.getElementById('start-story-btn').classList.add('hidden');
    document.getElementById('resume-result').classList.add('hidden');
    const container = document.getElementById('story-container');
    container.classList.remove('hidden');
    renderQuestion();
}
function renderQuestion() {
    const container = document.getElementById('story-container');
    const data = storyData[currentStoryIndex];
    if (!data) { generateResume(); return; }
    let html = `<div class="story-step" style="padding:10px;"><h4 style="margin-bottom:15px;">${data.question}</h4><div class="options-grid" style="display:flex;flex-direction:column;gap:10px;">`;
    data.options.forEach((opt, idx) => { html += `<button class="action-btn" style="width:100%;text-align:left;" onclick="handleOption(${idx})">${opt.text}</button>`; });
    html += `</div></div>`;
    container.innerHTML = html;
    gsap.from(container, { opacity: 0, x: 20, duration: 0.3 });
}
function handleOption(optionIndex) {
    const skill = storyData[currentStoryIndex].options[optionIndex].skill;
    userSkills.push(skill);
    currentStoryIndex++;
    renderQuestion();
}
function generateResume() {
    const container = document.getElementById('story-container');
    container.classList.add('hidden');
    container.innerHTML = '';
    const resultBox = document.getElementById('resume-result');
    const btn = document.getElementById('start-story-btn');
    btn.innerText = "Restart";
    btn.classList.remove('hidden');
    const cvHTML = `<h3 style="border-bottom:2px solid #333;padding-bottom:5px;">My Love Life CV</h3><p><strong>Experience:</strong></p><ul style="list-style-type:none;padding:0;">${userSkills.map(s => `<li>✅ ${s}</li>`).join('')}</ul><p style="margin-top:10px;font-size:0.8em;color:#666;">*Hire me (please)*</p>`;
    resultBox.innerHTML = cvHTML;
    resultBox.classList.remove('hidden');
    gsap.from(resultBox, { duration: 0.8, y: 20, opacity: 0, ease: "power2.out" });
}

// --- SHARED GENERATORS (For Sub-pages) ---
window.generateRose = function () {
    const isRealistic = document.body.classList.contains('mood-realistic');
    const result = isRealistic ? "🥀 Dead Rose" : "🌹 Beautiful Rose";
    const resultBox = document.getElementById('rose-result');
    if (resultBox) {
        resultBox.innerText = result;
        resultBox.classList.remove('hidden');
    }
};

window.draftProposal = function () {
    const isRealistic = document.body.classList.contains('mood-realistic');
    const proposals = isRealistic
        ? ["Let's make this mistake together.", "I tolerate you.", "Tax benefits?", "I guess you'll do."]
        : ["I love you more than pizza.", "You are my favorite notification.", "Be mine?", "Love you 3000."];

    const result = proposals[Math.floor(Math.random() * proposals.length)];
    const resultBox = document.getElementById('proposal-result');
    if (resultBox) {
        resultBox.innerText = result;
        resultBox.classList.remove('hidden');
        gsap.from(resultBox, { duration: 0.5, y: -10, opacity: 0 });
    }
};

const chocoInput = document.getElementById('choco-count');
if (chocoInput) {
    chocoInput.addEventListener('input', function (e) {
        const count = e.target.value;
        const resultSpan = document.getElementById('choco-result');
        const isRealistic = document.body.classList.contains('mood-realistic');

        if (resultSpan) {
            resultSpan.innerText = isRealistic
                ? `Calories Gained: ${count * 500} (Regret loading...)`
                : `Happiness Level: ${count * 100}%`;
        }
    });
}

// Runaway Button
const runawayBtn = document.getElementById('runaway-btn');
if (runawayBtn) {
    runawayBtn.addEventListener('mouseenter', () => {
        const x = Math.random() * (window.innerWidth - runawayBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - runawayBtn.offsetHeight);
        runawayBtn.style.position = 'fixed';
        gsap.to(runawayBtn, { top: y, left: x, duration: 0.3, ease: "power2.out" });
        const isRealistic = document.body.classList.contains('mood-realistic');
        showToast(isRealistic ? "Commitment is a myth." : "You can't catch love!", isRealistic ? "toxic" : "normal");
    });
}

// Background
const canvas = document.getElementById('heart-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
    const particles = [];
    class Particle {
        constructor() { this.reset(); this.y = Math.random() * height; }
        reset() {
            this.x = Math.random() * width; this.y = -20; this.speed = Math.random() * 2 + 1;
            const isRealistic = document.body.classList.contains('mood-realistic');
            const romanticEmojis = ["💖", "🌹", "✨", "💌"];
            const realisticEmojis = ["🚩", "⚠️", "📉", "💔"];
            const pool = isRealistic ? realisticEmojis : romanticEmojis;
            this.text = pool[Math.floor(Math.random() * pool.length)];
            this.size = Math.random() * 20 + 10;
        }
        update() {
            this.y += this.speed;
            if (this.y > height) this.reset();
        }
        draw() { ctx.font = `${this.size}px Arial`; ctx.fillText(this.text, this.x, this.y); }
    }
    for (let i = 0; i < 30; i++) particles.push(new Particle());
    function animate() {
        ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// Panic Mode (Esc Key)
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const overlay = document.getElementById('panic-overlay');
        if (overlay) overlay.classList.toggle('hidden');
    }
});

// Doomed Love Calculator
function calculateDoomedLove() {
    const n1 = document.getElementById('name1').value;
    const n2 = document.getElementById('name2').value;
    const resultBox = document.getElementById('love-result');

    if (!n1 || !n2) {
        showToast("Enter names first!");
        return;
    }

    const isRealistic = document.body.classList.contains('mood-realistic');
    const percentage = Math.floor(Math.random() * 15); // Never goes above 15% technically

    let message = "";
    if (isRealistic) {
        const insults = [
            "Divorce pending.",
            "They're cheating on you right now.",
            "Just go to therapy instead.",
            "It's a trauma bond.",
            "Run."
        ];
        message = insults[Math.floor(Math.random() * insults.length)];
    } else {
        const sweetLies = [
            "Maybe in another life?",
            "Friendzone level: 9000",
            "They see you as a sibling.",
            "Keep dreaming! ✨"
        ];
        message = sweetLies[Math.floor(Math.random() * sweetLies.length)];
    }

    resultBox.innerHTML = `Match: ${percentage}%<br><span style="font-size:0.9em">${message}</span>`;
    resultBox.classList.remove('hidden');
    gsap.from(resultBox, { scale: 0.5, opacity: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
}

// Init
startNotifications();
toggleMood();
