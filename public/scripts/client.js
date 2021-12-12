/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( () => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container');
    tweets.forEach( (tweet) => {
      const tweetElement = createTweetElement(tweet);
      $tweetsContainer.append(tweetElement);
    })
  };
  
  const createTweetElement = (tweet) => {
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
        <main>${tweet.content.text}</main>
        <footer>
          <span class="date">${tweet.created_at}</span>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  const loadTweets = () => {

  };
  
  renderTweets(data);

  $('#tweet-form').on('submit', (e) => {
    e.preventDefault();
    const $form = $('#tweet-form');
    $.ajax({ 
      method: "POST", 
      url: $form.attr('action'), 
      data: $form.serialize(),
    })
  });

});