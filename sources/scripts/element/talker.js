
define(['lib/pixi', 'gui/phylactere', 'base/renderer'], function(PIXI, Phylactere, renderer){
  var Talker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Talker", undefined, 0, 0)

    this.phylactere.anchorX = renderer.width
    this.phylactere.x = renderer.width * 3 / 4
    this.phylactere.y = renderer.height / 2

    for (var i = 0; i < this.phylactere.letters.length; ++i)
    {
      var boid = this.phylactere.letters[i]
      boid.showBubble = false
    }

    this.update = function ()
    {
      this.phylactere.update()
    }
  }

  Talker.prototype = Object.create(PIXI.Container.prototype)
  Talker.prototype.constructor = Talker

  return Talker
})
