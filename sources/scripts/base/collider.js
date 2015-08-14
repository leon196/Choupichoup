
var Collider = function()
{
	PIXI.Container.call(this)

	this.radius = 30

	this.circleTest = function (x, y, otherRadius)
	{
		return distanceBetween(this, {x:x, y:y}) < this.radius + otherRadius
	}

	this.circleCollision = function (collider)
	{
		return distanceBetween(this.x, this.y, collider.x, collider.y) < this.radius + collider.radius
	}
}

Collider.prototype = Object.create(PIXI.Container.prototype)
Collider.prototype.constructor = Collider