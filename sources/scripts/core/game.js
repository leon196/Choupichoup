
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
			var messageTitle = new Message('CHOUPICHOUP', 30)
			Manager.AddMessage(messageTitle, renderer.width / 2, renderer.height / 4, '0xFCFCFC')

			var messageSubtitle = new Message('a game by Leon\n \nfor Ludum Dare #33\nand Oujevipo #2', 15)
			Manager.AddMessage(messageSubtitle, renderer.width / 2, renderer.height / 2, '0xFCFCFC')

			var messagePlay = new Message('Play', 20)
			Manager.AddMessage(messagePlay, renderer.width / 2, renderer.height * 3 / 4, '0xfc0c0c')
			messagePlay.SetButton(function () {
				if (Manager.game.gameState != Settings.GAME_STATE_TRANSITION) {
		    	Manager.game.gameState = Settings.GAME_STATE_TRANSITION
					Transition.StartOut()
					Animation.Add(Transition.delayOut, Transition.UpdateOut,
						function() {
								Manager.RemoveMessage(messageTitle)
								Manager.RemoveMessage(messageSubtitle)
								Manager.RemoveMessage(messagePlay)
								Manager.game.StartGame()
								Manager.game.gameState = Settings.GAME_STATE_PLAY
								Transition.StartIn()
								Animation.Add(2, Transition.UpdateIn)
						})
					}
			})
		}

		this.StartGame = function()
		{
			Manager.player = new Player()
			Manager.player.Init()
			Level.SpawnLevel()
		}

		this.StartWinning = function ()
		{
			Manager.game.gameState = Settings.GAME_STATE_TRANSITION
			Transition.StartOut()

			Animation.Add(Transition.delayOut, Transition.UpdateOut,
				function() {
					if (Level.HasMore()) {
				    for (var i = 0; i < Manager.thinkerList.length; ++i) {
				      var thinker = Manager.thinkerList[i]
							Manager.RemoveThinker(thinker)
						}
				    for (var i = 0; i < Manager.player.boidList.length; ++i) {
				      var boid = Manager.player.boidList[i]
							Manager.RemoveBoid(boid, Manager.boidList.indexOf(boid))
						}
						Manager.Update()
						++Level.currentLevel
						Level.SpawnLevel()
						Manager.game.gameState = Settings.GAME_STATE_PLAY
						Transition.StartNext()
						Animation.Add(2, Transition.UpdateIn)
					}
				})
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
				    Manager.player.Update()

						var thinkersAreSatisfied = true
				    var nearestThinker = null
				    for (var i = 0; i < Manager.thinkerList.length; ++i) {
				      var thinker = Manager.thinkerList[i]
				      thinker.Update()
							if (thinker.satisfied == false) {
								thinkersAreSatisfied = false
							}
							if (nearestThinker) {
				        if (Utils.distanceBetween(nearestThinker, Manager.player) > Utils.distanceBetween(thinker, Manager.player)) {
				          nearestThinker = thinker
				        }
				      } else {
				        nearestThinker = thinker
				      }
				    }

						Logic.Update(nearestThinker)

						if (thinkersAreSatisfied) {
							this.StartWinning()
						}
					}
					break;
				}
				default: { break; }
			}
		}
	}

	return Game
})
