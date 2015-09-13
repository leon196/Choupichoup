
define(['../lib/howler', '../settings', '../core/global', '../control/keyboard'],
function(Howler, Settings, Global, Keyboard)
{
  var Sound = function ()
  {
    this.music = new Howl({
      urls: ['sounds/Jassummisko - Temping.mp3'],
      autoplay: true,
      loop: true,
      volume: Settings.defaultVolumeMusic,
      onend: function() {}
    });

    this.yeah = new Howl({
      urls: ['sounds/Yea\'s.wav'],
      autoplay: false,
      loop: false,
      volume: Settings.defaultVolumeSound,
      onend: function() {}
    });

    this.update = function ()
    {
      if (Keyboard.M.down)
      {
        Keyboard.M.down = false

        Global.mute = !Global.mute

        if (Global.mute) {
          this.music.mute()
        }
        else {
          this.music.unmute()
        }
      }
    }
  }

  return new Sound()
})
