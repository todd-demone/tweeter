const MAX_LENGTH = 140;

$(() => {
  
  // event: textarea contents are changed by user
  // handler: update counter; if below 0, change to red and show error message;
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