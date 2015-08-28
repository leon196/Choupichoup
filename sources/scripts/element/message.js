
define(['../core/renderer', '../core/manager',
'../base/boid', '../element/letter'],
function(renderer, Manager, Boid, Letter)
{
	var Message = function(text, style)
	{
		// Message is root boid
		Boid.call(this)

		// The list of letter boids that make the message
		this.boidList = []

		// Data strings
		this.lines = text.split("\n")

		// Display params
		this.offsetX = 0
		this.offsetY = 0
		this.lineHeight = 40

		this.Init = function ()
		{
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
						letter.avoidScale = 0
						letter.SetSize(16)

						// Add to update stack and display
						Manager.AddBoid(letter)

						// Store own letters
						this.boidList.push(letter)

						lineWidth += letter.size
					}
				}
				this.lineWidthMax = Math.max(this.lineWidthMax, lineWidth)
			}

			// Setup position
			lineWidth = 0
			for (var l = 0; l < this.boidList.length; ++l)
			{
				var boid = this.boidList[l]
				// var center = Math.ceil(this.lineWidthMax / 2) * boid.size
				// var offset = (this.lineWidthMax - wordLetters.length) / 2 * boid.size

				// Reset incrementation if letter is at the begining of line
				lineWidth = boid.indexLetter == 0 ? 0 : lineWidth

				// Setup message grid position
				boid.gridX = lineWidth - this.lineWidthMax / 2
				boid.gridY = boid.indexLine * this.lineHeight - this.lineHeight * this.lines.length / 2

				// Increment
				lineWidth += boid.size * 2
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
