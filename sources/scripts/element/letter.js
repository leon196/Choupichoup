
define(['../lib/pixi', '../settings', '../core/manager',
 '../base/utils', '../base/boid', '../base/color'],
 function(PIXI, Settings, Manager, Utils, Boid, Color)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

    if (typeof character !== "undefined") {
      this.character = character
    }
    else {
      var letter = Settings.RandomSymbols()
      while (letter == '︎' || letter == ' ') {
        letter = Settings.RandomSymbols()
      }
      this.character = letter
    }

		this.size = Settings.MIN_SIZE+Math.random()*(Settings.MAX_SIZE - Settings.MIN_SIZE)
    this.color = '0x0c0c0c'

		this.darkness = 0
		this.cloud = []
		var radius = 5
		var offsetRadius = 5
		for (var i = 0; i < 5; ++i) { this.cloud.push({x: Math.random()*offsetRadius, y: Math.random()*offsetRadius, size:Math.random()*radius}) }

		// Font stuff
		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: Color.GetGraySharp(this.darkness), align: 'left' }
		var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px ' + Settings.FONT_NAME, fill: '#fcfcfc', align: 'left' }
		// if (typeof style !== 'undefined')
		// {
		// 	this.size = style.min+Math.random()*(style.max - style.min)
		// 	css = { font: this.size * Settings.LETTER_FONT_SCALE +'px ' + style.font, fill: style.fill, align: style.align }
		// }

		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: '020202', align: 'left' }

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
		this.bubbleBack.anchor.x = this.bubbleBack.anchor.y = 0.5
		this.bubbleFront.anchor.x = this.bubbleFront.anchor.y = 0.5
		this.bubbleColor.anchor.x = this.bubbleColor.anchor.y = 0.5
		this.bubbleFront.rotation = Math.random() * Utils.PI2
		this.bubbleBack.rotation = this.bubbleColor.rotation = this.bubbleFront.rotation
		this.bubbleBack.width = this.bubbleFront.width = this.size * 2
		this.bubbleBack.height = this.bubbleFront.height = this.size * 2
		this.bubbleColor.width = this.bubbleColor.height = this.size * 2

    Manager.layerBubbleBack.addChild(this.bubbleBack)
		Manager.layerBubbleFront.addChild(this.bubbleFront)
		Manager.layerBubbleFront.addChild(this.bubbleColor)

		// The Pixi Text display
		this.textFront = new PIXI.Text(this.character, css)
		this.textBack = new PIXI.Text(this.character, css)
		this.textFront.tint = this.color
		this.textFront.anchor.x = this.textFront.anchor.y = 0.5
		this.textBack.anchor.x = this.textBack.anchor.y = 0.5

    Manager.layerLetter.addChild(this.textBack)
		Manager.layerLetter.addChild(this.textFront)

    this.UpdateDisplay = function ()
    {
      this.textBack.x = this.textFront.x = this.bubbleBack.x = this.bubbleFront.x = this.bubbleColor.x = this.x
      this.textBack.y = this.textFront.y = this.bubbleBack.y = this.bubbleFront.y = this.bubbleColor.y = this.y
    }

    this.SetColor = function (color)
    {
      this.color = color
      this.bubbleColor.tint = color
    }

		this.SetDarkness = function (darkness)
		{
			this.darkness = Utils.clamp(darkness, 0, 1)

			// var textStyle = this.text.style
			// textStyle.fill = Color.GetGraySharp(this.darkness)
			// textStyle.fill = "#"+Color.BlendColors(Color.Devil, this.color, this.darkness).toString(16).slice(1)
			// this.text.style = textStyle
      this.textFront.alpha = 1 - this.darkness

      // this.bubbleFront.alpha = 1 - this.darkness
      this.bubbleColor.alpha = this.darkness
			// this.bubble.tint = Color.GetGrayHex(1 - this.darkness)
      //Color.BlendColors(this.color, Color.Devil, this.darkness)// Color.ShadeHexColor('#00FF00', 1 - this.darkness)
		}

		this.SetSize = function (size)
		{
			this.size = size

			var textStyle = this.textBack.style
			textStyle.font = size * Settings.LETTER_FONT_SCALE + 'px ' + Settings.FONT_NAME
			this.textBack.style = textStyle
			this.textFront.style = textStyle

			// this.bubble.tint = Color.GetGrayHex(1 - this.darkness)
  		this.bubbleBack.width = this.bubbleFront.width = this.size * 2
  		this.bubbleBack.height = this.bubbleFront.height = this.size * 2
  		this.bubbleColor.width = this.bubbleColor.height = this.size * 2
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
