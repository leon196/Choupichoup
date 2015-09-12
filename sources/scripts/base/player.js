
define(['../lib/pixi', '../settings', '../core/manager',
'../element/phylactere', '../element/letter', '../base/point', '../color'],
function(PIXI, Settings, Manager, Phylactere, Letter, Point, Color){
  var Player = function ()
  {
    Phylactere.call(this)

    this.Init = function ()
    {
      this.x = Manager.mouse.x
      this.y = Manager.mouse.y
      this.isPlayer = true
      this.SetColorness(1)
      this.SetColor(Color.Player)
      this.avoidScale = 0.05
      this.friction = 0.8
      this.targetScale = 1
      Manager.AddBoid(this)

      // this.SpawnBubbleLetters(8)
      for (var i = 0; i < this.boidList.length; ++i)
      {
        this.boidList[i].SetColorness(1)
        this.boidList[i].avoidScale = this.avoidScale
      }
    }

		this.Absorb = function (boid)
		{
      boid.isPlayer = true
			boid.phylactere = this
			boid.unknown = false
			this.boidList.push(boid)
		}

    this.Resorb = function (boid)
    {
      boid.isPlayer = false
      this.boidList.splice(this.boidList.indexOf(boid), 1)
    }

    this.Update = function ()
    {
			// Move to mouse
			this.target.x = Manager.mouse.x
			this.target.y = Manager.mouse.y

      this.UpdateTargets(0.5)

			// for (var i = 0; i < this.boidList.length; ++i)
			// {
			// 	var boid = this.boidList[i]
      //   boid.target.x = Manager.mouse.x
      //   boid.target.y = Manager.mouse.y
      // }
    }

  }

  Player.prototype = Object.create(Phylactere.prototype)
  Player.prototype.constructor = Player

  return Player
})
