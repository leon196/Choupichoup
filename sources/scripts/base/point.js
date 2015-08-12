
var Point = function(x, y)
{
	this.x = typeof x != "undefined" ? x : 0
	this.y = typeof y != "undefined" ? y : 0

	this.normalize = function()
	{
		if (this.magnitude() > 0)
		{
			this.x = this.x / this.magnitude()
			this.y = this.y / this.magnitude()
		}
	}

	this.magnitude = function ()
	{
		return Math.sqrt(this.x*this.x+this.y*this.y)
	}
	
	this.ApplyLinearRatio = function (max)
	{
		if (max != 0)
		{
			ratio = Math.min(this.magnitude(), max) / max
			this.x = clamp(this.x, -max * ratio, ratio * max)
			this.y = clamp(this.y, -max * ratio, ratio * max)
		}
		else
		{
			this.x = 0
			this.y = 0
		}
	}
}