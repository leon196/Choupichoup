
define(['../lib/pixi', '../core/global', '../gui/interface'],
function(PIXI, Global, Interface)
{
  var Render = function ()
  {
    // PIXI WebGL renderer
    this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, {view:Global.canvas})

    // Layers
    this.layerRoot = new PIXI.Container()
    this.layerBubble = new PIXI.Container()
    this.layerBubbleColor = new PIXI.Container()
    this.layerDebug = new PIXI.Container()
    this.layerSymbol = new PIXI.Container()

    // The stack order
    this.layerRoot.addChild(Interface.background)
    this.layerRoot.addChild(this.layerBubble)
    this.layerRoot.addChild(this.layerDebug)
    this.layerRoot.addChild(this.layerBubbleColor)
    this.layerRoot.addChild(this.layerSymbol)

    this.addSymbol = function (symbol)
    {
      this.layerBubble.addChild(symbol.bubble)
  		this.layerBubbleColor.addChild(symbol.bubbleColor)
      this.layerSymbol.addChild(symbol.textBlack)
  		this.layerSymbol.addChild(symbol.textWhite)
    }

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
