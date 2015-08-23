
define(['lib/pixi', 'settings', 'base/renderer', 'engine', 'manager'], function (PIXI, Settings, renderer, Engine, Manager)
{
	var Drawer = function()
	{
		PIXI.Container.call(this)

		this.graphicsDebug = new PIXI.Graphics()
		this.addChild(this.graphicsDebug)

		this.bullBlackList = []
		this.bullWhiteList = []

		this.showBubble = true
		this.debug = false

		this.AddBubble = function (boid)
		{
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

		this.clearBubble = function (index)
		{
			if (index != -1)
			{
				var graph = this.bullBlackList[index]
				graph.clear()
				graph = this.bullWhiteList[index]
				graph.clear()
			}
		}

		this.redraw = function(index)
		{
			if (index != -1)
			{
				var boid = Manager.boidList[index]

				var graph = this.bullBlackList[index]
				graph.clear()
				if (boid.isPlayer) graph.beginFill(0xcccccc)
				else graph.beginFill(0x000000)
				graph.drawCircle(0, Settings.BULL_OUTLINE / 2, boid.size + Settings.BULL_OUTLINE)

				graph = this.bullWhiteList[index]
				graph.clear()
				if (boid.isPlayer) graph.beginFill(0x000000)
				else graph.beginFill(0xffffff)
				graph.drawCircle(0, 0, boid.size)
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
	}

	Drawer.prototype = Object.create(PIXI.Container.prototype)
	Drawer.prototype.constructor = Drawer

	return Drawer
})
