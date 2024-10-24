$(document).ready(function () {
  $(
    '#analogClock, #digitalClock, #buttonsOverlay, #alarmOverlay, #menuOverlay'
  ).hide();
  $('#timerOverlay').show();
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
    $('#analogClock, #digitalClock, #buttonsOverlay, #alarmOverlay').hide();
    $('#timerOverlay').show();
  });

  $('#analogButton').click(function () {
    $('#digitalClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#analogClock, #buttonsOverlay').show();
  });

  $('#digitalButton').click(function () {
    $('#analogClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#digitalClock, #buttonsOverlay').show();
  });

  $('#setTimeButton').click(function () {
    $('#analogClock, #alarmOverlay, #menuOverlay').hide();
    $('#digitalClock, #timerOverlay, #buttonsOverlay').show();
  });

  $('#startbutton').click(function () {
    $('#analogClock, #alarmOverlay,  #timerOverlay, ').hide();
    $('#digitalClock, #buttonsOverlay').show();
  });
});
