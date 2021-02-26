// console.log("does this work");

$(document).ready(function() {
  //  console.log($( "#tweet-text" ))
  $("#tweet-text").on('keyup',onKeyUp);
});

const onKeyUp = function() {
  const text = $(this).val();
  const count = text.length;
  // console.log("the count is: ", count);
  const charLeft = 140 - count;
  // console.log("chars left are:", charLeft);
  // //Travel through the DOM to find counter
  let charCounter = $(this).parent().parent().find(".counter");
  $(charCounter).text(charLeft);
  if (charLeft < 0) {
    charCounter.addClass("overcount");
  } else {
    charCounter.removeClass("overcount");
  }
};




//jquery call with class

//jquery. grabbing a part of the doc and either doing something to it or read something from it.
//select, then change or read

