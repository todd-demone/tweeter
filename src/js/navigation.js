// navigation.js

const navbarButtonsEvents = () => {
  const $navbarButtons = $(".navbar__buttons");

  // hide/show the tweet form element when this button is clicked
  $navbarButtons.on("click", ".navbar__button--toggle", () => {
    $(".new-tweet").slideToggle("slow");
    $("#new-tweet__textarea").trigger('focus');
  });

  // scroll to the top of window, hide the scrolltop button and show the tweet-toggle button when this button is clicked
  $navbarButtons.on("click", ".navbar__button--scrolltop", (e) => {
    const $scrollToTopButton = $(e.currentTarget);
    const $toggleTweet = $scrollToTopButton.siblings(".navbar__button--toggle");

    $("html, body")
      .animate({ scrollTop: 0 })
      .promise()
      .then(() => {
        $scrollToTopButton.slideUp("slow");
        $toggleTweet.slideDown("slow");
        $(".new-tweet").slideDown("slow");
        $("#new-tweet__textarea").trigger('focus');
      });
  });
};

const showHideButtonsOnScroll = () => {
  // hide/show the tweet-toggle button and hide/show the scrolltop button as specified below
  $(window).on("scroll", (e) => {
    const scrollPosition = $(e.currentTarget).scrollTop();
    const $scrollToTopButton = $(".navbar__button--scrolltop");
    const $toggleTweet = $scrollToTopButton.siblings(".navbar__button--toggle");

    if (scrollPosition > 150) {
      $scrollToTopButton.slideDown("slow");
      $toggleTweet.slideUp();
    } else {
      $scrollToTopButton.slideUp("slow");
      $toggleTweet.slideDown("slow");
    }
  });
};

export { navbarButtonsEvents, showHideButtonsOnScroll };
