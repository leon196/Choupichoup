
define(['../lib/pixi', '../core/render', '../settings', '../core/logic',
'../control/mouse', '../control/keyboard',
'../utils/tool', '../core/global', '../utils/animation',
'../base/thinker', '../base/player'],
function(PIXI, Render, Settings, Logic, Mouse, Keyboard, Tool, Global, Animation, Thinker, Player)
{
  var Engine = function ()
  {
    this.player
    this.boidList = []
    this.thinkerList = []

    this.vectorNear = Tool.vec2(0,0)
    this.vectorAvoid = Tool.vec2(0,0)
    this.vectorGlobal = Tool.vec2(0,0)
    this.vectorTarget = Tool.vec2(0,0)

    this.init = function ()
    {
      Global.timeStarted = new Date() / 1000
      this.addPlayer()
      this.addThinker()
  	}

    this.addPlayer = function ()
    {
      this.player = new Player()
      this.player.init()
      this.player.updateDisplay()
      this.addPhylactere(this.player)
    }

    this.addThinker = function ()
    {
      var thinker = new Thinker()
      thinker.x = Global.width / 2
      thinker.y = Global.height / 4
      thinker.init()
      this.thinkerList.push(thinker)
      this.addPhylactere(thinker)
      Render.layerCharacter.addChild(thinker.character)
    }

    this.addPhylactere = function (phylactere)
    {
      for (var i = 0; i < phylactere.boidTailList.length; ++i) {
        Render.addSymbol(phylactere.boidTailList[i])
        this.boidList.push(phylactere.boidTailList[i])
      }
      for (var i = 0; i < phylactere.boidList.length; ++i) {
        Render.addSymbol(phylactere.boidList[i])
        this.boidList.push(phylactere.boidList[i])
      }
      Render.addSymbol(phylactere)
      this.boidList.push(phylactere)
    }

    this.removePhylactere = function (phylactere)
    {
      for (var i = 0; i < phylactere.boidTailList.length; ++i) {
        Render.removeSymbol(phylactere.boidTailList[i])
        this.boidList.splice(this.boidList.indexOf(phylactere.boidTailList[i]), 1)
      }
      for (var i = 0; i < phylactere.boidList.length; ++i) {
        Render.removeSymbol(phylactere.boidList[i])
        this.boidList.splice(this.boidList.indexOf(phylactere.boidList[i]), 1)
      }
      Render.removeSymbol(phylactere)
      this.boidList.splice(this.boidList.indexOf(phylactere), 1)
    }

    this.update = function ()
    {
      Global.timeElapsed = new Date() / 1000 - Global.timeStarted

      if (Keyboard.P.down)
      {
        Global.pause = !Global.pause
        Keyboard.P.down = false
      }

      this.player.update()
      if (this.player.learnedNewSymbols) {
        var learnedSymbol = this.player.learnedSymbolLists[0]
        for (var i = 0; i < learnedSymbol.length; ++i) {
          var symbol = learnedSymbol[i]
          Render.removeSymbol(symbol)
          this.boidList.splice(this.boidList.indexOf(symbol), 1)
        }
        this.player.learnedSymbolLists.splice(0, 1)
        this.player.learnedNewSymbols = false
      }

      var nearest
      for (var i = 0; i < this.thinkerList.length; ++i)
      {
        var thinker = this.thinkerList[i]
        thinker.update()

        if (thinker.disapeared) {
          this.removePhylactere(thinker)
          this.thinkerList.splice(this.thinkerList.indexOf(thinker), 1)
          Render.layerCharacter.removeChild(thinker.character)
          this.addThinker()
          break
        }

        if (!nearest) { nearest = thinker }
        else if (Tool.distance(thinker.x, thinker.y, this.player.x, this.player.y)
        < Tool.distance(nearest.x, nearest.y, this.player.x, this.player.y)) {
          nearest = thinker
        }
      }

      for (var current = 0; current < this.boidList.length; ++current)
      {
        var boid = this.boidList[current]

        this.vectorNear.x = this.vectorNear.y = 0
        this.vectorGlobal.x = this.vectorGlobal.y = 0
        this.vectorAvoid.x = this.vectorAvoid.y = 0
        this.vectorTarget.x = boid.target.x - boid.x
        this.vectorTarget.y = boid.target.y - boid.y

        var globalCount = 0
        var nearCount = 0
        for (var other = 0; other < this.boidList.length; ++other) {
          if (current != other) {
            var boidOther = this.boidList[other]

            // Avoid
            var distance = Tool.distance(boid.x, boid.y, boidOther.x, boidOther.y)
            var dist = distance - (boid.size + boidOther.size)
            if (dist < Settings.COLLISION_BIAS)
            {
              var avoidX = boid.x - boidOther.x
              var avoidY = boid.y - boidOther.y
              var angle = Math.atan2(avoidY, avoidX)
              this.vectorAvoid.x += Math.cos(angle) * Math.max(distance, boid.size + boidOther.size)
              this.vectorAvoid.y += Math.sin(angle) * Math.max(distance, boid.size + boidOther.size)
            }
            // Follow Near
            if (dist < Settings.MIN_DIST_TO_FOLLOW)
            {
              this.vectorNear.x += boidOther.velocity.x
              this.vectorNear.y += boidOther.velocity.y
              ++nearCount
            }
            // Follow Global
            this.vectorGlobal.x += boidOther.x
            this.vectorGlobal.y += boidOther.y
            ++globalCount

            if (dist < Settings.MIN_DIST_TO_ABSORB && boid.disapearing == false && boidOther.disapearing == false)
            {
              Logic.balanceOfPower(boid, boidOther)
            }
          }
        }

        if (boid.disapearing == false) {
          if (boid.isPlayer && boid.colorness <= 0 && boid.phylactere) {
            if (nearest) {
              this.player.resorb(boid)
              nearest.absorb(boid)
            }
          }
          else if (boid.isPlayer == false && boid.colorness >= 1 && boid.phylactere) {
            boid.phylactere.resorb(boid)
            this.player.absorb(boid)
          }
        }

        if (globalCount != 0) {
          this.vectorGlobal.x = (this.vectorGlobal.x / globalCount - boid.x) * boid.globalScale
          this.vectorGlobal.y = (this.vectorGlobal.y / globalCount - boid.y) * boid.globalScale
        }

        if (nearCount != 0) {
          this.vectorNear.x = (this.vectorNear.x / nearCount - boid.x) * boid.nearScale
          this.vectorNear.y = (this.vectorNear.y / nearCount - boid.y) * boid.nearScale
        }

        // Scale them
        this.vectorAvoid.x *= boid.avoidScale
        this.vectorAvoid.y *= boid.avoidScale
        this.vectorTarget.x *= boid.targetScale
        this.vectorTarget.y *= boid.targetScale

        // Apply to Boid
        boid.move(
          this.vectorTarget.x + this.vectorNear.x + this.vectorGlobal.x + this.vectorAvoid.x,
          this.vectorTarget.y + this.vectorNear.y + this.vectorGlobal.y + this.vectorAvoid.y)

        // Window borders Collision
        if (boid.isPlayer) {
          if (boid.x < 0 || boid.x > Global.width) {
            boid.velocity.x *= -boid.frictionCollision
            boid.rumble()
          }
          if (boid.y < 0 || boid.y > Global.height) {
            boid.velocity.y *= -boid.frictionCollision
            boid.rumble()
          }
          boid.x = Tool.clamp(boid.x, 0, Global.width)
          boid.y = Tool.clamp(boid.y, 0, Global.height)
        }

        boid.updateDisplay()
      }
    }
  }

  return new Engine()
})
