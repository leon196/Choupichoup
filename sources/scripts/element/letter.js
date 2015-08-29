
define(['../lib/pixi', '../settings', '../core/manager',
 '../base/utils', '../base/boid', '../base/color'],
 function(PIXI, Settings, Manager, Utils, Boid, Color)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

    var letter = Settings.RandomSymbols()
    while (letter == '︎' || letter == ' ') {
      letter = Settings.RandomSymbols()
    }
    this.character = letter

		this.size = Settings.MIN_SIZE+Math.random()*(Settings.MAX_SIZE - Settings.MIN_SIZE)

		this.darkness = 0
		this.cloud = []
		var radius = 5
		var offsetRadius = 5
		for (var i = 0; i < 5; ++i) { this.cloud.push({x: Math.random()*offsetRadius, y: Math.random()*offsetRadius, size:Math.random()*radius}) }

		// Font stuff
		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: Color.GetGraySharp(this.darkness), align: 'left' }
		var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Arial', fill: '#fcfcfc', align: 'left' }
		// if (typeof style !== 'undefined')
		// {
		// 	this.size = style.min+Math.random()*(style.max - style.min)
		// 	css = { font: this.size * Settings.LETTER_FONT_SCALE +'px ' + style.font, fill: style.fill, align: style.align }
		// }

		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: '020202', align: 'left' }

		// The Bubble
		this.bubbleW = new PIXI.Sprite(PIXI.Texture.fromImage('images/poof.png'))
		this.bubbleB = new PIXI.Sprite(PIXI.Texture.fromImage('images/poof.png'))
    this.bubbleB.tint = '0x0c0c0c'
		this.bubbleW.anchor.x = this.bubbleW.anchor.y = 0.5
		this.bubbleB.anchor.x = this.bubbleB.anchor.y = 0.5
		this.bubbleB.rotation = Math.random() * Utils.PI2
		this.bubbleW.rotation = this.bubbleB.rotation
		this.bubbleW.width = this.bubbleB.width = this.size * 2
		this.bubbleW.height = this.bubbleB.height = this.size * 2
		this.addChild(this.bubbleB)
		this.addChild(this.bubbleW)

		// The Pixi Text display
		this.textB = new PIXI.Text(this.character, css)
		this.textW = new PIXI.Text(this.character, css)
		this.textB.tint = '0x0c0c0c'
		this.textB.anchor.x = this.textB.anchor.y = 0.5
		this.textW.anchor.x = this.textW.anchor.y = 0.5
		this.addChild(this.textW)
		this.addChild(this.textB)

		this.SetDarkness = function (darkness)
		{
			this.darkness = Utils.clamp(darkness, 0, 1)

			// var textStyle = this.text.style
			// textStyle.fill = Color.GetGraySharp(this.darkness)
			// textStyle.fill = "#"+Color.BlendColors(Color.Devil, this.color, this.darkness).toString(16).slice(1)
			// this.text.style = textStyle
      this.textB.alpha = 1 - this.darkness

      this.bubbleW.alpha = 1 - this.darkness
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
  		this.bubbleW.width = this.bubbleB.width = this.size * 2
  		this.bubbleW.height = this.bubbleB.height = this.size * 2
		}

		// IDs of letter
		this.indexLine = undefined
		this.indexWord = undefined
		this.indexLetter = undefined

		// Game Logic
		this.isFromMessage = false

		// Position on message grid
		this.gridX = 0
		this.gridY = 0
	}

	Letter.prototype = Object.create(Boid.prototype)
	Letter.prototype.constructor = Letter

	return Letter
})
