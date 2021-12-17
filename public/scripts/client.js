$(() => {
  
  //////////////////////////
  // FUNCTION DEFINITIONS //
  //////////////////////////


  /**
   * Creates an html representation of a tweet.
   * @param {Object} tweet A single tweet object. 
   * @returns {String} HTML representing the tweet.
   */
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


  /**
   * Appends all tweets to the html page.
   * @param {Array} tweets 
   * @returns {undefined}
   */
  const renderTweets = tweets => {
    const $tweetsContainer = $('#tweets-container');

    $tweetsContainer.html("");
    
    tweets.forEach(tweet => {
      const tweetEl = createTweetElement(tweet);
      $tweetsContainer.append(tweetEl);
    });
  };


  /**
   * GET request for tweets array.
   * If there are no errors, calls renderTweets(tweets).
   */
  const loadTweets = () => {
    $.get('/tweets')
     .then( tweets => {
       renderTweets(tweets);
     });
  };


  /**
   * Escapes user input to prevent XSS.
   * @param {String} str User input. 
   * @returns {String} Escaped user input.  
   */
  const escapeText = str => {
    let div = document.createElement('div');

    div.appendChild(document.createTextNode(str));
    
    return div.innerHTML;
  };


  /**
   * Displays an error message above the `.new-tweet` element.
   * @param {String} message An error message 
   * @returns false;
   */
  const sendErrorMessage = message => {
    const $errorBox = $('.new-tweet .error');
    const $errorMessage = $errorBox.children('.msg');
    
    $errorMessage.html(message);
    $errorBox.slideDown();
    $('#tweet-text').focus();
    return false;
  };


  //////////////////////
  // EVENT METHODS    //
  //////////////////////


  /**
   * When the tweet form's submit button is clicked, the method 
   * validates the text in the form and, 
   * if there are no errors, POSTs serialized tweet data to the server.
   */
  $('#tweet-form').on('submit', e => {
    const $tweetForm = $(e.currentTarget);
    const tweetString = $tweetForm.children('#tweet-text').val();
    const data = $tweetForm.serialize();
    
    e.preventDefault();
    
    if (!tweetString) return sendErrorMessage("You can't send an empty tweet.");
    if (tweetString.length > 140) return sendErrorMessage("Tweets can't exceed 140 characters.");

    $.post('/tweets', data)
     .then( () => {
       loadTweets();
       $tweetForm.trigger('reset');
       $tweetForm.find(".counter").text('140');
     });
  });


  /**
   * When the toggle-tweet button is clicked, the method
   * shows/hides the new-tweet form.
   */
  $('.toggle-tweet').on('click', () => {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });


  /**
   * When the user scrolls past a certain point on the screen, the method 
   * shows the scroll-top button and hides the toggle-tweet button.
   * If the scroll position is near the top, the opposite happens.
   */
  $(window).on('scroll', e => {
    const scrollPosition = $(e.currentTarget).scrollTop();
    const $scrollTop = $('.scroll-top');
    const $toggleTweet = $scrollTop.siblings('.toggle-tweet');

    if (scrollPosition > 150) {
      $scrollTop.show('slow');
      $toggleTweet.hide('slow');
      $('.navbar .logo').addClass('logo-center');
    } else {
      $scrollTop.hide('slow');
      $toggleTweet.show('slow');
      $('.navbar .logo').removeClass('logo-center');
    }
  });

  
  /**
   * When the scroll-top button is clicked, the method
   * 1. scrolls to the top of the screen, then
   * 2. when #1 is done, the toggle-tweet button appears and the scroll-top button disappears
   * 3. when #2 is done, the new-tweet element is shown and its textarea is given focus.
   */
  $('.scroll-top').on('click', e => {
    const $scrollTop = $(e.currentTarget);
    const $toggleTweet = $scrollTop.siblings('.toggle-tweet');

    $('html, body').animate({scrollTop: 0}).promise()
     .then( () => {
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