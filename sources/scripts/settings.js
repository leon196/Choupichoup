
define(['utils/tool'], function(Tool)
{
  var Settings = {}

  Settings.MIN_SIZE = 8
  Settings.MAX_SIZE = 16
  Settings.SYMBOL_COUNT_TO_JUMP = 20
  Settings.MIN_BUBBLE = 8
  Settings.MAX_BUBBLE = 16
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

  Settings.STATE_APPEARING = 0
  Settings.STATE_STANDING = 1
  Settings.STATE_DISAPPEARING = 2

  Settings.defaultSpawnDelay = 10

  Settings.defaultVolumeSound = 0.5
  Settings.defaultVolumeMusic = 0.25

  // Characters
  Settings.characterNames = ['Lou', 'Toto', 'Tom', 'Lucie',
  'Hely', 'Raoul', 'Chou', 'Poupou', 'Mya', 'Bea', 'Nini',
  'Foufou', 'Lili'
  ]
  Tool.shuffle(Settings.characterNames)
  Settings.currentCharacter = 0
  Settings.GetRandomCharacter = function ()
  {
    if (Settings.currentCharacter >= Settings.characterNames.length) {
      Tool.shuffle(Settings.characterNames)
      Settings.currentCharacter = 0
    }
    var character = Settings.characterNames[Settings.currentCharacter]
    ++Settings.currentCharacter
    return character
  }

  Settings.symbolCount = 78
  Settings.symbolIndexHearth = 1
  Settings.symbolIndexNote = 29
  Settings.symbolScale = 2
  Settings.symbolSequence = []
  Settings.symbolCurrent = 0
  for (var i = 0; i < Settings.symbolCount; ++i) { Settings.symbolSequence.push(i) }
  Tool.shuffle(Settings.symbolSequence)
  Settings.GetRandomSymbolIndex = function () {
    ++Settings.symbolCurrent
    if (Settings.symbolCurrent >= Settings.symbolSequence.length) {
      Tool.shuffle(Settings.symbolSequence)
      Settings.symbolCurrent = 0
    }
    return Settings.symbolSequence[Settings.symbolCurrent]
  }

  // Symbols
  // Settings.allSymbol = '▣▤▥▦▧▨▩▲◆◈◉◍◐◑◒◓◔◕◧◨◩◪◭◮\
  // ☻✎✐✒︎✂︎✇✈︎⚓︎♂♀☍✙✧✚☤⚔☸☯☮⚒☭☪☬\
  // ☎☣☢☭➸✓✕\
  // ❣✚✪✣✤✥✦❉❥❦❧❃❂❁❀\
  // ♥♠♣◆♬♪♫☀☂☁☮☻♂♀❤!#$%↨↑↓●†✈\
  // ☂☃★♚♛♜♝♞♟'
  //
  // Settings.GetRandomSymbol = function () {
  //   var symbol = Settings.GetSymbol()
  //   while (symbol == '︎' || symbol == ' ') {
  //     symbol = Settings.GetSymbol()
  //   }
  //   return symbol
  // }
  //
  // Settings.GetSymbol = function () {
  //   return Settings.allSymbol[Math.floor(Settings.allSymbol.length*Math.random())]
  // }

  return Settings
})
