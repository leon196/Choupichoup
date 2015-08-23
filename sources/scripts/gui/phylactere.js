
define(['base/boid', 'engine', 'gui/message', 'gui/letter', 'base/utils', 'base/renderer', 'manager', 'base/point', 'settings'], function(Boid, Engine, Message, Letter, Utils, renderer, Manager, Point, Settings)
{
	var Phylactere = function(text, style, linkCount, cloudCount)
	{
		Message.call(this, text, style)

		this.isPlayer = false

		this.anchorX = 0
		this.anchorY = 0

		this.tailBoidList = []

		this.linkCount = typeof linkCount !== "undefined" ? linkCount : 0
		this.cloudCount = typeof cloudCount !== "undefined" ? cloudCount : 0

		this.Init = function ()
		{
			for (var i = 0; i < this.linkCount; ++i)
			{
				var ratio = i / this.linkCount
				var boid = new Boid()
				boid.phylactere = this
				boid.x = Utils.mix(this.anchorX, this.x, ratio)
				boid.y = Utils.mix(this.anchorY, this.y, ratio)
				boid.friction = 0.9
				boid.size = 8 + Math.sin(ratio * Utils.PI2) * 2
				boid.isPlayer = this.isPlayer
				boid.isLink = true
				boid.linkRatio = ratio
				Manager.addBoid(boid)
				this.boidList.push(boid)
			}
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var letter = this.boidList[i]
				letter.phylactere = this
				letter.x = this.x
				letter.y = this.y
				letter.isPlayer = this.isPlayer
	      Manager.drawer.redraw(Manager.boidList.indexOf(letter))
			}
			for (var i = 0; i < this.cloudCount; ++i)
			{
				var ratio = i / this.cloudCount
				var letter = new Letter(" ")
				letter.phylactere = this
				letter.x = this.x
				letter.y = this.y
				letter.size = 15 + Math.sin(ratio * Utils.PI2) * 10
				letter.isPlayer = this.isPlayer
				Manager.addBoid(letter)
				this.boidList.push(letter)
			}
		}

		this.Update = function ()
		{
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]

				if (boid.isLink == false)
				{
					// Letter
					if (boid.text.text != " ")
					{
			    	boid.target.x = this.GetX() + boid.gridX
			    	boid.target.y = this.GetY() + boid.gridY
					}
					// Empty Bubble
					else
					{
						var p = new Point(this.x - boid.x, this.y - boid.y)
						var dist = Math.max(0, p.magnitude() - 60)
						var norm = p.getNormal()
						boid.target.x = norm.x * dist + boid.x
						boid.target.y = norm.y * dist + boid.y
					}
				}
				else
				{
					// Link / Tail
					var ratio = boid.linkRatio
					boid.target.x = Utils.mix(this.anchorX, this.x, ratio)
					boid.target.y = Utils.mix(this.anchorY, this.y, ratio)
					if (Utils.distanceTo(this) != 0)
					{
						boid.target.x += (this.y / Utils.distanceTo(this)) * Math.sin(ratio * Utils.PI2) * 40
						boid.target.y += (-this.x / Utils.distanceTo(this)) * Math.sin(ratio * Utils.PI2) * 40
					}
				}
			}
		}

		this.DivideBubble = function (collider)
		{
			collider.size = Settings.SPAWN_SIZE

			var letter = new Letter(" ", style)
			letter.x = collider.x
      letter.y = collider.y
			letter.size = Settings.SPAWN_SIZE
			letter.phylactere = this
	    letter.isPlayer = collider.isPlayer
			Manager.addBoid(letter)
      this.boidList.push(letter)
		}

		this.IsDead = function ()
		{
			for (var i = 0; i < this.boidList.length; ++i) {
				if (this.boidList[i] instanceof Letter) {
					return false
				}
			}
			return true
		}

		this.clear = function ()
		{
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				Manager.removeBoid(boid, Manager.boidList.indexOf(boid))
			}
		}
	}

	Phylactere.prototype = Object.create(Message.prototype)
	Phylactere.prototype.constructor = Phylactere

	return Phylactere
})
