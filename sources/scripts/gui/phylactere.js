
var Phylactere = function(text, style)
{
	Message.call(this, text, style)

	this.tailBoidList = []

	for (var i = 0; i < 16; ++i)
	{
		var boid = new Boid()
		boid.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		boid.targetScale = 0.1
		boid.friction = 0.9
		stage.addChild(boid)
		boidList.push(boid)
		this.tailBoidList.push(boid)
	}

	this.update = function ()
	{
		for (var i = 0; i < this.tailBoidList.length; ++i)
		{
			var boid = this.tailBoidList[i]
			var ratio = i / this.tailBoidList.length
			var target = this.letters[0]
			boid.target.x = mix(0, target.x, ratio)
			boid.target.y = mix(0, target.y, ratio)
			if (distanceTo(target) != 0)
			{
				boid.target.x += (target.y / distanceTo(target)) * Math.sin(ratio * PI2) * 40
				boid.target.y += (-target.x / distanceTo(target)) * Math.sin(ratio * PI2) * 40
			}
		}
	}
}

Phylactere.prototype = Object.create(Message.prototype)
Phylactere.prototype.constructor = Phylactere
