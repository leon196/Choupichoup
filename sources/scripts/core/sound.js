
define(['../lib/pixi', '../lib/howler', '../settings', '../core/global', '../control/keyboard'],
function(PIXI, HowlerLib, Settings, Global, Keyboard)
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

    this.victory = new Howl({
      urls: ['sounds/Yea\'s.wav'],
      autoplay: false,
      loop: true,
      volume: Settings.defaultVolumeSound,
      onend: function() {}
    });

    this.init = function ()
    {
      this.buttonMute = new PIXI.Sprite(PIXI.Texture.fromFrame(Settings.symbolIndexNote))
      this.buttonMute.interactive = true
      this.buttonMute.buttonMode = true
      this.buttonMute.scale.x = this.buttonMute.scale.y = 0.5
      var self = this
      this.buttonMute.on('mousedown', function(){self.toggleMute()}).on('touchstart', function(){self.toggleMute()})
    }

    this.update = function ()
    {
      if (Keyboard.M.down)
      {
        Keyboard.M.down = false
        this.toggleMute()
      }
    }

    this.toggleMute = function ()
    {
      Global.mute = !Global.mute
      if (Global.mute) {
        Howler.mute()
        this.buttonMute.alpha = 0.5
      }
      else {
        Howler.unmute()
        this.buttonMute.alpha = 1
      }
    }

  }

  return new Sound()
})
