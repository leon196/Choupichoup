
function getDefaultIfUndefined(test, fallback)
{
	return typeof test !== "undefined" ? test : fallback
}

function isDefined(test)
{
	return typeof test !== "undefined"
}

var PI2 = Math.PI * 2

function mix(a, b, ratio) { return a * (1 - ratio) + b * ratio }
function clamp(v, min, max) { return Math.max(min, Math.min(v, max)) }
function length(x, y) { return Math.sqrt(x*x+y*y) }
function distanceTo(p) { return length(p.x, p.y) }
function distanceBetween(p1, p2) { return length(p2.x - p1.x, p2.y - p1.y) }

alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z']

randomLetter = function ()
{
    return alphabet[Math.floor(Math.random()*alphabet.length)]
}
