define([], function ()
{
	var Utils = {}

 	Utils.getDefaultIfUndefined = function(test, fallback)
	{
		return typeof test !== "undefined" ? test : fallback
	}

	Utils.isDefined = function(test)
	{
		return typeof test !== "undefined"
	}

	Utils.PI2 = Math.PI * 2

	Utils.mix = function(a, b, ratio) { return a * (1 - ratio) + b * ratio }
	Utils.clamp = function(v, min, max) { return Math.max(min, Math.min(v, max)) }
	Utils.length = function(x, y) { return Math.sqrt(x*x+y*y) }
	Utils.distanceTo = function(p) { return Utils.length(p.x, p.y) }
	Utils.distanceBetween = function(p1, p2) { return Utils.length(p2.x - p1.x, p2.y - p1.y) }

	Utils.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z']

	Utils.randomLetter = function ()
	{
	    return Utils.alphabet[Math.floor(Math.random()*Utils.alphabet.length)]
	}

	return Utils
})
