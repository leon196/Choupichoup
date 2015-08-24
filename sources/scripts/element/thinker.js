
define(['lib/pixi', 'gui/phylactere', 'base/renderer', 'manager', 'settings', 'base/utils'], function(PIXI, Phylactere, renderer, Manager, Settings, Utils){
  var Thinker = function ()
  {
    Phylactere.call(this)

    this.css = { min:Settings.MIN_SIZE, max:Settings.MAX_SIZE, font: 'Shadows Into Light', fill: '#020202', align: 'left' }

    this.timeStart = 0
    this.timeDelay = 30

    this.Init = function ()
    {
      this.x = renderer.width * 1.25
      this.y = renderer.height / 2
      this.target.y = renderer.height / 2
      this.timeStart = Manager.timeElapsed
      this.SpawnBubbleLetters(8)
    }

    this.Update = function ()
    {
      this.Move()
      this.UpdateTargets()
    }

    this.Move = function ()
    {
      var ratio = Utils.clamp((Manager.timeElapsed - this.timeStart) / this.timeDelay, 0, 1)
      if (ratio >= 1)
      {
        Manager.removeThinker(this)
      }
      var offset = renderer.width * 1.5 * (1 - ratio) - renderer.width / 4
      this.target.x = offset
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
