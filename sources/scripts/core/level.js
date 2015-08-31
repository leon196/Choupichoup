
define(['../core/manager', '../core/renderer', '../element/Thinker', '../settings'],
function(Manager, renderer, Thinker, Settings)
{
  var Level = {}

  Level.data = {}
  Level.currentLevel = 0

  Level.SpawnLevel = function ()
  {
    Manager.player.SetSize(Level.GetPlayerSize() * Settings.MAX_SIZE)

		var characterList = Level.GetCharacterList()
		for (var i = 0; i < characterList.length; ++i) {
			var character = characterList[i]
			var thinker = Manager.AddThinker(new Thinker(),
			character.x * renderer.width, character.y * renderer.height,
			character.size * Settings.MAX_SIZE, character.color)

      for (var b = 0; b < character.bubbles.length; ++b) {
        var size = character.bubbles[b]
        thinker.SpawnBubble(size * Settings.MAX_SIZE)
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

  Level.GetPlayerSize = function ()
  {
    return Level.GetCurrent()["playerSize"]
  }

  return Level
})
