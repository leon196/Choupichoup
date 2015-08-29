
define([], function()
{
  var Settings = {}

  Settings.DEFAULT_SPEED = 1
  Settings.DEFAULT_FRICTION = 0.98
  Settings.DEFAULT_FRICTION_COLLISION = 0.9

  Settings.MIN_SIZE = 10
  Settings.MAX_SIZE = 20
  Settings.THINKER_SIZE = 30
  Settings.SPAWN_SIZE = 30
  Settings.SIZE_DEAD = 1
  Settings.SIZE_DELTA = 1

  Settings.MIN_DIST_TO_FOLLOW = 30

  Settings.MIN_DIST_TO_ABSORB = 20

  Settings.SCROLL_SPEED = 0.0001

  Settings.DARKNESS_SPEED = 0.05

  Settings.ORBIT_SCALE = 2
  Settings.ORBIT_SPEED = 0.2

  Settings.SPAWN_DELAY = 5
  Settings.SPAWN_DURATION = 20

  Settings.MIN_SPAWN_BUBBLE = 4
  Settings.MAX_SPAWN_BUBBLE = 12

  Settings.OFFSET_OFFSCREN = 100

  Settings.DEFAULT_TARGET_SCALE = 0.1
  Settings.DEFAULT_AVOID_SCALE = 0.3
  Settings.DEFAULT_GLOBAL_SCALE = 0.0001
  Settings.DEFAULT_NEAR_SCALE = 0.0001

  Settings.LETTER_FONT_SCALE = 1.0
  Settings.BULL_OUTLINE = 2
  Settings.BULL_COLLISION_BIAS = 0.75

  Settings.FONT_NAME = 'Arial'
  // Settings.SYMBOLS = [→⥇⥈⤔↝⤳☝︎☜⤺☟↯↔︎↕︎↺$€¥¢£₽₩฿₺₮₱₦☞]
  Settings.SYMBOLS = '▣▤▥▦▧▨▩▲△◆◇◈◉◊◌◍◎◯◐◑◒◓◔◕◧◨◩◪◫◬◭◮\
  ☻☹✍✎✐✑✒︎✁✂︎✃✄⚾︎✇✈︎⚓︎♨︎♂♀☍✙✧✚☤⚔☸☯☮⚐⚒☭☪☬\
  ☜☎☑✄☪☣☢☠☭➸✓✕㊚\
  ❣✚✪✣✤✥✦❉❥❦❧❃❂❁❀\
  ♥♠♣◆◇♧♤♧♬♪♫☆☀☂☁☮☺☻♂♀❤ツ!#$%↨↑↓ø¤●†✈㊛\
  ☼☾☂☃★☆♤♧♡♢♚♛♜♝♞♟♔♕♖♗♘'
  // Settings.currentSymbol = 0
  Settings.RandomSymbols = function () //{ return Settings.currentSymbol + ":" + Settings.SYMBOLS.charAt(Settings.currentSymbol++) }
  { return Settings.SYMBOLS.charAt(Math.floor(Settings.SYMBOLS.length * Math.random())) }

  return Settings
})
