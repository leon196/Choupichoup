
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

		this.timeSpawnStart = 0
		this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY

		this.Init = function()
		{
			var messageTitle = new Message('Floating Thoughts\n \na game by Leon\n \nfor Ludum Dare #33')
			Manager.AddMessage(messageTitle, renderer.width / 2, renderer.height / 2, '0xFCFCFC')

			var messagePlay = new Message('Play')
			Manager.AddMessage(messagePlay, renderer.width / 2, renderer.height * 3 / 4, '0xfc0c0c')
			messagePlay.SetButton(function () {
				Manager.game.StartGame()
			})
		}

		this.StartGame = function()
		{
			Manager.player = new Player()
			Manager.player.Init()

			Manager.AddThinker(new Thinker(), renderer.width / 4, renderer.height / 2, '#FCFCFC')
			Manager.AddThinker(new Thinker(), renderer.width * 2 / 4, renderer.height / 2, '#FCFCFC')
			Manager.AddThinker(new Thinker(), renderer.width * 3 / 4, renderer.height / 2, '#FCFCFC')

			this.gameState = GAME_STATE_PLAY
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
					    for (var i = 0; i < Manager.messageList.length; ++i) {
								var message = Manager.messageList[i]
								message.Update()
							}
							// Update boids
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

		    // Add elements
		    // if (this.timeSpawnStart + this.timeSpawnDelay < Manager.timeElapsed) {
		    // 	this.SpawnThinker()
		    // 	this.timeSpawnStart = Manager.timeElapsed
		    // 	this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY
		    // }
		}
	}

	return Game
})
