
define(['engine', 'base/renderer', 'manager', 'settings', 'color', 'base/point', 'gui/letter', 'gui/message', 'base/utils', 'gui/collider'],function(Engine, renderer, Manager, Settings, Color, Point, Letter, Message, Utils, Collider)
{
	var Game = function ()
	{
		this.colliderList = []

		this.SpawnCollider = function()
		{
			var collider = new Collider()
			this.colliderList.push(collider)
		}

		this.Update = function()
		{
			Manager.timeElapsed = new Date() - Manager.timeStarted / 1000;
			Manager.drawer.Clear()

			Manager.player.update()
			Manager.thinker.update()

			var boidCount = Manager.boidList.length

			// For all active boids
			for (var current = 0; current < boidCount; ++current)
			{
				var boid = Manager.boidList[current]

				var near = new Point()
				var global = new Point()
				var globalCount = 0
				var avoid = new Point()
				var target = new Point(boid.target.x - boid.x, boid.target.y - boid.y)
				var grid = new Point()

				// Message Letter
				// if (boid instanceof Letter && boid.isFromMessage)
				// {
				// 	target = new Point(phylactere.x - boid.x, phylactere.y - boid.y)
				//
				// 	grid.x = phylactere.GetX() + boid.gridX - boid.x
				// 	grid.y = phylactere.GetY() + boid.gridY - boid.y
				//
				// 	grid.x *= Settings.DEFAULT_GRID_SCALE
				// 	grid.y *= Settings.DEFAULT_GRID_SCALE
				// }

				for (var other = 0; other < boidCount; ++other)
				{
					if (current != other && (other instanceof Message) == false )
					{
						var boidOther = Manager.boidList[other]
						var dist = Utils.distanceBetween(boid, boidOther)
						if (dist < (boid.size + boidOther.size) * Settings.BULL_COLLISION_BIAS)
						{
							avoid.x += boid.x - boidOther.x
							avoid.y	+= boid.y - boidOther.y
						}
						if (dist < 100)
						{
							near.x += boidOther.velocity.x
							near.y += boidOther.velocity.y
						}

						global.x += boidOther.x
						global.y += boidOther.y
						++globalCount

					}
				}

				global.x = global.x / globalCount - boid.x
				global.y = global.y / globalCount - boid.y

				avoid.scale(boid.avoidScale)
				global.scale(boid.globalScale)
				near.scale(boid.nearScale)
				target.scale(boid.targetScale)

				// Apply to Boid
				boid.update(
					target.x + near.x + global.x + avoid.x + grid.x,
					target.y + near.y + global.y + avoid.y + grid.y)

				// Collision
				if (boid instanceof Letter)
				{
					for (var c = 0; c < this.colliderList.length; ++c)
					{
						var collider = this.colliderList[c]
						collider.collideWith(boid)
					}

					// Window borders Collision
					if (boid.isFromMessage)
					{
						if (boid.x < 0 || boid.x > renderer.width)
						{
							boid.velocity.x *= -boid.frictionCollision
							boid.Rumble()
						}
						if (boid.y < 0 || boid.y > renderer.height)
						{
							boid.velocity.y *= -boid.frictionCollision
							boid.Rumble()
						}
						boid.x = Utils.clamp(boid.x, 0, renderer.width)
						boid.y = Utils.clamp(boid.y, 0, renderer.height)
					}
					// else
					// {
					// 	for (var c = 0; c < phylactere.letters.length; ++c)
					// 	{
					// 		var collider = phylactere.letters[c]
					// 		if (collider.circleCollision(boid))
					// 		{
					// 			boid.BounceFromCircleCollider(collider)
					// 		}
					// 	}
					// }
				}

				// Update graphics positions
				Manager.drawer.bullBlackList[current].x = boid.x
				Manager.drawer.bullBlackList[current].y = boid.y
				Manager.drawer.bullWhiteList[current].x = boid.x
				Manager.drawer.bullWhiteList[current].y = boid.y

				if (Manager.drawer.debug)
				{
					Manager.drawer.Arrow(boid, grid.getNormal(), boid.size + 10, 2 + 10 * grid.magnitude()/40, Color.GRID_HEX)
					Manager.drawer.Arrow(boid, target.getNormal(), boid.size + 10, 2 + 10 * target.magnitude()/40, Color.TARGET_HEX)
					Manager.drawer.Arrow(boid, avoid.getNormal(), boid.size + 10, 2 + 10 * avoid.magnitude()/40, Color.AVOID_HEX)
					Manager.drawer.Arrow(boid, near.getNormal(), boid.size + 10, 2 + 10 * near.magnitude()/40, Color.NEAR_HEX)
					Manager.drawer.Arrow(boid, global.getNormal(), boid.size + 10, 2 + 10 * global.magnitude()/40, Color.GLOBAL_HEX)
					// drawer.Arrow(boid, boid.velocity.getNormal(), boid.velocity.magnitude() * 5, 10, Color.BOID_HEX)
				}
			}
			Manager.drawer.EndFill()
		}
	}

	return Game
})
