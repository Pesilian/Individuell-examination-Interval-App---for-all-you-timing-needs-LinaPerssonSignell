$(document).ready(function () {
  $('#analogClock, #digitalClock, #alarmOverlay, #menuOverlay').hide();
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
    $('#analogClock,  #alarmOverlay, #menuOverlay').hide();
    $('#timerOverlay, #digitalClock, #buttonsOverlay').show();
  });

  $('#analogButton').click(function () {
    $('#digitalClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#analogClock, #buttonsOverlay').show();
  });

  $('#digitalButton').click(function () {
    $('#analogClock, #timerOverlay, #alarmOverlay, #menuOverlay').hide();
    $('#digitalClock, #buttonsOverlay').show();
  });
});
