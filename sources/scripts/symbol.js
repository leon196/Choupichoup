
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

  return Symbol
})
