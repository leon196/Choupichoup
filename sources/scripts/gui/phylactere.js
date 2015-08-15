
var Phylactere = function(text, style)
{
	Message.call(this, text, style)

	this.tailBoidList = []
	for (var i = 0; i < 8; ++i)
	{
		var ratio = i / 8
		var boid = new Boid()
		boid.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		boid.friction = 0.9
		boid.size = 8 + Math.sin(ratio * PI2) * 2
		stage.addChild(boid)
		boidList.push(boid)
		this.tailBoidList.push(boid)
	}

	this.cloudBoidList = []
	for (var i = 0; i < 8; ++i)
	{
		var ratio = i / 8
		var letter = new Letter(" ")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		letter.size = 15 + Math.sin(ratio * PI2) * 10
		stage.addChild(letter)
		boidList.push(letter)
		this.cloudBoidList.push(letter)
	}

	this.update = function ()
	{
		for (var i = 0; i < this.tailBoidList.length; ++i)
		{
			var boid = this.tailBoidList[i]
			var ratio = i / this.tailBoidList.length
			boid.target.x = mix(renderer.width / 2, this.x, ratio)
			boid.target.y = mix(renderer.height - 85, this.y, ratio)
			if (distanceTo(this) != 0)
			{
				boid.target.x += (this.y / distanceTo(this)) * Math.sin(ratio * PI2) * 40
				boid.target.y += (-this.x / distanceTo(this)) * Math.sin(ratio * PI2) * 40
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
	}
}

Phylactere.prototype = Object.create(Message.prototype)
Phylactere.prototype.constructor = Phylactere
