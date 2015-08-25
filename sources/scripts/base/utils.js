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
	Utils.Distance = function(x1, y1, x2, y2) { return Utils.length(x2 - x1, y2 - y1) }

	Utils.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z']

	Utils.randomLetter = function ()
	{
	    return Utils.alphabet[Math.floor(Math.random()*Utils.alphabet.length)]
	}

	Utils.Normalize = function (v) { var dist = Utils.length(v.x, v.y); return { x: v.x / dist, y: v.y / dist }; }

	///// From -> http://www.actionscript.org/forums/showthread.php3?t=176052
	// By abeall

	// dot product of two vectors
	Utils.dot = function (v1,v2) { return (v1.x*v2.x) + (v1.y*v2.y); } ;

	// reflect vector 'v' against normalized vector 'n'
	Utils.Reflect = function (v, n) {
		// R = V - 2 * (V · N)
		var d = Utils.dot(v,n);
		return { x: v.x -2 * d * n.x, y: v.y -2 * d * n.y }
	};

	/////

	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

	return Utils
})
