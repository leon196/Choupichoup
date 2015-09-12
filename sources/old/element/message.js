
define(['../core/renderer', '../core/manager',
'../settings', '../base/boid', '../element/letter', '../base/utils'],
function(renderer, Manager, Settings, Boid, Letter, Utils)
{
	var Message = function(text, size, color)
	{
		// Message is root boid
		Boid.call(this)

		this.size = 30
		this.color = "0xfcfcfc"
		if (typeof size !== "undefined") { this.size = size }
		if (typeof color !== "undefined") { this.color = color }

		this.isButton = false

		// The list of letter boids that make the message
		this.boidList = []

		// Data strings
		this.lines = text.split("\n")
		this.lineWidthList = []
		this.lineWidthMax = 0

		// Display params
		this.offsetX = 0
		this.offsetY = 0

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
						var letter = new Letter(wordLetters[idxLetter])
						letter.x = this.x
						letter.y = this.y

						// Letter logic
						letter.indexLine = idxLine
						letter.indexLetter = idxLetter

						letter.targetScale = 0.1
						letter.avoidScale = 0.01
						letter.SetColor(this.color)
						letter.SetSize(this.size)

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
				boid.gridX = lineWidth - this.lineWidthList[currentLine] / 2 + this.size / 2
				boid.gridY = boid.indexLine * this.size / 2 - this.size * this.lines.length / 2

				// Increment
				lineWidth += boid.size
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

		this.Update = function ()
		{
			this.UpdateTargets()
		}

		this.UpdateTargets = function ()
		{
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				boid.target.x = boid.gridX + this.x
				boid.target.y = boid.gridY + this.y
				if (this.isButton == false) {
					if (Utils.distanceBetween(boid, Manager.mouse) < 60) {
						boid.target.x += (boid.x - Manager.mouse.x) * 2
						boid.target.y += (boid.y - Manager.mouse.y) * 2
					}
				}
				else {
					if (Utils.distanceBetween(boid, Manager.mouse) < 60) {
						boid.SetColorness(boid.colorness + Settings.COLORNESS_SPEED)
					}
					else {
						boid.SetColorness(boid.colorness - Settings.COLORNESS_SPEED)
					}
				}
			}
		}

		this.SetButton = function (callback)
		{
			this.isButton = true
			for (var i = 0; i < this.boidList.length; ++i)
			{
				var boid = this.boidList[i]
				boid.bubbleColor.interactive = boid.bubbleColor.buttonMode = true
				boid.textColor.interactive = boid.textColor.buttonMode = true
				boid.bubbleColor.on('mousedown', callback).on('touchstart', callback)
				boid.textColor.on('mousedown', callback).on('touchstart', callback)
			}
		}
	}

	Message.prototype = Object.create(Boid.prototype)
	Message.prototype.constructor = Message

	return Message
})
