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

function playSound(sound, volume = 0.5) {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(err => console.error('Sound playback failed:', err));
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
    if (tool === 'stressball') startStressBall();
    if (tool === 'worry') startWorry();
    if (tool === 'color') startColorFocus();
    if (tool === 'sudoku') startSudoku();
    if (tool === 'moodflinger') startMoodFlinger();
    if (tool === 'asmr') startASMR();
    if (tool === 'stressjar') startStressJar();
    if (tool === 'moodquest') startMoodQuest();
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
    if (tool === 'stressball') clearInterval(window.stressballInterval);
    if (tool === 'worry') {
        document.getElementById('worry-text').value = '';
        document.getElementById('paper-strips-container').innerHTML = '';
    }
    if (tool === 'color') clearInterval(window.colorInterval);
    if (tool === 'sudoku') clearInterval(window.sudokuInterval);
    if (tool === 'moodflinger') clearInterval(window.moodflingerInterval);
    if (tool === 'asmr') {
        clearInterval(window.asmrInterval);
        if (currentSound) currentSound.pause();
    }
    if (tool === 'gratitude') document.getElementById('gratitude-text').value = '';
    if (tool === 'stressjar') {
        clearInterval(window.stressjarInterval);
        document.getElementById('stressjar-text').value = '';
        document.getElementById('stressjar-container').innerHTML = '';
    }
    if (tool === 'moodquest') {
        clearInterval(window.moodquestInterval);
        document.getElementById('quest-goal').value = '';
        document.getElementById('quest-steps').innerHTML = '';
        document.getElementById('quest-progress-map').innerHTML = '';
    }
}

function updateProgress(elementId, total, current) {
    const progressBar = document.getElementById(elementId);
    const percentage = ((total - current) / total) * 100;
    progressBar.style.width = percentage + '%';
}

function startBreathing() {
    let time = 60;
    let step = 0;
    const steps = [
        { text: "Inhale", instruction: "Breathe in slowly through your nose...", class: "inhale" },
        { text: "Hold", instruction: "Hold your breath...", class: "hold" },
        { text: "Exhale", instruction: "Breathe out slowly through your mouth...", class: "exhale" }
    ];
    const stepElement = document.getElementById('breathing-step');
    const instructionElement = document.getElementById('breathing-instruction');
    const timerElement = document.getElementById('breathing-timer');
    const circle = document.getElementById('breathing-circle');
    circle.className = '';
    updateProgress('breathing-progress', 60, 0);
    function updateBreathing() {
        if (time % 4 === 0) {
            step = (step % 3);
            stepElement.textContent = steps[step].text;
            instructionElement.textContent = steps[step].instruction;
            circle.className = steps[step].class;
            step++;
        }
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
            const playPromise = currentSound.play();
            playPromise.then(() => {
                currentSound.volume = volumeSlider.value;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => {
                console.error(`Failed to play ${soundType} audio:`, err);
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            });
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
            if (currentSound) {
                const fadeInterval = setInterval(() => {
                    if (currentSound.volume > 0.1) {
                        currentSound.volume -= 0.1;
                    } else {
                        currentSound.pause();
                        clearInterval(fadeInterval);
                        playSound(successSound, 0.4);
                        setTimeout(() => closePopup('soundscape'), 1500);
                    }
                }, 100);
            } else {
                playSound(successSound, 0.4);
                setTimeout(() => closePopup('soundscape'), 1500);
            }
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
        bag.style.transform = 'scale(0.9) rotate(-5deg)';
        setTimeout(() => {
            bag.style.transform = 'scale(1) rotate(0)';
        }, 150);
    };
    window.punchingInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('punching-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.punchingInterval);
            playSound(successSound, 0.4);
            bag.textContent = count;
            bag.innerHTML = `<span>Great job!</span><br>${count}`;
            setTimeout(() => closePopup('punching'), 2000);
        }
    }, 1000);
}

function startStretch() {
    let time = 60;
    const prompts = [
        { text: "Reach for the sky and hold for a few seconds." },
        { text: "Touch your toes and feel the stretch in your legs." },
        { text: "Stretch your arms behind your back and open your chest." },
        { text: "Gently roll your head from side to side." }
    ];
    const promptElement = document.getElementById('stretch-prompt');
    const timerElement = document.getElementById('stretch-timer');
    const randomStretch = prompts[Math.floor(Math.random() * prompts.length)];
    promptElement.textContent = randomStretch.text;
    updateProgress('stretch-progress', 60, 0);
    window.stretchInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stretch-progress', 60, time);
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
    let drawing = false;
    const timerElement = document.getElementById('doodle-timer');
    const colorPicker = document.getElementById('color-picker');
    const brushSize = document.getElementById('brush-size');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateProgress('doodle-progress', 90, 0);
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.fillStyle = colorPicker.value;
        ctx.beginPath();
        ctx.arc(x, y, parseInt(brushSize.value), 0, Math.PI * 2);
        ctx.fill();
    });
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

function saveDoodle() {
    const canvas = document.getElementById('doodle-canvas');
    const link = document.createElement('a');
    link.download = 'doodle.png';
    link.href = canvas.toDataURL();
    link.click();
    playSound(successSound, 0.4);
}

function clearCanvas() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound(clickSound, 0.3);
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
        ball.style.transform = 'scale(0.8)';
        setTimeout(() => {
            ball.style.transform = 'scale(1)';
        }, 150);
    };
    window.stressballInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stressball-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stressballInterval);
            playSound(successSound, 0.4);
            ball.innerHTML = `<span>Great job!</span><br>${count}`;
            setTimeout(() => closePopup('stressball'), 2000);
        }
    }, 1000);
}

function startWorry() {
    document.getElementById('worry-text').value = '';
    document.getElementById('paper-strips-container').innerHTML = '';
}

function shredWorry() {
    const worryText = document.getElementById('worry-text');
    const container = document.getElementById('paper-strips-container');
    if (worryText.value.trim() === '') {
        alert('Please write a worry to shred!');
        return;
    }
    worryText.classList.add('shredding');
    playSound(shredSound, 0.5);
    setTimeout(() => {
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const strip = document.createElement('div');
            strip.style.width = '10px';
            strip.style.height = '50px';
            strip.style.backgroundColor = '#ddd';
            strip.style.position = 'absolute';
            strip.style.left = `${20 + i * 15}px`;
            strip.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            strip.style.animation = `shred 0.5s forwards ${i * 0.1}s`;
            container.appendChild(strip);
        }
        setTimeout(() => {
            worryText.value = '';
            container.innerHTML = '';
            alert('Worry shredded! Feel lighter?');
            playSound(successSound, 0.4);
            closePopup('worry');
        }, 1000);
    }, 1000);
}

function startColorFocus() {
    let time = 60;
    const colors = [
        { name: "Blue to soothe", hex: "#1E90FF" },
        { name: "Green to calm", hex: "#32CD32" },
        { name: "Yellow to uplift", hex: "#FFD700" }
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const promptElement = document.getElementById('color-prompt');
    const squareElement = document.getElementById('color-square');
    const timerElement = document.getElementById('color-timer');
    promptElement.textContent = `Focus on ${randomColor.name}`;
    squareElement.style.backgroundColor = randomColor.hex;
    updateProgress('color-progress', 60, 0);
    window.colorInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('color-progress', 60, time);
        if (time <= 0) {
            clearInterval(window.colorInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('color'), 1500);
        }
    }, 1000);
}

function startSudoku() {
    let time = 90;
    const gridElement = document.getElementById('sudoku-grid');
    const timerElement = document.getElementById('sudoku-timer');
    const grid = [
        [1, '', '', 4],
        ['', 3, 4, ''],
        ['', 4, 2, ''],
        [4, '', '', 1]
    ];
    gridElement.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1;
            cell.className = 'sudoku-cell';
            cell.value = grid[i][j] || '';
            cell.disabled = grid[i][j] !== '';
            cell.addEventListener('input', (e) => {
                if (!/^[1-4]?$/.test(e.target.value)) e.target.value = '';
            });
            gridElement.appendChild(cell);
        }
    }
    updateProgress('sudoku-progress', 90, 0);
    window.sudokuInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('sudoku-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.sudokuInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('sudoku'), 1500);
        }
    }, 1000);
}

function startMoodFlinger() {
    let time = 60;
    let score = 0;
    const canvas = document.getElementById('moodflinger-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('moodflinger-score');
    const timerElement = document.getElementById('moodflinger-timer');
    let dragging = false;
    let startX, startY;
    let ball = { x: 50, y: 250, vx: 0, vy: 0, radius: 10 };
    let target = { x: 350, y: 50, radius: 20 };
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#e67e22';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#28a745';
        ctx.fill();
        if (!dragging && (ball.vx || ball.vy)) {
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += 0.5;
            ball.vx *= 0.99;
            ball.vy *= 0.99;
            if (ball.y > canvas.height - ball.radius) {
                ball.y = canvas.height - ball.radius;
                ball.vy = 0;
                ball.vx = 0;
                let distance = Math.hypot(ball.x - target.x, ball.y - target.y);
                let points = Math.max(0, 100 - Math.floor(distance));
                score += points;
                scoreElement.textContent = `Score: ${score}`;
                ball.x = 50;
                ball.y = 250;
            }
        }
    }
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x =
