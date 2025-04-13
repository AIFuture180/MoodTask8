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
    if (tool === 'gratitude') startGratitude();
    if (tool === 'stressjar') startStressJar();
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
    if (tool === 'stressball') clearInterval(window.stressballInterval);
    if (tool === 'worry') {
        document.getElementById('worry-text').value = '';
        document.getElementById('paper-strips').innerHTML = '';
    }
    if (tool === 'color') clearInterval(window.colorInterval);
    if (tool === 'sudoku') clearInterval(window.sudokuInterval);
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
    let time = 60;
    const stretches = [
        {
            name: "Child's Pose (Balasana)",
            instructions: "Kneel on the floor, sitting back on your heels. Stretch your arms forward, lowering your torso to rest on your thighs. Keep your forehead on the ground and breathe deeply.",
            benefits: "Stretches the lower back, hips, and thighs while promoting relaxation."
        },
        {
            name: "Cat-Cow Stretch",
            instructions: "Get on your hands and knees, aligning your wrists under shoulders and knees under hips. Alternate between arching your back upward (Cat) and dipping it downward while lifting your head and tailbone (Cow). Move slowly and match your breath with each movement.",
            benefits: "Eases tension in the spine, neck, and shoulders while improving flexibility."
        },
        {
            name: "Neck Stretch",
            instructions: "Sit or stand upright with your back straight. Gently tilt your head to one side, bringing your ear toward your shoulder. Hold for 15-30 seconds, then switch sides. For a deeper stretch, place your hand on the side of your head and apply light pressure.",
            benefits: "Relieves neck and shoulder tension."
        },
        {
            name: "Seated Forward Fold",
            instructions: "Sit on the floor with your legs extended straight in front of you. Hinge at your hips and reach forward, aiming to touch your toes or as far as comfortable. Relax your head and neck, and hold for 20-30 seconds.",
            benefits: "Stretches the lower back, hamstrings, and calves."
        },
        {
            name: "Standing Side Stretch",
            instructions: "Stand with your feet shoulder-width apart. Reach one arm overhead and bend sideways toward the opposite side, keeping your chest open. Hold for 15-30 seconds, then switch sides.",
            benefits: "Loosens tension in the sides of the torso and shoulders."
        },
        {
            name: "Butterfly Stretch",
            instructions: "Sit on the floor with your feet together and knees bent outward. Hold your feet with your hands and gently press your knees toward the floor. Keep your back straight and hold for 20-30 seconds.",
            benefits: "Opens up the hips and stretches the inner thighs."
        }
    ];
    const stretchElement = document.getElementById('stretch-details');
    const timerElement = document.getElementById('stretch-timer');
    const randomStretch = stretches[Math.floor(Math.random() * stretches.length)];
    stretchElement.innerHTML = `
        <h3>${randomStretch.name}</h3>
        <p><strong>How to Perform:</strong> ${randomStretch.instructions}</p>
        <p><strong>Benefits:</strong> ${randomStretch.benefits}</p>
    `;
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
    const timerElement = document.getElementById('doodle-timer');
    let isDrawing = false;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    canvas.onmousedown = () => isDrawing = true;
    canvas.onmouseup = () => isDrawing = false;
    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
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

function clearDoodle() {
    const canvas = document.getElementById('doodle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

function startWorry() {
    let time = 30;
    const worryText = document.getElementById('worry-text');
    const timerElement = document.getElementById('worry-timer');
    worryText.value = '';
    updateProgress('worry-progress', 30, 0);
    window.worryInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('worry-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.worryInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('worry'), 1500);
        }
    }, 1000);
}

function shredWorry() {
    const worryText = document.getElementById('worry-text');
    const container = document.getElementById('paper-strips');
    if (!worryText.value.trim()) {
        alert('Please enter a worry to shred.');
        return;
    }
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const strip = document.createElement('div');
        strip.className = 'paper-strip';
        strip.style.left = `${i * 20}px`;
        container.appendChild(strip);
    }
    playSound(shredSound, 0.5);
    setTimeout(() => {
        worryText.value = '';
        container.innerHTML = '';
        playSound(successSound, 0.4);
        alert('Worry shredded!');
    }, 1000);
}

function startColorFocus() {
    let time = 60;
    const colors = ['#ff6347', '#4682b4', '#32cd32'];
    const colorBox = document.getElementById('color-box');
    const timerElement = document.getElementById('color-timer');
    colorBox.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
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
    gridElement.innerHTML = '';
    const puzzle = [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        ['', '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9]
    ];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.value = puzzle[i][j] || '';
            input.disabled = !!puzzle[i][j];
            input.oninput = () => {
                if (!/^[1-9]?$/.test(input.value)) input.value = '';
            };
            gridElement.appendChild(input);
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

function startGratitude() {
    let time = 30;
    const gratitudeText = document.getElementById('gratitude-text');
    const timerElement = document.getElementById('gratitude-timer');
    gratitudeText.value = '';
    updateProgress('gratitude-progress', 30, 0);
    window.gratitudeInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('gratitude-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.gratitudeInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('gratitude'), 1500);
        }
    }, 1000);
}

function saveGratitude() {
    const gratitudeText = document.getElementById('gratitude-text');
    if (!gratitudeText.value.trim()) {
        alert('Please enter something you are grateful for.');
        return;
    }
    let gratitudes = JSON.parse(localStorage.getItem('gratitudes') || '[]');
    gratitudes.push({ text: gratitudeText.value, date: new Date().toLocaleString() });
    localStorage.setItem('gratitudes', JSON.stringify(gratitudes));
    playSound(successSound, 0.4);
    alert('Gratitude saved!');
    gratitudeText.value = '';
}

function startStressJar() {
    let time = 30;
    const stressText = document.getElementById('stressjar-text');
    const timerElement = document.getElementById('stressjar-timer');
    const container = document.getElementById('stressjar-container');
    stressText.value = '';
    container.innerHTML = '';
    updateProgress('stressjar-progress', 30, 0);
    window.stressjarInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('stressjar-progress', 30, time);
        if (time <= 0) {
            clearInterval(window.stressjarInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('stressjar'), 1500);
        }
    }, 1000);
}

function sealStress() {
    const stressText = document.getElementById('stressjar-text');
    const container = document.getElementById('stressjar-container');
    if (!stressText.value.trim()) {
        alert('Please enter a stress to seal.');
        return;
    }
    container.innerHTML = '<div class="sparkle">✨</div>';
    playSound(successSound, 0.5);
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    stresses.push({ text: stressText.value, date: new Date().toLocaleString() });
    localStorage.setItem('stresses', JSON.stringify(stresses));
    gtag('event', 'Seal Stress', { 'event_category': 'StressJar', 'event_label': 'Stress Sealed' });
    setTimeout(() => {
        stressText.value = '';
        container.innerHTML = '';
        alert('Stress sealed!');
    }, 1000);
}

function viewStresses() {
    const container = document.getElementById('stressjar-container');
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    container.innerHTML = '';
    if (stresses.length === 0) {
        container.innerHTML = '<p>No stresses saved.</p>';
        return;
    }
    stresses.forEach((stress, index) => {
        const div = document.createElement('div');
        div.className = 'stress-item';
        div.innerHTML = `
            <p>${stress.date}: ${stress.text}</p>
            <button onclick="deleteStress(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
    gtag('event', 'View Stresses', { 'event_category': 'StressJar', 'event_label': 'Stresses Viewed' });
}

function deleteStress(index) {
    let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    stresses.splice(index, 1);
    localStorage.setItem('stresses', JSON.stringify(stresses));
    viewStresses();
    playSound(clickSound, 0.3);
}

function startMoodQuest() {
    let time = 90;
    const goalInput = document.getElementById('quest-goal');
    const stepsContainer = document.getElementById('quest-steps');
    const progressMap = document.getElementById('quest-progress-map');
    const timerElement = document.getElementById('moodquest-timer');
    goalInput.value = '';
    stepsContainer.innerHTML = '';
    progressMap.innerHTML = '<div id="progress-marker" style="left: 0;"></div>';
    updateProgress('moodquest-progress', 90, 0);
    window.moodquestInterval = setInterval(() => {
        time--;
        timerElement.textContent = `Time remaining: ${time}s`;
        updateProgress('moodquest-progress', 90, time);
        if (time <= 0) {
            clearInterval(window.moodquestInterval);
            playSound(successSound, 0.4);
            setTimeout(() => closePopup('moodquest'), 1500);
        }
    }, 1000);
}

function generateQuest() {
    const goalInput = document.getElementById('quest-goal');
    const stepsContainer = document.getElementById('quest-steps');
    const progressMap = document.getElementById('quest-progress-map');
    if (!goalInput.value.trim()) {
        alert('Please enter a quest goal.');
        return;
    }
    const steps = [
        { task: "Take 5 deep breaths", xp: 1 },
        { task: "Write down 3 things you're grateful for", xp: 2 },
        { task: "Do a quick stretch", xp: 1 },
        { task: "Drink a glass of water", xp: 1 },
        { task: "Listen to a favorite song", xp: 2 },
        { task: "Take a 5-minute walk", xp: 3 }
    ];
    const questSteps = [];
    const stepCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < stepCount; i++) {
        const randomStep = steps[Math.floor(Math.random() * steps.length)];
        questSteps.push(randomStep);
        steps.splice(steps.indexOf(randomStep), 1);
    }
    stepsContainer.innerHTML = '';
    let totalXP = 0;
    questSteps.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'quest-step';
        div.innerHTML = `
            <input type="checkbox" id="step-${index}" onchange="updateQuestProgress(${index}, ${step.xp})">
            <label for="step-${index}">${step.task} (+${step.xp} XP)</label>
        `;
        stepsContainer.appendChild(div);
        totalXP += step.xp;
    });
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    quests.push({
        goal: goalInput.value,
        steps: questSteps,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('quests', JSON.stringify(quests));
    gtag('event', 'Generate Quest', { 'event_category': 'MoodQuest', 'event_label': goalInput.value });
}

function updateQuestProgress(stepIndex, xp) {
    const progressMap = document.getElementById('quest-progress-map');
    const marker = document.getElementById('progress-marker');
    const checkboxes = document.querySelectorAll('#quest-steps input[type="checkbox"]');
    let completed = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) completed++;
    });
    const progress = (completed / checkboxes.length) * 100;
    marker.style.left = `${progress}%`;
    let totalXP = JSON.parse(localStorage.getItem('totalXP') || '0');
    totalXP = parseInt(totalXP) + xp;
    localStorage.setItem('totalXP', totalXP);
    checkBadges(totalXP);
    gtag('event', 'Complete Quest Step', { 'event_category': 'MoodQuest', 'event_label': `Step ${stepIndex}` });
}

function checkBadges(totalXP) {
    const badgesContainer = document.getElementById('quest-badges');
    let badges = JSON.parse(localStorage.getItem('badges') || '[]');
    const badgeLevels = [
        { xp: 10, name: 'Quest Starter' },
        { xp: 25, name: 'Task Champion' },
        { xp: 50, name: 'Mood Master' }
    ];
    badgeLevels.forEach(level => {
        if (totalXP >= level.xp && !badges.includes(level.name)) {
            badges.push(level.name);
            alert(`New badge earned: ${level.name}!`);
        }
    });
    localStorage.setItem('badges', JSON.stringify(badges));
    badgesContainer.innerHTML = badges.length ? `Badges: ${badges.join(', ')}` : 'No badges yet';
}

function viewQuests() {
    const stepsContainer = document.getElementById('quest-steps');
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    stepsContainer.innerHTML = '';
    if (quests.length === 0) {
        stepsContainer.innerHTML = '<p>No quests saved.</p>';
        return;
    }
    quests.forEach((quest, index) => {
        const div = document.createElement('div');
        div.className = 'quest-item';
        div.innerHTML = `
            <p><strong>Goal:</strong> ${quest.goal}</p>
            <p><strong>Date:</strong> ${quest.date}</p>
            <p><strong>Steps:</strong></p>
            <ul>${quest.steps.map(step => `<li>${step.task} (+${step.xp} XP)</li>`).join('')}</ul>
            <button onclick="deleteQuest(${index})">Delete</button>
        `;
        stepsContainer.appendChild(div);
    });
    gtag('event', 'View Quests', { 'event_category': 'MoodQuest', 'event_label': 'Quests Viewed' });
}

function deleteQuest(index) {
    let quests = JSON.parse(localStorage.getItem('quests') || '[]');
    quests.splice(index, 1);
    localStorage.setItem('quests', JSON.stringify(quests));
    viewQuests();
    playSound(clickSound, 0.3);
}
