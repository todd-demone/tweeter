// tweetForm.js

import { isValidTweet, MAX_LENGTH, sendErrorMessage } from './helpers.js';
import loadTweets from './tweetsContainer.js';


const tweetFormEvents = () => {
  const $tweetForm = $('#tweet-form');
  
  $tweetForm.on('submit', postFormData);
  
  $tweetForm.on('keydown', e => { 
    if (e.keyCode === 13) postFormData(e);
  });
  
  $tweetForm.on('input', '#tweet-textarea', e => {
    const $tweetTextarea = $(e.currentTarget);
    const tweetString = $tweetTextarea.val();
    const $counter = $tweetForm.find(".counter");
    const $errorBox = $tweetForm.siblings('.error');

    if (tweetString.length > MAX_LENGTH) {
      $counter.addClass('negative');
      sendErrorMessage(`Tweets can't exceed ${MAX_LENGTH} characters.`);
    } else {
      $counter.removeClass('negative');
      $errorBox.slideUp();
    }
    
    $counter.text(MAX_LENGTH - tweetString.length);
  });
}


const postFormData = e => {
  const $tweetForm = $(e.currentTarget);
  const data = $tweetForm.serialize();
  const tweetString = $tweetForm.children('#tweet-textarea').val();
  
  e.preventDefault();

  if (!isValidTweet(tweetString)) return false;

  $.post('/tweets', data)
    .then(() => {
      loadTweets();
      $tweetForm
        .trigger('reset')
        .find(".counter").text(MAX_LENGTH);
    })
    .catch(err => sendErrorMessage(`Error: Your tweet did not get sent (${err.status} ${err.statusText})`));
};


export default tweetFormEvents;