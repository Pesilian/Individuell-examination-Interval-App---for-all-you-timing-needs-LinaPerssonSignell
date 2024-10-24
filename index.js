$(document).ready(function () {
  $('#analogClock, #digitalClock, #buttonsOverlay, #alarmOverlay').hide();
  $('#timerOverlay').show();
  $('#loadingscreenOverlay').show();

  $('.loadingscreen-overlay').click(function () {
    $('#loadingscreenOverlay').hide();
  });

  // När "set time" knappen trycks
  $('.menu button:contains("set time")').click(function () {
    $('#analogClock, #digitalClock, #buttonsOverlay, #alarmOverlay').hide(); // Döljer andra overlays
    $('#timerOverlay').show(); // Visar timer-overlay
  });

  // När "Analoge" knappen trycks
  $('.menu button:contains("Analoge")').click(function () {
    $('#digitalClock, #timerOverlay, #alarmOverlay').hide(); // Döljer andra overlays
    $('#analogClock, #buttonsOverlay').show(); // Visar analog klocka
  });

  // När "Digital" knappen trycks
  $('.menu button:contains("Digital")').click(function () {
    $('#analogClock, #timerOverlay, #alarmOverlay').hide(); // Döljer andra overlays
    $('#digitalClock, #buttonsOverlay').show(); // Visar digital klocka
  });

  // Korrigerat till att referera till rätt selektor
  $('#setTimeButton').click(function () {
    $('#analogClock, #alarmOverlay').hide(); // Döljer andra overlays
    $('#digitalClock, #timerOverlay, #buttonsOverlay').show(); // Visar digital klocka
  });

  // Korrigerat till att referera till rätt selektor
  $('#startbutton').click(function () {
    $('#analogClock, #alarmOverlay,  #timerOverlay, ').hide(); // Döljer andra overlays
    $('#digitalClock, #buttonsOverlay').show(); // Visar digital klocka
  });
});
