
define(['../lib/pixi', '../settings', '../core/global', '../utils/animation', '../core/sound',
'../base/phylactere', '../utils/tool', '../color'],
function(PIXI, Settings, Global, Animation, Sound, Phylactere, Tool, Color){
  var Thinker = function ()
  {
    Phylactere.call(this)

    this.targetScale = 0.1
    this.avoidScale = Settings.THINKER_AVOID_SCALE

    this.character = new PIXI.Sprite(PIXI.Texture.fromFrame(Settings.GetRandomCharacter()))
    this.character.anchor.x = 0.5
    this.character.anchor.y = 1
    this.characterScale = 0.5
    this.character.scale.x = this.character.scale.y = this.characterScale
    this.character.y = Global.height + this.character.height

    this.state = Settings.STATE_APPEARING
    this.stateTimeStart = 0
    this.appearTimeDelay = 5
    this.standTimeDelay = 10
    this.disapearTimeDelay = 5
    this.disapeared = false
    this.alone = true

    this.init = function ()
    {
      this.y = Global.height + this.character.height
      this.target.x = this.x
      this.target.y = this.y
      this.updateDisplay()
      this.character.x = this.x
      this.tailAnchor.x = this.x
      this.setSize(Settings.MIN_SIZE + Settings.MAX_SIZE + 1)

      this.setColorness(0)
  		this.setColor(Color.GetRandomColor())
      this.spawnBubbles(Settings.MIN_BUBBLE + Math.floor(Settings.MAX_BUBBLE * Math.random()))
      this.spawnTail(8)

      this.stateTimeStart = Global.timeElapsed
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

		this.fallInLove = function ()
		{
      Sound.yeah.play()

			var self = this
      self.symbolBlack.visible = false
      self.symbolWhite.visible = true
      self.setSymbolIndex(Settings.symbolIndexHearth)
      self.state = Settings.STATE_STANDING
      self.stateTimeStart = Global.timeElapsed
			Animation.add(true, 10, function(ratio)
			{
				self.setColorness(ratio)
				for (var i = 0; i < self.boidTailList.length; ++i)
				{
					self.boidTailList[i].setColorness(ratio)
				}
			}, function()
      {
        self.state = Settings.STATE_DISAPPEARING
        self.stateTimeStart = Global.timeElapsed
        self.disapearing = true
      }).start()
    }

    this.update = function ()
    {
      switch (this.state) {
        case Settings.STATE_APPEARING:
          var ratio = Tool.clamp((Global.timeElapsed - this.stateTimeStart) / this.appearTimeDelay, 0, 1)
          this.target.y = Global.height - ratio * (this.character.height * 1.25) + (1 - ratio) * this.character.height
          this.character.y = Global.height + (1 - ratio) * this.character.height
          if (ratio >= 1) {
            this.state = Settings.STATE_STANDING;
            this.stateTimeStart = Global.timeElapsed }
          break
        case Settings.STATE_STANDING:
          var ratio = Tool.clamp((Global.timeElapsed - this.stateTimeStart) / this.standTimeDelay, 0, 1)
          if (ratio >= 1) {
            this.state = Settings.STATE_DISAPPEARING;
            this.stateTimeStart = Global.timeElapsed }
          break
        case Settings.STATE_DISAPPEARING:
          var ratio = Tool.clamp((Global.timeElapsed - this.stateTimeStart) / this.appearTimeDelay, 0, 1)
          this.target.y = Global.height - (1 - ratio) * (this.character.height * 1.25) + ratio * this.character.height
          this.character.y = Global.height + ratio * this.character.height
          if (ratio >= 1) {
            this.disapear() }
          break
        default:
      }

      this.updateTargets()
      this.character.scale.x = this.characterScale + Math.cos(Global.timeElapsed * 10.0) * 0.01
      this.character.scale.y = this.characterScale - Math.cos(Global.timeElapsed * 10.0) * 0.01
      this.tailAnchor.y = this.character.y - this.character.height * 0.75
    }

    this.disapear = function ()
    {
      this.disapeared = true
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
