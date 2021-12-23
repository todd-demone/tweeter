//  index.js

import loadTweets from "./tweetsContainer.js";
import { navButtonsEvents, showHideButtonsOnScroll } from "./navigation.js";
import tweetFormEvents from "./tweetForm.js";

$(() => {
  loadTweets();
  navButtonsEvents();
  showHideButtonsOnScroll();
  tweetFormEvents();
});
