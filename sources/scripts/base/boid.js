
define(['lib/pixi', 'base/renderer', 'base/point', 'settings'], function(PIXI, renderer, Point, Settings)
{
	var Boid = function()
	{
		PIXI.Container.call(this)

		this.size = 4+Math.random()*16
		this.target = new Point(renderer.width / 2, renderer.height / 2)

		// Init velocity vector with random seed
		var randomAngle = Math.random() * Math.PI * 2
		this.velocity = new Point(Math.cos(randomAngle), Math.sin(randomAngle))

		this.speed = Settings.DEFAULT_SPEED
		this.friction = Settings.DEFAULT_FRICTION
		this.frictionCollision = Settings.DEFAULT_FRICTION_COLLISION

		// Rules
		this.gridScale = Settings.DEFAULT_GRID_SCALE
		this.targetScale = Settings.DEFAULT_TARGET_SCALE
		this.avoidScale = Settings.DEFAULT_AVOID_SCALE
		this.nearScale = Settings.DEFAULT_NEAR_SCALE
		this.globalScale = Settings.DEFAULT_GLOBAL_SCALE

		this.update = function(moveX, moveY)
		{
			// Accumulate velocity
			this.velocity.x += moveX
			this.velocity.y += moveY

			// Apply
			this.x += this.velocity.x * this.speed / this.size
			this.y += this.velocity.y * this.speed / this.size

			// Friction
			this.velocity.x *= this.friction
			this.velocity.y *= this.friction
		}
	}

	Boid.prototype = Object.create(PIXI.Container.prototype)
	Boid.prototype.constructor = Boid

	return Boid
})
