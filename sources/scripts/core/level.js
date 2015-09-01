
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
      character.range, character.color)

      for (var b = 0; b < character.bubbles.length; ++b) {
        var range = character.bubbles[b]
        thinker.SpawnBubble(range)
      }
		}
  }

  Level.GetCurrent = function ()
  {
    return Level.data[Level.currentLevel]
  }

  Level.GetCharacterList = function ()
  {
    return Level.GetCurrent()["characterList"]
  }

  Level.GetPlayerRange = function ()
  {
    return Level.GetCurrent()["playerRange"]
  }

  return Level
})
