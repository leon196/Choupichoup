
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight,
	{
		backgroundColor : 0x1099bb
		, transparent: true
	})
document.body.appendChild(renderer.view)

window.onresize = function(event) {
    renderer.resize(window.innerWidth, window.innerHeight)
};

var stage = new PIXI.Container()
var mouse = new Point()
var drawer, phylactere
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
	interface.addButton("Draw Debug", function () { drawer.debug = !drawer.debug; interface.visible = !interface.visible })
	interface.addButton("Draw Bull", function () { drawer.showBull = !drawer.showBull })
	interface.addButton("Algo Boids", function () {}, "https://en.wikipedia.org/wiki/Boids")
	interface.addButton("Pixi.js", function () {}, "http://www.pixijs.com/")
	interface.addButton("Code Sources", function () {}, "https://github.com/leon196/BubbleLetter")
	interface.addLabels(['grid', 'target', 'avoid','near', 'global']
		,[COLOR_GRID_STR, COLOR_TARGET_STR, COLOR_AVOID_STR, COLOR_NEAR_STR, COLOR_GLOBAL_STR])
	interface.visible = false

	phylactere = new Phylactere("Boids prototype for\nfloating thoughts")

	stage.addChildAt(phylactere, 0)
	stage.addChildAt(interface, 0)
	stage.addChildAt(drawer, 0)

	// Model.Curious(4)
	// Model.Nervous(3)
	// Model.Septic(2)

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

	phylactere.x = mouse.x
	phylactere.y = mouse.y

	phylactere.update()

	var boidCount = boidList.length

	// For all active boids
	for (var current = 0; current < boidCount; ++current)
	{
		var boid = boidList[current]

		// Draw that bull
		drawer.Bull(boid.x, boid.y, boid.size)

		var near = new Point()
		var global = new Point()
		var globalCount = 0
		var avoid = new Point()
		var target = new Point(boid.target.x - boid.x, boid.target.y - boid.y)
		var grid = new Point()

		// Message Letter
		if (boid instanceof Letter)
		{
			target = new Point(phylactere.x - boid.x, phylactere.y - boid.y)

			if (boid.isFromMessage)
			{
				grid.x = phylactere.GetX() + boid.gridX - boid.x
				grid.y = phylactere.GetY() + boid.gridY - boid.y

				grid.x *= DEFAULT_GRID_SCALE
				grid.y *= DEFAULT_GRID_SCALE
			}
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
					++globalCount
				// }
			
				near.x += boidOther.velocity.x
				near.y += boidOther.velocity.y
			}
		}

		global.x = global.x / globalCount - boid.x
		global.y = global.y / globalCount - boid.y

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
			// else
			// {
			// 	for (var c = 0; c < phylactere.letters.length; ++c)
			// 	{
			// 		var collider = phylactere.letters[c]
			// 		if (collider.circleCollision(boid))
			// 		{
			// 			boid.BounceFromCircleCollider(collider)
			// 		}	
			// 	}
			// }
		}

		if (drawer.debug)
		{
			drawer.Arrow(boid, grid.getNormal(), boid.size + 10, 2 + 10 * grid.magnitude()/40, COLOR_GRID_HEX)
			drawer.Arrow(boid, target.getNormal(), boid.size + 10, 2 + 10 * target.magnitude()/40, COLOR_TARGET_HEX)
			drawer.Arrow(boid, avoid.getNormal(), boid.size + 10, 2 + 10 * avoid.magnitude()/40, COLOR_AVOID_HEX)
			drawer.Arrow(boid, near.getNormal(), boid.size + 10, 2 + 10 * near.magnitude()/40, COLOR_NEAR_HEX)
			drawer.Arrow(boid, global.getNormal(), boid.size + 10, 2 + 10 * global.magnitude()/40, COLOR_GLOBAL_HEX)
			// drawer.Arrow(boid, boid.velocity.getNormal(), boid.velocity.magnitude() * 5, 10, COLOR_BOID_HEX)
		}
	}
	drawer.EndFill()
}