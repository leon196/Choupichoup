
define(['../settings', '../core/renderer', '../core/manager', '../symbol',
'../base/utils', '../base/point', '../base/boid', '../element/letter'],
function(Settings, renderer, Manager, Symbol, Utils, Point, Boid, Letter)
{
	var Phylactere = function()
	{
		Letter.call(this)

    Manager.layerThinker.addChild(this.textBack)
		Manager.layerThinker.addChild(this.textFront)

		this.SetCharacter(Symbol.hearth)

		this.boidList = []
		this.color = "0xFCFCFC"
    this.hearthColor = "0xff0000"
    this.satisfied = false

		this.SpawnBubble = function (range)
		{
			var letter = new Letter()

			var rndAngle = Math.random() * Utils.PI2
			letter.x = this.x + Math.cos(rndAngle) * this.size * 2
			letter.y = this.y + Math.sin(rndAngle) * this.size * 2

			letter.isPlayer = this.isPlayer
			letter.phylactere = this
			letter.SetColor(this.color)
			letter.SetRange(range)
			this.boidList.push(letter)

			Manager.AddBoid(letter)
		}
		this.SpawnBubbleLetters = function (count)
		{
			for (var i = 0; i < count; ++i)
			{
				var letter = new Letter()

				var rndAngle = Math.random() * Utils.PI2
				letter.x = this.x + Math.cos(rndAngle) * this.size * 2
				letter.y = this.y + Math.sin(rndAngle) * this.size * 2

				letter.isPlayer = this.isPlayer
				letter.phylactere = this
				letter.SetColor(this.color)
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
				// var orbitScale = Utils.clamp(this.velocity.magnitude(), 0, 1) * Settings.ORBIT_SCALE
				var orbitScale = Settings.ORBIT_SCALE
				boid.target.x = (right.x * orbitScale + norm.x * dist) * Settings.ORBIT_SPEED + boid.x
				boid.target.y = (right.y * orbitScale + norm.y * dist) * Settings.ORBIT_SPEED + boid.y

				if (this.satisfied) {
					boid.Boogie()
				}
			}
		}

    this.GetRange = function ()
    {
      var range = this.range
			for (var i = 0; i < this.boidList.length; ++i)
			{
				range += this.boidList[i].range
      }
      return range
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
