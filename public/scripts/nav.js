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
    if (st > lastScrollTop) {
      $('.navbar button.scroll-to-top').show();
      $('.navbar button.cta').hide();
    } else if (st === 0) {
      $('.navbar button.cta').show();
      $('.navbar button.scroll-to-top').hide();
    } else {
      $('.navbar button.cta').show();
    }
    lastScrollTop = st;
  })

  $('.navbar button.scroll-to-top').on('click', () => {
    $('html, body').animate(
      { scrollTop: 0 }, 
      () => {
          $('.navbar button.cta').show();
          $('.navbar button.scroll-to-top').hide();
          $('.new-tweet').slideDown();
          document.getElementById('tweet-text').focus();

      } 
    );
    return false;
  });

});