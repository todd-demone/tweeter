// helpers.js

// maximum length of tweets
const MAX_LENGTH = 140;

// receives a string and returns an escaped string (prevents XSS)
const escapeText = (str) => {
  let div = document.createElement("div");

  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};

// receives a string and returns boolean: true if string meets requirements for valid tweet, false otherwise
const isValidTweet = (tweetString) => {
  if (!tweetString) {
    sendErrorMessage("You can't send an empty tweet.");
    return false;
  } else if (tweetString.length > MAX_LENGTH) {
    sendErrorMessage(`Tweets can't exceed ${MAX_LENGTH} characters.`);
    return false;
  }
  return true;
};

// receives an error message (string) and renders it to the screen
const sendErrorMessage = (message) => {
  const $errorBox = $(".new-tweet__error");

  $errorBox.children(".new-tweet__error-message").html(message);
  $errorBox.slideDown();
  $("#new-tweet__textarea").trigger('focus');
};

export { escapeText, isValidTweet, MAX_LENGTH, sendErrorMessage };
