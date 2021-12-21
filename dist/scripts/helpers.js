// helpers.js

// receives an error message (string) and renders it to the screen; returns false.
const sendErrorMessage = message => {
  const $errorBox = $('.new-tweet .error');
  const $errorMessage = $errorBox.children('.msg');
  
  $errorMessage.html(message);
  $errorBox.slideDown();
  $('#tweet-text').focus();
  return false;
};

export default sendErrorMessage;