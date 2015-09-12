
define(['../settings', '../core/manager', '../core/renderer',
'../element/phylactere',
'../base/utils', '../base/point', '../color'], function(Settings, Manager, renderer, Phylactere, Utils, Point, Color)
{
  var Logic = {}

  Logic.vectorNear = new Point()
  Logic.vectorAvoid = new Point()
  Logic.vectorGlobal = new Point()
  Logic.vectorTarget = new Point()

  // The mega boids algo
  Logic.Update = function(nearestThinker)
  {
    for (var current = 0; current < Manager.boidList.length; ++current)
    {
      var boid = Manager.boidList[current]

      boid.UpdateDisplay()

      Logic.vectorNear.x = Logic.vectorNear.y = 0
      Logic.vectorGlobal.x = Logic.vectorGlobal.y = 0
      Logic.vectorAvoid.x = Logic.vectorAvoid.y = 0
      Logic.vectorTarget.x = boid.target.x - boid.x
      Logic.vectorTarget.y = boid.target.y - boid.y

      var boidBiggerAndNear = boid;
      var globalCount = 0
      var nearCount = 0
      var neighborColorness = 0
      var neighborColornessCount = 0
      for (var other = 0; other < Manager.boidList.length; ++other) {
        if (current != other) {
          var boidOther = Manager.boidList[other]

          // Avoid
          var distance = Utils.distanceBetween(boid, boidOther)
          var dist = distance - (boid.size + boidOther.size)
          if (dist < Settings.COLLISION_BIAS)
          {
            var avoidX = boid.x - boidOther.x
            var avoidY = boid.y - boidOther.y
            var angle = Math.atan2(avoidY, avoidX)
            Logic.vectorAvoid.x += Math.cos(angle) * Math.max(distance, boid.size + boidOther.size)
            Logic.vectorAvoid.y += Math.sin(angle) * Math.max(distance, boid.size + boidOther.size)
          }
          // Follow Near
          if (dist < Settings.MIN_DIST_TO_FOLLOW) {
            Logic.vectorNear.x += boidOther.velocity.x
            Logic.vectorNear.y += boidOther.velocity.y
            ++nearCount
          }
          // Follow Global
          Logic.vectorGlobal.x += boidOther.x
          Logic.vectorGlobal.y += boidOther.y
          ++globalCount

          // Absorb
          // var shouldAbsorb = (boid.isPlayer && !boidOther.isPlayer) || (!boid.isPlayer && boidOther.isPlayer)
          if (dist < Settings.MIN_DIST_TO_ABSORB){// && boid.size < boidOther.size) {
            Logic.BalanceOfPower(boid, boidOther)
          }
        }
      }

      Logic.CheckColorness(boid, nearestThinker)

      if (globalCount != 0) {
        Logic.vectorGlobal.x = Logic.vectorGlobal.x / globalCount - boid.x
        Logic.vectorGlobal.y = Logic.vectorGlobal.y / globalCount - boid.y
        Logic.vectorGlobal.scale(boid.globalScale)
      }

      if (nearCount != 0) {
        Logic.vectorNear.x = Logic.vectorNear.x / nearCount - boid.x
        Logic.vectorNear.y = Logic.vectorNear.y / nearCount - boid.y
        Logic.vectorNear.scale(boid.nearScale)
      }

      // Scale them
      Logic.vectorAvoid.scale(boid.avoidScale)
      Logic.vectorTarget.scale(boid.targetScale)

      // Debug View
      boid.arrowTarget.rotation = Math.atan2(Logic.vectorTarget.y, Logic.vectorTarget.x)
      boid.arrowAvoid.rotation = Math.atan2(Logic.vectorAvoid.y, Logic.vectorAvoid.x)
      boid.arrowTarget.scale.x = boid.arrowTarget.scale.y = Math.min(5, Logic.vectorTarget.magnitude() * 0.1)
      boid.arrowAvoid.scale.x = boid.arrowAvoid.scale.y = Math.min(5, Logic.vectorAvoid.magnitude() * 0.5)

      // Apply to Boid
      boid.update(
        Logic.vectorTarget.x + Logic.vectorNear.x + Logic.vectorGlobal.x + Logic.vectorAvoid.x,
        Logic.vectorTarget.y + Logic.vectorNear.y + Logic.vectorGlobal.y + Logic.vectorAvoid.y)

      // Window borders Collision
      if (boid.isPlayer) {
        if (boid.x < 0 || boid.x > renderer.width) {
          boid.velocity.x *= -boid.frictionCollision
          boid.Rumble()
        }
        if (boid.y < 0 || boid.y > renderer.height) {
          boid.velocity.y *= -boid.frictionCollision
          boid.Rumble()
        }
        boid.x = Utils.clamp(boid.x, 0, renderer.width)
        boid.y = Utils.clamp(boid.y, 0, renderer.height)
      }
    }
  }

  Logic.BalanceOfPower = function (boid, boidOther)
  {
    // Thinker is in transition
    if ((!boid.phylactere && !boid.unknown && !boid.revealed)
      || (!boidOther.phylactere && !boidOther.unknown && !boidOther.revealed)) {
      return
    }
    var dist = Utils.distanceBetween(boid, boidOther)
    // var ratio = boid.size / boidOther.size
    var currentRange = boid.GetRange()
    var otherRange = boidOther.GetRange()
    if (currentRange < otherRange) {
      if (boid.phylactere) {
        if (boid.colorness > boidOther.colorness) {
          boid.SetColorness(boid.colorness - Settings.COLORNESS_SPEED)// / ratio)
        }
        else if (boid.colorness < boidOther.colorness) {
          boid.SetColorness(boid.colorness + Settings.COLORNESS_SPEED)// / ratio)
        }
      }
    }
    else if (currentRange > otherRange) {
      if (boidOther.phylactere) {
        if (boid.colorness < boidOther.colorness) {
          boidOther.SetColorness(boidOther.colorness - Settings.COLORNESS_SPEED)// * ratio)
        }
        else if (boid.colorness > boidOther.colorness) {
          boidOther.SetColorness(boidOther.colorness + Settings.COLORNESS_SPEED)// * ratio)
        }
      }
    }
  }

  Logic.CheckColorness = function (boid, nearestThinker)
  {
    if (boid.isPlayer && boid.colorness <= 0 && boid.phylactere) {
      if (nearestThinker && (nearestThinker.unknown || nearestThinker.revealed)) {
        Manager.player.Resorb(boid)
        nearestThinker.Absorb(boid)
      }
    }
    else if (boid.isPlayer == false && boid.colorness >= 1 && boid.phylactere) {
      boid.phylactere.Resorb(boid)
      Manager.player.Absorb(boid)
    }
  }

  return Logic
})
