
define(['lib/pixi', 'base/renderer', 'manager', 'settings', 'game', 'base/point', 'base/utils', 'base/boid', 'gui/button', 'gui/drawer', 'gui/interface', 'gui/letter', 'gui/message', 'gui/phylactere', 'settings', 'color', 'element/thinker', 'element/player'], function(PIXI, renderer, Manager, Settings, Game, Point, Utils, Boid, Button, Drawer, Interface, Letter, Message, Phylactere, Settings, Color, Thinker, Player)
{
	var Engine = {}

	// Asset loader
	Engine.imageReady = false
	Engine.fontReady = false
	Engine.assetToLoad = ['images/test.png', 'images/head.png', 'images/ncs-1.png']
	for (var i = 0; i < Engine.assetToLoad.length; ++i) { PIXI.loader.add(Engine.assetToLoad[i]) }
	Engine.ImageLoaded = function () { Engine.imageReady = true; if (Engine.fontReady) { Engine.Init() } }
	Engine.FontLoaded = function () { Engine.fontReady = true; if (Engine.imageReady) { Engine.Init() } }
	PIXI.loader.once('complete', Engine.ImageLoaded).load();

	Engine.Init = function ()
	{
		// Interface
		Engine.interface = new Interface()
		Engine.interface.addButton("Algo Boids", function () {}, "https://en.wikipedia.org/wiki/Boids")
		Engine.interface.addButton("Pixi.js", function () {}, "http://www.pixijs.com/")
		Engine.interface.addButton("Code Sources", function () {}, "https://github.com/leon196/BubbleLetter")

		// Interactivity
		Manager.stage.interactive = true
		Manager.stage.on('mousedown', Engine.onClic).on('touchstart', Engine.onClic)
		Manager.stage.on('mousemove', Engine.onMove).on('touchmove', Engine.onMove)

		// Drawer
		Manager.drawer = new Drawer()
		Manager.stage.addChild(Manager.drawer)

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
	    requestAnimationFrame(Engine.Update)
	    renderer.render(Manager.stage)
			Manager.game.Update()
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

	// Google Font
  window.WebFontConfig = {
      google: {
          families: ['Snippet', 'Arvo:700italic', 'Podkova:700', 'Shadows Into Light', 'Permanent Marker', 'Luckiest Guy']
      },

      active: function() {
          Engine.FontLoaded();
      }
  };

  // include the web-font loader script
  (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
  })();

	return Engine
})
