
var Drawer = function()
{
	PIXI.Container.call(this)

	this.graphicsBlack = new PIXI.Graphics()
	this.graphicsWhite = new PIXI.Graphics()
	this.graphicsDebug = new PIXI.Graphics()
	this.addChild(this.graphicsBlack)
	this.addChild(this.graphicsWhite)
	this.addChild(this.graphicsDebug)

	this.showBull = true
	this.debug = true

 	this.Clear = function ()
 	{
		this.graphicsWhite.clear()
		this.graphicsBlack.clear()
		this.graphicsDebug.clear()
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

 	this.Line = function (pos, dir, thinckness, color)
 	{
		this.graphicsBlack.lineStyle(thinckness, color)
		this.graphicsBlack.moveTo(pos.x, pos.y)
		this.graphicsBlack.lineTo(dir.x + pos.x, dir.y + pos.y)
		this.graphicsBlack.lineStyle(0, color)
 	}

 	this.Arrow = function (origin, dir, length, thinckness, color)
 	{
 		var forward = { x: dir.x * length, y: dir.y * length }
 		var peak = { x: dir.x * (length + 10), y: dir.y * (length + 10) }
 		var offset = { x: dir.y, y: -dir.x }
 		var triangle = { x: dir.y * Math.min(thinckness, 30), y: -dir.x * Math.min(thinckness, 30) }
		this.graphicsDebug.beginFill(color)
		this.graphicsDebug.moveTo(origin.x - offset.x, origin.y - offset.y)
		this.graphicsDebug.lineTo(origin.x + forward.x - offset.x, origin.y + forward.y - offset.y)
		this.graphicsDebug.lineTo(origin.x + forward.x - triangle.x, origin.y + forward.y - triangle.y)
		this.graphicsDebug.lineTo(origin.x + peak.x, origin.y + peak.y)
		this.graphicsDebug.lineTo(origin.x + forward.x + triangle.x, origin.y + forward.y + triangle.y)
		this.graphicsDebug.lineTo(origin.x + forward.x + offset.x, origin.y + forward.y + offset.y)
		this.graphicsDebug.lineTo(origin.x + offset.x, origin.y + offset.y)
 	}

 	this.EndFill = function ()
 	{
		this.graphicsWhite.endFill()
		this.graphicsBlack.endFill()
 	}
}

Drawer.prototype = Object.create(PIXI.Container.prototype)
Drawer.prototype.constructor = Drawer