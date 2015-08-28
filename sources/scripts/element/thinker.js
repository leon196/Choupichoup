
define(['../lib/pixi', '../settings', '../core/renderer', '../core/manager',
'../element/phylactere', '../base/utils', '../base/point'],
function(PIXI, Settings, renderer, Manager, Phylactere, Utils, Point){
  var Thinker = function ()
  {
    Phylactere.call(this)
    this.css = { min:Settings.MIN_SIZE, max:Settings.MAX_SIZE, font: 'Shadows Into Light', fill: '#020202', align: 'left' }

    this.timeStart = 0
    this.timeDelay = Settings.SPAWN_DURATION + Math.random() * Settings.SPAWN_DURATION

    this.moveFrom = new Point()
    this.moveTo = new Point()

    this.anchor = new Point()
    this.orbitRadius = 40

    this.Init = function ()
    {
      Manager.AddBoid(this)

      this.x = renderer.width / 2
      this.y = renderer.height / 2
      // this.target.x = this.x
      // this.target.y = this.y
      // this.anchor.x = this.x
      // this.anchor.y = this.y
      this.targetScale = 0.01

      // this.avoidScale = 0
      this.SetSize(50)
      this.SpawnBubbleLetters(Settings.MIN_SPAWN_BUBBLE + Math.floor(Math.random() * (Settings.MAX_SPAWN_BUBBLE - Settings.MIN_SPAWN_BUBBLE)))

      for (var i = 0; i < this.boidList.length; ++i)
      {
        this.boidList[i].x = this.x
        this.boidList[i].y = this.y
      }

      this.timeStart = Manager.timeElapsed
    }

    this.Update = function ()
    {
      this.Move()
      this.UpdateTargets()
    }

    this.Move = function ()
    {
      // this.x += this.velocity.x * 0.1;
      // this.y += this.velocity.y * 0.1;
    }

    this.SetupPassage = function()
    {
      var horizontal = Math.random() > 0.5
      if (horizontal) {
        var left = Math.random() > 0.5
        if (left) {
          this.moveFrom.x = -Settings.OFFSET_OFFSCREN
          this.moveFrom.y = Math.random() * renderer.height
          this.moveTo.x = renderer.width + Settings.OFFSET_OFFSCREN
          this.moveTo.y = Math.random() * renderer.height
        }
        else {
          this.moveFrom.x = renderer.width + Settings.OFFSET_OFFSCREN
          this.moveFrom.y = Math.random() * renderer.height
          this.moveTo.x = -Settings.OFFSET_OFFSCREN
          this.moveTo.y = Math.random() * renderer.height
        }
      }
      else {
        var top = Math.random() > 0.5
        if (top) {
          this.moveFrom.x = Math.random() * renderer.width
          this.moveFrom.y = -Settings.OFFSET_OFFSCREN
          this.moveTo.x = Math.random() * renderer.width
          this.moveTo.y = renderer.height + Settings.OFFSET_OFFSCREN
        }
        else {
          this.moveFrom.x = Math.random() * renderer.width
          this.moveFrom.y = renderer.height + Settings.OFFSET_OFFSCREN
          this.moveTo.x = Math.random() * renderer.width
          this.moveTo.y = -Settings.OFFSET_OFFSCREN
        }
      }
    }

    this.UpdatePassage = function ()
    {
      var ratio = Utils.clamp((Manager.timeElapsed - this.timeStart) / this.timeDelay, 0, 1)
      if (ratio >= 1)
      {
        Manager.RemoveThinker(this)
      }
      this.target.x = Utils.mix(this.moveFrom.x, this.moveTo.x, ratio)
      this.target.y = Utils.mix(this.moveFrom.y, this.moveTo.y, ratio)
    }
  }

  Thinker.prototype = Object.create(Phylactere.prototype)
  Thinker.prototype.constructor = Thinker

  return Thinker
})
