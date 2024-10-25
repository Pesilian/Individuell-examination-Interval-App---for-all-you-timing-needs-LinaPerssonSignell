$(document).ready(function () {
  $(
    '#analogClock, #digitalClock, #alarmOverlay, #menuOverlay, #setTime, #abortTimerButton'
  ).hide();
  $('#timerOverlay,  #startPauseButton').show();
  $('#loadingscreenOverlay').show();

  $('.loadingscreen-overlay').click(function () {
    $('#loadingscreenOverlay').hide();
  });

  $('#menuLogo').click(function () {
    $(
      '#analogClock, #digitalClock, #startPauseButton, #abortTimerButton, #alarmOverlay, #timerOverlay'
    ).hide();
    $('#menuOverlay').show();
  });

  $('#homeButton').click(function () {
    $(
      '#analogClock,  #alarmOverlay, #digitalClock, #menuOverlay, #abortTimerButton'
    ).hide();
    $('#timerOverlay, #startPauseButton').show();
  });

  $('#analogButton').click(function () {
    $('#digitalClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#analogClock, #startPauseButton, #abortTimerButton').show();
  });

  $('#digitalButton').click(function () {
    $('#analogClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#digitalClock, #startPauseButton, #abortTimerButton').show();
  });

  $('#setTime').click(function () {
    $(
      '#alarmOverlay, #setTime, #analogClock,  #digitalOverlay, #menuOverlay, #abortTimerButton'
    ).hide();
    $('#timerOverlay,  #startPauseButton').show();
  });
});
