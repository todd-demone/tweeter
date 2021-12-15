const MAX_LENGTH = 140;

$(() => {
  
  // When the textarea contents are changed by the user, this event method updates the new tweet box's character counter with the # of allowable characters remaining.
  // When the new textarea contains > 140 characters, change the character counter's colour to red and show the error message.
  $('#tweet-text').on('input', (e) => {
    const $tweetText = $(e.currentTarget);
    const $counter = $tweetText.parent().find(".counter");
    const tweetLength = $tweetText.val().length;
    const charactersRemaining = MAX_LENGTH - tweetLength;
    const $errorBox = $tweetText.parent().siblings('.error');

    if (charactersRemaining < 0) {
      $counter.addClass('negative');
      $errorBox.children('.msg').html("You can't send a tweet longer than 140 characters.");
      $errorBox.slideDown();
    } else {
      $counter.removeClass('negative');
      $errorBox.slideUp();
    }
    
    $counter.text(charactersRemaining);
  });

});