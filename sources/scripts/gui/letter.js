
var Letter = function (character, style)
{
	Boid.call(this)

	// The actual string
	this.character = getDefaultIfUndefined(character, randomLetter())
	this.size = 20+Math.random()*20

	// Font stuff
	var css = getDefaultIfUndefined(style, { font: this.size+'px Snippet', fill: '020202', align: 'left' })

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

	this.BounceFromCircleCollider = function (collider)
	{
		var angle = Math.atan2(this.y - collider.y, this.x - collider.x)
		this.x = collider.x + Math.cos(angle) * (collider.radius + this.size)
		this.y = collider.y + Math.sin(angle) * (collider.radius + this.size)
		this.velocity.x = Math.cos(angle) * this.velocity.magnitude()
		this.velocity.y = Math.sin(angle) * this.velocity.magnitude()
	}

	this.Rumble = function ()
	{
		var randomAngle = Math.random() * Math.PI * 2
		this.velocity.x += Math.cos(randomAngle)
		this.velocity.y += Math.sin(randomAngle)
	}
}

Letter.prototype = Object.create(Boid.prototype)
Letter.prototype.constructor = Letter