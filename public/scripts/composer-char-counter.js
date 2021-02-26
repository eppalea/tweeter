$(document).ready(function() {
  $("#tweet-text").on('keyup',onKeyUp);
});

//Counts characters in the textarea. Character length will determine the css styling//
const onKeyUp = function() {
  const text = $(this).val();
  const count = text.length;
  const charLeft = 140 - count;
  let charCounter = $(this).parent().parent().find(".counter");
  $(charCounter).text(charLeft);
  if (charLeft < 0) {
    charCounter.addClass("overcount");
  } else {
    charCounter.removeClass("overcount");
  }
};

