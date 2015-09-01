define(['../lib/pixi', '../base/point'], function(PIXI, Point)
{
  var Manager = {}

  // Game Elements
  Manager.player
  Manager.game

  // Global Lists
  Manager.boidList = []
  Manager.messageList = []
  Manager.thinkerList = []

  // Recycling
  Manager.addingList = []
  Manager.garbageList = []
  Manager.garbageThinkerList = []

  // Interactivity
	Manager.mouse = new Point()

	// Timing
	Manager.timeElapsed = 0
	Manager.timeStarted = 0

	// Stage
  Manager.stage = new PIXI.Container()

  // Layers
	Manager.layerBackground = new PIXI.Container()
	Manager.layerBubbleBack = new PIXI.Container()
	Manager.layerBubbleFront = new PIXI.Container()
	Manager.layerBubbleColor = new PIXI.Container()
	Manager.layerThinker = new PIXI.Container()
	Manager.layerLetter = new PIXI.Container()

	Manager.stage.addChild(Manager.layerBackground)
	Manager.stage.addChild(Manager.layerBubbleBack)
	Manager.stage.addChild(Manager.layerBubbleFront)
	Manager.stage.addChild(Manager.layerBubbleColor)
	Manager.stage.addChild(Manager.layerThinker)
	Manager.stage.addChild(Manager.layerLetter)

  Manager.AddBoid = function (boid)
  {
    Manager.addingList.push(boid)
  }

  Manager.RemoveBoid = function (boid_, index_)
  {
    Manager.garbageList.push({boid:boid_, index:index_})
  }

  Manager.RemoveThinker = function(thinker_)
  {
    Manager.garbageThinkerList.push({thinker:thinker_, index:Manager.thinkerList.indexOf(thinker_)})
  }

  Manager.AddMessage = function (message,x,y,color)
  {
    message.x = x
    message.y = y
    message.color = color
    message.Init()
    message.Update()
    Manager.messageList.push(message)
    return message
  }

  Manager.RemoveMessage = function (message)
  {
    for (var i = 0; i < message.boidList.length; ++i) {
      var boid = message.boidList[i]
      Manager.RemoveBoid(boid, Manager.boidList.indexOf(boid))
    }
    var idx = Manager.messageList.indexOf(message)
    if (idx != -1) {
      Manager.messageList.splice(idx, 1)
    }
    Manager.RemoveBoid(message, Manager.boidList.indexOf(message))
  }

  Manager.AddThinker = function (thinker,x,y,range,color)
  {
    thinker.color = color
    thinker.SetRange(range)
    thinker.anchorX = x
    thinker.anchorY = y
    thinker.Init()
    thinker.Update()
    Manager.thinkerList.push(thinker)
    return thinker
  }

  Manager.Update = function ()
  {
    // Clean Thinkers
    if (Manager.garbageThinkerList.length > 0)
    {
      for (var i = Manager.garbageThinkerList.length - 1; i >= 0; --i)
      {
        var thinker = Manager.garbageThinkerList[i].thinker
        var index = Manager.garbageThinkerList[i].index
        Manager.RemoveBoid(thinker, Manager.boidList.indexOf(thinker))
        thinker.Clear()
        Manager.thinkerList.splice(index, 1)
      }
      Manager.garbageThinkerList = []
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
        if (boid.phylactere) {
          boid.phylactere.boidList.splice(boid.phylactere.boidList.indexOf(boid), 1)
        }
        Manager.boidList.splice(index, 1)
        Manager.layerBubbleBack.removeChild(boid.bubbleBack)
        Manager.layerBubbleFront.removeChild(boid.bubbleFront)
        Manager.layerBubbleColor.removeChild(boid.bubbleColor)
        Manager.layerLetter.removeChild(boid.textBack)
        Manager.layerLetter.removeChild(boid.textFront)
      }
      Manager.garbageList = []
    }

    // Add Boids
    if (Manager.addingList.length > 0) {
      for (var i = 0; i < Manager.addingList.length; ++i)
      {
        Manager.boidList.push(Manager.addingList[i])
      }
      Manager.addingList = []
    }
  }

  return Manager
})
