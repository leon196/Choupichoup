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
  Manager.garbageList = []

  Manager.update = function ()
  {
    if (Manager.garbageList.length > 0)
    {
      for (var i = Manager.garbageList.length - 1; i >= 0; --i)
      {
        var boid = Manager.garbageList[i].boid
        var index = Manager.garbageList[i].index
        Manager.boidList.splice(index, 1)
        Manager.stage.removeChild(boid)
        Manager.layerBlack.removeChild(Manager.drawer.bullBlackList[index])
        Manager.layerWhite.removeChild(Manager.drawer.bullWhiteList[index])
        Manager.drawer.bullBlackList.splice(index, 1)
        Manager.drawer.bullWhiteList.splice(index, 1)
      }
      Manager.garbageList = []
    }
  }

  Manager.removeBoid = function (boid_, index_)
  {
    Manager.garbageList.push({boid:boid_, index:index_})
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
