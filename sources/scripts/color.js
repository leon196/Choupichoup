
define(['utils/tool'], function(Tool)
{
  var Color = {}

  Color.Player = "0xFF3434"

  Color.Background = 0xf8ca7c

  Color.colorListHext = ['0x00B1B1', '0xFF3434', '0x2FE42F', '0xFFD834']

  Color.grayListHex = [0x000000, 0x111111, 0x222222, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999, 0xAAAAAA, 0xBBBBBB, 0xCCCCCC, 0xDDDDDD, 0xEEEEEE, 0xFFFFFF]
  Color.grayListSharp = ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888', '#999999', '#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#FFFFFF']

  Color.GetGrayHex = function (ratio)
  {
    return Color.grayListHex[Tool.clamp(Math.floor(Color.grayListHex.length*ratio), 0, Color.grayListHex.length - 1)]
  }

  Color.GetGraySharp = function (ratio)
  {
    return Color.grayListSharp[Tool.clamp(Math.floor(Color.grayListSharp.length*ratio), 0, Color.grayListSharp.length - 1)]
  }

  Color.GetRandomColor = function ()
  {
    return Color.colorListHext[Tool.clamp(Math.floor(Color.colorListHext.length*Math.random()), 0, Color.colorListHext.length - 1)]
  }

  return Color
})
