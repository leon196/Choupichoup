
define(['../lib/pixi'], function(PIXI)
{
  // var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,
  //   {
  //     view: document.getElementById("container")
  //     , transparent:true
  //   })
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,
    {
      view: document.getElementById("container")
      , transparent:true
      , antialias:true
    })

  window.onresize = function(event) {
      renderer.resize(window.innerWidth, window.innerHeight)
  }

  return renderer
})
