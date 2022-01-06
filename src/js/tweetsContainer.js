// tweetsContainer.js

import { format } from "timeago.js";
import { escapeText, sendErrorMessage } from "./helpers.js";

// makes GET request for tweets; if no errors, sends tweets to `renderTweets`
const loadTweets = () => {
  $.get("/tweets")
    .then((tweets) => renderTweets(tweets))
    .catch((err) => {
      $(".new-tweet").slideDown();
      sendErrorMessage(
        `Error: Tweets aren't available at this time (${err.status} ${err.statusText})`
      );
    });
};

// receives an array of tweets and appends them to the html page.
const renderTweets = (tweets) => {
  let dynamicElements = "";
  tweets.forEach((tweet) => (dynamicElements += createTweetElement(tweet)));
  $(".tweets-container").html("").append(dynamicElements);
};

// receives a tweet object and returns an html representation of the tweet.
const createTweetElement = (tweet) => {
  return `
    <article class="tweet">
      <header class="tweet__header">
        <div class="tweet__avatar-username-container">
          <img class="tweet__avatar" src="${
            tweet.user.avatars
          }" alt="small-avatar" width="48" height="48">
          <span class="tweet__username">${tweet.user.name}</span>
        </div>
        <div class="tweet__handle">
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <main class="tweet__main">${escapeText(tweet.content.text)}</main>
      <footer class="tweet__footer">
        <span class="tweet__date">${format(tweet.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
};

export default loadTweets;
