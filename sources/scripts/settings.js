
define([], function()
{
  var Settings = {}

  Settings.MIN_SIZE = 10
  Settings.MAX_SIZE = 80
  Settings.RANGE_SCALE = 10

  Settings.COLORNESS_SPEED = 0.05

  // Boid ratio rules
  Settings.DEFAULT_TARGET_SCALE = 0.1
  Settings.DEFAULT_AVOID_SCALE = 0.3
  Settings.DEFAULT_GLOBAL_SCALE = 0.0001
  Settings.DEFAULT_NEAR_SCALE = 0.0001

  // Boid condition rules
  Settings.MIN_DIST_TO_FOLLOW = 30
  Settings.MIN_DIST_TO_ABSORB = 20
  Settings.BULL_COLLISION_BIAS = 0.75
  Settings.DEFAULT_FRICTION = 0.98
  Settings.DEFAULT_FRICTION_COLLISION = 0.9

  // Boid animation
  Settings.DEFAULT_SPEED = 1
  Settings.ORBIT_SCALE = 2
  Settings.ORBIT_SPEED = 0.2
  Settings.TRANSITION_IMPULSE_SCALE = 200
  Settings.TRANSITION_UPDATE_SCALE = 100

  // Boid display
  Settings.FONT_SIZE = 32
  Settings.FONT_NAME = 'DK Liquid Embrace'

  return Settings
})
