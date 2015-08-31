
define(['../lib/pixi', '../settings', '../core/renderer', '../core/manager',
'../element/phylactere', '../base/utils', '../base/point', '../color'],
function(PIXI, Settings, renderer, Manager, Phylactere, Utils, Point, Color){
  var Thinker = function ()
  {
    Phylactere.call(this)

    this.targetScale = 0.04
    this.avoidScale = 0.1

		this.anchorX = renderer.width / 2
		this.anchorY = renderer.height / 2

    this.Init = function ()
    {
      Manager.AddBoid(this)

      this.x = this.anchorX
      this.y = this.anchorY
      this.target.x = this.x
      this.target.y = this.y

      this.timeStart = Manager.timeElapsed
    }

    this.Update = function ()
    {
      this.UpdateTargets()
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
