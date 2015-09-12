
define(['lib/pixi', 'core/engine', 'core/global', 'core/render'],
function(PIXI, Engine, Global, Render)
{
  function init ()
  {
    Render.init()
    Engine.init()
    animate()
  }

  function animate ()
	{
    Engine.update()
    Render.update()
		requestAnimFrame(animate)
	}

	var assetToLoad = [ 'images/background.jpg', 'images/characters.png', 'images/characters.json', ]
	for (var i = 0; i < assetToLoad.length; ++i) { PIXI.loader.add(assetToLoad[i]) }
	PIXI.loader.once('complete', init).load();
})
