
define([], function()
{
  var Global = {}

  Global.pause = false
  Global.timeStarted = 0
  Global.timeElapsed = 0

  Global.width = window.innerWidth
  Global.height = window.innerHeight
  Global.canvas = document.getElementById('container')

  return Global
})
