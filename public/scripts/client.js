$(document).ready( () => {
  
  const loadTweets = () => {
    $.get('/tweets')
      .done( tweets => {
        $('#tweets-container').html(""); // less lag when this line is plcaed here vs in $.post below
        renderTweets(tweets);
      });
  };

  const renderTweets = tweets => {
    tweets.forEach( tweet => {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').append(tweetElement);
    })
  };
  
  const escape = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
        <main>${escape(tweet.content.text)}</main>
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

  $('.navbar button.cta').on('click', e => {
    $('.new-tweet').slideToggle();
  });

  $('#tweet-form').on('submit', e => {
    e.preventDefault();
    const $formElement = $('#tweet-form');
    const $textareaElement = $formElement.children('#tweet-text')
    const $errorElement = $formElement.siblings('.error');
    const tweetString = $textareaElement.val();
    const tweetLength = tweetString.length;
    if (!tweetString) {
      $errorElement.children('.msg').html(`<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; &nbsp; &nbsp;You cannot send an empty tweet. Please try again.&nbsp; &nbsp; &nbsp;<i class="fa-solid fa-triangle-exclamation"></i>`);
      $errorElement.slideDown()
      return;
    }
    if (tweetLength > 140) {
      $errorElement.children('.msg').html(`<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; &nbsp; &nbsp;This tweet is too long. Please limit your tweet to 140 characters or less.&nbsp; &nbsp; &nbsp;<i class="fa-solid fa-triangle-exclamation"></i>`);
      $errorElement.slideDown()
      return;
    }
    $.post({ 
      url: $formElement.attr('action'), 
      data: $formElement.serialize(),
      success: () => {
        $errorElement.slideUp();
        $textareaElement.val('');
        $formElement.find(".counter").text('140');
        loadTweets();
      },
    })
  });
  
  loadTweets();

});