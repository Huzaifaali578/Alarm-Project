// Function for Displaying Display-Time
var currTime = document.getElementById("current-time");

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  // Using Ternary Operator
  hh = hh < 10 ? '0' + hh : hh;
  mm = mm < 10 ? '0' + mm : mm;
  ss = ss < 10 ? '0' + ss : ss;

  let time = `${hh}:${mm}:${ss}`;
  currTime.innerText = time;

  setTimeout(function () {
    currentTime();
    if (alarm_List.includes(time)) {
      ringing(time);
    }
  }, 1000);
}

currentTime();

// If Hours, min, and sec are less than 10, then formatTime function puts '0' before a single digit.
function formatTime(time) {
  // Check if time is a string before checking its length
  if (time < 10 && String(time).length !== 2) {
    return '0' + time;
  }
  return time;
}

const myList = document.querySelector('.set-alarm-list');

// Adding Alarm into the user
let alarm_List = [];
const userInput = document.getElementById('alarmForm');
userInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const hour = document.getElementById('hour').value;
  const min = document.getElementById('min').value;
  const sec = document.getElementById('sec').value;
  let new_h = formatTime(hour);
  let new_m = formatTime(min);
  let new_s = formatTime(sec);

  const new_Alarm = `${new_h}:${new_m}:${new_s}`;
  
  if (!isNaN(new_h) && !isNaN(new_m) && !isNaN(new_s)) {
    if (!alarm_List.includes(new_Alarm)) {
      alarm_List.push(new_Alarm);
      shownew_Alarm(new_Alarm);
      userInput.reset();
    } else {
      alert(`Alarm for ${new_Alarm} is already set.`);
    }
  } else {
    alert(`Invalid time entered. Please use numbers for hours, minutes, and seconds.`);
  }
});

// shownew_Alarm Function ADD New Alarm In New List With Delete Button
function shownew_Alarm(new_Alarm) {
  const li = document.createElement('li');
  li.classList.add('time-list');
  li.innerHTML = `
     <span class="time">${new_Alarm}</span>  
     <button class="deleteAlarm time-control" onclick="removeAlarm('${new_Alarm}')">Delete</button>
  `;
  myList.appendChild(li);
}

// Add Audio Ring Alarm
const audio = new Audio(
  "https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3"
);

// adding loop to continue Alarm
audio.loop = true;

// Ring This Audio at The Correct time
function ringing(time) {
  audio.play();
  alert(`Hey! it is ${time}`);
}

// Function For Stop alarm
myList.addEventListener('click', (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
    removeAlarm(e.target.previousElementSibling.textContent);
  }
});

// REMOVE ALARM FROM alarm_List WHEN ("Delete alarm) button is Clicked
function removeAlarm(value) {
  alarm_List = alarm_List.filter((time) => time !== value);
}

// stop Alarm fucntion
function clearAlarm() {
  // Stop the audio
  audio.pause();
  audio.currentTime = 0;

  // Optionally, you can also clear the alarm list
  alarm_List = [];
  myList.innerHTML = "";
}
