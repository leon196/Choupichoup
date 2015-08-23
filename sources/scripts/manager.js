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

  // Global Lists
  Manager.boidList = []
  Manager.boidAddList = []
  Manager.garbageList = []
  Manager.garbageThinkerList = []

  // Game Elements
  Manager.player
  Manager.game

  // Display Tool
  Manager.drawer

  // Interactivity
	Manager.mouse = new Point()

	// Timing
	Manager.timeElapsed = 0
	Manager.timeStarted = 0

  Manager.addBoid = function (boid)
  {
    // Manager.boidAddList.push(boid)

    Manager.stage.addChild(boid)
    Manager.boidList.push(boid)
    Manager.drawer.AddBubble(boid)
  }

  Manager.removeBoid = function (boid_, index_)
  {
    Manager.garbageList.push({boid:boid_, index:index_})
  }

  Manager.removeThinker = function(thinker_)
  {
    Manager.garbageThinkerList.push({thinker:thinker_, index:Manager.game.thinkerList.indexOf(thinker_)})
  }

  Manager.update = function ()
  {
    if (Manager.garbageThinkerList.length > 0)
    {
      for (var i = Manager.garbageThinkerList.length - 1; i >= 0; --i)
      {
        var thinker = Manager.garbageThinkerList[i].thinker
        var index = Manager.garbageThinkerList[i].index
        thinker.phylactere.clear()
        Manager.game.thinkerList.splice(index, 1)
      }
      Manager.garbageThinkerList = []
    }
    if (Manager.garbageList.length > 0)
    {
      Manager.garbageList.sort(function(a,b)
      {
        if (a.index < b.index) return -1
        if (a.index > b.index) return 1
        return 0
      })
      console.log(Manager.garbageList)
      for (var i = Manager.garbageList.length - 1; i >= 0; --i)
      {
        var boid = Manager.garbageList[i].boid
        var index = Manager.garbageList[i].index
        boid.phylactere.boidList.splice(boid.phylactere.boidList.indexOf(boid), 1)
        Manager.boidList.splice(index, 1)
        Manager.stage.removeChild(boid)
        Manager.drawer.removeBubble(boid, index)
      }
      Manager.garbageList = []
    }
    // if (Manager.boidAddList.length > 0)
    // {
    //   for (var i = 0; i < Manager.boidAddList.length; ++i)
    //   {
    //     var boid = Manager.boidAddList[i]
    //     Manager.stage.addChild(boid)
    //     Manager.boidList.push(boid)
    //     Manager.drawer.AddBubble(boid)
    //   }
    //   Manager.boidAddList = []
    // }
  }

  return Manager
})
