
define(['../lib/pixi', '../utils/tool'], function(PIXI, Tool)
{
  var Graphics = {}

  Graphics.Circle = function(size)
  {
    var circle = new PIXI.Graphics()
    circle.beginFill(0xfcfcfc)
    circle.drawCircle(0,0,size)
    circle.resize = function(size)
    {
      this.clear()
      circle.beginFill(0xfcfcfc)
      circle.drawCircle(0,0,size)
    }
    circle.resizeAt = function(x,y,size)
    {
      this.clear()
      circle.beginFill(0xfcfcfc)
      circle.drawCircle(x,y,size)
    }
    return circle
  }

 	Graphics.DrawArrow = function (graphics, origin, dir, length, thinckness, color)
 	{
 		var forward = Tool.vec2(dir.x * length, dir.y * length)
 		var peak = Tool.vec2(dir.x * (length + 10), dir.y * (length + 10))
 		var offset = Tool.vec2(dir.y * thinckness / 4, -dir.x * thinckness / 4)
 		var triangle = Tool.vec2(dir.y * thinckness, -dir.x * thinckness)
		graphics.clear()
		graphics.beginFill(color)
		graphics.moveTo(origin.x - offset.x, origin.y - offset.y)
		graphics.lineTo(origin.x + forward.x - offset.x, origin.y + forward.y - offset.y)
		graphics.lineTo(origin.x + forward.x - triangle.x, origin.y + forward.y - triangle.y)
		graphics.lineTo(origin.x + peak.x, origin.y + peak.y)
		graphics.lineTo(origin.x + forward.x + triangle.x, origin.y + forward.y + triangle.y)
		graphics.lineTo(origin.x + forward.x + offset.x, origin.y + forward.y + offset.y)
		graphics.lineTo(origin.x + offset.x, origin.y + offset.y)
 	}

  return Graphics
})
