
define(['../lib/pixi', '../core/global'],
function(PIXI, Global)
{
  var Render = function ()
  {
    // PIXI WebGL renderer
    this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, {view:Global.canvas})

    // Layers
    this.layerRoot = new PIXI.Container()
    this.layerBubble = new PIXI.Container()
    this.layerSymbol = new PIXI.Container()

    // The stack order
    this.layerRoot.addChild(this.layerBubble)
    this.layerRoot.addChild(this.layerSymbol)

    this.init = function ()
    {
    }

    this.update = function ()
    {
      this.renderer.render(this.layerRoot)
    }
  }

  return new Render()
})
