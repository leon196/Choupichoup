
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
		this.bubbleBack.anchor.x = this.bubbleBack.anchor.y = 0.5
		this.bubbleFront.anchor.x = this.bubbleFront.anchor.y = 0.5
		this.bubbleFront.rotation = Math.random() * Utils.PI2
		this.bubbleBack.rotation = this.bubbleFront.rotation
		this.bubbleBack.width = this.bubbleFront.width = this.size * 2
		this.bubbleBack.height = this.bubbleFront.height = this.size * 2

    Manager.layerBubbleBack.addChild(this.bubbleBack)
		Manager.layerBubbleFront.addChild(this.bubbleFront)

		// The Pixi Text display
		this.textB = new PIXI.Text(this.character, css)
		this.textW = new PIXI.Text(this.character, css)
		this.textB.tint = '0x0c0c0c'
		this.textB.anchor.x = this.textB.anchor.y = 0.5
		this.textW.anchor.x = this.textW.anchor.y = 0.5

    Manager.layerLetter.addChild(this.textW)
		Manager.layerLetter.addChild(this.textB)

    this.UpdateDisplay = function ()
    {
      this.textW.x = this.textB.x = this.bubbleBack.x = this.bubbleFront.x = this.x
      this.textW.y = this.textB.y = this.bubbleBack.y = this.bubbleFront.y = this.y
    }

		this.SetDarkness = function (darkness)
		{
			this.darkness = Utils.clamp(darkness, 0, 1)

			// var textStyle = this.text.style
			// textStyle.fill = Color.GetGraySharp(this.darkness)
			// textStyle.fill = "#"+Color.BlendColors(Color.Devil, this.color, this.darkness).toString(16).slice(1)
			// this.text.style = textStyle
      this.textB.alpha = 1 - this.darkness

      this.bubbleBack.alpha = 1 - this.darkness
			// this.bubble.tint = Color.GetGrayHex(1 - this.darkness)
      //Color.BlendColors(this.color, Color.Devil, this.darkness)// Color.ShadeHexColor('#00FF00', 1 - this.darkness)
		}

		this.SetSize = function (size)
		{
			this.size = size

			var textStyle = this.textW.style
			textStyle.font = size * Settings.LETTER_FONT_SCALE + 'px ' + Settings.FONT_NAME
			this.textW.style = textStyle
			this.textB.style = textStyle

			// this.bubble.tint = Color.GetGrayHex(1 - this.darkness)
  		this.bubbleBack.width = this.bubbleFront.width = this.size * 2
  		this.bubbleBack.height = this.bubbleFront.height = this.size * 2
		}

    this.SetBubbleVisible = function (show)
    {
      this.bubbleBack.visible = show
      this.bubbleFront.visible = show
    }
	}

	Letter.prototype = Object.create(Boid.prototype)
	Letter.prototype.constructor = Letter

	return Letter
})
