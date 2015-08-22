
define(['base/Boid', 'engine', 'gui/message', 'gui/letter', 'base/utils', 'base/renderer', 'manager', 'base/point'], function(Boid, Engine, Message, Letter, Utils, renderer, Manager, Point)
{
	var Phylactere = function(text, style)
	{
		Message.call(this, text, style)

		this.anchorX = 0
		this.anchorY = 0

		this.tailBoidList = []
		for (var i = 0; i < 8; ++i)
		{
			var ratio = i / 8
			var boid = new Boid()
			boid.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
			boid.friction = 0.9
			boid.size = 8 + Math.sin(ratio * Utils.PI2) * 2
			Manager.stage.addChild(boid)
			Manager.boidList.push(boid)
			this.tailBoidList.push(boid)
		}

		this.cloudBoidList = []
		for (var i = 0; i < 8; ++i)
		{
			var ratio = i / 8
			var letter = new Letter(" ")
			letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
			letter.size = 15 + Math.sin(ratio * Utils.PI2) * 10
			Manager.stage.addChild(letter)
			Manager.boidList.push(letter)
			this.cloudBoidList.push(letter)
		}

		this.update = function ()
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
				var p = new Point(this.x - boid.x, this.y - boid.y)
				var norm = p.getNormal()
				boid.target.x = norm.x * dist + boid.x
				boid.target.y = norm.y * dist + boid.y
			}
		}
	}

	Phylactere.prototype = Object.create(Message.prototype)
	Phylactere.prototype.constructor = Phylactere

	return Phylactere
})
