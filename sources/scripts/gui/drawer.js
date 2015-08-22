
define(['lib/pixi', 'settings', 'base/renderer', 'engine', 'manager'], function (PIXI, Settings, renderer, Engine, Manager)
{
	var Drawer = function()
	{
		PIXI.Container.call(this)

		this.background = new PIXI.Sprite(PIXI.Texture.fromImage('images/head.png'))
		this.background.anchor.x = 0.55
		this.background.anchor.y = 1
		this.background.x = renderer.width / 2
		this.background.y = renderer.height
		this.addChild(this.background)

		this.graphicsBlack = new PIXI.Graphics()
		this.graphicsWhite = new PIXI.Graphics()
		this.graphicsDebug = new PIXI.Graphics()
		this.addChild(this.graphicsBlack)
		this.addChild(this.graphicsDebug)
		this.addChild(this.graphicsWhite)

		this.bullBlackList = []
		this.bullWhiteList = []
		for (var b = 0; b < Manager.boidList.length; ++b)
		{
			var boid = Manager.boidList[b]
			var graphB = new PIXI.Graphics()

			if (boid.isPlayer) graphB.beginFill(0xcccccc)
			else graphB.beginFill(0x000000)

			graphB.drawCircle(0, Settings.BULL_OUTLINE / 2, boid.size + Settings.BULL_OUTLINE)
			this.bullBlackList.push(graphB)
			Manager.layerBlack.addChild(graphB)

			var graphW = new PIXI.Graphics()
			if (boid.isPlayer) graphW.beginFill(0x000000)
			else graphW.beginFill(0xffffff)
			graphW.drawCircle(0, 0, boid.size)
			this.bullWhiteList.push(graphW)
			Manager.layerWhite.addChild(graphW)
		}

		this.showBubble = true
		this.debug = false

	 	this.Clear = function ()
	 	{
			this.graphicsWhite.clear()
			this.graphicsBlack.clear()
			this.graphicsDebug.clear()
			this.graphicsWhite.beginFill(0xffffff)
			this.graphicsBlack.beginFill(0x000000)
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
	 		if (length > 10)
	 		{
		 		var forward = { x: dir.x * length, y: dir.y * length }
		 		var peak = { x: dir.x * (length + 10), y: dir.y * (length + 10) }
		 		var offset = { x: dir.y * thinckness / 4, y: -dir.x * thinckness / 4 }
		 		var triangle = { x: dir.y * thinckness, y: -dir.x * thinckness }
				this.graphicsDebug.beginFill(color)
				this.graphicsDebug.moveTo(origin.x - offset.x, origin.y - offset.y)
				this.graphicsDebug.lineTo(origin.x + forward.x - offset.x, origin.y + forward.y - offset.y)
				this.graphicsDebug.lineTo(origin.x + forward.x - triangle.x, origin.y + forward.y - triangle.y)
				this.graphicsDebug.lineTo(origin.x + peak.x, origin.y + peak.y)
				this.graphicsDebug.lineTo(origin.x + forward.x + triangle.x, origin.y + forward.y + triangle.y)
				this.graphicsDebug.lineTo(origin.x + forward.x + offset.x, origin.y + forward.y + offset.y)
				this.graphicsDebug.lineTo(origin.x + offset.x, origin.y + offset.y)
	 		}
	 	}

	 	this.EndFill = function ()
	 	{
			this.graphicsWhite.endFill()
			this.graphicsBlack.endFill()
	 	}
	}

	Drawer.prototype = Object.create(PIXI.Container.prototype)
	Drawer.prototype.constructor = Drawer

	return Drawer
})
