$(() => {
  
  //////////////////////////
  // FUNCTION DEFINITIONS //
  //////////////////////////

  // Receives a single tweet (Object) and returns html (String) representing that tweet.
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
        <main>${escapeInputText(tweet.content.text)}</main>
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

  
  // Receives user input (String) and returns escaped text (String); prevents cross-site scripting (xss).
  const escapeInputText = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // GET request for tweets array; if success, calls renderTweets to render tweets to page.
  const loadTweets = () => {
    $.get({
      url: '/tweets',
      success: tweets => {
        $('#tweets-container').html(""); // less lag when this line is placed here vs in $.post below
        renderTweets(tweets);
      },
    });
  };


  // Receives tweets (Array) and appends each tweet to the page.
  const renderTweets = tweets => {
    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').append(tweetElement);
    });
  };


  // Receives a message (String) and displays the message above the new tweet box.
  const sendErrorMessage = message => {
    const $errorBox = $('.new-tweet .error');
    const $errorMessage = $errorBox.children('.msg');
    $errorMessage.html(message);
    $errorBox.slideDown();
    return false;
  };


  //////////////////////
  // EVENT METHODS    //
  //////////////////////


  // When the tweet button is clcked, this event method validates the tweet text and, if there are no errors, POSTs serialized tweet data to the server;
    $('#tweet-form').on('submit', e => {
      e.preventDefault();
      const $tweetForm = $(e.currentTarget);
      const $tweetText = $tweetForm.children('#tweet-text');
      const tweetString = $tweetText.val();
      const tweetLength = tweetString.length;
      
      if (!tweetString) {
        sendErrorMessage("You can't send an empty tweet.");
      }
      if (tweetLength > 140) {
        sendErrorMessage("You can't send a tweet longer than 140 characters.");
      }
  
      $.post({
        url: '/tweets',
        data: $tweetForm.serialize(),
        success: () => {
          const $errorBox = $('.new-tweet .error');
          $errorBox.slideUp();
          $tweetForm.trigger('reset');
          loadTweets();
        },
      });
    });


  // When the "write a new tweet" button is clicked, this event method shows/hides the "what are you humming about?" box.
  $('.navbar button.toggle-tweet-button').on('click', () => {
    $('.new-tweet').slideToggle();
    document.getElementById('tweet-text').focus();
  });


  // When the page is refreshed, this event method scrolls to the top of the screen. This is necessary b/c the "write a new tweet" button disappears as you scroll down, and if you refresh at a point where you've scrolled halfway down the page then the write a new tweet is still not displayed and could cause some confusion.
  $(window).on('unload', () => {
    $(window).scrollTop(0);
  });


  // When the user scrolls a sufficient distance, this event method shows the scroll-to-top button and hides the "write a new tweet" button.
  let lastScrollTop = 0;
  $(window).on('scroll', e => {
    const st = $(e.currentTarget).scrollTop();
    $scrollToTopButton = $('.navbar button.scroll-to-top');
    $toggleTweetButton = $scrollToTopButton.siblings('button.toggle-tweet-button');
    if (st > lastScrollTop) {
      $scrollToTopButton.show('slow');
      $toggleTweetButton.slideUp();
    } else if (st === 0) {
        $scrollToTopButton.hide('slow');
        $toggleTweetButton.slideDown();
    }
    lastScrollTop = st;
  });

  
  // When the scroll-to-top button is clicked, this event method scrolls to the top of the screen, hides the scroll-to-top button and shows the "write a new tweet" button.
  $('.navbar button.scroll-to-top').on('click', e => {
    $scrollToTopButton = $(e.currentTarget);
    $toggleTweetButton = $scrollToTopButton.siblings('button.toggle-tweet-button');
    $('html, body').animate(
      { 
        scrollTop: 0,
      },
      {
        done: () => {
          $scrollToTopButton.hide('slow');
          $toggleTweetButton.slideDown();
          $('.new-tweet').slideDown();
          $('#tweet-text').focus();
        }
      }
    );
    return false;
  });

  //////////////////////
  // DRIVER CODE      //
  //////////////////////

  loadTweets();

});