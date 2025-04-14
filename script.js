// Task data for mood-based suggestions
const tasks = {
    tired: [
        { task: "Take a quick power nap for 10-20 minutes to recharge.", followUp: "Did that nap help you feel more energized?" },
        { task: "Drink a glass of water to rehydrate and boost your energy.", followUp: "Do you feel more awake now?" },
        { task: "Listen to an upbeat song to lift your spirits.", followUp: "Did the music help energize you?" }
    ],
    stressed: [
        { task: "Try a 1-minute breathing exercise: inhale for 4 seconds, hold for 4, exhale for 4.", followUp: "Do you feel calmer now?" },
        { task: "Write down 3 things you're grateful for to shift your focus.", followUp: "Did this help you feel more grounded?" },
        { task: "Take a 5-minute walk to clear your mind.", followUp: "Did the walk help reduce your stress?" }
    ],
    bored: [
        { task: "Doodle or sketch something fun for a minute.", followUp: "Did that spark some creativity?" },
        { task: "Watch a funny 1-minute video to entertain yourself.", followUp: "Did that make you smile?" },
        { task: "Try a quick brain teaser or riddle to engage your mind.", followUp: "Did that help you feel more engaged?" }
    ],
    excited: [
        { task: "Share your excitement with a friend or write it down!", followUp: "Did sharing amplify your excitement?" },
        { task: "Set a small goal to channel your energy into something productive.", followUp: "Did that help you focus your excitement?" }
    ],
    sad: [
        { task: "Listen to a comforting song that resonates with you.", followUp: "Did the music help lift your spirits?" },
        { task: "Write down something you’re looking forward to.", followUp: "Did that give you a bit of hope?" },
        { task: "Give yourself a big hug and take a few deep breaths.", followUp: "Did that make you feel a bit better?" }
    ],
    angry: [
        { task: "Take 10 slow, deep breaths to calm your mind.", followUp: "Do you feel less angry now?" },
        { task: "Write down what’s making you angry, then tear up the paper.", followUp: "Did that help release some anger?" },
        { task: "Punch a pillow for 30 seconds to let out your frustration.", followUp: "Did that help you feel more relaxed?" }
    ],
    happy: [
        { task: "Share your happiness with someone by sending a kind message.", followUp: "Did that make you feel even happier?" },
        { task: "Write down this moment so you can remember it later.", followUp: "Did that help you savor the happiness?" }
    ],
    confused: [
        { task: "Take a moment to write down what’s confusing you to clarify your thoughts.", followUp: "Did that help clear your mind?" },
        { task: "Take 5 deep breaths to center yourself and reduce overwhelm.", followUp: "Do you feel more focused now?" },
        { task: "Break down your problem into smaller steps to tackle one at a time.", followUp: "Did that make things feel more manageable?" }
    ]
};

let currentMood = null;

// Audio elements
const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const punchSound = document.getElementById('punch-sound');
const shredSound = document.getElementById('shred-sound');
const natureSounds = {
    nature: document.getElementById('nature-sound'),
    rain: document.getElementById('rain-sound'),
    waves: document.getElementById('waves-sound')
};
const asmrSounds = {
    tapping: document.getElementById('tapping-sound'),
    whispering: document.getElementById('whispering-sound'),
    brushing: document.getElementById('brushing-sound')
};
let currentSound = null;

// Utility functions
function playSound(sound, volume = 0.5) {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(err => console.error('Sound playback failed:', err));
}

function selectMood(mood) {
    currentMood = mood;
    const buttons = document.querySelectorAll('#mood-buttons button');
    buttons.forEach(button => button.classList.remove('selected'));
    const selectedButton = Array.from(buttons).find(button => button.textContent.toLowerCase().includes(mood));
    if (selectedButton) selectedButton.classList.add('selected');
    showTask();
}

function showTask() {
    if (!currentMood) return;
    const taskList = tasks[currentMood];
    const randomTask = taskList[Math.floor(Math.random() * taskList.length)];
    const emoji = document.querySelector(`#mood-buttons button.selected .mood-icon`).textContent;
    document.getElementById('result').innerHTML = `
        <div class="chat-bubble">
            <div class="task-header">
                <span class="mood-emoji">${emoji}</span>
                <h3>${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}</h3>
            </div>
            <p class="task-text">${randomTask.task}</p>
            <p class="follow-up-question">${randomTask.followUp}</p>
            <div class="task-buttons">
                <button class="favorite-button" onclick="favoriteTask(this)"><span class="heart-icon">❤️</span>Favorite</button>
                <button class="new-task-button" onclick="showTask(); gtag('event', 'New Task Request', { 'event_category': 'Task', 'event_label': '${currentMood}' });">New Task</button>
            </div>
        </div>
    `;
}

function favoriteTask(button) {
    button.style.backgroundColor = '#ff4f41';
    button.style.color = '#fff';
    gtag('event', 'Favorite Task', { 'event_category': 'Task', 'event_label': currentMood });
}

function openPopup(tool) {
    playSound(clickSound, 0.3);
    const popup = document.getElementById(`${tool}-popup`);
    popup.style.display = 'flex';
    if (tool === 'breathing') startBreathing();
    if (tool === 'soundscape') startSoundscape();
    if (tool === 'punching') startPunching();
    if (tool === 'stretch') startStretch();
    if (tool === 'doodle') startDoodle();
    if (tool === 'worry') startWorry();
    if (tool === 'color') startColorFocus();
    if (tool === 'sudoku') startSudoku();
    if (tool === 'asmr') startASMR();
    if (tool === 'gratitude') startGratitude();
    if (tool === 'stressball') startStressBall();
    if (tool === 'stressjar') startStressJar();
    if (tool === 'moodflinger') startMoodFlinger();
    if (tool === 'moodquest') startMoodQuest();
    gtag('event', 'Tool Opened', { 'event_category': 'Tool', 'event_label': tool });
}

function closePopup(tool) {
    const popup = document.getElementById(`${tool}-popup`);
    popup.style.display = 'none';
    if (tool === 'breathing') clearInterval(window.breathingInterval);
    if (tool === 'soundscape') {
        clearInterval(window.soundscapeInterval);
        if (currentSound) currentSound.pause();
    }
    if (tool === 'punching') clearInterval(window.punchingInterval);
    if (tool === 'stretch') clearInterval(window.stretchInterval);
    if (tool === 'doodle') clearInterval(window.doodleInterval);
    if (tool === 'worry') {
        document.getElementById('worry-text').value = '';
        document.getElementById('paper-strips-container').innerHTML = '';
    }
    if (tool === 'color') clearInterval(window.colorInterval);
    if (tool === 'sudoku') clearInterval(window.sudokuInterval);
    if (tool === 'asmr') {
        clearInterval(window.asmrInterval);
        if (currentSound) currentSound.pause();
    }
    if (tool === 'gratitude') document.getElementById('gratitude-text').value = '';
    if (tool === 'stressball') clearInterval(window.stressballInterval);
    if (tool === 'stressjar') clearInterval(window.stressjarInterval);
    if (tool === 'moodflinger') clearInterval(window.moodflingerInterval);
    if (tool === 'moodquest') clearInterval(window.moodquestInterval);
}

function updateProgress(elementId, total, current) {
    const progressBar = document.getElementById(elementId);
    const percentage = ((total - current) / total) * 100;
    progressBar.style.width = percentage + '%';
}

// Tool functions
function startBreathing() {
    let time = 60;
    let cycleTime = 0;
    const cycleDuration = 13;
    const steps = [
        { text: "Inhale", instruction: "Breathe in slowly through your nose...", class: "inhale", duration: 4 },
        { text: "Hold", instruction: "Hold your breath...", class: "hold", duration: 4 },
        { text: "Exhale", instruction: "Breathe out slowly through your mouth...", class: "exhale", duration: 4 },
        { text: "Pause", instruction: "Relax for a moment...", class: "pause", duration: 1 }
    ];
    const stepElement = document.getElementById('breathing-step');
    const instructionElement = document.getElementById('breathing-instruction');
    const timerElement = document.getElementById('breathing-timer');
    const circle = document.getElementById('breathing-circle');
    circle.className = '';
    updateProgress('breathing-progress', 60, 0);

    function updateBreathing() {
        const currentStepIndex = Math.floor(cycleTime / 4) % 4;
        const currentStep = steps[currentStepIndex];
        stepElement.textContent = currentStep.text;
        instructionElement.textContent = currentStep.instruction;
        circle.className = currentStep.class;
        cycleTime = (cycleTime + 1) % cycleDuration;
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('breathing-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.breathingInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('breathing'), 1500);
        }
    }

    updateBreathing();
    window.breathingInterval = setInterval(updateBreathing, 1000);
}

function startSoundscape() {
    let time = 90;
    const timerElement = document.getElementById('soundscape-timer');
    const selectElement = document.getElementById('soundscape-select');
    const playButton = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    updateProgress('soundscape-progress', 90, 0);
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    selectElement.onchange = function() {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    playButton.onclick = function() {
        const soundType = selectElement.value;
        if (currentSound && currentSound !== natureSounds[soundType]) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        currentSound = natureSounds[soundType];
        if (currentSound.paused) {
            currentSound.play().then(() => {
                currentSound.volume = volumeSlider.value;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => console.error('Sound playback failed:', err));
        } else {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    volumeSlider.oninput = function() {
        if (currentSound) currentSound.volume = this.value;
    };
    window.soundscapeInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('soundscape-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.soundscapeInterval);
            if (currentSound) currentSound.pause();
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('soundscape'), 1500);
        }
    }, 1000);
}

function startPunching() {
    let time = 30;
    let count = 0;
    const bag = document.getElementById('punching-bag');
    const timerElement = document.getElementById('punching-timer');
    bag.textContent = '0';
    bag.style.transform = 'scale(1)';
    updateProgress('punching-progress', 30, 0);
    bag.onclick = () => {
        count++;
        bag.textContent = count;
        playSound(punchSound, 0.3);
        bag.style.transform = 'scale(0.9)';
        setTimeout(() => bag.style.transform = 'scale(1)', 100);
    };
    window.punchingInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('punching-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.punchingInterval);
            playSound(successSound, 0.4);
            bag.innerHTML = `Great job! ${count} punches!`;
            setTimeout(() => closePopup('punching'), 1500);
        }
    }, 1000);
}

function startStretch() {
    let time = 30;
    const stretches = [
        "Roll your head in a gentle circle, left to right, then right to left, for 3 full circles (about 30 seconds). Relieves tension in your neck and shoulders.",
        "Lift your shoulders toward your ears, hold for 2 seconds, then release. Repeat 8 times (about 30 seconds). Reduces tightness in your upper back and shoulders.",
        "Sit upright and twist your torso gently to the right, hold for 15 seconds, then to the left for 15 seconds (30 seconds total). Eases lower back stiffness and promotes spinal flexibility.",
        "Extend your arms out and make small forward circles for 15 seconds, then reverse for 15 seconds. Loosens shoulder joints and improves upper body mobility.",
        "Raise your right arm and lean gently to the left, hold for 15 seconds, then switch sides (30 seconds total). Stretches side muscles and calms your mind with deep breaths."
    ];
    const stretchElement = document.getElementById('stretch-prompt');
    const timerElement = document.getElementById('stretch-timer');
    stretchElement.textContent = stretches[Math.floor(Math.random() * stretches.length)];
    updateProgress('stretch-progress', 30, 0);
    window.stretchInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stretch-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stretchInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('stretch'), 1500);
        }
    }, 1000);
}

function startDoodle() {
    let time = 90;
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    const timerElement = document.getElementById('doodle-timer');
    let isDrawing = false;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.onmousedown = () => { isDrawing = true; ctx.beginPath(); };
    canvas.onmouseup = () => isDrawing = false;
    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };
    canvas.ontouchstart = (e) => {
        isDrawing = true;
        ctx.beginPath();
        e.preventDefault();
    };
    canvas.ontouchend = () => isDrawing = false;
    canvas.ontouchmove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
        e.preventDefault();
    };
    updateProgress('doodle-progress', 90, 0);
    window.doodleInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('doodle-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.doodleInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('doodle'), 1500);
        }
    }, 1000);
}

function clearCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startWorry() {
    const worryText = document.getElementById('worry-text');
    const shredButton = document.getElementById('shred-button');
    const container = document.getElementById('paper-strips-container');
    shredButton.onclick = () => {
        if (worryText.value.trim() === '') return;
        container.innerHTML = '';
        const textLength = worryText.value.length;
        const stripCount = Math.min(textLength, 20);
        for (let i = 0; i < stripCount; i++) {
            const strip = document.createElement('div');
            strip.className = 'paper-strip';
            strip.style.width = `${100 / stripCount}%`;
            strip.style.animationDelay = `${i * 0.05}s`;
            container.appendChild(strip);
        }
        playSound(shredSound, 0.5);
        worryText.classList.add('shredding');
        setTimeout(() => {
            worryText.value = '';
            worryText.classList.remove('shredding');
            container.innerHTML = '';
        }, 1000);
    };
}

function startColorFocus() {
    let time = 60;
    const colorSquare = document.getElementById('color-square');
    const timerElement = document.getElementById('color-timer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ce79', '#f7a1c4'];
    updateProgress('color-progress', 60, 0);
    window.colorInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('color-progress', 60, time);
        colorSquare.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        if (time <= 0) {
            clearInterval(window.colorInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('color'), 1500);
        }
    }, 1000);
}

function startASMR() {
    let time = 90;
    const timerElement = document.getElementById('asmr-timer');
    const selectElement = document.getElementById('asmr-select');
    const playButton = document.getElementById('asmr-play-btn');
    const volumeSlider = document.getElementById('asmr-volume-slider');
    updateProgress('asmr-progress', 90, 0);
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    selectElement.onchange = function() {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    playButton.onclick = function() {
        const soundType = selectElement.value;
        if (currentSound && currentSound !== asmrSounds[soundType]) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        currentSound = asmrSounds[soundType];
        if (currentSound.paused) {
            currentSound.play().then(() => {
                currentSound.volume = volumeSlider.value;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => console.error('Sound playback failed:', err));
        } else {
            currentSound.pause();
            currentSound.currentTime = 0;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    volumeSlider.oninput = function() {
        if (currentSound) currentSound.volume = this.value;
    };
    window.asmrInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('asmr-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.asmrInterval);
            if (currentSound) currentSound.pause();
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('asmr'), 1500);
        }
    }, 1000);
}

function startGratitude() {
    const gratitudeText = document.getElementById('gratitude-text');
    const saveButton = document.getElementById('save-gratitude');
    saveButton.onclick = () => {
        if (gratitudeText.value.trim() === '') return;
        playSound(successSound, 0.4);
        setTimeout(() => closePopup('gratitude'), 1500);
    };
}

function startStressBall() {
    let time = 30;
    let count = 0;
    const ball = document.getElementById('stress-ball');
    const timerElement = document.getElementById('stressball-timer');
    ball.textContent = '0';
    ball.style.transform = 'scale(1)';
    updateProgress('stressball-progress', 30, 0);
    ball.onclick = () => {
        count++;
        ball.textContent = count;
        playSound(punchSound, 0.3);
        ball.style.transform = 'scale(0.9)';
        setTimeout(() => ball.style.transform = 'scale(1)', 100);
    };
    window.stressballInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stressball-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stressballInterval);
            playSound(successSound, 0.4);
            ball.innerHTML = `Great job! ${count} squeezes!`;
            setTimeout(() => closePopup('stressball'), 1500);
        }
    }, 1000);
}

function startStressJar() {
    const stressText = document.getElementById('stressjar-text');
    const sealButton = document.getElementById('seal-button');
    sealButton.onclick = () => {
        if (stressText.value.trim() === '') return;
        stressText.classList.add('sealing');
        playSound(shredSound, 0.5);
        setTimeout(() => {
            stressText.value = '';
            stressText.classList.remove('sealing');
        }, 1000);
    };
}

function startMoodFlinger() {
    let time = 60;
    const canvas = document.getElementById('moodflinger-canvas');
    const ctx = canvas.getContext('2d');
    const timerElement = document.getElementById('moodflinger-timer');
    let particles = [];
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    function createParticle(x, y) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            radius: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.radius > 0);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.radius -= 0.1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }
    canvas.onmousedown = (e) => {
        const rect = canvas.getBoundingClientRect();
        createParticle(e.clientX - rect.left, e.clientY - rect.top);
    };
    canvas.ontouchstart = (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        createParticle(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    };
    updateProgress('moodflinger-progress', 60, 0);
    window.moodflingerInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('moodflinger-progress', 60, time);
        updateParticles();
        if (time <= 0) {
            clearInterval(window.moodflingerInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('moodflinger'), 1500);
        }
    }, 16);
}

function startMoodQuest() {
    let time = 120;
    let xp = 0;
    const timerElement = document.getElementById('moodquest-timer');
    const stepsElement = document.getElementById('quest-steps');
    const xpElement = document.getElementById('quest-xp');
    const steps = [
        "Take 5 deep breaths.",
        "Write down something you’re grateful for.",
        "Do a quick stretch.",
        "Smile at yourself in a mirror."
    ];
    stepsElement.innerHTML = steps.map((step, index) => `
        <div class="quest-step">
            <span>${step}</span>
            <button class="action-button" onclick="completeQuestStep(${index})">Complete</button>
        </div>
    `).join('');
    updateProgress('moodquest-progress', 120, 0);
    window.moodquestInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('moodquest-progress', 120, time);
        if (time <= 0) {
            clearInterval(window.moodquestInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('moodquest'), 1500);
        }
    }, 1000);
}

function completeQuestStep(index) {
    const stepsElement = document.getElementById('quest-steps');
    const step = stepsElement.children[index];
    if (step) {
        step.style.backgroundColor = '#e0f7fa';
        playSound(successSound, 0.3);
        let xp = parseInt(document.getElementById('quest-xp').textContent.split(': ')[1]) || 0;
        xp += 10;
        document.getElementById('quest-xp').textContent = `XP: ${xp}`;
    }
}

function startSudoku() {
    const gridElement = document.getElementById('sudoku-grid');
    const popupContent = document.getElementById('sudoku-popup').querySelector('.popup-content');
    gridElement.innerHTML = '';
    popupContent.querySelectorAll('select, button').forEach(el => el.remove());

    // Puzzle pools
    const easyPuzzles = [
        {
            grid: [
                [1, 2, '', ''],
                ['', '', 4, ''],
                ['', 4, '', ''],
                ['', '', 3, 1]
            ],
            solution: [
                [1, 2, 3, 4],
                [3, 1, 4, 2],
                [2, 4, 1, 3],
                [4, 3, 2, 1]
            ]
        },
        {
            grid: [
                [3, '', '', 4],
                ['', 2, 1, ''],
                ['', 3, 4, ''],
                [2, '', '', 1]
            ],
            solution: [
                [3, 1, 2, 4],
                [4, 2, 1, 3],
                [1, 3, 4, 2],
                [2, 4, 3, 1]
            ]
        },
        {
            grid: [
                ['', '', 2, 3],
                [4, '', '', 1],
                [1, '', '', 2],
                [3, 4, '', '']
            ],
            solution: [
                [1, 3, 2, 4],
                [4, 2, 3, 1],
                [2, 1, 4, 3],
                [3, 4, 1, 2]
            ]
        }
    ];
    const intermediatePuzzles = [
        {
            grid: [
                ['', 1, '', ''],
                ['', '', 3, ''],
                ['', 2, '', ''],
                ['', '', 4, '']
            ],
            solution: [
                [4, 1, 2, 3],
                [2, 4, 3, 1],
                [3, 2, 1, 4],
                [1, 3, 4, 2]
            ]
        },
        {
            grid: [
                [2, '', '', ''],
                ['', 1, '', 3],
                ['', '', 4, ''],
                ['', 2, '', '']
            ],
            solution: [
                [2, 3, 1, 4],
                [4, 1, 2, 3],
                [3, 4, 2, 1],
                [1, 2, 3, 4]
            ]
        },
        {
            grid: [
                ['', '', 1, ''],
                ['', 3, '', ''],
                ['', '', 4, ''],
                [2, '', '', '']
            ],
            solution: [
                [3, 4, 1, 2],
                [1, 3, 2, 4],
                [4, 2, 3, 1],
                [2, 1, 4, 3]
            ]
        }
    ];
    const hardPuzzles = [
        {
            grid: [
                ['', '', '', 1],
                ['', 2, '', ''],
                ['', '', 3, ''],
                [4, '', '', '']
            ],
            solution: [
                [3, 4, 2, 1],
                [1, 2, 4, 3],
                [2, 1, 3, 4],
                [4, 3, 1, 2]
            ]
        },
        {
            grid: [
                ['', '', '', ''],
                ['', 1, '', ''],
                ['', '', 2, ''],
                ['', '', '', 3]
            ],
            solution: [
                [4, 3, 1, 2],
                [2, 1, 4, 3],
                [3, 4, 2, 1],
                [1, 2, 3, 4]
            ]
        },
        {
            grid: [
                [1, '', '', ''],
                ['', '', '', 2],
                ['', 3, '', ''],
                ['', '', 4, '']
            ],
            solution: [
                [1, 4, 2, 3],
                [3, 1, 4, 2],
                [4, 2, 3, 1],
                [2, 3, 1, 4]
            ]
        }
    ];

    // Difficulty selection
    const select = document.createElement('select');
    select.className = 'sound-select';
    ['Easy', 'Intermediate', 'Hard'].forEach(level => {
        const option = document.createElement('option');
        option.value = level.toLowerCase();
        option.textContent = level;
        select.appendChild(option);
    });
    popupContent.insertBefore(select, gridElement);

    // Puzzle validation
    function isValidPlacement(grid, row, col, num) {
        // Check row
        for (let x = 0; x < 4; x++) {
            if (grid[row][x] === num) return false;
        }
        // Check column
        for (let x = 0; x < 4; x++) {
            if (grid[x][col] === num) return false;
        }
        // Check 2x2 subgrid
        const startRow = Math.floor(row / 2) * 2;
        const startCol = Math.floor(col / 2) * 2;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (grid[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solveSudoku(grid, solutions = []) {
        const tempGrid = grid.map(row => [...row]);
        function solve() {
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (tempGrid[row][col] === '') {
                        for (let num = 1; num <= 4; num++) {
                            if (isValidPlacement(tempGrid, row, col, num)) {
                                tempGrid[row][col] = num;
                                if (solve()) return true;
                                tempGrid[row][col] = '';
                            }
                        }
                        return false;
                    }
                }
            }
            solutions.push(tempGrid.map(row => [...row]));
            return true;
        }
        solve();
        return solutions;
    }

    function validatePuzzle(grid, solution) {
        // Check clue consistency
        for (let row = 0; row < 4; row++) {
            const rowNums = grid[row].filter(x => x !== '');
            if (new Set(rowNums).size !== rowNums.length) return false;
        }
        for (let col = 0; col < 4; col++) {
            const colNums = grid.map(row => row[col]).filter(x => x !== '');
            if (new Set(colNums).size !== colNums.length) return false;
        }
        const subgrids = [
            [0, 0], [0, 2], [2, 0], [2, 2]
        ];
        for (let [startRow, startCol] of subgrids) {
            const subNums = [];
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    const val = grid[startRow + i][startCol + j];
                    if (val !== '') subNums.push(val);
                }
            }
            if (new Set(subNums).size !== subNums.length) return false;
        }
        // Check solvability
        const solutions = solveSudoku(grid);
        if (solutions.length !== 1) return false;
        // Check solution match
        return solutions[0].every((row, i) => row.every((val, j) => val === solution[i][j]));
    }

    // Load puzzle
    function loadPuzzle() {
        gridElement.innerHTML = '';
        const level = select.value;
        const puzzles = {
            easy: easyPuzzles,
            intermediate: intermediatePuzzles,
            hard: hardPuzzles
        }[level];
        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        if (!validatePuzzle(puzzle.grid, puzzle.solution)) {
            console.error('Invalid puzzle detected:', puzzle);
            alert('Error: Invalid puzzle. Please try again.');
            return;
        }
        const grid = puzzle.grid;
        const solution = puzzle.solution;

        // Create grid
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'sudoku-cell';
                input.value = grid[i][j] || '';
                input.disabled = !!grid[i][j];
                input.addEventListener('input', (e) => {
                    const val = e.target.value;
                    if (val && !/^[1-4]$/.test(val)) {
                        e.target.value = '';
                    }
                });
                gridElement.appendChild(input);
            }
        }

        // Finish button
        const finishButton = document.createElement('button');
        finishButton.className = 'action-button';
        finishButton.innerHTML = '<i class="fas fa-check"></i> Finish';
        finishButton.onclick = () => {
            const inputs = gridElement.querySelectorAll('.sudoku-cell');
            let userGrid = [];
            let row = [];
            inputs.forEach((input, index) => {
                row.push(input.value ? parseInt(input.value) : '');
                if ((index + 1) % 4 === 0) {
                    userGrid.push(row);
                    row = [];
                }
            });
            let isComplete = true;
            let isCorrect = true;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (userGrid[i][j] === '') {
                        isComplete = false;
                    } else if (userGrid[i][j] !== solution[i][j]) {
                        isCorrect = false;
                    }
                }
            }
            if (!isComplete || !isCorrect) {
                alert('Please try again!');
            } else {
                playSound(successSound, 0.4);
                alert('Congratulations! You solved the puzzle!');
                setTimeout(() => closePopup('sudoku'), 1500);
            }
        };
        popupContent.appendChild(finishButton);
    }

    select.onchange = loadPuzzle;
    loadPuzzle();

    // Hide timer and progress
    const timerElement = document.getElementById('sudoku-timer');
    const progressContainer = document.getElementById('sudoku-progress-container');
    if (timerElement) timerElement.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
}
