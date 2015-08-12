
var Drawer = function()
{
	PIXI.Container.call(this)

	this.graphicsBlack = new PIXI.Graphics()
	this.graphicsWhite = new PIXI.Graphics()
	this.addChild(this.graphicsBlack)
	this.addChild(this.graphicsWhite)

	this.showBull = true
	this.debug = false

 	this.Clear = function ()
 	{
		this.graphicsWhite.clear()
		this.graphicsBlack.clear()
		this.graphicsWhite.beginFill(0xffffff)
		this.graphicsBlack.beginFill(0x000000)
	}

 	this.Bull = function (x, y, radius)
 	{
 		if (this.showBull)
 		{
			this.graphicsBlack.drawCircle(x, y + BULL_OUTLINE / 2, radius + BULL_OUTLINE)
			this.graphicsWhite.drawCircle(x, y, radius)
		}
 	}

 	this.Line = function (pos, dir, color)
 	{
		this.graphicsBlack.lineStyle(2, color)
		this.graphicsBlack.moveTo(pos.x, pos.y)
		this.graphicsBlack.lineTo(dir.x * 1000 + pos.x, dir.y * 1000 + pos.y)
		this.graphicsBlack.lineStyle(0, color)
 	}

 	this.EndFill = function ()
 	{
		this.graphicsWhite.endFill()
		this.graphicsBlack.endFill()
 	}
}

Drawer.prototype = Object.create(PIXI.Container.prototype)
Drawer.prototype.constructor = Drawer
