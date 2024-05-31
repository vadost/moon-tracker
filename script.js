const { Julian, Moon, LunarPhase, NorthernHemisphereLunarEmoji, Hemisphere } = require('lunarphase-js');

// Function to get the formatted date string with day of the week
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
};

// Function to get the day of the week
const formatDayOfWeek = (date) => {
  const options = { weekday: 'long' };
  return date.toLocaleDateString('ru-RU', options);
};

// Function to add a moon phase row to the list
const addMoonPhaseRow = (row) => {
  const moonPhaseList = document.getElementById('moon-phase-list');
  const moonPhaseRow = document.createElement('div');
  moonPhaseRow.className = 'moon-phase-row';
  row.forEach(item => {
    const isWeekend = item.date.getDay() === 0 || item.date.getDay() === 6; // Check if Saturday or Sunday
    const moonPhaseItem = document.createElement('div');
    moonPhaseItem.className = `moon-phase-item ${isWeekend ? 'weekend' : ''}`;
    moonPhaseItem.innerHTML = `
            <div class="moon-phase-date">${formatDate(item.date)}</div>
            <div class="moon-phase-day">${formatDayOfWeek(item.date)}</div>
            <div>${item.lunarPhase}</div>
            <div>${item.lunarAgePercent.toFixed(2)}%</div>
            <div class="moon-phase-emoji">${item.lunarEmoji}</div>
        `;
    moonPhaseRow.appendChild(moonPhaseItem);
  });
  moonPhaseList.appendChild(moonPhaseRow);
};

// Get the previous lunar phase based on the current starting phase
const getPreviousPhase = (startingPhase) => {
  const phases = Object.values(LunarPhase);
  const index = phases.indexOf(startingPhase);
  return phases[(index - 1 + phases.length) % phases.length];
};

// Function to generate moon phases for a given year and starting phase
const generateMoonPhases = (year, startingPhase) => {
  let phases = [[]];
  let currentIndex = 0;
  const previousPhase = getPreviousPhase(LunarPhase[startingPhase]);

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const date = new Date(year, month, day);
      const lunarAgePercent = Moon.lunarAgePercent(date);
      const lunarPhase = Moon.lunarPhase(date, { hemisphere: Hemisphere.NORTHERN });
      const lunarEmoji = Moon.lunarPhaseEmoji(date, { hemisphere: Hemisphere.NORTHERN });

      const data = { date, lunarAgePercent, lunarPhase, lunarEmoji };

      const currentPhase = phases[currentIndex];
      if (lunarPhase === LunarPhase[startingPhase] && currentPhase.length > 0 && currentPhase[currentPhase.length - 1].lunarPhase === previousPhase) {
        currentIndex = currentIndex + 1;
        phases[currentIndex] = [];
      }
      phases[currentIndex].push(data);
    }
  }

  // Clear existing phases
  document.getElementById('moon-phase-list').innerHTML = '';

  // Render the moon phases to the HTML
  phases.forEach(phaseRow => addMoonPhaseRow(phaseRow));
};

// Event listener for year and phase select change
document.getElementById('year-select').addEventListener('change', (event) => {
  const year = parseInt(event.target.value);
  const startingPhase = document.getElementById('phase-select').value;
  generateMoonPhases(year, startingPhase);
});

document.getElementById('phase-select').addEventListener('change', (event) => {
  const year = parseInt(document.getElementById('year-select').value);
  const startingPhase = event.target.value;
  generateMoonPhases(year, startingPhase);
});

// Initial generation for the default year and starting phase
generateMoonPhases(2024, 'FULL');
