// navigation.js

// event: click `toggle-tweet` button
// handler: shows/hides the `new-tweet` element
const toggleTweetButton = () => {
  $('.toggle-tweet').on('click', () => {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });
};


// event: click `scroll-top` button
// handler: scroll to top of screen, show `toggle-tweet` button, show `new-tweet` element
const scrollToTop = () => {
  $('.scroll-top').on('click', e => {
    const $scrollTop = $(e.currentTarget);
    const $toggleTweet = $scrollTop.siblings('.toggle-tweet');

    $('html, body').animate({scrollTop: 0}).promise()
      .then(() => {
        $scrollTop.slideUp('slow');
        $toggleTweet.slideDown('slow');
        $('.new-tweet').slideDown('slow');
        $('#tweet-text').focus();
      });
  });
};


// event: scroll
// handler: show/hide the buttons as specified
const showHideButtonsOnScroll = () => {
    $(window).on('scroll', e => {
      const scrollPosition = $(e.currentTarget).scrollTop();
      const $scrollTop = $('.scroll-top');
      const $toggleTweet = $scrollTop.siblings('.toggle-tweet');
  
      if (scrollPosition > 150) {
        $scrollTop.show('slow');
        $toggleTweet.slideUp();
      } else {
        $scrollTop.hide('slow');
        $toggleTweet.show('slow');
      }
    });
};

export { toggleTweetButton, scrollToTop, showHideButtonsOnScroll };