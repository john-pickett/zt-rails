var meditateMinutes = 10;
var meditateSeconds = "00";
var timeInterval;

// Audio files
var chime = new Audio('sound/chime.mp3');
var end = new Audio('sound/end.mp3');

// DOM Ready
$(document).ready(function(){
  insertTime();
});

// + and - buttons to increase/decrease time
$('.ion-ios-plus').click(function(){
  if (meditateMinutes < 30) {
    meditateMinutes += 5;
  } else {
    meditateMinutes = 30;
  }
  insertTime();
});


$('.ion-ios-minus').click(function(){
  if (meditateMinutes > 5){
    meditateMinutes -= 5;
  } else {
    meditateMinutes = 5;
  }
  insertTime();
});

var insertTime = function(){
  $('.numbers').html(meditateMinutes + ":" + meditateSeconds);
};

// if #start is showing, click starts meditating
$('#start').click(function (){
  meditate();
});

// if #reset is showing, stop meditating and reset timer
$('#reset').click(function(){
  resetClick();
});

// begins meditation timer countdown
function meditate(){
    timeSelectClick();
    var currentTime = Date.parse(new Date());
    var meditateEnd = new Date(currentTime + meditateMinutes*60*1000);
    startClock(meditateEnd);
};

// Clock Display Functions

var timeSelectClick = function () {
    $('#time-select').addClass('gray-out');
    $('#reset').toggle();
    $('#time-select-spans').toggle();
}

var resetClick = function () {
  $('#time-select').removeClass('gray-out');
  $('#reset').toggle();
  $('#time-select-spans').toggle();
  stopClock();
  resetTimerSpan();
}

var stopClock = function () {
  clearInterval(timeInterval);
};

var resetTimerSpan = function() {
  $('.timerSpan').html("");
}

// Countdown Timer Functions

function startClock(endtime){
    function updateClock(){
    var t = getTimeRemaining(endtime);
    var timeCountdown = t.minutes + ":" + pad(t.seconds);
    $('.timerSpan').html(timeCountdown);
    console.log(timeCountdown);

    if (t.total % 2525 === 0 && t.total > 0) {
      chime.play();
    } else if (t.total<=0){
      end.play();
      stopClock();
    }
  };

  updateClock(); // run function once at first to avoid delay
  timeInterval = setInterval(updateClock,1000);
};



function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
};

// this adds a leading zero to the seconds countdown
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}








// // Initial Countdown Code Starts Here

//
// var deadline1 = Date.parse(new Date()) + 8000;
//
// function getReady(endtime) {
// var t = endtime - Date.parse(new Date());
// var seconds = Math.floor( (t/1000) % 60);
// return {
// "total": t,
// "seconds": seconds
// };
// }
//
// function initializeClock1(id, endtime) {
// timeInMinutes = parseInt(document.getElementById('lengthInput').value);
// var clock = document.getElementById(id);
// var timeInterval = setInterval(function() {
// var t = getReady(endtime);
// clock.innerHTML = "Get Ready: " + t.seconds;
// if(t.total <= 0){
//   clearInterval(timeInterval)
//   $('#clockdiv').toggle();
//   $('#countdowndiv').remove();
//   meditate();
// }
// })
// };
