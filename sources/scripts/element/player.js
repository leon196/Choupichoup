
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
      this.SetDarkness(1)
      this.SetSize(30)
      Manager.AddBoid(this)

      for (var i = 0; i < this.boidList.length; ++i)
      {
        this.boidList[i].SetDarkness(1)
      }
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
