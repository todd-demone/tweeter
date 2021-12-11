/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( () => {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet">`);
    const markup = `
    <header>
      <div class="avatar-and-name">
        <img src="${tweet.user.avatars}" alt="small-avatar" width="48" height="48">
        <span class="name">${tweet.user.name}</span>
      </div>
      <div class="handle">
        <span>${tweet.user.handle}</span>
      </div>
    </header>
    <main>${tweet.content.text}</main>
    <footer>
      <span class="date">${tweet.created_at}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    `;
    $tweet.append(markup);
    return $tweet;
  }
  
  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
});