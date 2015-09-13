
define([], function ()
{
	var Tool = {}

  Tool.PI = Tool.PI2 = Math.PI
	Tool.PI2 = Math.PI * 2

	Tool.vec2 = function(xx,yy) { return {x:xx, y:yy} }

	Tool.mix = function(a, b, ratio) { return a * (1 - ratio) + b * ratio }
	Tool.clamp = function(v, min, max) { return Math.max(min, Math.min(v, max)) }
	Tool.length = function(x, y) { return Math.sqrt(x*x+y*y) }
	Tool.distance = function(x1, y1, x2, y2) { return Tool.length(x2 - x1, y2 - y1) }
	Tool.normalize = function (px, py) { var dist = Tool.length(px, py); return { x: px / dist, y: py / dist }; }

	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };})();

	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
	Tool.shuffle = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
	}

	return Tool
})
