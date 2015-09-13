
define(['../settings'], function(Settings)
{
  var Global = {}

  Global.pause = false
  Global.mute = false
  Global.timeStarted = 0
  Global.timeElapsed = 0

  Global.width = window.innerWidth
  Global.height = window.innerHeight
  Global.canvas = document.getElementById('container')

  Global.textStyle = { font: Settings.FONT_SIZE + 'px ' + Settings.FONT_NAME, fill: '#fcfcfc', align: 'left' }

  return Global
})
