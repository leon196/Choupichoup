
define(['../lib/pixi', '../settings', '../core/manager',
'../element/phylactere', '../element/letter', '../base/point'], function(PIXI, Settings, Manager, Phylactere, Letter, Point){
  var Player = function ()
  {
    Phylactere.call(this)

    this.Init = function ()
    {
      this.x = Manager.mouse.x
      this.y = Manager.mouse.y
      this.isPlayer = true
      this.SetDarkness(1)
      this.SetSize(Settings.THINKER_SIZE)
      // this.avoidScale = 0
      this.friction = 0.8
      this.targetScale = 1
      Manager.AddBoid(this)

      this.SpawnBubbleLetters(0)
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
