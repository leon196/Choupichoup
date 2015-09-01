
define(['../settings', '../core/renderer', '../core/manager', '../core/logic', '../core/keyboard',
'../color', '../base/point', '../base/utils', '../core/level', '../core/animation',
'../element/player', '../element/thinker', '../element/letter', '../element/phylactere', '../element/message'],
function(Settings, renderer, Manager, Logic, Keyboard,
	Color, Point, Utils, Level, Animation,
	Player, Thinker, Letter, Phylactere, Message)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2
	const GAME_STATE_TRANSITION = 3

	var Game = function ()
	{
		this.gameState = GAME_STATE_INTRO
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
				Manager.game.StartTransitionOut()
				Animation.Add(5,
					function(ratio){
						for (var i = 0; i < Manager.boidList.length; ++i) {
							var boid = Manager.boidList[i]
							boid.UpdateScale(1 - ratio)
							var ratio2 = Math.min(ratio * 10, 1)
							var targetX = Utils.mix(boid.x - renderer.width / 2, renderer.width / 2 - boid.x, ratio2)
							var targetY = Utils.mix(boid.y - renderer.height / 2, renderer.height / 2 - boid.y, ratio2)
							// var dist = Utils.Distance(boid.x, boid.y, renderer.width, renderer.height)
							var angle = Math.atan2(targetY, targetX)
							boid.target.x = boid.x + Math.cos(angle) * Settings.TRANSITION_UPDATE_SCALE
							boid.target.y = boid.y + Math.sin(angle) * Settings.TRANSITION_UPDATE_SCALE
						}
					},
					function() {
						Manager.RemoveMessage(messageTitle)
						Manager.RemoveMessage(messageSubtitle)
						Manager.RemoveMessage(messagePlay)
						Manager.game.StartGame()
					})
			})
		}

		this.StartTransitionOut = function ()
		{
			for (var i = 0; i < Manager.boidList.length; ++i) {
				var boid = Manager.boidList[i]
				var angle = Math.random() * Utils.PI2
				boid.velocity.x = Math.cos(angle) * Settings.TRANSITION_IMPULSE_SCALE
				boid.velocity.y = Math.sin(angle) * Settings.TRANSITION_IMPULSE_SCALE
			}
			this.gameState = GAME_STATE_TRANSITION
		}

		this.StartGame = function()
		{
			Manager.player = new Player()
			Manager.player.Init()
			Level.SpawnLevel()

			this.gameState = GAME_STATE_PLAY
		}

		this.Update = function ()
		{
		    Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
		    Manager.Update()
				Animation.Update()

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

					case GAME_STATE_TRANSITION:
					{
						Logic.Update()
						break;
					}

					case GAME_STATE_PLAY:
					{
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
