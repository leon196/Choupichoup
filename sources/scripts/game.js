
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x1099bb})
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
var drawer = new Drawer()
var mouse = new Point()
var message
var isDrawDebug = false

stage.interactive = true;
stage.on('mousemove', onMove)
     .on('touchstart', onMove)
     .on('touchmove', onMove)

var timeElapsed = 0
var timeStarted = 0

function fontLoaded()
{
	init()
}

function init()
{

	new Button("Toggle Debug Draw", function ()
	{
		isDrawDebug = !isDrawDebug 
	})

	// Setup message
	message = new Message(
		"Hello\nCoucou",
	{ 
		fontSizeMin: this.fontMin,
		fontSizeMax: this.fontMax,
		font: 'Shadows Into Light', 
		color: '020202', 
		align: 'left' 
	})

	stage.addChildAt(message, 0)
	stage.addChildAt(drawer, 0)

	// Setup (?) boids
	for (var i = 0; i < 16; ++i)
	{
		var letter = new Letter("?")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		stage.addChild(letter)
		message.letters.push(letter)
	}

	timeStarted = new Date()
	animate()
}

function animate() 
{
    requestAnimationFrame(animate)
    renderer.render(stage)
    update()
}

function onMove(event)
{
	mouse = event.data.global
}

function update()
{
	timeElapsed = new Date() - timeStarted / 1000;

	drawer.Clear()

	message.x = mouse.x
	message.y = mouse.y

	var boidCount = message.letters.length

	for (var current = 0; current < boidCount; ++current)
	{
		var boid = message.letters[current]

		drawer.Boid(boid)

		var near = new Point()
		var global = new Point()
		var avoid = new Point()
		var target = new Point(renderer.width / 2 - boid.x, renderer.height / 2 - boid.y)
		var grid = new Point()

		var midPoint = new Point()
		var midBullSize = 0

		for (var other = 0; other < boidCount; ++other)
		{
			if (current != other && (other instanceof Message) == false )
			{
				var boidOther = message.letters[other]
				var dist = boid.distanceTo(boidOther)
				var shouldAvoid = dist < (boid.size + boidOther.size) * 0.5
				var shouldFollow = dist < 100
				// shouldAvoid = shouldAvoid && 
				// ((typeof boid.letter === "undefined")
				// || (typeof boid.letter !== "undefined" && typeof boidOther.letter !== "undefined"))
				if (shouldAvoid)
				{
					avoid.x += boid.x - boidOther.x
					avoid.y	+= boid.y - boidOther.y
				}
				if (shouldFollow)
				{
					global.x += boidOther.x
					global.y += boidOther.y
				}
			
				near.x += boidOther.velocity.x
				near.y += boidOther.velocity.y
			}
		}

		global.x = global.x / boidCount - boid.x
		global.y = global.y / boidCount - boid.y

		target.x *= 0.0001
		target.y *= 0.0001
		avoid.x *= 0.001
		avoid.y *= 0.001
		global.x *= 0.0001
		global.y *= 0.0001
		near.x *= 0.00001
		near.y *= 0.00001

		if (boid instanceof Letter && boid.isFromMessage)
		{
			grid.x = message.GetX() + boid.gridX - boid.x
			grid.y = message.GetY() + boid.gridY - boid.y

			grid.x *= 0.005
			grid.y *= 0.005

			target = new Point(mouse.x - boid.x, mouse.y - boid.y)
			target.x *= 0.001
			target.y *= 0.001

			global.x = 0
			global.y = 0
			near.x = 0
			near.y = 0
		}

		if (isDrawDebug)
		{
			boid.debug(grid, 0xff0000)
			boid.debug(target, 0x00ff00)
			boid.debug(avoid, 0x0000ff)
			boid.debug(near, 0x00ffff)
			boid.debug(global, 0xffffff)
		}

		// Apply to Boid
		boid.update(
			target.x + near.x + global.x + avoid.x + grid.x,
			target.y + near.y + global.y + avoid.y + grid.y)

		// Collision
		if (boid instanceof Letter && boid.isFromMessage)
		{
			if (boid.x < 0 || boid.x > renderer.width)
			{
				boid.velocity.x *= -1
			}
			if (boid.y < 0 || boid.y > renderer.height)
			{
				boid.velocity.y *= -1
			}
			boid.x = clamp(boid.x, 0, renderer.width)
			boid.y = clamp(boid.y, 0, renderer.height)
		}
	}

	drawer.EndFill()
}