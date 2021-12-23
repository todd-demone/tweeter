//  index.js

import loadTweets from "./tweetsContainer.js";
import { navButtonsEvents, showHideButtonsOnScroll } from "./navigation.js";
import tweetFormEvents from "./tweetForm.js";

$(document).ready(function () {
  loadTweets();
  navButtonsEvents();
  showHideButtonsOnScroll();
  tweetFormEvents();
});
