
define(['../lib/pixi', '../core/render', '../settings', '../core/logic',
'../control/mouse', '../control/keyboard', '../core/sound', '../color',
'../utils/tool', '../core/global', '../utils/animation',
'../base/thinker', '../base/player', '../base/symbol'],
function(PIXI, Render, Settings, Logic, Mouse, Keyboard,
  Sound, Color, Tool, Global, Animation, Thinker, Player, Symbol)
{
  var Engine = function ()
  {
    this.player
    this.boidList = []
    this.thinkerList = []

    this.spawnStart = 0
    this.spawnDelay = Settings.defaultSpawnDelay
    this.roundCount = 0
    this.levelCount = 0

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

		this.addBubbles = function (x, y, count)
		{
			for (var i = 0; i < count; ++i)
			{
				var symbol = new Symbol()

				symbol.x = x
				symbol.y = y
				symbol.target.x = x
				symbol.target.y = y
				symbol.updateDisplay()

				symbol.setColor(Color.GetRandomColor())
				symbol.setSize(Settings.MIN_SIZE + Settings.MAX_SIZE * Math.random())
				symbol.setColorness(1)

        symbol.avoidScale = 0.4
        symbol.disapearing = true

				this.boidList.push(symbol)
        Render.addSymbol(symbol)
			}
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
      if (this.roundCount >= Settings.characterNames.length) {
        this.roundCount = 0
        ++this.levelCount
        this.spawnDelay = 20000
        Settings.currentCharacter = 0
        Tool.shuffle(Settings.characterNames)
        var self = this

        Animation.add(true, 7, function(ratio) {
        }, function(){
          self.addBubbles(Global.width / 2, Global.height / 4, 64)
          self.addBubbles(Global.width / 4, Global.height / 4, 64)
          self.addBubbles(Global.width * 3 / 4, Global.height / 4, 64)

          Sound.victory.play()
          Sound.victory.fadeIn(1,1000)

          var delayVictory = 30
          var characters = []
          for (var i = 0; i < Settings.characterNames.length; ++i) {
            var thinker = new Thinker()
            thinker.init()
            thinker.character.x = Global.width * (i+2) / (Settings.characterNames.length + 3)
            thinker.character.y = Global.height + thinker.character.height
            thinker.standTimeDelay = delayVictory - thinker.appearTimeDelay - thinker.disapearTimeDelay
            thinker.readyToBoogie = true
            thinker.muet = true
            self.thinkerList.push(thinker)
            Render.layerCharacter.addChild(thinker.character)
            characters.push(thinker)
          }
          Animation.add(true, delayVictory, function(ratio) {
          }, function(){
            Sound.victory.fadeOut(0,5000, function () { Sound.victory.stop() })
            Animation.add(true, 10, function(ratio) {
              for (var i = 0; i < self.boidList.length; ++i) {
                var boid = self.boidList[i]
                if (boid.isPlayer == false) {
                  var ratio2 = Math.min(ratio * 10, 1)
                  var ratio3 = Math.min(ratio * 4, 1)
                  boid.updateScale((1 - ratio) + Math.sin(ratio3 * Math.PI))
                  var targetX = Tool.mix(boid.x - Mouse.x, Mouse.x - boid.x, ratio2)
                  var targetY = Tool.mix(boid.y - Mouse.y, Mouse.y - boid.y, ratio2)
                  var angle = Math.atan2(targetY, targetX)
                  boid.target.x = boid.x + Math.cos(angle) * Settings.TRANSITION_UPDATE_SCALE
                  boid.target.y = boid.y + Math.sin(angle) * Settings.TRANSITION_UPDATE_SCALE
                }
              }
            }, function () {
              var boidList = []
              for (var i = 0; i < self.boidList.length; ++i) {
                var symbol = self.boidList[i]
                if (symbol.isPlayer == false) {
                  Render.removeSymbol(symbol)
                } else {
                  boidList.push(symbol)
                }
              }
              self.boidList = boidList
              self.spawnDelay = Settings.defaultSpawnDelay
              self.addThinker()
            }).start()
          }).start()
        }).start()
      }
      else {
        var thinker = new Thinker()

        ++this.roundCount;
        if (this.roundCount % 3 == 0) { thinker.x = Global.width * 3 / 4 }
        else if (this.roundCount % 2 == 0) { thinker.x = Global.width / 2 }
        else { thinker.x = Global.width / 4 }
        thinker.y = Global.height / 4
        thinker.init()
        thinker.spawnBubbles(Settings.MIN_BUBBLE + Math.floor(Settings.MAX_BUBBLE * Math.random()))
        thinker.spawnTail(8)
        this.thinkerList.push(thinker)
        this.addPhylactere(thinker)
        Render.layerCharacter.addChild(thinker.character)
        this.spawnStart = Global.timeElapsed
      }
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
          if (thinker.muet == false) {
            this.removePhylactere(thinker)
          }
          this.thinkerList.splice(this.thinkerList.indexOf(thinker), 1)
          Render.layerCharacter.removeChild(thinker.character)
          break
        }

        if (!nearest) { nearest = thinker }
        else if (Tool.distance(thinker.x, thinker.y, this.player.x, this.player.y)
        < Tool.distance(nearest.x, nearest.y, this.player.x, this.player.y)) {
          nearest = thinker
        }
      }

      var ratioSpawn = Tool.clamp((Global.timeElapsed - this.spawnStart) / this.spawnDelay, 0, 1)
      if (ratioSpawn >= 1) {
        this.addThinker()
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
            this.player.absorb(boid, boid.phylactere)
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
