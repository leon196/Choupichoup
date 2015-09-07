
define(['../lib/pixi', '../settings', '../core/renderer', '../core/manager', '../core/animation',
'../element/phylactere', '../base/utils', '../base/point', '../color'],
function(PIXI, Settings, renderer, Manager, Animation, Phylactere, Utils, Point, Color){
  var Thinker = function ()
  {
    Phylactere.call(this)

    this.targetScale = 0.1
    this.avoidScale = Settings.THINKER_AVOID_SCALE

    this.character = new PIXI.Sprite(PIXI.Texture.fromFrame(Settings.GetRandomCharacter()))
    this.character.anchor.x = 0.5
    // this.character.anchor.y = 0.25
    this.character.scale.x = this.character.scale.y = 0.5
    Manager.layerCharacter.addChild(this.character)

    this.Init = function ()
    {
      Manager.AddBoid(this)

      this.target.x = this.x
      this.target.y = this.y

      this.character.x = this.x
      this.character.y = this.y

      this.timeStart = Manager.timeElapsed
    }

		this.Absorb = function (boid)
		{
			boid.phylactere = this
			this.boidList.push(boid)
      if (this.revealed && !this.satisfied) {
        for (var i = 0; i < this.boidList.length; ++i) {
          var boid = this.boidList[i]
          if (boid.color == this.hearthColor) {
            this.satisfied = true
            break
          }
        }
      }
		}

    this.Resorb = function (boid)
    {
      this.boidList.splice(this.boidList.indexOf(boid), 1)
      if (this.boidList.length == 0) {
        this.satisfied = false
      }
    }

    this.Update = function ()
    {
      this.UpdateTargets()

      if (!this.satisfied && this.revealed)
      {
        this.Boogie()
      }
      else if (this.revealed && this.satisfied)
      {
        // if (this.bubbleBack.scale.x < 0.99)
        // {
          this.UpdateScale(1)
        // }
      }

      // Reveal hearth color
      if (this.unknown && this.boidList.length == 0)
      {
        this.unknown = false
        this.bubbleColor.tint = this.hearthColor
        var self = this
        Animation.Add(3,
          function(ratio){
            self.bubbleFront.alpha = 1 - ratio
            self.textFront.alpha = 1 - ratio
          }, function(){
            self.revealed = true
            self.boogieStart = Manager.timeElapsed
          })
      }
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
