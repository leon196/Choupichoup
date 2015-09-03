
define(['../lib/pixi', '../settings', '../core/manager',
 '../element/phylactere', '../base/utils', '../base/boid', '../color', '../symbol'],
 function(PIXI, Settings, Manager, Phylactere, Utils, Boid, Color, Symbol)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

    if (typeof character !== "undefined") {
      this.character = character
    }
    else {
      var letter = Symbol.GetRandom()
      while (letter == '︎' || letter == ' ') {
        letter = Symbol.GetRandom()
      }
      this.character = letter
    }

		this.size = Settings.MIN_SIZE
    this.color = '0xfcfcfc'

		this.colorness = 0
    this.range = 1

		var css = { font: Settings.FONT_SIZE + 'px ' + Settings.FONT_NAME, fill: '#fcfcfc', align: 'left' }

		// IDs of letter
		this.indexLine = undefined
		this.indexWord = undefined
		this.indexLetter = undefined

		// Game Logic
		this.isFromMessage = false

		// Position on message grid
		this.gridX = 0
		this.gridY = 0

		// The Bubble
		this.bubbleBack = new PIXI.Sprite(PIXI.Texture.fromImage('images/poofBack.png'))
		this.bubbleFront = new PIXI.Sprite(PIXI.Texture.fromImage('images/poofFront.png'))
		this.bubbleColor = new PIXI.Sprite(PIXI.Texture.fromImage('images/poofFront.png'))
    this.bubbleColor.tint = this.color
    this.bubbleColor.blendMode = PIXI.BLEND_MODES.ADD

		this.bubbleBack.anchor.x = this.bubbleBack.anchor.y = 0.5
		this.bubbleFront.anchor.x = this.bubbleFront.anchor.y = 0.5
		this.bubbleColor.anchor.x = this.bubbleColor.anchor.y = 0.5
		this.bubbleFront.rotation = Math.random() * Utils.PI2
		this.bubbleBack.rotation = this.bubbleColor.rotation = this.bubbleFront.rotation

    Manager.layerBubbleBack.addChild(this.bubbleBack)
		Manager.layerBubbleFront.addChild(this.bubbleFront)
		Manager.layerBubbleColor.addChild(this.bubbleColor)

		// The Pixi Text display
		this.textFront = new PIXI.Text(this.character, css)
		this.textBack = new PIXI.Text(this.character, css)
		this.textFront.tint = Color.textFront
		this.textBack.tint = Color.textBack
		this.textFront.blendMode = PIXI.BLEND_MODES.MULTIPLY
		this.textBack.blendMode = PIXI.BLEND_MODES.ADD
		this.textFront.anchor.x = this.textFront.anchor.y = 0.5
		this.textBack.anchor.x = this.textBack.anchor.y = 0.5

    Manager.layerLetter.addChild(this.textBack)
		Manager.layerLetter.addChild(this.textFront)

    this.UpdateDisplay = function ()
    {
      this.textBack.x = this.textFront.x = this.bubbleBack.x = this.bubbleFront.x = this.bubbleColor.x = this.x
      this.textBack.y = this.textFront.y = this.bubbleBack.y = this.bubbleFront.y = this.bubbleColor.y = this.y
    }

    this.SetCharacter = function(character)
    {
      this.character = character
      this.textFront.text = this.textBack.text = character
    }

    this.SetColor = function (color)
    {
      this.color = color
      this.bubbleColor.tint = color
    }

		this.SetColorness = function (colorness)
		{
			this.colorness = Utils.clamp(colorness, 0, 1)
      this.bubbleFront.alpha = 1 - this.colorness
      this.textFront.alpha = 1 - this.colorness
		}

    this.SetFrontTint = function (color)
    {
      this.bubbleFront.tint = color
    }

		this.SetSize = function (size)
		{
			this.size = size
      this.SetScale(this.size * 2 / Settings.MAX_SIZE)
		}

		this.SetRange = function (range)
		{
      this.range = range
			this.SetSize(Settings.MIN_SIZE + Settings.MAX_SIZE * this.range / Settings.RANGE_SCALE)
		}

    this.GetRange = function ()
    {
      return this.range
    }

    this.SetBubbleVisible = function (show)
    {
      this.bubbleBack.visible = show
      this.bubbleFront.visible = show
      this.bubbleColor.visible = show
    }

    this.UpdateScale = function (ratio)
    {
      this.textBack.scale.x = this.textFront.scale.x = this.scaleInitial * ratio
      this.bubbleBack.scale.x = this.bubbleFront.scale.x = this.bubbleColor.scale.x = this.scaleInitial * ratio
      this.textBack.scale.y = this.textFront.scale.y = this.scaleInitial * ratio
      this.bubbleBack.scale.y = this.bubbleFront.scale.y = this.bubbleColor.scale.y = this.scaleInitial * ratio
    }

    this.SetScale = function (scale)
    {
      this.scaleInitial = scale
      this.UpdateScale(1)
    }
	}

	Letter.prototype = Object.create(Boid.prototype)
	Letter.prototype.constructor = Letter

	return Letter
})
