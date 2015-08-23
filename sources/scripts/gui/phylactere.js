
define(['base/boid', 'engine', 'gui/message', 'gui/letter', 'base/utils', 'base/renderer', 'manager', 'base/point', 'settings'], function(Boid, Engine, Message, Letter, Utils, renderer, Manager, Point, Settings)
{
	var Phylactere = function(text, style, linkCount, cloudCount)
	{
		Message.call(this, text, style)

		this.anchorX = 0
		this.anchorY = 0

		this.tailBoidList = []
		this.cloudBoidList = []

		this.linkCount = typeof linkCount !== "undefined" ? linkCount : 0
		this.cloudCount = typeof cloudCount !== "undefined" ? cloudCount : 0

		this.Init = function ()
		{
			for (var i = 0; i < this.linkCount; ++i)
			{
				var ratio = i / this.linkCount
				var boid = new Boid()
				boid.x = Utils.mix(this.anchorX, this.x, ratio)
				boid.y = Utils.mix(this.anchorY, this.y, ratio)
				boid.friction = 0.9
				boid.size = 8 + Math.sin(ratio * Utils.PI2) * 2
				Manager.stage.addChild(boid)
				Manager.boidList.push(boid)
				Manager.drawer.AddBubble(boid)
				this.tailBoidList.push(boid)
			}

			for (var i = 0; i < this.cloudCount; ++i)
			{
				var ratio = i / this.cloudCount
				var letter = new Letter(" ")
				letter.x = this.x
				letter.y = this.y
				letter.size = 15 + Math.sin(ratio * Utils.PI2) * 10
				Manager.stage.addChild(letter)
				Manager.boidList.push(letter)
				Manager.drawer.AddBubble(letter)
				this.cloudBoidList.push(letter)
			}
			for (var i = 0; i < this.letters.length; ++i)
			{
				var letter = this.letters[i]
				letter.x = this.x
				letter.y = this.y
			}
		}

		this.Update = function ()
		{
			for (var i = 0; i < this.tailBoidList.length; ++i)
			{
				var boid = this.tailBoidList[i]
				var ratio = i / this.tailBoidList.length
				boid.target.x = Utils.mix(this.anchorX, this.x, ratio)
				boid.target.y = Utils.mix(this.anchorY, this.y, ratio)
				if (Utils.distanceTo(this) != 0)
				{
					boid.target.x += (this.y / Utils.distanceTo(this)) * Math.sin(ratio * Utils.PI2) * 40
					boid.target.y += (-this.x / Utils.distanceTo(this)) * Math.sin(ratio * Utils.PI2) * 40
				}
			}
			for (var i = 0; i < this.cloudBoidList.length; ++i)
			{
				var boid = this.cloudBoidList[i]
				var p = new Point(this.x - boid.x, this.y - boid.y)
				var dist = Math.max(0, p.magnitude() - 60)
				var norm = p.getNormal()
				boid.target.x = norm.x * dist + boid.x
				boid.target.y = norm.y * dist + boid.y
			}
			for (var i = 0; i < this.letters.length; ++i)
			{
				var boid = this.letters[i]
	    	boid.target.x = this.GetX() + boid.gridX
	    	boid.target.y = this.GetY() + boid.gridY
			}
		}
	}

	Phylactere.prototype = Object.create(Message.prototype)
	Phylactere.prototype.constructor = Phylactere

	return Phylactere
})
