/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
document.addEventListener("dblclick", (event) => {
  console.log(event);
});

$(document).ready(function() {
  loadTweets();

  //Function determines tweet validity and posts if criteria are met//
  $("form").on("submit", function(event) {
    event.preventDefault();
    
    //Brings in tweet text data//
    const text = $("#tweet-text").val();

    //If no text present//
    if (!text) {
      return errorMessage('Cat got your tongue?');
    }

    //If tweet is too long//
    if (text.length > 140) {
      return errorMessage('Too much to say! Shorten it up!');
    }

    //If tweet criteria passes, post tweet//
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $(this).serialize()
    }).then((result) => {
      return loadTweets();
    }).catch(err => {
      return err;
    });
    
  });

  //Directs cursor from nav bar to textarea//
  $('#write-new-tweet').on("click", function() {
    $('#tweet-text').focus();
  });

});

//Function to show error message and for how long//
const errorMessage = function(message) {
  $(".error-msg").text(message);
  $(".error-msg").slideDown(function() {
    setTimeout(function() {
      $(".error-msg").slideUp();
    }, 3000);
  });
};


const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: "GET"
  }).then((res) => {
    return renderTweets(res);
  }).catch(err => {
    return err;
  });
};

const renderTweets = function(tweets) {
  $('textarea').val('');
  $('.counter').text('140');
  $('.history').empty();
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.history').prepend($tweet);
  }
};

const createTweetElement = function(tweetData) {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let $tweet = $(`
  <article class="old-tweet">
  <header class="tweet-header">
    <div class="user">
      <div class="left">
        <img class="user-thumbnail" src="${tweetData.user.avatars}" alt="user thumbnail">
        <h5 class="username">${tweetData.user.name}</h5>
      </div>
      <h5 class="user-handle">${tweetData.user.handle}</h5>
    </div>
  </header>
    <div class="oldtweetinput">
      <label class="tweet-text" for="tweet-text">${escape(tweetData.content.text)}</label> 
    </div>
  <footer class="tweet-footer">
    <div class="time-stamp">
      <span>${moment(tweetData.created_at).fromNow()}</span>
    </div>
    <div class="icons">
      <span class="flag-icon">🏳</span>
      <span class="refresh-icon">🔁 </span>
      <span class="heart-icon">♥</span>
    </div>
  </footer>
</article>
  `);
  return $tweet;
};