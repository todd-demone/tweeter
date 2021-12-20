$(() => {
  
  //////////////////////////
  // FUNCTION DEFINITIONS //
  //////////////////////////


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


  // receives an array of tweets and appends them to the html page.
  const renderTweets = tweets => {
    const $tweetsContainer = $('#tweets-container');

    $tweetsContainer.html("");
    
    tweets.forEach(tweet => {
      const tweetEl = createTweetElement(tweet);
      $tweetsContainer.append(tweetEl);
    });
  };


  // makes GET request for tweets; if no errors, sends tweets to `renderTweets`
  const loadTweets = () => {
    $.get('/tweets')
      .then(tweets => renderTweets(tweets))
      .catch(err => {
        $('.new-tweet').slideDown();
        sendErrorMessage(`Error: Tweets aren't available at this time (${err.status} ${err.statusText})`);
      });
  };


  // receives string and returns escaped string (prevents XSS)
  const escapeText = str => {
    let div = document.createElement('div');

    div.appendChild(document.createTextNode(str));
    
    return div.innerHTML;
  };


  // receives an error message (string) and renders it to the screen; returns false
  const sendErrorMessage = message => {
    const $errorBox = $('.new-tweet .error');
    const $errorMessage = $errorBox.children('.msg');
    
    $errorMessage.html(message);
    $errorBox.slideDown();
    $('#tweet-text').focus();
    return false;
  };


  // Event handler that is called when a form is submitted (see below).
  // Validates text in form, POSTs data to server, loads tweets.
  const postFormData = e => {
    const $tweetForm = $(e.currentTarget);
    const tweetString = $tweetForm.children('#tweet-text').val();
    const data = $tweetForm.serialize();
    
    e.preventDefault();

    if (!tweetString) return sendErrorMessage("You can't send an empty tweet.");
    if (tweetString.length > 140) return sendErrorMessage("Tweets can't exceed 140 characters.");

    $.post('/tweets', data)
      .then(() => loadTweets())
      .then(() => {
        $tweetForm.trigger('reset');
        $tweetForm.find(".counter").text('140');
      })
      .catch(err => sendErrorMessage(`Error: Cannot post tweet (${err.status} ${err.statusText})`));
  };

  //////////////////////
  // EVENT METHODS    //
  //////////////////////


  // event: submit form data via 'Tweet' button
  // handler: see postForm() above
  $('#tweet-form').on('submit', postFormData);


  // event: submit form data via Enter key
  // handler: see postForm() above
  $('#tweet-form').on('keydown', e => {
    if (e.keyCode === 13) postFormData(e);
  });


  // event: click `toggle-tweet` button
  // handler: shows/hides the `new-tweet` element
  $('.toggle-tweet').on('click', () => {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });


  // event: scroll
  // handler: show/hide the buttons as specified, center the logo text
  $(window).on('scroll', e => {
    const scrollPosition = $(e.currentTarget).scrollTop();
    const $scrollTop = $('.scroll-top');
    const $toggleTweet = $scrollTop.siblings('.toggle-tweet');
    const $logo = $('.navbar .logo');

    if (scrollPosition > 150) {
      $scrollTop.show('slow');
      $toggleTweet.hide('slow');
      $logo.addClass('logo-center');
    } else {
      $scrollTop.hide('slow');
      $toggleTweet.show('slow');
      $logo.removeClass('logo-center');
    }
  });

  
  // event: click `scroll-top` button
  // handler: scroll to top of screen, show `toggle-tweet` button, show `new-tweet` element
  $('.scroll-top').on('click', e => {
    const $scrollTop = $(e.currentTarget);
    const $toggleTweet = $scrollTop.siblings('.toggle-tweet');

    $('html, body').animate({scrollTop: 0}).promise()
      .then(() => {
        $scrollTop.slideUp('slow');
        $toggleTweet.slideDown('slow');
        $('.new-tweet').slideDown('slow');
        $('#tweet-text').focus();
      });
  });
    

  //////////////////////
  // DRIVER CODE      //
  //////////////////////

  loadTweets();

});