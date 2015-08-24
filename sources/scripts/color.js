
define([], function()
{
  var Color = {}

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

Color.ShadeSharpColor = function (color, percent)
{
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

  return Color
})
