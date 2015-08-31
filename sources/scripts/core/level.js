
define([],
function()
{
  var Level = {}

  Level.data = {}
  Level.currentLevel = 0

  Level.GetCurrent = function ()
  {
    return Level.data[Level.currentLevel]
  }

  Level.GetCharacterList = function ()
  {
    return Level.data[Level.currentLevel]["characterList"]
  }

  return Level
})
