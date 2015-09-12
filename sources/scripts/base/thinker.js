
define(['../lib/pixi', '../settings', '../core/global',
'../base/phylactere', '../utils/tool'],
function(PIXI, Settings, Global, Phylactere, Utils, Point){
  var Thinker = function ()
  {
    Phylactere.call(this)

    this.targetScale = 0.1
    this.avoidScale = Settings.THINKER_AVOID_SCALE

    this.character = new PIXI.Sprite(PIXI.Texture.fromFrame(Settings.GetRandomCharacter()))
    this.character.anchor.x = 0.5
    this.character.anchor.y = 1
    this.character.scale.x = this.character.scale.y = 0.5
    this.character.y = Global.height

    this.init = function ()
    {
      this.target.x = this.x
      this.target.y = this.y

      this.character.x = this.x

      this.tailAnchor.x = this.x
      this.tailAnchor.y = this.character.y - this.character.height * 0.75
    }

		this.absorb = function (boid)
		{
			boid.phylactere = this
			this.boidList.push(boid)
		}

    this.resorb = function (boid)
    {
      this.boidList.splice(this.boidList.indexOf(boid), 1)
    }

    this.update = function ()
    {
      this.updateTargets()
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
