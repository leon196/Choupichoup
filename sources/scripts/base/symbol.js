
define(['../lib/pixi', '../core/global', '../settings', '../core/graphics',
 '../utils/tool', '../base/boid', '../color'],
 function(PIXI, Global, Settings, Graphics, Tool, Boid, Color)
{
	var Symbol = function ()
	{
		Boid.call(this)

    this.character = Settings.GetRandomSymbol()
		this.size = Settings.MIN_SIZE
    this.color = '0xfcfcfc'
		this.colorness = 0
    this.scaleInitial = 1

		// The PIXI Bubble display
		this.bubble = Graphics.Circle(this.size)
		this.bubbleColor = Graphics.Circle(this.size)
    this.bubbleColor.tint = this.color
    this.bubbleColor.blendMode = PIXI.BLEND_MODES.ADD

		// The PIXI Text display
		this.textBlack = new PIXI.Text(this.character, Global.textStyle)
		this.textWhite = new PIXI.Text(this.character, Global.textStyle)
		this.textBlack.tint = '0x0c0c0c'
		this.textWhite.tint = '0xfcfcfc'
    this.textWhite.alpha = 0
		this.textBlack.anchor.x = this.textBlack.anchor.y = 0.5
		this.textWhite.anchor.x = this.textWhite.anchor.y = 0.5

    this.updateDisplay = function ()
    {
      this.bubble.x = this.bubbleColor.x = this.textWhite.x = this.textBlack.x = this.x
      this.bubble.y = this.bubbleColor.y = this.textWhite.y = this.textBlack.y = this.y
    }

    this.setCharacter = function(character)
    {
      this.textBlack.text = this.textWhite.text = this.character = character
    }

    this.setColor = function (color)
    {
      this.bubbleColor.tint = this.color = color
    }

		this.setColorness = function (colorness)
		{
      this.colorness = Tool.clamp(colorness, 0, 1)
      this.bubble.alpha = this.textBlack.alpha = 1 - this.colorness
		}

		this.setSize = function (size)
		{
			this.size = size
  		this.bubble.resize(this.size)
  		this.bubbleColor.resize(this.size)

			var textStyle = this.textBlack.style
			textStyle.font = size * Settings.LETTER_FONT_SCALE + 'px ' + Settings.FONT_NAME
			this.textWhite.style = this.textBlack.style = textStyle
		}

    this.updateScale = function (ratio)
    {
      this.textWhite.scale.x = this.textBlack.scale.x = this.scaleInitial * ratio
      this.textWhite.scale.y = this.textBlack.scale.y = this.scaleInitial * ratio
      this.bubble.scale.x = this.bubbleColor.scale.x = this.scaleInitial * ratio
      this.bubble.scale.y = this.bubbleColor.scale.y = this.scaleInitial * ratio
    }

    this.setBubbleVisible = function (show)
    {
      this.bubble.visible = show
      this.bubbleColor.visible = show
    }
	}

	Symbol.prototype = Object.create(Boid.prototype)
	Symbol.prototype.constructor = Symbol

	return Symbol
})
