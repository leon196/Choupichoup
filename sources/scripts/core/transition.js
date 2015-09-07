
define(['../core/manager', '../core/renderer', '../base/utils', '../settings'],
function(Manager, renderer, Utils, Settings)
{
  var Transition = {}

  Transition.StartIn = function ()
  {
    Manager.layerCharacter.alpha = 0
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      boid.UpdateScale(0)
    }
  }

  Transition.UpdateIn = function (ratio)
  {
    Manager.layerCharacter.alpha = ratio
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      boid.UpdateScale(ratio)
    }
  }

  Transition.delayOut = 5

  Transition.StartOut = function ()
  {
    Manager.layerCharacter.alpha = 1
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      var angle = Math.random() * Utils.PI2
      boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
      boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
      if ((boid.isPlayer && !boid.phylactere) == false) {
        boid.target.x = renderer.width / 2
        boid.target.y = renderer.height / 2
      }
    }
  }

  Transition.StartNext = function ()
  {
    Manager.layerCharacter.alpha = 1
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      var angle = Math.random() * Utils.PI2
      boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
      boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
    }
  }

  Transition.UpdateOut = function (ratio)
  {
    Manager.layerCharacter.alpha = 1 - ratio
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      var ratio2 = Math.min(ratio * 10, 1)
      var ratio3 = Math.min(ratio * 4, 1)
      boid.UpdateScale((1 - ratio) + Math.sin(ratio3 * Math.PI))
      if ((boid.isPlayer && !boid.phylactere) == false) {
        var targetX = Utils.mix(boid.x - renderer.width / 2, renderer.width / 2 - boid.x, ratio2)
        var targetY = Utils.mix(boid.y - renderer.height / 2, renderer.height / 2 - boid.y, ratio2)
        var angle = Math.atan2(targetY, targetX)
        boid.target.x = boid.x + Math.cos(angle) * Settings.TRANSITION_UPDATE_SCALE
        boid.target.y = boid.y + Math.sin(angle) * Settings.TRANSITION_UPDATE_SCALE
      } else {
        boid.target.x = Manager.mouse.x
        boid.target.y = Manager.mouse.y
      }
    }
  }

  return Transition
})
