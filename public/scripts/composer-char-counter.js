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

    charactersRemaining < 0 ? $counterElement.addClass('negative') : $counterElement.removeClass('negative');
    
    $counterElement.text(charactersRemaining);
  })
});