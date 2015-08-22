
define(['base/boid', 'base/renderer', 'base/manager', 'gui/letter', 'engine'], function(Boid, renderer, Manager, Letter, Engine)
{
	var Message = function(text, style)
	{
		// Message is root boid
		Boid.call(this)

		// The list of letter boids that make the message
		this.letters = []

		// Data strings
		this.lines = text.split("\n")

		// Display params
		this.offsetX = 0
		this.offsetY = 0
		this.lineHeight = 40

		// Setup data and create boids
		var lineWidth = 0
		this.lineWidthMax = 0
		for (var idxLine = 0; idxLine < this.lines.length; ++idxLine)
		{
			var word = this.lines[idxLine].split(" ")
			var wordLetters = word.join(" ")
			lineWidth = 0
			for (var idxLetter = 0; idxLetter < wordLetters.length; ++idxLetter)
			{
				// Boid Creation
				var letter = new Letter(wordLetters[idxLetter])
				letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)

				// Letter logic
				letter.indexLine = idxLine
				letter.indexLetter = idxLetter
				letter.isFromMessage = true

				letter.avoidScale = 0.01
				letter.friction = 0.98

				// Add to update stack
				Manager.boidList.push(letter)

				// Store own letters
				this.letters.push(letter)

				// Add to scene to be displayed
				Manager.stage.addChild(letter)

				lineWidth += letter.size
			}
			this.lineWidthMax = Math.max(this.lineWidthMax, lineWidth)
		}

		// Setup position
		lineWidth = 0
		for (var l = 0; l < this.letters.length; ++l)
		{
			var boid = this.letters[l]
			// var center = Math.ceil(this.lineWidthMax / 2) * boid.size
			// var offset = (this.lineWidthMax - wordLetters.length) / 2 * boid.size

			// Reset incrementation if letter is at the begining of line
			lineWidth = boid.indexLetter == 0 ? 0 : lineWidth

			// Setup message grid position
			boid.gridX = lineWidth - this.lineWidthMax / 2
			boid.gridY = boid.indexLine * this.lineHeight - this.lineHeight * this.lines.length / 2

			// Increment
			lineWidth += boid.size
		}

		this.GetX = function ()
		{
			return this.x + this.offsetX
		}

		this.GetY = function ()
		{
			return this.y + this.offsetY
		}
	}

	Message.prototype = Object.create(Boid.prototype)
	Message.prototype.constructor = Message

	return Message
})
