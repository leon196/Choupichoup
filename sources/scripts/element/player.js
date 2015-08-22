
define(['lib/pixi', 'gui/phylactere', 'manager'], function(PIXI, Phylactere, Manager){
   var Player = function ()
   {
     PIXI.Container.call(this)

     this.phylactere = new Phylactere("Player")

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
