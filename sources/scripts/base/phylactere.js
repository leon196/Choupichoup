
define(['../settings', '../core/global', '../color',
'../utils/tool', '../base/boid', '../base/symbol'],
function(Settings, Global, Color, Tool, Boid, Symbol)
{
	var Phylactere = function()
	{
		Symbol.call(this)

		this.setSymbolVisible(false)

		this.boidList = []
		this.boidTailList = []
		this.tailAnchor = Tool.vec2(0,0)

		this.spawnBubbles = function (count)
		{
			for (var i = 0; i < count; ++i)
			{
				var symbol = new Symbol()

				var rndAngle = Math.random() * Tool.PI2
				symbol.x = this.x + Math.cos(rndAngle) * this.size * 2
				symbol.y = this.y + Math.sin(rndAngle) * this.size * 2
				symbol.updateDisplay()

				symbol.isPlayer = this.isPlayer
				symbol.phylactere = this
				symbol.setColorness(this.colorness)
				symbol.setColor(Color.GetRandomColor())
				symbol.setSize(Settings.MIN_SIZE + Settings.MAX_SIZE * Math.random())

				this.boidList.push(symbol)
			}
		}

		this.spawnTail = function (count)
		{
			for (var i = 0; i < count; ++i)
			{
				var symbol = new Symbol()

				var rndAngle = Math.random() * Tool.PI2
				symbol.x = this.x + Math.cos(rndAngle) * this.size * 2
				symbol.y = this.y + Math.sin(rndAngle) * this.size * 2
				symbol.updateDisplay()

				symbol.setColorness(this.colorness)
				symbol.setColor(this.color)
				symbol.setSymbolVisible(false)
				symbol.friction = 0.9
				symbol.setSize(4 + i)

				this.boidTailList.push(symbol)
			}
		}

		this.updateTargets = function ()
		{
			// Orbit around phylactere root boid
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				var p = Tool.vec2(this.x - boid.x, this.y - boid.y)
				var dist = Tool.length(p.x, p.y)//Math.max(0, p.magnitude() - 60)
				var norm = Tool.normalize(p.x, p.y)
				var right = Tool.vec2(norm.y, -norm.x)
				var orbitScale = Tool.clamp(Tool.length(this.velocity.x, this.velocity.y), 0, 1) * Settings.ORBIT_SCALE
				boid.target.x = (right.x * orbitScale + norm.x * dist) * Settings.ORBIT_SPEED + boid.x
				boid.target.y = (right.y * orbitScale + norm.y * dist) * Settings.ORBIT_SPEED + boid.y
			}

			for (var i = 0; i < this.boidTailList.length; ++i)
			{
				var boid = this.boidTailList[i]
				var ratio = (i+1) / (this.boidTailList.length+2)
				var dir = Tool.vec2(this.x - this.tailAnchor.x, this.y - this.tailAnchor.y)
				var norm = Tool.normalize(dir.x, dir.y)
				var right = Tool.vec2(norm.y, -norm.x)
				boid.target.x = Tool.mix(this.tailAnchor.x, this.x, ratio)
				boid.target.y = Tool.mix(this.tailAnchor.y, this.y, ratio)
				boid.target.x += right.x * Math.sin(ratio * Tool.PI2) * 20
				boid.target.y += right.y * Math.sin(ratio * Tool.PI2) * 20
			}
		}

    this.getSize = function ()
    {
      var size = this.size
			for (var i = 0; i < this.boidList.length; ++i)
			{
				size += this.boidList[i].getSize()
      }
      return size
    }
	}

	Phylactere.prototype = Object.create(Symbol.prototype)
	Phylactere.prototype.constructor = Phylactere

	return Phylactere
})
