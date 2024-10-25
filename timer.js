var timer = new easytimer.Timer();
let countdownValue = 0;
let intervalId;
let analogClockIntervalId = null;
let analogClockSeconds = 0;

// Funktion för att visa tiden i formatet SS
function displayTimeInDisplay(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  $('#timeDisplay').html(
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  );
  $('.values').html(
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  );
}

function updateTimerValue(minutesToAdd) {
  countdownValue = Math.max(0, countdownValue + minutesToAdd * 60); // Omvandlar minuter till sekunder
  displayTimeInDisplay(countdownValue);
  console.log(countdownValue);
}

function updateAnalogClock() {
  analogClockSeconds++; // Öka sekunder med 1 varje gång klockan tickar
  const secondDegree = (analogClockSeconds % 60) * 6; // Omvandla till grader (360/60)
  const minuteDegree = ((analogClockSeconds / 60) % 60) * 6; // Omvandla till grader för minuter

  // Uppdatera visarnas rotation
  $('#sec').css('transform', `rotate(${secondDegree}deg)`);
  $('#min').css('transform', `rotate(${minuteDegree}deg)`); // Lägg till minutvisare
}

// Funktion för att återställa timern
function resetTimer() {
  timer.stop();
  analogClockSeconds = 0;
  countdownValue = 0;
  displayTimeInDisplay(countdownValue);
  clearInterval(analogClockIntervalId);
  analogClockIntervalId = null;
  $('#startPauseButton').attr('src', 'assets/play.svg');
  timerRunning = false;
  console.log(countdownValue);
}

$(document).ready(function () {
  let timerRunning = false;

  $('#startPauseButton').click(function () {
    if (countdownValue === 0) {
      alert('Vänligen välj en tid innan du startar timern.');
      return;
    }

    if (!timerRunning) {
      $(this).attr('src', 'assets/pause.svg');
      timerRunning = true;

      console.log(`Starting timer with countdownValue: ${countdownValue}`);
      timer.start({
        countdown: true,
        startValues: { seconds: countdownValue },
      });
      analogClockIntervalId = setInterval(updateAnalogClock, 1000);
    } else {
      $(this).attr('src', 'assets/play.svg');
      timerRunning = false;
      timer.pause();
      clearInterval(analogClockIntervalId);
      analogClockIntervalId = null; //
    }

    if ($('#analogClock').is(':visible')) {
      $('#analogClock, #startPauseButton, #abortTimerButton').show();
      $('#digitalClock').hide();
    } else {
      $('#digitalClock, #startPauseButton, #abortTimerButton').show();
      $('#analogClock').hide();
    }

    // Dölj alarmOverlay och timerOverlay
    $('#alarmOverlay, #timerOverlay').hide();
  });

  $('#increaseTimeButton').click(function () {
    updateTimerValue(1);
  });

  $('#decreaseTimeButton').click(function () {
    updateTimerValue(-1);
  });

  timer.addEventListener('secondsUpdated', function () {
    countdownValue = timer.getTotalTimeValues().seconds;
    displayTimeInDisplay(countdownValue);
  });

  timer.addEventListener('started', function () {
    countdownValue = timer.getTotalTimeValues().seconds;
    displayTimeInDisplay(countdownValue);
  });

  timer.addEventListener('reset', function () {
    resetTimer();
  });

  timer.addEventListener('targetAchieved', function () {
    $('#analogClock, #timerOverlay, #digitalClock, #buttonsOverlay').hide();
    $('#alarmOverlay, #setTime').show();

    resetTimer();
  });

  $('#abortTimerButton').click(function () {
    resetTimer();
    $(
      '#analogClock, #digitalClock,  #alarmOverlay, #setTime, #abortTimerButton'
    ).hide();
    $('#startPauseButton, #timerOverlay').show();
  });

  displayTimeInDisplay(countdownValue);
});
