
define(['../settings', '../core/renderer', '../core/manager', '../core/logic', '../core/keyboard',
'../color', '../base/point', '../base/utils', '../core/level', '../core/animation', '../core/transition',
'../element/player', '../element/thinker', '../element/letter', '../element/phylactere', '../element/message'],
function(Settings, renderer, Manager, Logic, Keyboard,
	Color, Point, Utils, Level, Animation, Transition,
	Player, Thinker, Letter, Phylactere, Message)
{
	var Game = function ()
	{
		this.gameState = Settings.GAME_STATE_INTRO
		this.pause = false

		this.Init = function()
		{
			var messageTitle = new Message('CHOUPICHOUP', 42)
			Manager.AddMessage(messageTitle, renderer.width / 2, renderer.height / 4, '0xFCFCFC')

			var messageSubtitle = new Message('a game by Leon\n \nfor Ludum Dare #33\nand Oujevipo #2', 20)
			Manager.AddMessage(messageSubtitle, renderer.width / 2, renderer.height / 2, '0xFCFCFC')

			var messagePlay = new Message('Play')
			Manager.AddMessage(messagePlay, renderer.width / 2, renderer.height * 3 / 4, '0xfc0c0c')
			messagePlay.SetButton(function () {
	    	Manager.game.gameState = Settings.GAME_STATE_TRANSITION
				Transition.StartOut()
				Animation.Add(2, Transition.UpdateOut,
					function() {
						Manager.RemoveMessage(messageTitle)
						Manager.RemoveMessage(messageSubtitle)
						Manager.RemoveMessage(messagePlay)
						Manager.game.StartGame()
						Manager.game.gameState = Settings.GAME_STATE_PLAY
						Transition.StartIn()
						Animation.Add(2, Transition.UpdateIn,
							function() {
							})
					})
			})
		}

		this.StartGame = function()
		{
			Manager.player = new Player()
			Manager.player.Init()
			Level.SpawnLevel()
		}

		this.Update = function ()
		{
		    Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
		    Manager.Update()
				Animation.Update()

				switch (this.gameState)
				{
					case Settings.GAME_STATE_INTRO:
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

					case Settings.GAME_STATE_TRANSITION:
					{
						Logic.Update()
						break;
					}

					case Settings.GAME_STATE_PLAY:
					{
						if (Keyboard.P.down)
						{
							this.pause = !this.pause
							Keyboard.P.down = false
						}
						if (this.pause == false)
						{
							// Update Player
					    Manager.player.Update()
					    Manager.player.SetColorness(Manager.player.colorness + Settings.COLORNESS_SPEED)

				    	// Update thinkers
					    var nearestThinker = null
					    for (var i = 0; i < Manager.thinkerList.length; ++i) {
					      var thinker = Manager.thinkerList[i]
					      thinker.SetColorness(thinker.colorness - Settings.COLORNESS_SPEED)
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
		}
	}

	return Game
})
