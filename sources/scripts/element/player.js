
define(['lib/pixi', 'gui/phylactere', 'manager', 'settings', 'gui/letter'], function(PIXI, Phylactere, Manager, Settings, Letter){
   var Player = function ()
   {
     PIXI.Container.call(this)

     this.bubbleList = []
     this.css = { min:8, max:16, font: 'Shadows Into Light', fill: '#ffffff', align: 'left' }
     this.phylactere = new Phylactere("Player", this.css, 8)
     this.phylactere.x = Manager.mouse.x
     this.phylactere.y = Manager.mouse.y
     this.phylactere.isPlayer = true
     this.phylactere.Init()

    this.Absorb = function (boid)
    {
      for (var i = 0; i < this.phylactere.letters.length; ++i)
      {
        var letter = this.phylactere.letters[i]
        if (letter.text.text == " ")
        {
          letter.text.text = boid.text.text
          letter.text.style.fill = '#ffffff'
          letter.size = boid.size
          Manager.drawer.redraw(Manager.boidList.indexOf(letter))
          return true
        }
      }
      return false
    }

    this.update = function ()
    {
      this.phylactere.x = Manager.mouse.x
      this.phylactere.y = Manager.mouse.y
      this.phylactere.Update()
    }
  }

  Player.prototype = Object.create(PIXI.Container.prototype)
  Player.prototype.constructor = Player

  return Player
})
