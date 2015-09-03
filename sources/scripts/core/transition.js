
define(['../core/manager', '../core/renderer', '../base/utils', '../settings'],
function(Manager, renderer, Utils, Settings)
{
  var Transition = {}

  Transition.StartIn = function ()
  {
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      boid.UpdateScale(0)
    }
  }

  Transition.UpdateIn = function (ratio)
  {
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      boid.UpdateScale(ratio)
    }
  }

  Transition.delayOut = 5

  Transition.StartOut = function ()
  {
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      var angle = Math.random() * Utils.PI2
      boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
      boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
      boid.target.x = renderer.width / 2
      boid.target.y = renderer.height / 2
    }
  }

  Transition.StartNext = function ()
  {
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      var angle = Math.random() * Utils.PI2
      boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
      boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
    }
  }

  Transition.UpdateOut = function (ratio)
  {
    for (var i = 0; i < Manager.boidList.length; ++i) {
      var boid = Manager.boidList[i]
      boid.UpdateScale(1 - ratio)
    }
  }

  return Transition
})
