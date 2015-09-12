
define(['../lib/pixi', '../core/global', '../settings', '../core/render',
'../utils/tool', '../color'],
function(PIXI, Global, Settings, Render, Tool, Color)
{
	var Boid = function()
	{
		PIXI.Container.call(this)

		this.size = 10
		this.target = Tool.vec2(Global.width / 2, Global.height / 2)
		this.isPlayer = false

		var velocityAngle = Math.random() * Math.PI * 2
		this.velocity = Tool.vec2(Math.cos(velocityAngle), Math.sin(velocityAngle))

		this.speed = Settings.DEFAULT_SPEED
		this.friction = Settings.DEFAULT_FRICTION
		this.frictionCollision = Settings.DEFAULT_FRICTION_COLLISION

		this.targetScale = Settings.DEFAULT_TARGET_SCALE
		this.avoidScale = Settings.DEFAULT_AVOID_SCALE
		this.nearScale = Settings.DEFAULT_NEAR_SCALE
		this.globalScale = Settings.DEFAULT_GLOBAL_SCALE

		this.move = function(moveX, moveY)
		{
			this.velocity.x += moveX
			this.velocity.y += moveY

			this.x += this.velocity.x * this.speed / Math.max(1, this.size)
			this.y += this.velocity.y * this.speed / Math.max(1, this.size)

			this.velocity.x *= this.friction
			this.velocity.y *= this.friction
		}

		this.rumble = function ()
		{
			var randomAngle = Math.random() * Math.PI * 2
			this.velocity.x += Math.cos(randomAngle)
			this.velocity.y += Math.sin(randomAngle)
		}

		this.getSize = function ()
		{
			return this.size
		}
	}

	Boid.prototype = Object.create(PIXI.Container.prototype)
	Boid.prototype.constructor = Boid

	return Boid
})
