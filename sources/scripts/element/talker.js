
define(['lib/pixi', 'gui/phylactere', 'base/renderer', 'manager'], function(PIXI, Phylactere, renderer, Manager){
  var Talker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Talker")

    this.phylactere.anchorX = renderer.width
    this.phylactere.x = renderer.width * 3 / 4
    this.phylactere.y = renderer.height / 2
    this.phylactere.Init()

    for (var i = 0; i < this.phylactere.boidList.length; ++i)
    {
      var letter = this.phylactere.boidList[i]
      letter.showBubble = false
      Manager.drawer.clearBubble(Manager.boidList.indexOf(letter))
    }

    this.update = function ()
    {
      this.phylactere.Update()
    }

    this.move = function (x, y)
    {
      this.phylactere.anchorX = x
      this.phylactere.x = x
      this.phylactere.y = y
    }
  }

  Talker.prototype = Object.create(PIXI.Container.prototype)
  Talker.prototype.constructor = Talker

  return Talker
})
