
define(['engine', 'base/renderer', 'manager', 'element/player', 'element/thinker', 'settings', 'color', 'base/point', 'gui/letter', 'gui/message', 'base/utils', 'gui/collider', 'gui/phylactere'],function(Engine, renderer, Manager, Player, Thinker, Settings, Color, Point, Letter, Message, Utils, Collider, Phylactere)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2

	var Game = function ()
	{
		this.gameState = GAME_STATE_PLAY
		this.timeSpawnStart = 0
		this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY

		this.vectorNear = new Point()
		this.vectorAvoid = new Point()
		this.vectorGlobal = new Point()
		this.vectorTarget = new Point()

		this.Init = function() {
			Manager.player = new Player()
			Manager.player.Init()
			this.SpawnThinker('#F3901B')
			this.SpawnThinker('#4A22A7')
			this.SpawnThinker('#88DE18')
		}

		this.SpawnThinker = function (color) {
		  var thinker = new Thinker()
			thinker.color = color
			thinker.Init()
			Manager.AddThinker(thinker)
		}

		// The mega game algo
		this.Update = function() {
			Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
			Manager.Update()

			var nearestThinker = null
			if (this.gameState == GAME_STATE_PLAY) {

				Manager.player.Update()
				Manager.player.SetDarkness(Manager.player.darkness + Settings.DARKNESS_SPEED)

				// Spawn elements
				// if (this.timeSpawnStart + this.timeSpawnDelay < Manager.timeElapsed) {
				// 	this.SpawnThinker()
				// 	this.timeSpawnStart = Manager.timeElapsed
				// 	this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY
				// }
				// // Update elements
				for (var i = 0; i < Manager.thinkerList.length; ++i) {
					var thinker = Manager.thinkerList[i]
					thinker.SetDarkness(thinker.darkness - Settings.DARKNESS_SPEED)
					thinker.Update()
					if (nearestThinker) {
						if (Utils.distanceBetween(nearestThinker, Manager.player) > Utils.distanceBetween(thinker, Manager.player)) {
							nearestThinker = thinker
						}
					} else {
						nearestThinker = thinker
					}
				}
			}
			// The mega boids iteration
			for (var current = 0; current < Manager.boidList.length; ++current)
			{
				var boid = Manager.boidList[current]

				if (boid.phylactere) {
					if (Utils.distanceBetween(boid, boid.phylactere) - boid.size - boid.phylactere.size < Settings.MIN_DIST_TO_ABSORB) {
						boid.SetDarkness(boid.phylactere.darkness)
					}
				}

				this.vectorNear.x = this.vectorNear.y = 0
				this.vectorGlobal.x = this.vectorGlobal.y = 0
				this.vectorAvoid.x = this.vectorAvoid.y = 0
				this.vectorTarget.x = boid.target.x - boid.x
				this.vectorTarget.y = boid.target.y - boid.y

				if (this.gameState == GAME_STATE_OVER) {
					this.vectorTarget = new Point(renderer.width / 2 - boid.x, renderer.height / 2 - boid.y)
				}

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
							this.vectorAvoid.x += boid.x - boidOther.x
							this.vectorAvoid.y += boid.y - boidOther.y
						}
						// Follow Near
						if (dist < Settings.MIN_DIST_TO_FOLLOW) {
							this.vectorNear.x += boidOther.velocity.x
							this.vectorNear.y += boidOther.velocity.y
							++nearCount
						}
						// Follow Global
						this.vectorGlobal.x += boidOther.x
						this.vectorGlobal.y += boidOther.y
						++globalCount
						// Absorb
						// var shouldAbsorb = (boid.isPlayer && !boidOther.isPlayer) || (!boid.isPlayer && boidOther.isPlayer)
						if (dist < Settings.MIN_DIST_TO_FOLLOW) {
							this.BalanceOfPower(boid, boidOther)
						}
					}
				}

				if (globalCount != 0) {
					this.vectorGlobal.x = this.vectorGlobal.x / globalCount - boid.x
					this.vectorGlobal.y = this.vectorGlobal.y / globalCount - boid.y
					this.vectorGlobal.scale(boid.globalScale)
				}

				if (nearCount != 0) {
					this.vectorNear.x = this.vectorNear.x / nearCount - boid.x
					this.vectorNear.y = this.vectorNear.y / nearCount - boid.y
					this.vectorNear.scale(boid.nearScale)
				}

				// Scale them
				this.vectorAvoid.scale(boid.avoidScale)
				this.vectorTarget.scale(boid.targetScale)

				// Apply to Boid
				boid.update(
					this.vectorTarget.x + this.vectorNear.x + this.vectorGlobal.x + this.vectorAvoid.x,
					this.vectorTarget.y + this.vectorNear.y + this.vectorGlobal.y + this.vectorAvoid.y)

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
				// 		this.BalanceOfPower(boid, Manager.player)
				// 	}
				// 	else {
				// 		for (var c = 0; c < Manager.player.boidList.length; ++c) {
				// 			var collider = Manager.player.boidList[c]
				// 			if (collider.circleCollision(boid)) {
				// 				// Bounce collision
				// 				boid.BounceFromBoid(collider)
				// 				this.BalanceOfPower(boid, Manager.player)
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

		this.BalanceOfPower = function (boid, boidOther)
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
	}

	return Game
})
