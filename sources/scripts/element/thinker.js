
define(['lib/pixi', 'gui/phylactere', 'base/renderer', 'manager', 'settings', 'base/utils'], function(PIXI, Phylactere, renderer, Manager, Settings, Utils){
  var Thinker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Thinker", { min:Settings.MIN_SIZE, max:Settings.MAX_SIZE, font: 'Shadows Into Light', fill: '#020202', align: 'left' }, 8)
    this.phylactere.x = renderer.width * 1.25
    this.phylactere.y = renderer.height / 2
    this.phylactere.anchorX = this.phylactere.x
    this.phylactere.anchorY = renderer.height

    this.timeStart = 0
    this.timeDelay = 30

    this.init = function ()
    {
      this.timeStart = Manager.timeElapsed
      this.phylactere.Init()
    }

    this.update = function ()
    {
      this.move()
      this.phylactere.Update()
    }

    this.move = function ()
    {
      var ratio = Utils.clamp((Manager.timeElapsed - this.timeStart) / this.timeDelay, 0, 1)
      var offset = renderer.width * 1.5 * (1 - ratio) - renderer.width / 4
      this.phylactere.anchorX = offset
      this.phylactere.x = offset
      if (ratio >= 1)
      {
        Manager.removeThinker(this)
      }
    }
  }

  Thinker.prototype = Object.create(PIXI.Container.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
