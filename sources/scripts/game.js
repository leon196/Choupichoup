
define(['engine', 'base/renderer', 'manager', 'element/player', 'element/thinker', 'element/talker', 'settings', 'color', 'base/point', 'gui/letter', 'gui/message', 'base/utils', 'gui/collider'],function(Engine, renderer, Manager, Player, Thinker, Talker, Settings, Color, Point, Letter, Message, Utils, Collider)
{
	var Game = function ()
	{
		this.colliderList = []

		this.Init = function()
		{
			// Game Elements
			Manager.player = new Player()
			Manager.thinker = new Thinker()
			Manager.talker = new Talker()
		}

		this.Update = function()
		{
			Manager.timeElapsed = new Date() - Manager.timeStarted / 1000;

			Manager.player.update()
			Manager.thinker.update()
			Manager.talker.update()

			var boidCount = Manager.boidList.length

			// For all active boids
			for (var current = 0; current < boidCount; ++current)
			{
				var boid = Manager.boidList[current]

				var near = new Point()
				var center = new Point()
				var globalCount = 0
				var avoid = new Point()
				var target = new Point(boid.target.x - boid.x, boid.target.y - boid.y)

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

						center.x += boidOther.x
						center.y += boidOther.y
						++globalCount

					}
				}

				center.x = center.x / globalCount - boid.x
				center.y = center.y / globalCount - boid.y

				avoid.scale(boid.avoidScale)
				center.scale(boid.globalScale)
				near.scale(boid.nearScale)
				target.scale(boid.targetScale)

				// Apply to Boid
				boid.update(
					target.x + near.x + center.x + avoid.x,
					target.y + near.y + center.y + avoid.y)

				// Collision
				if (boid instanceof Letter)
				{
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
				}

				// Collision with player
				if (boid.isPlayer == false)
				{
					var bubbleList = Manager.player.bubbleList
					for (var c = 0; c < bubbleList.length; ++c)
					{
						var collider = bubbleList[c]
						if (collider.circleCollision(boid))
						{
							if (boid.showBubble)
							{
								boid.BounceFromBoid(collider)
								boid.size = Math.max(1, boid.size - 1)
								Manager.drawer.redraw(current)
								if (boid.size <= 1)
								{
									Manager.removeBoid(boid, current)
									return
								}
								collider.size += 1
								Manager.drawer.redraw(Manager.boidList.indexOf(collider))
								if (collider.size > Settings.MAX_SIZE)
								{
									Manager.player.DivideBubble(collider)
								}
							}
							else if (boid instanceof Letter && boid.text.text != " "
							&& collider instanceof Letter && collider.text.text == " ") {
								if (Manager.player.Absorb(boid))
								{
									Manager.removeBoid(boid, current)
									return
								}
							}
						}
					}
				}

				// Update graphics positions
				if (boid.showBubble)
				{
					Manager.drawer.bullBlackList[current].x = boid.x
					Manager.drawer.bullBlackList[current].y = boid.y
					Manager.drawer.bullWhiteList[current].x = boid.x
					Manager.drawer.bullWhiteList[current].y = boid.y
				}

				if (Manager.drawer.debug)
				{
					Manager.drawer.Arrow(boid, target.getNormal(), boid.size + 10, 2 + 10 * target.magnitude()/40, Color.TARGET_HEX)
					Manager.drawer.Arrow(boid, avoid.getNormal(), boid.size + 10, 2 + 10 * avoid.magnitude()/40, Color.AVOID_HEX)
					Manager.drawer.Arrow(boid, near.getNormal(), boid.size + 10, 2 + 10 * near.magnitude()/40, Color.NEAR_HEX)
					Manager.drawer.Arrow(boid, center.getNormal(), boid.size + 10, 2 + 10 * center.magnitude()/40, Color.GLOBAL_HEX)
					// drawer.Arrow(boid, boid.velocity.getNormal(), boid.velocity.magnitude() * 5, 10, Color.BOID_HEX)
				}
			}
		}
	}

	return Game
})
