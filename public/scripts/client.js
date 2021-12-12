$(document).ready( () => {
  
  const loadTweets = () => {
    $.ajax('/tweets')
      .done( tweets => renderTweets(tweets));
  };

  const renderTweets = tweets => {
    const $tweetsContainer = $('#tweets-container');
    tweets.forEach( (tweet) => {
      const tweetElement = createTweetElement(tweet);
      $tweetsContainer.append(tweetElement);
    })
  };
  
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
  
  $('#tweet-form').on('submit', e => {
    e.preventDefault();
    const $form = $('#tweet-form');
    $.ajax({ 
      method: "POST", 
      url: $form.attr('action'), 
      data: $form.serialize(),
    })
      .done( () => {
        $('#tweets-container').html("");
        loadTweets();
      });
  });

  loadTweets();
});