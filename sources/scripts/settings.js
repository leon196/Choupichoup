
define(['utils/tool'], function(Tool)
{
  var Settings = {}

  Settings.MIN_SIZE = 8
  Settings.MAX_SIZE = 16
  Settings.SYMBOL_COUNT_TO_JUMP = 20
  Settings.COLORNESS_SPEED = 0.05

  // Boid ratio rules
  Settings.DEFAULT_TARGET_SCALE = 0.1
  Settings.DEFAULT_AVOID_SCALE = 0.1
  Settings.DEFAULT_GLOBAL_SCALE = 0.0001
  Settings.DEFAULT_NEAR_SCALE = 0.0001

  Settings.THINKER_AVOID_SCALE = 0.05

  // Boid condition rules
  Settings.MIN_DIST_TO_FOLLOW = 30
  Settings.MIN_DIST_TO_ABSORB = 20
  Settings.COLLISION_BIAS = 1
  Settings.DEFAULT_FRICTION = 0.985
  Settings.DEFAULT_FRICTION_COLLISION = 0.9

  // Boid animation
  Settings.DEFAULT_SPEED = 1
  Settings.ORBIT_SCALE = 10
  Settings.ORBIT_SPEED = 0.2
  Settings.TRANSITION_IMPULSE_SCALE = 60
  Settings.TRANSITION_UPDATE_SCALE = 100
  Settings.BOOGIE_SCALE = 0.1
  Settings.BOOGIE_SPEED = 15

  // Boid display
  Settings.BUBBLE_OUTLINE = 2
  Settings.LETTER_FONT_SCALE = 2
  Settings.FONT_SIZE = 32
  Settings.FONT_NAME = 'dk_liquid_embraceregular'

	Settings.GAME_STATE_INTRO = 0
	Settings.GAME_STATE_PLAY = 1
	Settings.GAME_STATE_OVER = 2
	Settings.GAME_STATE_TRANSITION = 3

  // Characters
  Settings.characterNames = ['Lou', 'Toto', 'Tom', 'Lucie', 'Hely', 'Raoul', 'Chou', 'Poupou', 'Mya', 'Bea', 'Nini']
  Settings.currentCharacter = 0
  Settings.GetRandomCharacter = function ()
  {
    ++Settings.currentCharacter
    if (Settings.currentCharacter >= Settings.characterNames.length) {
      Tool.shuffle(Settings.characterNames)
      Settings.currentCharacter = 0
    }
    return Settings.characterNames[Settings.currentCharacter]
  }

  // Symbols
  Settings.allSymbol = '▣▤▥▦▧▨▩▲◆◈◉◍◐◑◒◓◔◕◧◨◩◪◭◮\
  ☻✎✐✒︎✂︎✇✈︎⚓︎♂♀☍✙✧✚☤⚔☸☯☮⚒☭☪☬\
  ☎☣☢☭➸✓✕\
  ❣✚✪✣✤✥✦❉❥❦❧❃❂❁❀\
  ♥♠♣◆♬♪♫☀☂☁☮☻♂♀❤!#$%↨↑↓●†✈\
  ☂☃★♚♛♜♝♞♟'

  Settings.GetRandomSymbol = function () {
    var symbol = Settings.GetSymbol()
    while (symbol == '︎' || symbol == ' ') {
      symbol = Settings.GetSymbol()
    }
    return symbol
  }

  Settings.GetSymbol = function () {
    return Settings.allSymbol[Math.floor(Settings.allSymbol.length*Math.random())]
  }

  return Settings
})
