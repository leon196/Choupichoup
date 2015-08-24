
define(['lib/pixi', 'gui/phylactere', 'manager', 'settings', 'gui/letter'], function(PIXI, Phylactere, Manager, Settings, Letter){
   var Player = function ()
   {
     PIXI.Container.call(this)

     this.bubbleList = []
     this.css = { min:Settings.MIN_SIZE, max:Settings.MAX_SIZE, font: 'Shadows Into Light', fill: '#ffffff', align: 'left' }
     this.phylactere = new Phylactere("Player", this.css, 8)
     this.phylactere.x = Manager.mouse.x
     this.phylactere.y = Manager.mouse.y
     this.phylactere.isPlayer = true
     this.phylactere.Init()

    this.Absorb = function (collider, boid)
    {
        collider.text.text = boid.text.text
        collider.text.style.fill = '#ffffff'
        collider.size = Settings.SPAWN_SIZE
        Manager.drawer.redraw(Manager.boidList.indexOf(collider))
    }

    this.update = function ()
    {
      this.phylactere.x = Manager.mouse.x
      this.phylactere.y = Manager.mouse.y
      this.phylactere.Update()
    }
  }

  Player.prototype = Object.create(PIXI.Container.prototype)
  Player.prototype.constructor = Player

  return Player
})
