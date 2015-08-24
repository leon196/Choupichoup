
define([], function()
{
  var Settings = {}

  Settings.DEFAULT_SPEED = 1
  Settings.DEFAULT_FRICTION = 0.95
  Settings.DEFAULT_FRICTION_COLLISION = 0.9

  Settings.MIN_SIZE = 4
  Settings.MAX_SIZE = 20
  Settings.SPAWN_SIZE = 10
  Settings.SIZE_DEAD = 1
  Settings.SIZE_DELTA = 1

  Settings.MIN_DIST_TO_FOLLOW = 20

  Settings.MIN_DIST_TO_ABSORB = 30

  Settings.SCROLL_SPEED = 0.0001

  Settings.DARKNESS_SPEED = 0.01

  Settings.ORBIT_SCALE = 30
  Settings.ORBIT_SPEED = 0.5

  Settings.SPAWN_DELAY = 5
  Settings.SPAWN_DURATION = 20

  Settings.MIN_SPAWN_BUBBLE = 4
  Settings.MAX_SPAWN_BUBBLE = 16

  Settings.OFFSET_OFFSCREN = 100

  Settings.DEFAULT_TARGET_SCALE = 0.1
  Settings.DEFAULT_AVOID_SCALE = 0.1
  Settings.DEFAULT_GLOBAL_SCALE = 0.0001
  Settings.DEFAULT_NEAR_SCALE = 0.001

  Settings.LETTER_FONT_SCALE = 1.5
  Settings.BULL_OUTLINE = 2
  Settings.BULL_COLLISION_BIAS = 1

  Settings.FONT_NAME = 'Shadows Into Light'

  return Settings
})
