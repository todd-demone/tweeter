$(document).ready( () => {

  $('.navbar button.cta').on('click', e => {
    $('.new-tweet').slideToggle();
    document.getElementById('tweet-text').focus();
  });

  $(window).on('unload', () => {
    $(window).scrollTop(0);
  });


  let lastScrollTop = 0;

  $(window).on('scroll', e => {
    const st = $(window).scrollTop();
    console.log(st);
    if (st > lastScrollTop) {
      $('.navbar button.scroll-to-top').slideDown();
      $('.navbar button.cta').slideUp();
    } else if (st === 0) {
      $('.navbar button.scroll-to-top').slideUp();
      $('.navbar button.cta').slideDown();
    }
    lastScrollTop = st;
  })

  $('.navbar button.scroll-to-top').on('click', () => {
    $('html, body').animate(
      { scrollTop: 0 }, 
      () => {
        $('.navbar button.scroll-to-top').slideUp();
        $('.navbar button.cta').slideDown();
        $('.new-tweet').slideDown();
        document.getElementById('tweet-text').focus();

      } 
    );
    return false;
  });

});