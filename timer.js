var timer = new easytimer.Timer();
let countdownValue = 0;
let intervalId;
let analogClockIntervalId = null;
let analogClockSeconds = 0;

// Funktion för att visa tiden i formatet SS
function displayTimeInDisplay(seconds) {
  $('#timeDisplay').html(`${String(seconds).padStart(2, '0')}`); // Visar bara sekunder
  $('.values').html(String(seconds).padStart(2, '0'));
}

// Funktion för att uppdatera nedräkningsvärdet
function updateTimerValue(secondsToAdd) {
  countdownValue = Math.max(0, countdownValue + secondsToAdd);
  displayTimeInDisplay(countdownValue);
}

// Funktion för att uppdatera den analoga klockan baserat på timern
function updateAnalogClock() {
  analogClockSeconds++; // Öka sekunder med 1 varje gång klockan tickar
  const secondDegree = (analogClockSeconds % 60) * 6; // Omvandla till grader (360/60)

  // Uppdatera visarnas rotation
  $('#sec').css('transform', `rotate(${secondDegree}deg)`);
}

// Funktion för att återställa timern
function resetTimer() {
  timer.stop();
  countdownValue = 0; // Nollställ nedräkningsvärdet
  displayTimeInDisplay(countdownValue);
  clearInterval(analogClockIntervalId); // Rensa intervallet
  analogClockIntervalId = null; // Nollställ intervallet
  timer.reset(); // Nollställ timern
  $('#startPauseButton').attr('src', 'assets/play.svg'); // Återställ knappen till play
}

// Klickhändelse för start/pause-knappen
$(document).ready(function () {
  let timerRunning = false; // För att hålla reda på om timern är igång

  // Klickhändelse för start/pause-knappen
  $('#startPauseButton').click(function () {
    if (!timerRunning) {
      $(this).attr('src', 'assets/pause.svg');
      timerRunning = true;
      timer.start({
        countdown: true,
        startValues: { seconds: countdownValue },
      });
      analogClockIntervalId = setInterval(updateAnalogClock, 1000);
    } else {
      $(this).attr('src', 'assets/play.svg'); // Ändra till play-ikon
      timerRunning = false;
      timer.pause();
      clearInterval(analogClockIntervalId); // Pausa den analoga klockan
      analogClockIntervalId = null; // Nollställ intervallet
    }

    $('#analogClock, #alarmOverlay, #timerOverlay').hide();
    $('#digitalClock, #buttonsOverlay').show();
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
    $('#analogClock, #timerOverlay, #digitalClock, #buttonsOverlay').hide();
    $('#alarmOverlay').show();

    setTimeout(function () {
      $('#alarmOverlay').hide();
      $('#timerOverlay,  #buttonsOverlay').show();
    }, 3000);

    // Rensa den analoga klockan och återställ knappen
    clearInterval(analogClockIntervalId); // Rensa intervallet
    analogClockIntervalId = null; // Nollställ intervallet
    $('#startPauseButton').attr('src', 'assets/play.svg'); // Se till att knappen är resetad
    timerRunning = false; // Ställ in timerRunning till false
  });

  // Klickhändelse för knappen för att ställa in ny tid
  $('#alarmOverlay .setTime').click(function () {
    resetTimer(); // Återställ timern
    let newTime = prompt('Enter new time in seconds:');
    if (newTime !== null) {
      countdownValue = parseInt(newTime, 10) || 0;
      displayTimeInDisplay(countdownValue);
    }

    $('#alarmOverlay').hide();
    $('#timerOverlay,  #buttonsOverlay').show();
  });

  // Uppdatera tiden direkt vid sidladdning
  displayTimeInDisplay(countdownValue);
});
