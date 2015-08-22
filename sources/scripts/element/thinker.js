
define(['lib/pixi', 'gui/phylactere', 'base/renderer'], function(PIXI, Phylactere, renderer){
  var Thinker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Thinker")

    this.update = function ()
    {
      this.phylactere.x = renderer.width / 2
      this.phylactere.y = renderer.height / 2
      this.phylactere.update()
    }
  }

  Thinker.prototype = Object.create(PIXI.Container.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
