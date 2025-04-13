document.addEventListener('DOMContentLoaded', () => {
  const feelings = {
    tired: ["Breathing Timer", "Color Matching"],
    stressed: ["Puzzle Game", "White Noise Generator"],
    bored: ["Pixel Art Pad", "Word Scramble"],
    anxious: ["5-4-3-2-1 Game", "Calming Patterns"],
    excited: ["Rhythm Game", "Goal Tracker"],
    happy: ["Gratitude Builder", "Story Interaction"],
    frustrated: ["Punching Bag", "Block Smashing"],
    lonely: ["Virtual Pet", "Conversation Prompts"],
    overwhelmed: ["To-Do List", "Progress Bar"],
    angry: ["Stress Ball Clicker", "Projectile Game"],
  };

  const buttons = document.querySelectorAll('.feeling-btn');
  const recommendationsContainer = document.getElementById('recommendations-container');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const feeling = button.getAttribute('data-feeling');
      const activities = feelings[feeling];
      recommendationsContainer.innerHTML = activities
        .map(activity => {
          if (activity === "Breathing Timer") {
            return `
              <div class="breathing-timer">
                <p>Breathe In...</p>
                <div class="circle"></div>
              </div>`;
          }
          return `<button class="activity-btn">${activity}</button>`;
        })
        .join('');
    });
  });
});
