// tweetForm.js

import { isValidTweet, MAX_LENGTH, sendErrorMessage } from './helpers.js';
import loadTweets from './tweetsContainer.js';


const tweetFormEvents = () => {
  const $tweetForm = $('#tweet-form');
  
  // send Tweet to server when user clicks 'Tweet' button
  $tweetForm.on('submit', postFormData);
  
  // send tweet to server when user hits Enter key while in textarea
  $tweetForm.on('keydown', e => { 
    if (e.keyCode === 13) postFormData(e);
  });
  
  // update character counter to show how many characters until hit MAX_LENGTH; turn counter red if exceed MAX_LENGTH
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

// callback function for tweet form submission events (above)
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