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
      $('#analogClock, #buttonsOverlay').show();
      $('#digitalClock').hide();
    } else {
      $('#digitalClock, #buttonsOverlay').show();
      $('#analogClock').hide();
    }

    // Dölj alarmOverlay och timerOverlay
    $('#alarmOverlay, #timerOverlay').hide();
  });

  // Eventhanterare för öka- och minska-knapparna
  $('#increaseTimeButton').click(function () {
    updateTimerValue(1); // Ökar tiden med en sekund
  });

  $('#decreaseTimeButton').click(function () {
    updateTimerValue(-1); // Minskar tiden med en sekund
  });

  // Händelser kopplade till timerobjektet
  timer.addEventListener('secondsUpdated', function () {
    countdownValue = timer.getTotalTimeValues().seconds; // Uppdatera nedräkningsvärdet
    displayTimeInDisplay(countdownValue); // Uppdatera visningen av tiden
  });

  timer.addEventListener('started', function () {
    countdownValue = timer.getTotalTimeValues().seconds; // Uppdatera nedräkningsvärdet
    displayTimeInDisplay(countdownValue); // Uppdatera visningen av tiden
  });

  timer.addEventListener('reset', function () {
    resetTimer(); // Återställ timern
  });

  timer.addEventListener('targetAchieved', function () {
    // Döljer alla relevanta element och visar alarmOverlay samt setTime-knappen
    $('#analogClock, #timerOverlay, #digitalClock, #buttonsOverlay').hide();
    $('#alarmOverlay, #setTime').show();

    resetTimer();
  });

  // Klickhändelse för abort timer-knappen
  $('#abortTimerButton').click(function () {
    resetTimer();
    $('#analogClock, #digitalClock,  #alarmOverlay, #setTime').hide();
    $('#buttonsOverlay, #timerOverlay').show();
  });

  displayTimeInDisplay(countdownValue);
});
