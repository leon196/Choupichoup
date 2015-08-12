
var Drawer = function()
{
	PIXI.Container.call(this)

	this.graphicsBlack = new PIXI.Graphics()
	this.graphicsWhite = new PIXI.Graphics()
	this.addChild(this.graphicsBlack)
	this.addChild(this.graphicsWhite)

 	this.outline = 2

 	this.Clear = function ()
 	{
		this.graphicsWhite.clear()
		this.graphicsBlack.clear()
		this.graphicsWhite.beginFill(0xffffff)
		this.graphicsBlack.beginFill(0x000000)
	}

 	this.Boid = function (boid)
 	{
 		var radius = boid.size * 0.75
		this.graphicsBlack.drawCircle(boid.x, boid.y + this.outline / 2, radius + this.outline)
		this.graphicsWhite.drawCircle(boid.x, boid.y, radius)
 	}

 	this.Bull = function (x, y, radius)
 	{
		this.graphicsBlack.drawCircle(x, y + this.outline / 2, radius + this.outline)
		this.graphicsWhite.drawCircle(x, y, radius)
 	}

 	this.EndFill = function ()
 	{
		this.graphicsWhite.endFill()
		this.graphicsBlack.endFill()
 	}
}

Drawer.prototype = Object.create(PIXI.Container.prototype)
Drawer.prototype.constructor = Drawer
