
define(['lib/pixi', 'gui/phylactere', 'manager', 'settings', 'gui/letter', 'base/point'], function(PIXI, Phylactere, Manager, Settings, Letter, Point){
  var Player = function ()
  {
    Phylactere.call(this)

    this.Init = function ()
    {
      this.x = Manager.mouse.x
      this.y = Manager.mouse.y
      this.isPlayer = true
      this.SpawnBubbleLetters(16)
      this.SetDarkness(1)
      this.SetSize(30)
      this.avoidScale = 0
      this.targetScale = 0.2
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

		this.UpdateTargets = function ()
		{
			// Orbit around phylactere root boid
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				boid.target.x = Manager.mouse.x
				boid.target.y = Manager.mouse.y
			}
		}
  }

  Player.prototype = Object.create(Phylactere.prototype)
  Player.prototype.constructor = Player

  return Player
})
