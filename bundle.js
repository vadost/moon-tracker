(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var I=(t=>(t.NORTHERN="Northern",t.SOUTHERN="Southern",t))(I||{}),T=(t=>(t.NEW="🌑",t.WAXING_CRESCENT="🌒",t.FIRST_QUARTER="🌓",t.WAXING_GIBBOUS="🌔",t.FULL="🌕",t.WANING_GIBBOUS="🌖",t.LAST_QUARTER="🌗",t.WANING_CRESCENT="🌘",t))(T||{}),E=(t=>(t.NEW="🌑",t.WAXING_CRESCENT="🌘",t.FIRST_QUARTER="🌗",t.WAXING_GIBBOUS="🌖",t.FULL="🌕",t.WANING_GIBBOUS="🌔",t.LAST_QUARTER="🌓",t.WANING_CRESCENT="🌒",t))(E||{}),i=(t=>(t.ANOMALISTIC="Anomalistic",t.DRACONIC="Draconic",t.SIDEREAL="Sidereal",t.SYNODIC="Synodic",t.TROPICAL="Tropical",t))(i||{}),r=(t=>(t.NEW="New",t.WAXING_CRESCENT="Waxing Crescent",t.FIRST_QUARTER="First Quarter",t.WAXING_GIBBOUS="Waxing Gibbous",t.FULL="Full",t.WANING_GIBBOUS="Waning Gibbous",t.LAST_QUARTER="Last Quarter",t.WANING_CRESCENT="Waning Crescent",t))(r||{});const G=24405875e-1,l=2.4234366115277777e6,C=27.55454988,s=29.53058770576;class c{static fromDate(e=new Date){return e.getTime()/864e5-e.getTimezoneOffset()/1440+G}static toDate(e){const a=new Date;return a.setTime((e-G+a.getTimezoneOffset()/1440)*864e5),a}}const R={hemisphere:I.NORTHERN},W=t=>(t-=Math.floor(t),t<0&&(t+=1),t);class A{static lunarAge(e=new Date){return A.lunarAgePercent(e)*s}static lunarAgePercent(e=new Date){return W((c.fromDate(e)-24515501e-1)/s)}static lunationNumber(e=new Date){return Math.round((c.fromDate(e)-l)/s)+1}static lunarDistance(e=new Date){const a=c.fromDate(e),n=A.lunarAgePercent(e)*2*Math.PI,S=2*Math.PI*W((a-24515622e-1)/C);return 60.4-3.3*Math.cos(S)-.6*Math.cos(2*n-S)-.5*Math.cos(2*n)}static lunarPhase(e=new Date,a){a={...R,...a};const N=A.lunarAge(e);return N<1.84566173161?r.NEW:N<5.53698519483?r.WAXING_CRESCENT:N<9.22830865805?r.FIRST_QUARTER:N<12.91963212127?r.WAXING_GIBBOUS:N<16.61095558449?r.FULL:N<20.30227904771?r.WANING_GIBBOUS:N<23.99360251093?r.LAST_QUARTER:N<27.68492597415?r.WANING_CRESCENT:r.NEW}static lunarPhaseEmoji(e=new Date,a){a={...R,...a};const N=A.lunarPhase(e);return A.emojiForLunarPhase(N,a)}static emojiForLunarPhase(e,a){const{hemisphere:N}={...R,...a};let n;switch(N===I.SOUTHERN?n=E:n=T,e){case r.WANING_CRESCENT:return n.WANING_CRESCENT;case r.LAST_QUARTER:return n.LAST_QUARTER;case r.WANING_GIBBOUS:return n.WANING_GIBBOUS;case r.FULL:return n.FULL;case r.WAXING_GIBBOUS:return n.WAXING_GIBBOUS;case r.FIRST_QUARTER:return n.FIRST_QUARTER;case r.WAXING_CRESCENT:return n.WAXING_CRESCENT;default:case r.NEW:return n.NEW}}static isWaxing(e=new Date){return A.lunarAge(e)<=14.765}static isWaning(e=new Date){return A.lunarAge(e)>14.765}}var _=(t=>(t.EARTH_RADII="Earth Radii",t.KILOMETERS="km",t.MILES="m",t))(_||{});exports.Hemisphere=I;exports.Julian=c;exports.LunarMonth=i;exports.LunarPhase=r;exports.Moon=A;exports.NorthernHemisphereLunarEmoji=T;exports.SouthernHemisphereLunarEmoji=E;exports.Unit=_;


},{}],2:[function(require,module,exports){
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

},{"lunarphase-js":1}]},{},[2]);
