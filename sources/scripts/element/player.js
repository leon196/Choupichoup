
define(['lib/pixi', 'gui/phylactere', 'manager'], function(PIXI, Phylactere, Manager){
   var Player = function ()
   {
     PIXI.Container.call(this)

     this.phylactere = new Phylactere("Player", { min:8, max:16, font: 'Shadows Into Light', fill: '#ffffff', align: 'left' })

     for (var i = 0; i < this.phylactere.letters.length; ++i)
     {
       var boid = this.phylactere.letters[i]
       boid.isPlayer = true
     }

    for (var i = 0; i < this.phylactere.tailBoidList.length; ++i)
    {
      var boid = this.phylactere.tailBoidList[i]
      boid.isPlayer = true
    }

    for (var i = 0; i < this.phylactere.cloudBoidList.length; ++i)
    {
      var boid = this.phylactere.cloudBoidList[i]
      boid.isPlayer = true
    }

     this.update = function ()
     {
       this.phylactere.x = Manager.mouse.x
       this.phylactere.y = Manager.mouse.y
       this.phylactere.update()
     }
   }

   Player.prototype = Object.create(PIXI.Container.prototype)
 	 Player.prototype.constructor = Player

    return Player
})
