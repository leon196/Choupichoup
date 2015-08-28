
define(['../settings', '../core/manager', '../core/renderer',
'../base/utils', '../base/point', '../base/color'], function(Settings, Manager, renderer, Utils, Point, Color)
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

      if (boid.phylactere) {
        if (Utils.distanceBetween(boid, boid.phylactere) - boid.size - boid.phylactere.size < Settings.MIN_DIST_TO_ABSORB) {
          boid.SetDarkness(boid.phylactere.darkness)
        }
      }

      Logic.vectorNear.x = Logic.vectorNear.y = 0
      Logic.vectorGlobal.x = Logic.vectorGlobal.y = 0
      Logic.vectorAvoid.x = Logic.vectorAvoid.y = 0
      Logic.vectorTarget.x = boid.target.x - boid.x
      Logic.vectorTarget.y = boid.target.y - boid.y

      var boidBiggerAndNear = boid;
      var globalCount = 0
      var nearCount = 0
      for (var other = 0; other < Manager.boidList.length; ++other) {
        if (current != other) {
          var boidOther = Manager.boidList[other]

          // Avoid
          var dist = Utils.distanceBetween(boid, boidOther) - (boid.size + boidOther.size)
          if (dist < Settings.BULL_COLLISION_BIAS)
          {
            Logic.vectorAvoid.x += boid.x - boidOther.x
            Logic.vectorAvoid.y += boid.y - boidOther.y
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
          if (dist < Settings.MIN_DIST_TO_FOLLOW) {
            Logic.BalanceOfPower(boid, boidOther)
          }
        }
      }

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

      // Collision with player
      // else {
      //
      // 	if (Manager.player.circleCollision(boid))
      // 	{
      // 		boid.BounceFromBoid(Manager.player)
      // 		Logic.BalanceOfPower(boid, Manager.player)
      // 	}
      // 	else {
      // 		for (var c = 0; c < Manager.player.boidList.length; ++c) {
      // 			var collider = Manager.player.boidList[c]
      // 			if (collider.circleCollision(boid)) {
      // 				// Bounce collision
      // 				boid.BounceFromBoid(collider)
      // 				Logic.BalanceOfPower(boid, Manager.player)
      // 				break;
      // 			}
      // 		}
      // 	}
      // }

      // Check darkness
      if (boid.isPlayer && boid.darkness <= 0) {
        var indexCurrent = Manager.player.boidList.indexOf(boid)
        if (indexCurrent != -1) {
          boid.isPlayer = false
          Manager.player.boidList.splice(indexCurrent, 1)
          if (nearestThinker) {
            nearestThinker.boidList.push(boid)
            boid.phylactere = nearestThinker
            boid.color = nearestThinker.color
          }
        }
      }
      else if (boid.isPlayer == false && boid.darkness >= 1 && boid.phylactere) {
        var indexCurrent = boid.phylactere.boidList.indexOf(boid)
        if (indexCurrent != -1) {
          boid.isPlayer = true
          boid.phylactere.boidList.splice(indexCurrent, 1)
          Manager.player.boidList.push(boid)
          boid.phylactere = Manager.player
          boid.color = Color.Devil
        }
      }
    }
  }

  Logic.BalanceOfPower = function (boid, boidOther)
  {
    var dist = Utils.distanceBetween(boid, boidOther)
    var ratio = boid.size / boidOther.size
    if (boid.size < boidOther.size) {
      if (boid.phylactere) {
        if (boid.darkness > boidOther.darkness) {
          boid.SetDarkness(boid.darkness - Settings.DARKNESS_SPEED / ratio)
        }
        else if (boid.darkness < boidOther.darkness) {
          boid.SetDarkness(boid.darkness + Settings.DARKNESS_SPEED / ratio)
        }
      }
    }
    else {
      if (boidOther.phylactere) {
        if (boid.darkness < boidOther.darkness) {
          boidOther.SetDarkness(boidOther.darkness - Settings.DARKNESS_SPEED * ratio)
        }
        else if (boid.darkness > boidOther.darkness) {
          boidOther.SetDarkness(boidOther.darkness + Settings.DARKNESS_SPEED * ratio)
        }
      }
    }
  }

  return Logic
})
