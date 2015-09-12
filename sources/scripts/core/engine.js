
define(['../lib/pixi', '../core/render',
'../control/mouse', '../control/keyboard',
'../utils/tool', '../core/global', '../utils/animation',
'../base/phylactere'],
function(PIXI, Render, Mouse, Keyboard, Tool, Global, Animation, Phylactere)
{
  var Engine = function ()
  {
    this.thinkerList = []

    this.init = function ()
    {
      this.addThinker()
  	}

    this.addThinker = function ()
    {
      var phylactere = new Phylactere()
      this.thinkerList.push(phylactere)
    }

    this.addPhylactere = function (phylactere)
    {
      for (var i = 0; i < phylactere.boidTailList.length; ++i) { Render.addSymbol(phylactere.boidTailList[i]) }
      for (var i = 0; i < phylactere.boidList.length; ++i) { Render.addSymbol(phylactere.boidList[i]) }
      Render.addSymbol(phylactere)
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

  return new Engine()
})
