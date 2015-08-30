
define(['../core/renderer', '../core/manager',
'../settings', '../base/boid', '../element/letter', '../base/Utils'],
function(renderer, Manager, Settings, Boid, Letter, Utils)
{
	var Message = function(text, style)
	{
		// Message is root boid
		Letter.call(this)

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
		this.letterSize = 32

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
						// boid.BounceAt(Manager.mouse.x, Manager.mouse.y, 10)
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
				boid.bubbleFront.interactive = boid.bubbleFront.buttonMode = true
				boid.bubbleColor.interactive = boid.bubbleColor.buttonMode = true
				boid.textFront.interactive = boid.textFront.buttonMode = true
				boid.bubbleFront.on('mousedown', callback).on('touchstart', callback)
				boid.bubbleColor.on('mousedown', callback).on('touchstart', callback)
				boid.textFront.on('mousedown', callback).on('touchstart', callback)
			}

		}

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
						letter.SetColor(this.color)
						letter.SetSize( 16+Math.random()*4)

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
				boid.gridY = boid.indexLine * this.letterSize / 2 - this.letterSize * this.lines.length / 2

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
	}

	Message.prototype = Object.create(Letter.prototype)
	Message.prototype.constructor = Message

	return Message
})
