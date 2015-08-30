
define(['../settings', '../core/renderer', '../core/manager', '../core/logic', '../core/keyboard',
'../base/color', '../base/point', '../base/utils',
'../element/player', '../element/thinker', '../element/letter', '../element/phylactere', '../element/message'],
function(Settings, renderer, Manager, Logic, Keyboard,
	Color, Point, Utils,
	Player, Thinker, Letter, Phylactere, Message)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2

	var Game = function ()
	{
		this.gameState = GAME_STATE_INTRO
		this.pause = false

		this.message

		this.timeSpawnStart = 0
		this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY

		this.Init = function() {
			this.message = this.SpawnMessage('Hi !\nWelcome to\nFloating\nThoughts')
		}

		this.StartGame = function() {
			Manager.player = new Player()
			Manager.player.Init()
			this.SpawnThinker(renderer.width / 4, renderer.height / 2, '#FCFCFC')
			this.SpawnThinker(renderer.width * 2 / 4, renderer.height / 2, '#FCFCFC')
			this.SpawnThinker(renderer.width * 3 / 4, renderer.height / 2, '#FCFCFC')
		}

		this.SpawnMessage = function (text) {
			var message = new Message(text)
			message.x = renderer.width / 2
			message.y = renderer.height / 2
			message.Init()
			message.Update()
			return message
		}

		this.SpawnThinker = function (x,y,color) {
		  var thinker = new Thinker()
			thinker.color = color
			thinker.SetDarkness(thinker.darkness - Settings.DARKNESS_SPEED)
			thinker.anchorX = x
			thinker.anchorY = y
			thinker.Init()
			thinker.Update()
			Manager.AddThinker(thinker)
			return thinker
		}

		this.Update = function ()
		{
		    Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
		    Manager.Update()

				if (Keyboard.P.down)
				{
					this.pause = !this.pause
					Keyboard.P.down = false
				}

				switch (this.gameState)
				{
					case GAME_STATE_INTRO:
					{
						if (this.pause == false)
						{
							// Update boids
							this.message.Update()
							Logic.Update()
						}

						break;
					}

					case GAME_STATE_PLAY:
					{
						if (this.pause == false)
						{
							// Update Player
					    Manager.player.Update()
					    Manager.player.SetDarkness(Manager.player.darkness + Settings.DARKNESS_SPEED)

				    	// Update thinkers
					    var nearestThinker = null
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

							// Update boids
							Logic.Update(nearestThinker)
						}
						break;
					}

					default: {}
				}

		    // Spawn elements
		    // if (this.timeSpawnStart + this.timeSpawnDelay < Manager.timeElapsed) {
		    // 	this.SpawnThinker()
		    // 	this.timeSpawnStart = Manager.timeElapsed
		    // 	this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY
		    // }
		}
	}

	return Game
})
