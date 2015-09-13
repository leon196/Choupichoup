
define([], function()
{
  var Frame = function ()
  {
    this.SayFramesFor = function(gridWidth, gridHeight, gridSize)
    {
      var frames = ''
      var count = gridWidth * gridHeight
      for (var i = 0; i < count; ++i) {

        var x = (i % gridWidth) * gridSize
        var y = Math.floor(i / gridWidth) * gridSize

        frames += '"' + i + '": {\n\
        	"frame": {"x":' +
          x +
          ',"y":' +
          y +
          ',"w":' + gridSize +
          ',"h":' + gridSize +
          '},\n\
          "rotated": false, "trimmed": false,\n\
        	"spriteSourceSize": {"x":' + x +
          ',"y":' + y +
          ',"w":' + gridSize +
          ',"h":' + gridSize +
          '},\n\
        	"sourceSize": {"w":' + gridSize +
          ',"h":' + gridSize + '}\n\
        },\n'
      }
      console.log(frames)

    }
  }

  return new Frame()
})
