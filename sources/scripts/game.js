
define(['engine', 'base/renderer', 'manager', 'element/player', 'element/thinker', 'settings', 'color', 'base/point', 'gui/letter', 'gui/message', 'base/utils', 'gui/collider'],function(Engine, renderer, Manager, Player, Thinker, Settings, Color, Point, Letter, Message, Utils, Collider)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2

	var Game = function ()
	{
		this.gameState = GAME_STATE_PLAY
		this.timeSpawnStart = 0
		this.timeSpawnDelay = 5

		this.vectorNear = new Point()
		this.vectorAvoid = new Point()
		this.vectorGlobal = new Point()
		this.vectorTarget = new Point()

		this.Init = function() {
			Manager.player = new Player()
			Manager.player.Init()
		}

		this.SpawnThinker = function () {
		  var thinker = new Thinker()
			thinker.Init()
			Manager.AddThinker(thinker)
		}

		// The mega game algo
		this.Update = function() {
			Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
			Manager.Update()

			if (this.gameState == GAME_STATE_PLAY) {

				Manager.player.Update()

				// Spawn elements
				if (this.timeSpawnStart + this.timeSpawnDelay < Manager.timeElapsed) {
					this.SpawnThinker()
					this.timeSpawnStart = Manager.timeElapsed
				}
				// Update elements
				for (var i = 0; i < Manager.thinkerList.length; ++i) {
					var thinker = Manager.thinkerList[i]
					thinker.Update()
				}
			}

			// The mega boids iteration
			for (var current = 0; current < Manager.boidList.length; ++current) {
				var boid = Manager.boidList[current]

				this.vectorNear.x = this.vectorNear.y = 0
				this.vectorGlobal.x = this.vectorGlobal.y = 0
				this.vectorAvoid.x = this.vectorAvoid.y = 0
				this.vectorTarget.x = boid.target.x - boid.x
				this.vectorTarget.y = boid.target.y - boid.y

				if (this.gameState == GAME_STATE_OVER) {
					this.vectorTarget = new Point(renderer.width / 2 - boid.x, renderer.height / 2 - boid.y)
				}

				var globalCount = 0
				for (var other = 0; other < Manager.boidList.length; ++other) {
					if (current != other) {
						var boidOther = Manager.boidList[other]
						// Avoid
						var dist = Utils.distanceBetween(boid, boidOther)
						if (dist < (boid.size + boidOther.size) * Settings.BULL_COLLISION_BIAS)
						{
							this.vectorAvoid.x += boid.x - boidOther.x
							this.vectorAvoid.y	+= boid.y - boidOther.y
						}
						// Follow Near
						if (dist < Settings.MIN_DIST_TO_FOLLOW) {
							this.vectorNear.x += boidOther.velocity.x
							this.vectorNear.y += boidOther.velocity.y
						}
						// Follow Global
						this.vectorGlobal.x += boidOther.x
						this.vectorGlobal.y += boidOther.y
						++globalCount
					}
				}
				this.vectorGlobal.x = this.vectorGlobal.x / globalCount - boid.x
				this.vectorGlobal.y = this.vectorGlobal.y / globalCount - boid.y

				// Scale them
				this.vectorAvoid.scale(boid.avoidScale)
				this.vectorGlobal.scale(boid.globalScale)
				this.vectorNear.scale(boid.nearScale)
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
				else {
					for (var c = 0; c < Manager.player.boidList.length; ++c) {
						var collider = Manager.player.boidList[c]
						if (collider.circleCollision(boid)) {
							// Bounce collision
							boid.BounceFromBoid(collider)
							// Balance of power
							if (boid.size < collider.size) {
							}
						}
					}
				}
			}
		}
	}

	return Game
})
