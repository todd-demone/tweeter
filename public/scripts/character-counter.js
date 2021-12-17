const MAX_LENGTH = 140;

$(() => {
  
  /**
   * When the textarea contents are changed by the user, the method
   * updates the tweet form's character counter with the # of allowable
   * characters remaining.
   * When the new textarea contains > 140 characters, the method changes
   * the character counter's colour to red and show the error message.
   */
  $('#tweet-text').on('input', e => {
    const $tweetText = $(e.currentTarget);
    const $counter = $tweetText.parent().find(".counter");
    const tweetLength = $tweetText.val().length;
    const charactersRemaining = MAX_LENGTH - tweetLength;
    const $errorBox = $tweetText.parent().siblings('.error');
    const $errorMessage = $errorBox.children('.msg');

    if (charactersRemaining < 0) {
      $counter.addClass('negative');
      $errorMessage.html("Tweets can't exceed 140 characters.");
      $errorBox.slideDown();
    } else {
      $counter.removeClass('negative');
      $errorBox.slideUp();
    }
    
    $counter.text(charactersRemaining);
  });

});