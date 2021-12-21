// tweetsContainer.js

import sendErrorMessage from './helpers.js';

// makes GET request for tweets; if no errors, sends tweets to `renderTweets`
const loadTweets = () => {
  $.get('/tweets')
    .then(tweets => renderTweets(tweets))
    .catch(err => {
      $('.new-tweet').slideDown();
      sendErrorMessage(`Error: Tweets aren't available at this time (${err.status} ${err.statusText})`);
    });
};


// receives an array of tweets and appends them to the html page.
const renderTweets = tweets => {
  const $tweetsContainer = $('#tweets-container');

  $tweetsContainer.html("");
  
  tweets.forEach(tweet => {
    const tweetEl = createTweetElement(tweet);
    $tweetsContainer.append(tweetEl);
  });
};


// receives a tweet object and returns an html representation of the tweet.
const createTweetElement = tweet => {
  return `
    <article class="tweet">
      <header>
        <div class="avatar-and-name">
          <img src="${tweet.user.avatars}" alt="small-avatar" width="48" height="48">
          <span class="name">${tweet.user.name}</span>
        </div>
        <div class="handle">
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <main>${escapeText(tweet.content.text)}</main>
      <footer>
        <span class="date">${timeago.format(tweet.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
};


// receives string and returns escaped string (prevents XSS)
const escapeText = str => {
  let div = document.createElement('div');

  div.appendChild(document.createTextNode(str));
  
  return div.innerHTML;
};

export default loadTweets;