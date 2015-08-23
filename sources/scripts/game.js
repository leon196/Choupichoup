
define(['engine', 'base/renderer', 'manager', 'element/player', 'element/thinker', 'element/talker', 'settings', 'color', 'base/point', 'gui/letter', 'gui/message', 'base/utils', 'gui/collider'],function(Engine, renderer, Manager, Player, Thinker, Talker, Settings, Color, Point, Letter, Message, Utils, Collider)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2

	var Game = function ()
	{
		this.gameState = GAME_STATE_PLAY
		this.timeLastSpawn = 0
		this.timeDelaySpawn = 15

		this.Init = function()
		{
			// Game Elements
			Manager.player = new Player()
			this.SpawnThinker()
		}

		this.SpawnThinker = function ()
		{
		  var thinker = new Thinker()
			Manager.addThinker(thinker)
		}

		this.SpawnTalker = function ()
		{
		  var talker = new Talker()
			Manager.addTalker(talker)
		}

		this.Update = function()
		{
			Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;

			// Clean garbage
			Manager.update()

			// Update player
			Manager.player.update()

			if (this.gameState == GAME_STATE_PLAY)
			{
				// Check game over
				if (Manager.player.phylactere.IsDead())
				{
					this.gameState = GAME_STATE_OVER
				}

				// Spawn elements
				if (this.timeLastSpawn + this.timeDelaySpawn < Manager.timeElapsed)
				{
					this.SpawnThinker()
					this.SpawnTalker()
					this.timeLastSpawn = Manager.timeElapsed
				}

				for (var i = 0; i < Manager.thinkerList.length; ++i)
				{
					var thinker = Manager.thinkerList[i]
					thinker.update()
				}

				for (var i = 0; i < Manager.talkerList.length; ++i)
				{
					var talker = Manager.talkerList[i]
					talker.update()
				}
			}

			// The mega game algo
			var boidCount = Manager.boidList.length
			for (var current = 0; current < boidCount; ++current)
			{
				var boid = Manager.boidList[current]

				var near = new Point()
				var center = new Point()
				var globalCount = 0
				var avoid = new Point()
				var target = new Point(boid.target.x - boid.x, boid.target.y - boid.y)

				if (this.gameState == GAME_STATE_OVER)
				{
					target = new Point(renderer.width / 2 - boid.x, renderer.height / 2 - boid.y)
				}

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

				if (this.gameState == GAME_STATE_PLAY)
				{
					// Window borders Collision
					if (boid.isPlayer && boid instanceof Letter && boid.text.text != " ")
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

					// Collision with player
					if (boid.isPlayer == false)
					{
						var bubbleList = Manager.player.phylactere.boidList
						for (var c = 0; c < bubbleList.length; ++c)
						{
							var collider = bubbleList[c]
							// Has collided
							if (collider.circleCollision(boid)) {
								// Is a thought
								if (boid.showBubble) {
									// Bounce collision
									boid.BounceFromBoid(collider)
									// Balance of power
									if (boid.size < collider.size) {
										// Bubble with letter
										if (collider instanceof Letter && collider.text.text != " ") {
											// Grow player
											if (collider.size < Settings.MAX_SIZE) {
												collider.Grow(current)
											}
											// Divide bubble with letter
											else {
												collider.phylactere.DivideBubble(collider)
											}
										}
										// Shrink current
										boid.Shrink(current)
										if (boid.size <= Settings.SIZE_DEAD)	{
											Manager.removeBoid(boid, current)
											return
										}
									}
									// Current boid is bigger than player
									else {
										// Grow current
										// if (boid instanceof Letter && boid.text.text != " ") {
										// 	if (boid.size < Settings.MAX_SIZE) {
										// 		boid.Grow(current)
										// 	}
										// 	else {
										// 		boid.phylactere.DivideBubble(boid)
										// 	}
										// }
										// Shrink player
										var colliderIndex = Manager.boidList.indexOf(collider)
										collider.Shrink(colliderIndex)
										if (collider.size <= Settings.SIZE_DEAD)	{
											Manager.removeBoid(collider, colliderIndex)
											return
										}
									}
								}
								// Absorption
								else if (boid instanceof Letter && boid.text.text != " "
								&& collider instanceof Letter && collider.text.text == " ") {
									Manager.player.Absorb(collider, boid)
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
