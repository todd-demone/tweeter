// newTweetForm.js

import loadTweets from './tweetsContainer.js';
import sendErrorMessage from "./helpers.js";

// event: submit form data via 'Tweet' button
// handler: see postForm() above
const postDataOnSubmit = () => {
  $('#tweet-form').on('submit', postFormData);
};


// event: submit form data via Enter key
// handler: see postForm() above
const postDataOnEnterKey = () => {
  $('#tweet-form').on('keydown', e => {
    if (e.keyCode === 13) postFormData(e);
  });
};


// event: textarea contents are changed by user
// handler: update counter; if below 0, change to red and show error message;
const countCharacters = () => {
  const MAX_LENGTH = 140;
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
};

// This function is called when a form is submitted (see above).
// Validates text in form, POSTs data to server, loads tweets.
const postFormData = e => {
  const $tweetForm = $(e.currentTarget);
  const tweetString = $tweetForm.children('#tweet-text').val();
  const data = $tweetForm.serialize();
  
  e.preventDefault();

  if (!tweetString) return sendErrorMessage("You can't send an empty tweet.");
  if (tweetString.length > 140) return sendErrorMessage("Tweets can't exceed 140 characters.");

  $.post('/tweets', data)
    .then(() => {
      loadTweets();
      $tweetForm.trigger('reset');
      $tweetForm.find(".counter").text('140');
    })
    .catch(err => sendErrorMessage(`Error: Your tweet did not get sent (${err.status} ${err.statusText})`));
};

export { postDataOnSubmit, postDataOnEnterKey, countCharacters };