
function getDefaultIfUndefined(test, fallback)
{
	return typeof test !== "undefined" ? test : fallback
}

function isDefined(test)
{
	return typeof test !== "undefined"
}

function mix(a, b, ratio) { return a * (1 - ratio) + b * ratio }
function clamp(v, min, max) { return Math.max(min, Math.min(v, max)) }
function length(x, y) { return Math.sqrt(x*x+y*y) }

alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z']

randomLetter = function ()
{
    return alphabet[Math.floor(Math.random()*alphabet.length)]
}