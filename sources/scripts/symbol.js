
define([], function(){

  var Symbol = {}

  Symbol.hearth = '♥'

  // Settings.SYMBOLS = [→⥇⥈⤔↝⤳☝︎☜⤺☟↯↔︎↕︎↺$€¥¢£₽₩฿₺₮₱₦☞]
  Symbol.all = '▣▤▥▦▧▨▩▲△◆◇◈◉◊◌◍◎◯◐◑◒◓◔◕◧◨◩◪◫◬◭◮\
  ☻☹✍✎✐✑✒︎✁✂︎✃✄⚾︎✇✈︎⚓︎♨︎♂♀☍✙✧✚☤⚔☸☯☮⚐⚒☭☪☬\
  ☜☎☑✄☪☣☢☠☭➸✓✕㊚\
  ❣✚✪✣✤✥✦❉❥❦❧❃❂❁❀\
  ♥♠♣◆◇♧♤♧♬♪♫☆☀☂☁☮☺☻♂♀❤ツ!#$%↨↑↓ø¤●†✈㊛\
  ☼☾☂☃★☆♤♧♡♢♚♛♜♝♞♟♔♕♖♗♘'

  Symbol.GetRandom = function () {
    return Symbol.all.charAt(Math.floor(Symbol.all.length * Math.random()))
  }

  Symbol.GetValidRandom = function () {
    var letter = Symbol.GetRandom()
    while (letter == '︎' || letter == ' ') {
      letter = Symbol.GetRandom()
    }
    return letter
  }

  return Symbol
})
