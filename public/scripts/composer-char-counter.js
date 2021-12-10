const MAX_LENGTH = 140;
$(document).ready(() => {
  $('#tweet-text').on('input', function(_e) {
    // jQuery assigns the target element (textarea) to `this`,
    // but only if we use ES5 function syntax (can't use fat arrow syntax).
    // `$(this).val()` is the string entered into the textarea e.g., 'some text'
    const tweetLength = $(this).val().length; // e.g. => 9
    // Grab the counter HTML element
    const $counter = $(this).parent().find(".counter");
    // Turn the counter red if count reaches 0 or negative
    const charactersRemaining = MAX_LENGTH - tweetLength;
    charactersRemaining < 0 ? $counter.addClass('negative') : $counter.removeClass('negative');
    $counter.text(charactersRemaining);
  })
});