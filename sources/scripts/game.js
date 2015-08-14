
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x1099bb})
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
var mouse = new Point()

var drawer, message, collider
var boidList = []

stage.interactive = true;
stage.on('mousemove', onMove)
     .on('touchstart', onMove)
     .on('touchmove', onMove)

var timeElapsed = 0
var timeStarted = 0

var imageReady = false
var fontReady = false

PIXI.loader
.add('images/background.jpg')
.once('complete', imageLoaded)
.load();

function imageLoaded()
{
	imageReady = true
	if (fontReady)
	{
		init()
	}
}

function fontLoaded()
{
	fontReady = true
	if (imageReady)
	{
		init()
	}
}

function init()
{
	drawer = new Drawer()
	interface = new Interface()
	interface.addButton("Debug", function () { drawer.debug = !drawer.debug })
	interface.addButton("Bull", function () { drawer.showBull = !drawer.showBull })
	interface.addButton("Interface", function () { interface.visible = !interface.visible })
	interface.addLabels(['message', 'target', 'avoid','velocity']
		,[COLOR_GRID_STR, COLOR_TARGET_STR, COLOR_AVOID_STR, COLOR_BOID_STR])

	// Setup message
	message = new Message(
		"Letters",
	{ 
		fontSizeMin: this.fontMin,
		fontSizeMax: this.fontMax,
		font: 'Shadows Into Light', 
		color: '020202', 
		align: 'left' 
	})


	stage.addChildAt(message, 0)
	stage.addChildAt(interface, 0)
	stage.addChildAt(drawer, 0)

	collider = new Collider()
	collider.x = renderer.width / 2
	collider.y = renderer.height / 2

	Model.Curious(4)
	Model.Nervous(3)
	Model.Septic(2)

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

	drawer.Bull(collider.x, collider.y, collider.radius)

	var boidCount = boidList.length

	for (var current = 0; current < boidCount; ++current)
	{
		var boid = boidList[current]

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

			drawer.Bull(boid.x, boid.y, boid.size)
		}

		for (var other = 0; other < boidCount; ++other)
		{
			if (current != other && (other instanceof Message) == false )
			{
				var boidOther = boidList[other]
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

		// Apply to Boid
		boid.update(
			target.x + near.x + global.x + avoid.x + grid.x,
			target.y + near.y + global.y + avoid.y + grid.y)


		// Collision
		if (boid instanceof Letter)
		{
			// Obstacles
			if (collider.circleTest(boid.x, boid.y, boid.size))
			{
				boid.BounceFromCircleCollider(collider)
			}
			// Window borders Collision
			if (boid.isFromMessage)
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

		if (drawer.debug)
		{
			drawer.Arrow(boid, grid.getNormal(), grid.magnitude() * 100, 10, COLOR_GRID_HEX)
			drawer.Arrow(boid, target.getNormal(), target.magnitude() * 100, 10, COLOR_TARGET_HEX)
			drawer.Arrow(boid, avoid.getNormal(), avoid.magnitude() * 100, 10, COLOR_AVOID_HEX)
			drawer.Arrow(boid, near.getNormal(), near.magnitude() * 100, 10, COLOR_NEAR_HEX)
			drawer.Arrow(boid, global.getNormal(), global.magnitude() * 100, 10, COLOR_GLOBAL_HEX)
			drawer.Arrow(boid, boid.velocity.getNormal(), boid.velocity.magnitude() * 10, 10, COLOR_BOID_HEX)
		}
	}
	drawer.EndFill()
}