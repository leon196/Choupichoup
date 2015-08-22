
define(['lib/pixi'], function(PIXI)
{
  var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,{transparent:true})
  document.body.appendChild(renderer.view)
  
  window.onresize = function(event) {
      renderer.resize(window.innerWidth, window.innerHeight)
  }

  return renderer
})
