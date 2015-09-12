
define(['../lib/pixi', '../core/render',
'../control/mouse', '../control/keyboard',
'../utils/tool', '../core/global', '../utils/animation'],
function(PIXI, Render, Mouse, Keyboard, Tool, Global, Animation)
{
  var Engine = function ()
  {
    this.init = function ()
    {
  	}

    this.update = function ()
    {
      Global.timeElapsed = new Date() / 1000 - Global.timeStarted

      if (Keyboard.P.down)
      {
        Global.pause = !Global.pause
        Keyboard.P.down = false
      }
    }
  }

  return Engine
})
