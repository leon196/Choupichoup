
define(['../core/renderer', '../core/manager',
'../settings',
'../base/boid', '../element/letter'],
function(renderer, Manager, Settings, Boid, Letter)
{
	var Message = function(text, style)
	{
		// Message is root boid
		Boid.call(this)

		// The list of letter boids that make the message
		this.boidList = []

		// Data strings
		this.lines = text.split("\n")
		this.lineWidthList = []
		this.lineWidthMax = 0

		// Display params
		this.offsetX = 0
		this.offsetY = 0
		this.letterSize = 32

		this.Init = function ()
		{
			// Setup data and create boids
			var lineWidth = 0
			for (var idxLine = 0; idxLine < this.lines.length; ++idxLine)
			{
				var word = this.lines[idxLine].split(" ")
				var wordLetters = word.join(" ")
				lineWidth = 0
				for (var idxLetter = 0; idxLetter < wordLetters.length; ++idxLetter)
				{
					if (wordLetters[idxLetter] != '︎' )
					{
						// Boid Creation
						var letter = new Letter(wordLetters[idxLetter], style)
						letter.x = this.x
						letter.y = this.y

						// Letter logic
						letter.indexLine = idxLine
						letter.indexLetter = idxLetter
						letter.isFromMessage = true

						letter.targetScale = 0.1
						letter.avoidScale = 0.01
						letter.SetSize( 16+Math.random()*(Settings.MAX_SIZE - Settings.MIN_SIZE))

						if (wordLetters[idxLetter] == " ") {
							letter.SetBubbleVisible(false)
						}

						// Add to update stack and display
						Manager.AddBoid(letter)

						// Store own letters
						this.boidList.push(letter)

						lineWidth += letter.size
					}
				}
				this.lineWidthList.push(lineWidth)
				this.lineWidthMax = Math.max(this.lineWidthMax, lineWidth)
			}

			// Setup position
			lineWidth = 0
			var currentLine = -1
			for (var l = 0; l < this.boidList.length; ++l)
			{
				var boid = this.boidList[l]
				// var center = Math.ceil(this.lineWidthMax / 2) * boid.size
				// var offset = (this.lineWidthMax - wordLetters.length) / 2 * boid.size

				// Reset incrementation if letter is at the begining of line
				if (boid.indexLetter == 0) {
					lineWidth = 0
					++currentLine
				}

				// Setup message grid position
				boid.gridX = lineWidth - this.lineWidthList[currentLine] / 2 + this.letterSize / 2
				boid.gridY = boid.indexLine * this.letterSize - this.letterSize * this.lines.length / 2

				// Increment
				lineWidth += boid.size
			}
		}

		this.Update = function ()
		{
			this.UpdateTargets()
		}

		this.UpdateTargets = function ()
		{
			// Orbit around phylactere root boid
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				boid.target.x = boid.gridX + this.GetX()
				boid.target.y = boid.gridY + this.GetY()
			}
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
