
define(['../lib/pixi', '../settings', '../core/renderer', '../core/manager', '../core/game', '../core/keyboard',
'../base/point', '../base/utils', '../base/color', '../base/boid', '../gui/button', '../gui/interface',
'../element/letter', '../element/phylactere', '../element/thinker', '../element/player'],
function(PIXI, Settings, renderer, Manager, Game, Keyboard,
	Point, Utils, Color, Boid, Button, Interface,
	Letter, Phylactere, Thinker, Player)
{
	var Engine = {}

	// Asset loader
	Engine.assetToLoad = ['images/heads.png', 'images/poof.png', 'fonts/EmojiSymbols-Regular.woff']
	Engine.imageReady = false
	Engine.fontReady = false
	for (var i = 0; i < Engine.assetToLoad.length; ++i) { PIXI.loader.add(Engine.assetToLoad[i]) }
	Engine.ImageLoaded = function () { Engine.imageReady = true; if (Engine.fontReady) { Engine.Init() } }
	Engine.FontLoaded = function () { Engine.fontReady = true; if (Engine.imageReady) { Engine.Init() } }
	PIXI.loader.once('complete', Engine.ImageLoaded).load();

	Engine.Init = function ()
	{
		// Interface
		Engine.interface = new Interface()
		Engine.interface.addButton("&#x1F31A;", function () {}, "https://en.wikipedia.org/wiki/Boids")
		Engine.interface.addButton("&#x1F31A;", function () {}, "http://www.pixijs.com")
		Engine.interface.addButton("&#x1F524;", function () {}, "https://github.com/leon196/BubbleLetter")
		Engine.interface.addButton("&#x1F31A;", function () {}, "http://leon196.github.io")
		Manager.stage.addChild(Engine.interface)

		// Interactivity
		Manager.stage.interactive = true
		Manager.stage.on('mousedown', Engine.onClic).on('touchstart', Engine.onClic)
		Manager.stage.on('mousemove', Engine.onMove).on('touchmove', Engine.onMove)
		document.addEventListener('keydown', Keyboard.OnKeyDown)
		document.addEventListener('keyup', Keyboard.OnKeyUp)

		// Setup
		Manager.timeStarted = new Date() / 1000
		Manager.timeElapsed = 0
		Manager.game = new Game()
		Manager.game.Init()

		// Start Loop
		Engine.Update()
	}

	Engine.Update = function()
	{
		renderer.render(Manager.stage)
		Manager.game.Update()
		requestAnimFrame(Engine.Update)
	}

	// Mouse input
	Engine.onMove = function(event)
	{
		Manager.mouse = event.data.global
	}

	Engine.onClic = function(event)
	{
		Manager.mouse = event.data.global
	}

	return Engine
})
