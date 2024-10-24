var timer = new easytimer.Timer();
var countdownValue = 0;

let hourHand = document.getElementById('hour');
let minHand = document.getElementById('min');
let secHand = document.getElementById('sec');

let intervalId;

function displayTime(hours, minutes, seconds) {
  let hourRotation = (hours % 12) * 30 + minutes / 2;
  let minRotation = minutes * 6;
  let secRotation = seconds * 6;

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minHand.style.transform = `rotate(${minRotation}deg)`;
  secHand.style.transform = `rotate(${secRotation}deg)`;
}

function setTimer(hours, minutes, seconds) {
  countdownValue = hours * 3600 + minutes * 60 + seconds;

  var formattedHours = Math.floor(countdownValue / 3600);
  var formattedMinutes = Math.floor((countdownValue % 3600) / 60);
  var formattedSeconds = countdownValue % 60;

  $('#digital .values').html(
    `${String(formattedHours).padStart(2, '0')}:${String(
      formattedMinutes
    ).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`
  );

  displayTime(0, 0, 0);
}

$('#setTimeButton').click(function () {
  var hours = parseInt($('#inputTimeHours').val(), 10) || 0;
  var minutes = parseInt($('#inputTimeMinutes').val(), 10) || 0;
  var seconds = parseInt($('#inputTimeSeconds').val(), 10) || 0;

  if (hours >= 0 || minutes >= 0 || seconds >= 0) {
    setTimer(hours, minutes, seconds);
  } else {
    alert('Vänligen ange giltiga tider.');
  }
});

$('#buttons .startButton').click(function () {
  if (!timer.isRunning() && countdownValue > 0) {
    timer.start({ countdown: true, startValues: { seconds: countdownValue } });

    intervalId = setInterval(() => {
      const elapsedTime = timer.getTimeValues();
      const totalSeconds = countdownValue;
      const secondsPassed =
        totalSeconds -
        (elapsedTime.hours * 3600 +
          elapsedTime.minutes * 60 +
          elapsedTime.seconds);

      displayTime(
        Math.floor(secondsPassed / 3600),
        Math.floor((secondsPassed % 3600) / 60),
        secondsPassed % 60
      );
    }, 1000);
  }
});

$('.pauseButton').click(function () {
  if (timer.isRunning()) {
    timer.pause();
    clearInterval(intervalId);
  }
});

$('.resetButton').click(function () {
  timer.stop();
  countdownValue = 0;
  displayTime(0, 0, 0);

  var hours = parseInt($('#inputTimeHours').val(), 10) || 0;
  var minutes = parseInt($('#inputTimeMinutes').val(), 10) || 0;
  var seconds = parseInt($('#inputTimeSeconds').val(), 10) || 0;

  setTimer(hours, minutes, seconds);
});

$('.newTimerButton').click(function () {
  $('#inputTimeHours').val('');
  $('#inputTimeMinutes').val('');
  $('#inputTimeSeconds').val('');

  timer.stop();
  clearInterval(intervalId);
  displayTime(0, 0, 0);
});

timer.addEventListener('secondsUpdated', function () {
  const elapsedTime = timer.getTimeValues();
  $('#digital .values').html(elapsedTime.toString());
});

timer.addEventListener('started', function () {
  const elapsedTime = timer.getTimeValues();
  $('#digital .values').html(elapsedTime.toString());
});

timer.addEventListener('reset', function () {
  $('#digital .values').html('00:00:00');
});

timer.addEventListener('targetAchieved', function () {
  $('#digital .values').html('KABOOM!!');
});
