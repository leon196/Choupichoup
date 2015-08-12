
var Boid = function()
{
	PIXI.Container.call(this)

	// Random seed
	var randomAngle = Math.random() * Math.PI * 2
	this.velocity = new Point(Math.cos(randomAngle), Math.sin(randomAngle))
	// this.velocityScale = 1 - this.fontSize / 40

	// Set default parameters
	this.gridScale = DEFAULT_GRID_SCALE
	this.targetScale = DEFAULT_TARGET_SCALE
	this.avoidScale = DEFAULT_AVOID_SCALE
	this.nearScale = DEFAULT_NEAR_SCALE
	this.globalScale = DEFAULT_GLOBAL_SCALE

	this.update = function(moveX, moveY)
	{
		// Accumulate velocity
		this.velocity.x += moveX
		this.velocity.y += moveY

		// Apply
		this.x += this.velocity.x// * this.velocityScale
		this.y += this.velocity.y // * this.velocityScale

		// Friction
		this.velocity.x *= 0.99//(0.97 + 0.02 * Math.sin(timeElapsed * 0.001))
		this.velocity.y *= 0.99//(0.97 + 0.02 * Math.sin(timeElapsed * 0.001))
	}

	this.distanceTo = function(boid)
	{
		return Math.sqrt((boid.x-this.x)*(boid.x-this.x)+(boid.y-this.y)*(boid.y-this.y))
	}

 	this.debug = function (dir, color)
 	{
		drawer.graphicsBlack.lineStyle(2, color)
		drawer.graphicsBlack.moveTo(this.x, this.y)
		drawer.graphicsBlack.lineTo(dir.x * 1000 + this.x, dir.y * 1000 + this.y)
		drawer.graphicsBlack.lineStyle(0, color)
 	}
}

Boid.prototype = Object.create(PIXI.Container.prototype)
Boid.prototype.constructor = Boid
