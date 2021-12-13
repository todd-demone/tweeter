const MAX_LENGTH = 140;
$(document).ready(() => {
  $('#tweet-text').on('input', (e) => {
    // jQuery assigns the target element (textarea) to `this`,
    // but only if we use ES5 function syntax (can't use fat arrow syntax).
    // `$(this).val()` is the string entered into the textarea e.g., 'some text'
    const $textareaElement = $(e.currentTarget);
    const $counterElement = $textareaElement.parent().find(".counter");
    const tweetLength = $textareaElement.val().length;
    const charactersRemaining = MAX_LENGTH - tweetLength;
    const $errorElement = $textareaElement.parent().siblings('.error');
    if (charactersRemaining < 0) {
      $counterElement.addClass('negative');
      $errorElement.children('.msg').html(`<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; &nbsp; &nbsp;This tweet is too long. Please limit your tweet to 140 characters or less.&nbsp; &nbsp; &nbsp;<i class="fa-solid fa-triangle-exclamation"></i>`);
      $errorElement.slideDown();
    } else {
      $counterElement.removeClass('negative');
      $errorElement.slideUp();
    }

    
    $counterElement.text(charactersRemaining);
  })
});