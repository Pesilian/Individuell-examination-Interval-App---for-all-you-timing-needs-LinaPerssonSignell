$(document).ready(function () {
  $(
    '#analogClock, #digitalClock, #alarmOverlay, #menuOverlay, #setTime'
  ).hide();
  $('#timerOverlay,  #buttonsOverlay').show();
  $('#loadingscreenOverlay').show();

  $('.loadingscreen-overlay').click(function () {
    $('#loadingscreenOverlay').hide();
  });

  $('#menuLogo').click(function () {
    $(
      '#analogClock, #digitalClock, #buttonsOverlay, #alarmOverlay, #timerOverlay'
    ).hide();
    $('#menuOverlay').show();
  });

  $('#homeButton').click(function () {
    $('#analogClock,  #alarmOverlay, #digitalClock, #menuOverlay').hide();
    $('#timerOverlay, #buttonsOverlay').show();
  });

  $('#analogButton').click(function () {
    $('#digitalClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#analogClock, #buttonsOverlay').show();
  });

  $('#digitalButton').click(function () {
    $('#analogClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#digitalClock, #buttonsOverlay').show();
  });

  $('#setTime').click(function () {
    $(
      '#alarmOverlay, #setTime, #analogClock,  #digitalOverlay, #menuOverlay'
    ).hide();
    $('#timerOverlay,  #buttonsOverlay').show();
  });
});
