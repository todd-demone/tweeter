// tweetForm.js

import { isValidTweet, MAX_LENGTH, sendErrorMessage } from "./helpers.js";
import loadTweets from "./tweetsContainer.js";

const tweetFormEvents = () => {
  const $tweetForm = $("#tweet-form");

  // send Tweet to server when user clicks 'Tweet' button or presses `Enter` key
  $tweetForm.on("submit keydown", (e) => {
    if (e.type === "submit" || e.keyCode === 13) {
      const data = $tweetForm.serialize();
      const tweetString = $tweetForm.children("#tweet-textarea").val();

      e.preventDefault();

      if (!isValidTweet(tweetString)) return false;

      $.post("/tweets", data)
        .then(() => {
          loadTweets();
          $tweetForm.trigger("reset").find(".counter").text(MAX_LENGTH);
        })
        .catch((err) =>
          sendErrorMessage(
            `Error: Your tweet did not get sent (${err.status} ${err.statusText})`
          )
        );
    }
  });

  // update character counter to show how many characters until the tweet reaches the MAX_LENGTH; turn counter red if the tweets exceeds the MAX_LENGTH
  $tweetForm.on("input", "#tweet-textarea", (e) => {
    const tweetString = $(e.currentTarget).val();
    const $counter = $tweetForm.find(".counter");
    const $errorBox = $tweetForm.siblings(".error");

    if (tweetString.length > MAX_LENGTH) {
      $counter.addClass("negative");
      sendErrorMessage(`Tweets can't exceed ${MAX_LENGTH} characters.`);
    } else {
      $counter.removeClass("negative");
      $errorBox.slideUp();
    }

    $counter.text(MAX_LENGTH - tweetString.length);
  });
};

export default tweetFormEvents;
