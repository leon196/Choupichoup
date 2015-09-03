
define(['../core/manager', '../core/renderer', '../element/Thinker', '../settings'],
function(Manager, renderer, Thinker, Settings)
{
  var Level = {}

  Level.data = {}
  Level.currentLevel = 0

  Level.SpawnLevel = function ()
  {
    Manager.player.SetRange(Level.GetPlayerRange())

		var characterList = Level.GetCharacterList()
		for (var i = 0; i < characterList.length; ++i) {
			var character = characterList[i]
			var thinker = Manager.AddThinker(new Thinker(),
			character.x * renderer.width, character.y * renderer.height,
      character.range, character.color, character.hearthColor)

      for (var b = 0; b < character.bubbles.length; ++b) {
        var range = character.bubbles[b]
        thinker.SpawnBubble(range)
      }
		}
  }

  Level.HasMore = function ()
  {
    return Level.currentLevel < Level.GetLevels().length - 1
  }

  Level.GetLevels = function ()
  {
    return Level.data["levelList"]
  }

  Level.GetCurrent = function ()
  {
    return Level.GetLevels()[Level.currentLevel]
  }

  Level.GetCharacterList = function ()
  {
    return Level.GetCurrent()["characterList"]
  }

  Level.GetPlayerRange = function ()
  {
    if (Level.GetCurrent().hasOwnProperty("playerRange")) {
      return Level.GetCurrent()["playerRange"]
    } else {
      return Level.data["playerRange"]
    }
  }

  return Level
})
