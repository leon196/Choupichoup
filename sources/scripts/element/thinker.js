
define(['lib/pixi', 'gui/phylactere', 'base/renderer'], function(PIXI, Phylactere, renderer){
  var Thinker = function ()
  {
    PIXI.Container.call(this)

    this.phylactere = new Phylactere("Thinker", { min:8, max:16, font: 'Shadows Into Light', fill: '#020202', align: 'left' }, 8, 0)
    this.phylactere.anchorX = renderer.width / 2
    this.phylactere.x = renderer.width / 2
    this.phylactere.y = renderer.height / 2

    this.update = function ()
    {
      this.phylactere.update()
    }
  }

  Thinker.prototype = Object.create(PIXI.Container.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
