
define(['../lib/pixi', '../core/global', '../settings', '../core/graphics',
 '../utils/tool', '../base/boid', '../color'],
 function(PIXI, Global, Settings, Graphics, Tool, Boid, Color)
{
	var Symbol = function ()
	{
		Boid.call(this)

    this.symbolIndex = Settings.GetRandomSymbolIndex()
		this.size = Settings.MIN_SIZE
    this.color = '0xfcfcfc'
		this.colorness = 0
    this.scaleSymbolInitial = 1
    this.scaleBubbleInitial = 1
    this.disapearing = false

		// The PIXI Bubble display
		this.bubbleBlack = Graphics.Circle(this.size)
		this.bubbleWhite = Graphics.Circle(this.size)
		this.bubbleColor = Graphics.Circle(this.size)
    this.bubbleBlack.tint = '0x0c0c0c'
    this.bubbleWhite.tint = '0xfcfcfc'
    this.bubbleColor.tint = this.color
    this.bubbleColor.blendMode = PIXI.BLEND_MODES.ADD

		// The PIXI Text display
		this.symbolBlack = new PIXI.Sprite(PIXI.Texture.fromFrame(this.symbolIndex))
		this.symbolWhite = new PIXI.Sprite(PIXI.Texture.fromFrame(this.symbolIndex))
		this.symbolBlack.tint = '0x0c0c0c'
		this.symbolWhite.tint = '0xfcfcfc'
		this.symbolBlack.anchor.x = this.symbolBlack.anchor.y = 0.5
		this.symbolWhite.anchor.x = this.symbolWhite.anchor.y = 0.5
    this.symbolWhite.width = this.symbolWhite.height = this.size * Settings.symbolScale
    this.symbolBlack.width = this.symbolBlack.height = this.size * Settings.symbolScale

    this.updateDisplay = function ()
    {
      this.bubbleWhite.x = this.bubbleBlack.x = this.bubbleColor.x = this.symbolWhite.x = this.symbolBlack.x = this.x
      this.bubbleWhite.y = this.bubbleBlack.y = this.bubbleColor.y = this.symbolWhite.y = this.symbolBlack.y = this.y
    }

    this.setSymbolIndex = function(symbolIndex)
    {
      this.symbolIndex = symbolIndex
      this.symbolBlack.texture = PIXI.Texture.fromFrame(this.symbolIndex)
      this.symbolWhite.texture = PIXI.Texture.fromFrame(this.symbolIndex)
    }

    this.setColor = function (color)
    {
      this.bubbleColor.tint = this.color = color
    }

		this.setColorness = function (colorness)
		{
      this.colorness = Tool.clamp(colorness, 0, 1)
      this.bubbleBlack.alpha = this.symbolWhite.alpha = this.colorness
      this.symbolBlack.alpha = this.bubbleWhite.alpha = 1 - this.colorness
		}

		this.setSize = function (size)
		{
			this.size = size

  		this.bubbleWhite.resize(this.size)
  		this.bubbleBlack.resize(this.size)
  		this.bubbleColor.resize(this.size)

      this.symbolWhite.width = this.symbolWhite.height = this.size * Settings.symbolScale
      this.symbolBlack.width = this.symbolBlack.height = this.size * Settings.symbolScale
      this.scaleSymbolInitial = this.symbolWhite.scale.x
		}

    this.updateScale = function (ratio)
    {
      this.symbolWhite.scale.x = this.symbolBlack.scale.x = this.scaleSymbolInitial * ratio
      this.symbolWhite.scale.y = this.symbolBlack.scale.y = this.scaleSymbolInitial * ratio
      this.bubbleBlack.scale.x = this.bubbleWhite.scale.x = this.bubbleColor.scale.x = this.scaleBubbleInitial * ratio
      this.bubbleBlack.scale.y = this.bubbleWhite.scale.y = this.bubbleColor.scale.y = this.scaleBubbleInitial * ratio
    }

    this.setBubbleVisible = function (show)
    {
      this.bubbleWhite.visible = show
      this.bubbleBlack.visible = show
      this.bubbleColor.visible = show
    }

    this.setSymbolVisible = function (show)
    {
      this.symbolWhite.visible = show
      this.symbolBlack.visible = show
    }
	}

	Symbol.prototype = Object.create(Boid.prototype)
	Symbol.prototype.constructor = Symbol

	return Symbol
})
