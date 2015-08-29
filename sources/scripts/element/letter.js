
define(['../lib/pixi', '../settings', '../core/manager',
 '../base/utils', '../base/boid', '../base/color'],
 function(PIXI, Settings, Manager, Utils, Boid, Color)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

		// The actual string
		this.character = Utils.getDefaultIfUndefined(character, Settings.RandomSymbols())
		this.size = Settings.MIN_SIZE+Math.random()*(Settings.MAX_SIZE - Settings.MIN_SIZE)

		this.darkness = 0
		this.cloud = []
		var radius = 5
		var offsetRadius = 5
		for (var i = 0; i < 5; ++i) { this.cloud.push({x: Math.random()*offsetRadius, y: Math.random()*offsetRadius, size:Math.random()*radius}) }

		// Font stuff
		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: Color.GetGraySharp(this.darkness), align: 'left' }
		var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Arial', fill: Color.GetGraySharp(this.darkness), align: 'left' }
		// if (typeof style !== 'undefined')
		// {
		// 	this.size = style.min+Math.random()*(style.max - style.min)
		// 	css = { font: this.size * Settings.LETTER_FONT_SCALE +'px ' + style.font, fill: style.fill, align: style.align }
		// }

		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: '020202', align: 'left' }

		// The Bubble
		this.bubble = new PIXI.Sprite(PIXI.Texture.fromImage('images/poof.png'))
		this.bubble.anchor.x = 0.5
		this.bubble.anchor.y = 0.5
		this.bubble.rotation = Math.random() * Utils.PI2
		// this.bubble.scale.x = this.size / (Settings.MAX_SIZE - Settings.MIN_SIZE)
		// this.bubble.scale.y = this.bubble.scale.x
		this.bubble.width = this.size * 2
		this.bubble.height = this.size * 2
		this.addChild(this.bubble)

		// The Pixi Text display
		this.text = new PIXI.Text(this.character, css)
		this.text.anchor.x = 0.5
		this.text.anchor.y = 0.5
		this.addChild(this.text)

		this.color = "#FCFCFC"

		this.SetDarkness = function (darkness)
		{
			this.darkness = Utils.clamp(darkness, 0, 1)

			var textStyle = this.text.style
			textStyle.fill = Color.GetGraySharp(this.darkness)
			this.text.style = textStyle

			this.bubble.tint = Color.BlendColors(this.color, Color.Devil, this.darkness)// Color.ShadeHexColor('#00FF00', 1 - this.darkness)
		}

		this.SetSize = function (size)
		{
			this.size = size

			var textStyle = this.text.style
			textStyle.font = size * Settings.LETTER_FONT_SCALE + 'px ' + Settings.FONT_NAME
			this.text.style = textStyle

			// this.bubble.tint = Color.GetGrayHex(1 - this.darkness)
			this.bubble.width = this.size * 2
			this.bubble.height = this.size * 2
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
