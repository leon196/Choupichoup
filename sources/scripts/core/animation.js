
define(['../core/manager', '../base/utils'], function(Manager, Utils)
{
  var Anim = function (delay, onUpdate, onComplete)
  {
    this.ratio = 0
    this.timeStart = Manager.timeElapsed
    this.timeDelay = delay
    this.onUpdate = typeof onUpdate !== "undefined" ? onUpdate : function(){}
    this.onComplete = typeof onComplete !== "undefined" ? onComplete : function(){}

    this.Update = function ()
    {
      this.ratio = (Manager.timeElapsed - this.timeStart) / this.timeDelay
      this.ratio = Utils.clamp(this.ratio, 0, 1)
      this.onUpdate(this.ratio)
      if (this.ratio >= 1) {
        this.onComplete()
        Animation.Remove(this)
      }
    }
  }

  var Animation = {}

  Animation.list = []
  Animation.garbage = []

  Animation.Add = function (delay, onUpdate, onComplete)
  {
    var anim = new Anim(delay, onUpdate, onComplete)
    Animation.list.push(anim)
  }

  Animation.Update = function ()
  {
    Animation.Recycle()
    for (var i = 0; i < Animation.list.length; ++i)
    {
      var anim = Animation.list[i]
      anim.Update()
    }
  }

  Animation.Remove = function (anim)
  {
    Animation.garbage.push(Animation.list.indexOf(anim))
  }

  Animation.Recycle = function ()
  {
    if (Animation.garbage.length > 0)
    {
      for (var i = Animation.garbage.length - 1; i >= 0; --i)
      {
        var animIndex = Animation.garbage[i]
        Animation.list.slice(animIndex, 1)
      }
      Animation.list = []
    }
  }

  return Animation
})
