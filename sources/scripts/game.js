
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x1099bb})
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
var drawer = new Drawer()
var mouse = new Point()
var message

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

	new Button("Debug", function ()
	{
		drawer.debug = !drawer.debug 
	})

	new Button("Bull", function ()
	{
		drawer.showBull = !drawer.showBull 
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
	for (var i = 0; i < 5; ++i)
	{
		var letter = new Letter("?")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		letter.avoidScale = 0.01
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

		drawer.Bull(boid.x, boid.y, boid.size * 0.75)

		var near = new Point()
		var global = new Point()
		var avoid = new Point()
		var target = new Point(renderer.width / 2 - boid.x, renderer.height / 2 - boid.y)
		var grid = new Point()

		if (boid instanceof Letter && boid.isFromMessage)
		{
			grid.x = message.GetX() + boid.gridX - boid.x
			grid.y = message.GetY() + boid.gridY - boid.y

			grid.x *= DEFAULT_GRID_SCALE
			grid.y *= DEFAULT_GRID_SCALE

			target = new Point(mouse.x - boid.x, mouse.y - boid.y)
		}

		for (var other = 0; other < boidCount; ++other)
		{
			if (current != other && (other instanceof Message) == false )
			{
				var boidOther = message.letters[other]
				var dist = distanceBetween(boid, boidOther)
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
				// if (shouldFollow)
				// {
					global.x += boidOther.x
					global.y += boidOther.y
				// }
			
				near.x += boidOther.velocity.x
				near.y += boidOther.velocity.y
			}
		}

		global.x = global.x / boidCount - boid.x
		global.y = global.y / boidCount - boid.y

		avoid.scale(boid.avoidScale)
		global.scale(boid.globalScale)
		near.scale(boid.nearScale)
		target.scale(boid.targetScale)

		if (drawer.debug)
		{
			drawer.Line(boid, grid, 0xff0000)
			drawer.Line(boid, target, 0x00ff00)
			drawer.Line(boid, avoid, 0x0000ff)
			drawer.Line(boid, near, 0x00ffff)
			drawer.Line(boid, global, 0xffffff)
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
				boid.velocity.x *= -boid.frictionCollision
				boid.Rumble()
			}
			if (boid.y < 0 || boid.y > renderer.height)
			{
				boid.velocity.y *= -boid.frictionCollision
				boid.Rumble()
			}
			boid.x = clamp(boid.x, 0, renderer.width)
			boid.y = clamp(boid.y, 0, renderer.height)
		}
	}
	drawer.EndFill()
}