
define(['../settings', '../core/renderer', '../core/manager', '../core/logic',
'../base/color', '../base/point', '../base/utils',
'../element/player', '../element/thinker', '../element/letter', '../element/phylactere'],
function(Settings, renderer, Manager, Logic,
	Color, Point, Utils,
	Player, Thinker, Letter, Phylactere)
{
	const GAME_STATE_INTRO = 0
	const GAME_STATE_PLAY = 1
	const GAME_STATE_OVER = 2

	var Game = function ()
	{
		this.gameState = GAME_STATE_PLAY
		this.timeSpawnStart = 0
		this.timeSpawnDelay = Settings.SPAWN_DELAY + Math.random() * Settings.SPAWN_DELAY

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

		this.Update = function ()
		{
		    Manager.timeElapsed = new Date() / 1000 - Manager.timeStarted;
		    Manager.Update()

		    var nearestThinker = null

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

				Logic.Update(nearestThinker)
		}
	}

	return Game
})
