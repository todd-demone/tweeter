//  index.js

import loadTweets from './tweetsContainer.js';
import { toggleTweetButton, scrollToTop, showHideButtonsOnScroll } from './navigation.js';
import { postDataOnSubmit, postDataOnEnterKey, countCharacters } from './newTweetForm.js';

$(document).ready(function () {
  loadTweets();
  toggleTweetButton();
  scrollToTop();
  showHideButtonsOnScroll();
  postDataOnSubmit();
  postDataOnEnterKey();
  countCharacters();
});