
var Point = function(x, y)
{
	this.x = typeof x != "undefined" ? x : 0
	this.y = typeof y != "undefined" ? y : 0

	this.scale = function (scalar)
	{
		this.x *= scalar
		this.y *= scalar
		return this
	}

	this.normalize = function()
	{
		if (this.magnitude() > 0)
		{
			this.x = this.x / this.magnitude()
			this.y = this.y / this.magnitude()
		}
		return this
	}

	this.magnitude = function ()
	{
		return Math.sqrt(this.x*this.x+this.y*this.y)
	}

	this.distanceTo = function(other)
	{
		return Math.sqrt((other.x-this.x)*(other.x-this.x)+(other.y-this.y)*(other.y-this.y))
	}

	this.getClamp = function (min, max)
	{
		var p = { x: 0, y: 0}
		if (max != 0)
		{
			var ratio = clamp(this.magnitude(), min, max)//Math.min(this.magnitude(), max) / max
			var angle = Math.atan2(this.y, this.x)
			p.x = min + Math.cos(angle) * (max - min) * ratio
			p.y = min + Math.sin(angle) * (max - min) * ratio
		}
		return p
	}

	this.getNormal = function ()
	{
		if (this.magnitude() > 0)
		{
			return new Point(this.x / this.magnitude(), this.y / this.magnitude())
		}
		return new Point()
	}
}
