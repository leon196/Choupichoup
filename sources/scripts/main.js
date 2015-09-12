
define(['../lib/pixi', '../core/engine', '../core/global',
'../core/loader', '../core/render'],
function(PIXI, Engine, Global, Loader, Render)
{
  function init ()
  {
    Render.init()
    Engine.init()
    animate()
  }

  function animate ()
	{
    // Animation.update()
    Engine.update()
    Render.update()
		requestAnimFrame(animate)
	}
})
