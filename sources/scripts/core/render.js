
define(['../lib/pixi', '../core/global', '../gui/interface'],
function(PIXI, Global, Interface)
{
  var Render = function ()
  {
    // PIXI WebGL renderer
    this.renderer = PIXI.autoDetectRenderer(Global.width, Global.height, {view:Global.canvas})

    // Layers
    this.layerRoot = new PIXI.Container()
    this.layerCharacter = new PIXI.Container()
    this.layerBubbleWhite = new PIXI.Container()
    this.layerBubbleBlack = new PIXI.Container()
    this.layerBubbleColor = new PIXI.Container()
    this.layerDebug = new PIXI.Container()
    this.layerButton = new PIXI.Container()
    this.layerSymbol = new PIXI.Container()

    // The stack order
    this.layerRoot.addChild(Interface.background)
    this.layerRoot.addChild(this.layerCharacter)
    this.layerRoot.addChild(this.layerBubbleBlack)
    this.layerRoot.addChild(this.layerBubbleWhite)
    this.layerRoot.addChild(this.layerDebug)
    this.layerRoot.addChild(this.layerBubbleColor)
    this.layerRoot.addChild(this.layerSymbol)
    this.layerRoot.addChild(this.layerButton)

    this.addSymbol = function (symbol)
    {
      this.layerBubbleBlack.addChild(symbol.bubbleBlack)
      this.layerBubbleWhite.addChild(symbol.bubbleWhite)
  		this.layerBubbleColor.addChild(symbol.bubbleColor)
      this.layerSymbol.addChild(symbol.symbolBlack)
  		this.layerSymbol.addChild(symbol.symbolWhite)
    }

    this.removeSymbol = function (symbol)
    {
      this.layerBubbleBlack.removeChild(symbol.bubbleBlack)
      this.layerBubbleWhite.removeChild(symbol.bubbleWhite)
  		this.layerBubbleColor.removeChild(symbol.bubbleColor)
      this.layerSymbol.removeChild(symbol.symbolBlack)
  		this.layerSymbol.removeChild(symbol.symbolWhite)
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
