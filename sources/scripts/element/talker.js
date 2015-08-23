
define(['lib/pixi', 'gui/phylactere', 'base/renderer', 'manager', 'base/utils'], function(PIXI, Phylactere, renderer, Manager, Utils){
  var Talker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Talker")

    this.phylactere.anchorX = renderer.width
    this.phylactere.x = renderer.width * 1.25
    this.phylactere.y = renderer.height * 3 / 4

    this.timeStart = 0
    this.timeDelay = 30

    this.init  = function ()
    {
      this.phylactere.Init()

      for (var i = 0; i < this.phylactere.boidList.length; ++i)
      {
        var letter = this.phylactere.boidList[i]
        letter.showBubble = false
        Manager.drawer.clearBubble(Manager.boidList.indexOf(letter))
      }

      this.timeStart = Manager.timeElapsed
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
        Manager.removeTalker(this)
      }
    }
  }

  Talker.prototype = Object.create(PIXI.Container.prototype)
  Talker.prototype.constructor = Talker

  return Talker
})
