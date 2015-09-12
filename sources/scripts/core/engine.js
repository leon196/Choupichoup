
define(['../lib/pixi', '../core/render', '../settings',
'../control/mouse', '../control/keyboard',
'../utils/tool', '../core/global', '../utils/animation',
'../base/thinker'],
function(PIXI, Render, Settings, Mouse, Keyboard, Tool, Global, Animation, Thinker)
{
  var Engine = function ()
  {
    this.boidList = []
    this.thinkerList = []

    this.vectorNear = Tool.vec2(0,0)
    this.vectorAvoid = Tool.vec2(0,0)
    this.vectorGlobal = Tool.vec2(0,0)
    this.vectorTarget = Tool.vec2(0,0)

    this.init = function ()
    {
      Global.timeStarted = new Date() / 1000
      this.addThinker()
  	}

    this.addThinker = function ()
    {
      var thinker = new Thinker()
      thinker.x = Global.width / 2
      thinker.y = Global.height / 4
      thinker.init()
      thinker.updateDisplay()
      thinker.spawnBubbles(16)
      thinker.spawnTail(8)
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
      // this.boidList.push(phylactere)
    }

    this.update = function ()
    {
      Global.timeElapsed = new Date() / 1000 - Global.timeStarted

      if (Keyboard.P.down)
      {
        Global.pause = !Global.pause
        Keyboard.P.down = false
      }

      for (var i = 0; i < this.thinkerList.length; ++i)
      {
        var thinker = this.thinkerList[i]
        thinker.update()
      }

      for (var current = 0; current < this.boidList.length; ++current)
      {
        var boid = this.boidList[current]

        this.vectorNear.x = this.vectorNear.y = 0
        this.vectorGlobal.x = this.vectorGlobal.y = 0
        this.vectorAvoid.x = this.vectorAvoid.y = 0
        this.vectorTarget.x = boid.target.x - boid.x
        this.vectorTarget.y = boid.target.y - boid.y

        var boidBiggerAndNear = boid;
        var globalCount = 0
        var nearCount = 0
        var neighborColorness = 0
        var neighborColornessCount = 0
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

            // Absorb
            // var shouldAbsorb = (boid.isPlayer && !boidOther.isPlayer) || (!boid.isPlayer && boidOther.isPlayer)
            if (dist < Settings.MIN_DIST_TO_ABSORB)// && boid.size < boidOther.size)
            {
              // Logic.balanceOfPower(boid, boidOther)
            }
          }
        }

        if (boid.isPlayer && boid.colorness <= 0 && boid.phylactere) {
          // if (nearestThinker) {
          //   Manager.player.Resorb(boid)
          //   nearestThinker.Absorb(boid)
          // }
        }
        else if (boid.isPlayer == false && boid.colorness >= 1 && boid.phylactere) {
          // boid.phylactere.Resorb(boid)
          // Manager.player.Absorb(boid)
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
