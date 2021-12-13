$(document).ready( () => {
  $('.navbar button.cta').on('click', e => {
    $('.new-tweet').slideToggle();
  });
});