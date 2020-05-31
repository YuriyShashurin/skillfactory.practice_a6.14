const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misshits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime


  if (hits === maxHits) {
    endGame();
  }
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalhits = hits - misshits;
 
  $("#total-hits").text(totalhits);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".game-field").text("");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    misshits = misshits + 1;
    $(event.target).addClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $(".game-field").click(handleClick);


  $("#button-launch").click(function() {
    round();
    $("#button-launch").hide();
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
