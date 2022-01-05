//  index.js

import loadTweets from "./tweetsContainer.js";
import { navbarButtonsEvents, showHideButtonsOnScroll } from "./navigation.js";
import tweetFormEvents from "./tweetForm.js";

$(() => {
  loadTweets();
  navbarButtonsEvents();
  showHideButtonsOnScroll();
  tweetFormEvents();
});
