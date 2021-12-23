// navigation.js

const navButtonsEvents = () => {
  const $navButtons = $('#nav-buttons');

  // hide/show the tweet form element when this button is clicked
  $navButtons.on('click', '.toggle-tweet', () => {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-textarea').focus();
  });

  // scroll to the top of window, hide the scroll-top button and show the tweet-toggle button when this button is clicked
  $navButtons.on('click', '.scroll-top', e => {
    const $scrollToTopButton = $(e.currentTarget);
    const $toggleTweet = $scrollToTopButton.siblings('.toggle-tweet');

    $('html, body').animate({scrollTop: 0}).promise()
      .then(() => {
        $scrollToTopButton.slideUp('slow');
        $toggleTweet.slideDown('slow');
        $('.new-tweet').slideDown('slow');
        $('#tweet-textarea').focus();
      });
  });
};


const showHideButtonsOnScroll = () => {
  // hide/show the tweet-toggle button and hide/show the scroll-top button as specified below  
  $(window).on('scroll', e => {
    const scrollPosition = $(e.currentTarget).scrollTop();
    const $scrollToTopButton = $('.scroll-top');
    const $toggleTweet = $scrollToTopButton.siblings('.toggle-tweet');

    if (scrollPosition > 150) {
      $scrollToTopButton.slideDown('slow');
      $toggleTweet.slideUp();
    } else {
      $scrollToTopButton.slideUp('slow');
      $toggleTweet.slideDown('slow');
    }
  });
};

export { navButtonsEvents, showHideButtonsOnScroll };