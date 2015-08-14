
var Model = {}

Model.Curious = function (count)
{
	count = typeof count !== "undefined" ? count : 1
	for (var i = 0; i < count; ++i)
	{
		var letter = new Letter("?")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		letter.avoidScale = 0.005
		stage.addChild(letter)
		boidList.push(letter)
	}
}

Model.Nervous = function (count)
{
	count = typeof count !== "undefined" ? count : 1
	for (var i = 0; i < count; ++i)
	{
		var letter = new Letter("!")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		letter.avoidScale = 0.1
		letter.targetScale = 0.01
		stage.addChild(letter)
		boidList.push(letter)
	}
}

Model.Septic = function (count)
{
	count = typeof count !== "undefined" ? count : 1
	for (var i = 0; i < count; ++i)
	{
		var letter = new Letter("...")
		letter.position.set(Math.random() * renderer.width, Math.random() * renderer.height)
		letter.avoidScale = 0.01
		letter.targetScale = 0.005
		letter.friction = 0.9
		stage.addChild(letter)
		boidList.push(letter)
	}
}