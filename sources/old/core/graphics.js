
define(['../lib/pixi'], function(PIXI)
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

  return Graphics
})