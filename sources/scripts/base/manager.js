define(['lib/pixi', 'base/point'], function(PIXI, Point)
{
  var Manager = {}

	// Stage and layers
  Manager.stage = new PIXI.Container()
	Manager.layerBlack = new PIXI.Container()
	Manager.layerWhite = new PIXI.Container()
	Manager.stage.addChild(Manager.layerBlack)
	Manager.stage.addChild(Manager.layerWhite)

  // Global Boid List
  Manager.boidList = []

  // Game Elements
  Manager.phylactere
  Manager.drawer

  // Interactivity
	Manager.mouse = new Point()

	// Timing
	Manager.timeElapsed = 0
	Manager.timeStarted = 0

  return Manager
})
