
define(['../lib/pixi', '../settings', '../control/mouse', '../core/global',
'../base/phylactere', '../color', '../utils/animation', '../utils/tool'],
function(PIXI, Settings, Mouse, Global, Phylactere, Color, Animation, Tool){
  var Player = function ()
  {
    Phylactere.call(this)

    this.learnedNewSymbols = false
    this.learnedSymbolLists = []

    this.init = function ()
    {
      this.x = Mouse.x
      this.y = Mouse.y
      this.isPlayer = true
      this.setColor(Color.Player)
      this.setSize(Settings.MIN_SIZE + Settings.MAX_SIZE + 1)
      this.setColorness(1)
      this.avoidScale = 0.05
      this.friction = 0.8
      this.targetScale = 1
      this.learnedSymbolLists = []
    }

		this.absorb = function (boid, phylacterFrom)
		{
      boid.isPlayer = true
			boid.phylactere = this
			this.boidList.push(boid)

      if (this.boidList.length >= Settings.SYMBOL_COUNT_TO_JUMP || phylacterFrom.boidList.length == 0)
      {
        var learnedSymbol = this.boidList.slice(0)
        this.learnedSymbolLists.push(learnedSymbol)
        this.boidList = []
        for (var i = 0; i < learnedSymbol.length; ++i) {
          var boid = learnedSymbol[i]
          var angle = Math.random() * Tool.PI2
          boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
          boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
          boid.disapearing = true
          boid.setColorness(1)
        }

        if (phylacterFrom.boidList.length == 0) {
          phylacterFrom.fallInLove()
        }

        var self = this
        Animation.add(true, 10, function(ratio) {
          for (var i = 0; i < learnedSymbol.length; ++i) {
            var boid = learnedSymbol[i]
            var ratio2 = Math.min(ratio * 10, 1)
            var ratio3 = Math.min(ratio * 4, 1)
            boid.updateScale((1 - ratio) + Math.sin(ratio3 * Math.PI))
            if (i % 2 == 0) {
              var targetX = Tool.mix(boid.x - Mouse.x, Mouse.x - boid.x, ratio2)
              var targetY = Tool.mix(boid.y - Mouse.y, Mouse.y - boid.y, ratio2)
            } else if (phylacterFrom) {
              var targetX = Tool.mix(boid.x - phylacterFrom.x, phylacterFrom.x - boid.x, ratio2)
              var targetY = Tool.mix(boid.y - phylacterFrom.y, phylacterFrom.y - boid.y, ratio2)
            }
            var angle = Math.atan2(targetY, targetX)
            boid.target.x = boid.x + Math.cos(angle) * Settings.TRANSITION_UPDATE_SCALE
            boid.target.y = boid.y + Math.sin(angle) * Settings.TRANSITION_UPDATE_SCALE
          }
        }, function () {
          self.learnedNewSymbols = true
        }).start()
      }
		}

    this.resorb = function (boid)
    {
      boid.isPlayer = false
      this.boidList.splice(this.boidList.indexOf(boid), 1)
    }

    this.update = function ()
    {
			// Move to mouse
			this.target.x = Mouse.x
			this.target.y = Mouse.y

			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
        boid.target.x = Mouse.x
        boid.target.y = Mouse.y
      }
    }

  }

  Player.prototype = Object.create(Phylactere.prototype)
  Player.prototype.constructor = Player

  return Player
})
