
define(['base/boid', 'engine', 'gui/letter', 'base/utils', 'base/renderer', 'manager', 'base/point', 'settings'], function(Boid, Engine, Letter, Utils, renderer, Manager, Point, Settings)
{
	var Phylactere = function()
	{
		Letter.call(this, "*")

		this.boidList = []

		this.SpawnBubbleLetters = function (count)
		{
			for (var i = 0; i < count; ++i)
			{
				var letter = new Letter()
				letter.phylactere = this
				letter.x = this.x
				letter.y = this.y
				letter.isPlayer = this.isPlayer
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
				var dist = Math.max(0, p.magnitude() - 60)
				var norm = p.getNormal()
				boid.target.x = norm.x * dist + boid.x
				boid.target.y = norm.y * dist + boid.y
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
