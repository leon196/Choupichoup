define(['lib/pixi', 'base/point'], function(PIXI, Point)
{
  var Manager = {}

  // Game Elements
  Manager.player
  Manager.game

  // Global Lists
  Manager.boidList = []
  Manager.thinkerList = []
  Manager.talkerList = []

  // Garbage Lists
  Manager.garbageList = []
  Manager.garbageThinkerList = []
  Manager.garbageTalkerList = []

  // Display Tool
  Manager.drawer

  // Interactivity
	Manager.mouse = new Point()

	// Timing
	Manager.timeElapsed = 0
	Manager.timeStarted = 0

	// Stage
  Manager.stage = new PIXI.Container()

  // Layers
	Manager.layerBlack = new PIXI.Container()
	Manager.layerWhite = new PIXI.Container()
  Manager.layerCollider = new PIXI.Container()
	Manager.stage.addChild(Manager.layerCollider)
	Manager.stage.addChild(Manager.layerBlack)
	Manager.stage.addChild(Manager.layerWhite)

  Manager.addBoid = function (boid)
  {
    // Boid contains a PIXI.Text
    Manager.stage.addChild(boid)
    // To update boid rules
    Manager.boidList.push(boid)
    // Display bubble
    Manager.drawer.AddBubble(boid)
  }

  Manager.addThinker = function(thinker)
  {
    thinker.init()
    Manager.thinkerList.push(thinker)
  }

  Manager.addTalker = function(talker)
  {
    talker.init()
    Manager.talkerList.push(talker)
  }

  Manager.removeBoid = function (boid_, index_)
  {
    Manager.garbageList.push({boid:boid_, index:index_})
  }

  Manager.removeThinker = function(thinker_)
  {
    Manager.garbageThinkerList.push({thinker:thinker_, index:Manager.thinkerList.indexOf(thinker_)})
  }

  Manager.removeTalker = function(talker_)
  {
    Manager.garbageTalkerList.push({talker:talker_, index:Manager.thinkerList.indexOf(talker_)})
  }

  Manager.update = function ()
  {
    // Clean Thinkers
    if (Manager.garbageThinkerList.length > 0)
    {
      for (var i = Manager.garbageThinkerList.length - 1; i >= 0; --i)
      {
        var thinker = Manager.garbageThinkerList[i].thinker
        var index = Manager.garbageThinkerList[i].index
        thinker.phylactere.clear()
        Manager.thinkerList.splice(index, 1)
      }
      Manager.garbageThinkerList = []
    }
    // Clean Talkers
    if (Manager.garbageTalkerList.length > 0)
    {
      for (var i = Manager.garbageTalkerList.length - 1; i >= 0; --i)
      {
        var talker = Manager.garbageTalkerList[i].talker
        var index = Manager.garbageTalkerList[i].index
        talker.phylactere.clear()
        Manager.talkerList.splice(index, 1)
      }
      Manager.garbageTalkerList = []
    }

    // Clean Boids
    if (Manager.garbageList.length > 0)
    {
      Manager.garbageList.sort(function(a,b)
      {
        if (a.index < b.index) return -1
        if (a.index > b.index) return 1
        return 0
      })
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
  }

  return Manager
})
