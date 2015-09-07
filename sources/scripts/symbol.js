
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
  Symbol.full = '▣▤▥▦▧▨▩▲◆◈◉◍◐◑◒◓◔◕◧◨◩◪◭◮\
  ☻✎✐✒︎✂︎✇✈︎⚓︎♂♀☍✙✧✚☤⚔☸☯☮⚒☭☪☬\
  ☎☣☢☭➸✓✕\
  ❣✚✪✣✤✥✦❉❥❦❧❃❂❁❀\
  ♥♠♣◆♬♪♫☀☂☁☮☻♂♀❤!#$%↨↑↓●†✈\
  ☂☃★♚♛♜♝♞♟'

  Symbol.GetRandom = function () {
    return Symbol.full.charAt(Math.floor(Symbol.full.length * Math.random()))
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
