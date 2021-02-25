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

  $("form").on("submit", function(event) {
    event.preventDefault();
    $('#blank-error').addClass('error-msg');
    $('#too-wordy').addClass('error-msg');

    let url = 'http://localhost:8080/tweets';
    
    const text = $("#tweet-text").val();
    console.log("the text is:", text);

    //if text are is empty provide error msg
    if (!text) {
      // console.log("error: ", new Error('No tweet provided'));
      // window.alert('No tweet provided');
      $('#blank-error').toggleClass('error-msg')
      // $('.error-msg').slideDown('slow');
      //if tweet is too long provide error msg
    } else if (text.length > 140) {
      // console.log("error: ", new Error('Your tweet is too long'));
      // window.alert('Your tweet is too long');
      $('#too-wordy').toggleClass('error-msg')
    } else {
      $.ajax({
        url: url,
        method: "POST",
        data: $(this).serialize()
      }).then((result) => {
        console.log('result is', result);
        return loadTweets();
      }).catch(err => {
        console.log('ajax error caught');
        console.log(err);
      });
    }
    
  });
});

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: "GET"
  }).then((res) => {
    console.log('result is', res);
    return renderTweets(res);
  }).catch(err => {
    console.log('ajax error caught');
    console.log(err);
  });
};

const renderTweets = function(tweets) {
  $('textarea').val('');
  // $('#tweet-text').empty();
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
  }
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
      <span>${tweetData.created_at} days ago</span>
    </div>
    <div class="icons">
      <span class="flag-icon">🏳</span>
      <span class="refresh-icon">🔁 </span>
      <span class="heart-icon">♥</span>
    </div>
  </footer>
</article>
  `);
  // console.log("the $tweet is:", $tweet);
  return $tweet;
};


