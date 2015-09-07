
define(['../lib/pixi', '../settings', '../core/manager', '../core/graphics',
 '../element/phylactere', '../base/utils', '../base/boid', '../color', '../symbol'],
 function(PIXI, Settings, Manager, Graphics, Phylactere, Utils, Boid, Color, Symbol)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

		this.size = Settings.MIN_RADIUS
    this.color = '0xfcfcfc'
    this.character = typeof character !== "undefined" ? character : Symbol.GetValidRandom()
		this.colorness = 0
    this.unknown = true
    this.range = 1
    this.scaleInitial = 1
    this.boogieStart = 0

		var css = { font: Settings.FONT_SIZE + 'px ' + Settings.FONT_NAME, fill: '#fcfcfc', align: 'left' }

		// IDs of letter
		this.indexLine = undefined
		this.indexWord = undefined
		this.indexLetter = undefined

		// Position on message grid
		this.gridX = 0
		this.gridY = 0

		// The Bubble
		this.bubbleBack = Graphics.Circle(this.size)
    this.bubbleBack.resizeAt(0, Settings.BUBBLE_OUTLINE/2, this.size + Settings.BUBBLE_OUTLINE)
		this.bubbleFront = Graphics.Circle(this.size)
		this.bubbleColor = Graphics.Circle(this.size)

    this.bubbleBack.tint = '0x0c0c0c'
    this.bubbleColor.tint = this.color
    this.bubbleColor.blendMode = PIXI.BLEND_MODES.ADD

    Manager.layerBubbleBack.addChild(this.bubbleBack)
		Manager.layerBubbleFront.addChild(this.bubbleFront)
		Manager.layerBubbleColor.addChild(this.bubbleColor)

		// The Pixi Text display
		this.textFront = new PIXI.Text(this.character, css)
		this.textBack = new PIXI.Text(this.character, css)
		this.textColor = new PIXI.Text(this.character, css)
		this.textFront.tint = Color.textFront
		this.textBack.tint = Color.textBack
		this.textColor.tint = '0xfcfcfc'
    this.textColor.alpha = 0
		this.textFront.anchor.x = this.textFront.anchor.y = 0.5
		this.textBack.anchor.x = this.textBack.anchor.y = 0.5
		this.textColor.anchor.x = this.textColor.anchor.y = 0.5

    Manager.layerLetter.addChild(this.textBack)
		Manager.layerLetter.addChild(this.textFront)
		Manager.layerLetter.addChild(this.textColor)

    this.UpdateDisplay = function ()
    {
      this.textBack.x = this.textFront.x = this.textColor.x = this.x
      this.textBack.y = this.textFront.y = this.textColor.y = this.y
      this.bubbleBack.x = this.bubbleFront.x = this.bubbleColor.x = this.x
      this.bubbleBack.y = this.bubbleFront.y = this.bubbleColor.y = this.y
    }

    this.Boogie = function ()
    {
      this.bubbleBack.scale.x = this.bubbleFront.scale.x = this.bubbleColor.scale.x = this.scaleInitial + Math.sin((this.boogieStart - Manager.timeElapsed) * Settings.BOOGIE_SPEED) * Settings.BOOGIE_SCALE
      this.bubbleBack.scale.y = this.bubbleFront.scale.y = this.bubbleColor.scale.y = this.scaleInitial - Math.sin((this.boogieStart - Manager.timeElapsed) * Settings.BOOGIE_SPEED) * Settings.BOOGIE_SCALE
    }

    this.SetCharacter = function(character)
    {
      this.character = character
      this.textFront.text = this.textBack.text = this.textColor.text = character
    }

    this.SetColor = function (color)
    {
      this.color = color
      this.bubbleColor.tint = color
      this.textColor.tint = color
    }

		this.SetColorness = function (colorness)
		{
			this.colorness = Utils.clamp(colorness, 0, 1)
      this.bubbleFront.alpha = 1 - this.colorness

      if (this.unknown) {
        this.textFront.alpha = 1 - this.colorness
      }
      else {
        this.textColor.alpha = 1 - this.colorness
      }
		}

    this.SetFrontTint = function (color)
    {
      this.bubbleFront.tint = color
    }

		this.SetSize = function (size)
		{
			this.size = size
  		this.bubbleBack.resizeAt(0, Settings.BUBBLE_OUTLINE/2, this.size + Settings.BUBBLE_OUTLINE)
  		this.bubbleFront.resize(this.size)
  		this.bubbleColor.resize(this.size)

			var textStyle = this.textFront.style
			textStyle.font = size * Settings.LETTER_FONT_SCALE + 'px ' + Settings.FONT_NAME
			this.textBack.style = textStyle
			this.textFront.style = textStyle
			this.textColor.style = textStyle

		}

		this.SetRange = function (range)
		{
      this.range = range
			this.SetSize(Settings.MIN_RADIUS + Settings.STEP_RADIUS * this.range)
		}

    this.GetRange = function ()
    {
      return this.range
    }

    this.UpdateScale = function (ratio)
    {
      this.textBack.scale.x = this.textFront.scale.x = this.textColor.scale.x = this.scaleInitial * ratio
      this.textBack.scale.y = this.textFront.scale.y = this.textColor.scale.y = this.scaleInitial * ratio
      this.bubbleBack.scale.x = this.bubbleBack.scale.y = this.scaleInitial * ratio
      this.bubbleFront.scale.x = this.bubbleFront.scale.y = this.scaleInitial * ratio
      this.bubbleColor.scale.x = this.bubbleColor.scale.y = this.scaleInitial * ratio
    }

    this.SetBubbleVisible = function (show)
    {
      this.bubbleBack.visible = show
      this.bubbleFront.visible = show
      this.bubbleColor.visible = show
    }
	}

	Letter.prototype = Object.create(Boid.prototype)
	Letter.prototype.constructor = Letter

	return Letter
})
