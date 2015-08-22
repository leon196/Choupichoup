define(['lib/pixi', 'base/point'], function(PIXI, Point)
{
  var Manager = {}

	// Stage
  Manager.stage = new PIXI.Container()

  // Layers
	Manager.layerBlack = new PIXI.Container()
	Manager.layerWhite = new PIXI.Container()
  Manager.layerCollider = new PIXI.Container()
	Manager.stage.addChild(Manager.layerCollider)
	Manager.stage.addChild(Manager.layerBlack)
	Manager.stage.addChild(Manager.layerWhite)

  // Global Boid List
  Manager.boidList = []

  Manager.removeBoid = function (boid, current)
  {
    Manager.boidList.splice(current, 1)
    Manager.stage.removeChild(boid)
    Manager.layerBlack.removeChild(Manager.drawer.bullBlackList[current])
    Manager.layerWhite.removeChild(Manager.drawer.bullWhiteList[current])
    Manager.drawer.bullBlackList.splice(current, 1)
    Manager.drawer.bullWhiteList.splice(current, 1)
  }

  // Game Elements
  Manager.player
  Manager.thinker
  Manager.talker

  // Display Tool
  Manager.drawer

  // Interactivity
	Manager.mouse = new Point()

	// Timing
	Manager.timeElapsed = 0
	Manager.timeStarted = 0

  return Manager
})
