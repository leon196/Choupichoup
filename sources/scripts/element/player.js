
define(['lib/pixi', 'gui/phylactere', 'manager', 'settings', 'gui/letter'], function(PIXI, Phylactere, Manager, Settings, Letter){
  var Player = function ()
  {
    Phylactere.call(this)

    this.Init = function ()
    {
      this.x = Manager.mouse.x
      this.y = Manager.mouse.y
      this.isPlayer = true
      this.SpawnBubbleLetters(8)
      Manager.AddBoid(this)
    }

    this.Absorb = function (collider, boid)
    {
    }

    this.Update = function ()
    {
			// Move to mouse
			this.target.x = Manager.mouse.x
			this.target.y = Manager.mouse.y

      //
      this.UpdateTargets()
    }
  }

  Player.prototype = Object.create(Phylactere.prototype)
  Player.prototype.constructor = Player

  return Player
})
