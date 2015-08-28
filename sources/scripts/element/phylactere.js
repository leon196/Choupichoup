
define(['../settings', '../core/renderer', '../core/manager',
'../base/utils', '../base/point', '../base/boid', '../element/letter'],
function(Settings, renderer, Manager, Utils, Point, Boid, Letter)
{
	var Phylactere = function()
	{
		Letter.call(this, " ")

		this.boidList = []
		this.color = "#FCFCFC"

		this.SpawnBubbleLetters = function (count)
		{
			for (var i = 0; i < count; ++i)
			{
				var letter = new Letter()
				letter.x = this.x
				letter.y = this.y
				letter.isPlayer = this.isPlayer
				letter.phylactere = this
				letter.color = this.color
				this.boidList.push(letter)

				Manager.AddBoid(letter)
			}
		}

		this.UpdateTargets = function ()
		{
			// Orbit around phylactere root boid
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				var p = new Point(this.x - boid.x, this.y - boid.y)
				var dist = p.magnitude()//Math.max(0, p.magnitude() - 60)
				var norm = p.getNormal()
				var right = { x: norm.y , y: -norm.x }
				var orbitScale = Utils.clamp(this.velocity.magnitude(), 0, 1) * Settings.ORBIT_SCALE
				boid.target.x = (right.x * orbitScale + norm.x * dist) * Settings.ORBIT_SPEED + boid.x
				boid.target.y = (right.y * orbitScale + norm.y * dist) * Settings.ORBIT_SPEED + boid.y
			}
		}

		this.Clear = function ()
		{
			for (var i = 0; i < this.boidList.length; ++i)
			{
				Manager.RemoveBoid(this.boidList[i], Manager.boidList.indexOf(this.boidList[i]))
			}
		}
	}

	Phylactere.prototype = Object.create(Letter.prototype)
	Phylactere.prototype.constructor = Phylactere

	return Phylactere
})
