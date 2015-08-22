
define(['lib/pixi', 'base/renderer', 'base/manager', 'settings', 'game', 'base/point', 'base/utils', 'base/boid', 'gui/button', 'gui/drawer', 'gui/interface', 'gui/letter', 'gui/message', 'gui/phylactere', 'settings', 'color'],function(PIXI, renderer, Manager, Settings, Game, Point, Utils, Boid, Button, Drawer, Interface, Letter, Message, Phylactere, Settings, Color)
{
	var Engine = {}

	// Game Elements
	Engine.interface = new Interface()
	Engine.game = new Game()

	// loader
	Engine.imageReady = false
	Engine.fontReady = false
	Engine.assetToLoad = ['images/test.png', 'images/head.png', 'images/ncs-1.png']
	for (var i = 0; i < Engine.assetToLoad.length; ++i) { PIXI.loader.add(Engine.assetToLoad[i]) }
	Engine.ImageLoaded = function () { Engine.imageReady = true; if (Engine.fontReady) { Engine.Init() } }
	Engine.FontLoaded = function () { Engine.fontReady = true; if (Engine.imageReady) { Engine.Init() } }
	PIXI.loader.once('complete', Engine.ImageLoaded).load();

	Engine.Init = function ()
	{
		// Buttons
		Engine.interface.addButton("Draw Debug", function () { drawer.debug = !drawer.debug; Engine.interface.visible = !Engine.interface.visible })
		Engine.interface.addButton("Draw Bubble", function () { layerWhite.visible = !layerWhite.visible; layerBlack.visible = !layerBlack.visible })
		Engine.interface.addButton("Algo Boids", function () {}, "https://en.wikipedia.org/wiki/Boids")
		Engine.interface.addButton("Pixi.js", function () {}, "http://www.pixijs.com/")
		Engine.interface.addButton("Code Sources", function () {}, "https://github.com/leon196/BubbleLetter")
		Engine.interface.addLabels(['grid', 'target', 'avoid','near', 'global']
			,[Color.GRID_STR, Color.TARGET_STR, Color.AVOID_STR, Color.NEAR_STR, Color.GLOBAL_STR])
		Engine.interface.visible = false

		// Game Elements
		Manager.phylactere = new Phylactere("Boids prototype for\nfloating thoughts")
		Manager.drawer = new Drawer()

		// Layers
		Manager.stage.addChildAt(Manager.phylactere, 0)
		Manager.stage.addChildAt(Engine.interface, 0)
		Manager.stage.addChildAt(Manager.drawer, 0)

		// Interactivity
		Manager.stage.interactive = true
		Manager.stage.on('mousemove', Engine.onMove).on('touchstart', Engine.onMove).on('touchmove', Engine.onMove)

		// Debug
		// Engine.game.SpawnCollider()

		// Start Loop
		Manager.timeStarted = new Date()
		Engine.animate()
	}

	Engine.animate = function()
	{
	    requestAnimationFrame(Engine.animate)
	    renderer.render(Manager.stage)
			Engine.game.Update()
	}

	// Mouse input
	Engine.onMove = function(event)
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
