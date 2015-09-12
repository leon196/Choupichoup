
define([], function()
{
  var Settings = {}

  Settings.MIN_RADIUS = 8
  Settings.STEP_RADIUS = 4
  Settings.RANGE_SCALE = 10

  Settings.COLORNESS_SPEED = 0.05

  // Boid ratio rules
  Settings.DEFAULT_TARGET_SCALE = 0.1
  Settings.DEFAULT_AVOID_SCALE = 0.1
  Settings.DEFAULT_GLOBAL_SCALE = 0.0001
  Settings.DEFAULT_NEAR_SCALE = 0.0001

  Settings.THINKER_AVOID_SCALE = 0.01

  // Boid condition rules
  Settings.MIN_DIST_TO_FOLLOW = 30
  Settings.MIN_DIST_TO_ABSORB = 20
  Settings.COLLISION_BIAS = 1
  Settings.DEFAULT_FRICTION = 0.985
  Settings.DEFAULT_FRICTION_COLLISION = 0.9

  // Boid animation
  Settings.DEFAULT_SPEED = 1
  Settings.ORBIT_SCALE = 20
  Settings.ORBIT_SPEED = 0.5
  Settings.TRANSITION_IMPULSE_SCALE = 200
  Settings.TRANSITION_UPDATE_SCALE = 100
  Settings.BOOGIE_SCALE = 0.1
  Settings.BOOGIE_SPEED = 15

  // Boid display
  Settings.BUBBLE_OUTLINE = 2
  Settings.LETTER_FONT_SCALE = 1
  Settings.FONT_SIZE = 32
  Settings.FONT_NAME = 'dk_liquid_embraceregular'

	Settings.GAME_STATE_INTRO = 0
	Settings.GAME_STATE_PLAY = 1
	Settings.GAME_STATE_OVER = 2
	Settings.GAME_STATE_TRANSITION = 3

  //
  Settings.characterNames = ['Lou', 'Toto', 'Tom', 'Lucie', 'Hely', 'Raoul', 'Chou', 'Poupou', 'Mya', 'Bea', 'Nini']
  Settings.GetRandomCharacter = function ()
  {
    return Settings.characterNames[Math.floor(Math.random() * Settings.characterNames.length)]
  }

  return Settings
})
