
define(['../base/utils'], function(Utils)
{
  var Color = {}

  Color.Devil = "0xFF3434"
  Color.Player = "0xfcfcfc"
  Color.Unknown = "0x3c3c3c"

  Color.GRID_HEX = 0xFF3434
  Color.GRID_STR = '#FF3434'
  Color.TARGET_HEX = 0xFFD834
  Color.TARGET_STR = '#FFD834'
  Color.AVOID_HEX = 0x5B40D5
  Color.AVOID_STR = '#5B40D5'
  Color.NEAR_HEX = 0x2FE42F
  Color.NEAR_STR = '#2FE42F'
  Color.GLOBAL_HEX = 0xDE2DA8
  Color.GLOBAL_STR = '#DE2DA8'
  Color.BOID_HEX = 0x3E3175
  Color.BOID_STR = '#3E3175'

  Color.grayListHex = [0x000000, 0x111111, 0x222222, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999, 0xAAAAAA, 0xBBBBBB, 0xCCCCCC, 0xDDDDDD, 0xEEEEEE, 0xFFFFFF]
  Color.grayListSharp = ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888', '#999999', '#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#FFFFFF']

  Color.GetGrayHex = function (ratio)
  {
    return Color.grayListHex[Utils.clamp(Math.floor(Color.grayListHex.length*ratio), 0, Color.grayListHex.length - 1)]
  }

  Color.GetGraySharp = function (ratio)
  {
    return Color.grayListSharp[Utils.clamp(Math.floor(Color.grayListSharp.length*ratio), 0, Color.grayListSharp.length - 1)]
  }

  // By Pimp Trizkit
  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  Color.ShadeHexColor = function (color, percent)
  {
    var num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  }

  Color.ShadeColor2 = function(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  Color.BlendColors = function(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return (0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1))//.toString(16).slice(1);
  }

  Color.ShadeSharpColor = function (color, percent)
  {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  }

  return Color
})
