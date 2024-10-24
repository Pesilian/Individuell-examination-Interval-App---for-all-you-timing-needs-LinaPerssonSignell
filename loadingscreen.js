const pathElems = document.querySelectorAll('svg path');

anime({
  targets: pathElems,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 3000,
});
