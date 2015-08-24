
define(['lib/pixi', 'base/utils', 'base/boid',  'settings', 'manager'], function(PIXI, Utils, Boid, Settings, Manager)
{
	var Letter = function (character, style)
	{
		Boid.call(this)

		// The actual string
		this.character = Utils.getDefaultIfUndefined(character, Utils.randomLetter())
		this.size = Settings.MIN_SIZE+Math.random()*(Settings.MAX_SIZE - Settings.MIN_SIZE)

		// Font stuff
		var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: '#020202', align: 'left' }
		if (typeof style !== 'undefined')
		{
			this.size = style.min+Math.random()*(style.max - style.min)
			css = { font: this.size * Settings.LETTER_FONT_SCALE +'px ' + style.font, fill: style.fill, align: style.align }
		}

		// var css = { font: this.size * Settings.LETTER_FONT_SCALE +'px Shadows Into Light', fill: '020202', align: 'left' }

		this.darkness = 0

		// The Bubble
		this.bubble = new PIXI.Graphics()
		this.bubble.beginFill(0x000000)
		this.bubble.drawCircle(0, 0, this.size)
		this.addChild(this.bubble)

		// The Pixi Text display
		this.text = new PIXI.Text(this.character, css)
		this.text.anchor.x = 0.5
		this.text.anchor.y = 0.5
		this.addChild(this.text)

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
