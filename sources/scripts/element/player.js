
define(['lib/pixi', 'gui/phylactere', 'manager', 'settings', 'gui/letter'], function(PIXI, Phylactere, Manager, Settings, Letter){
   var Player = function ()
   {
     PIXI.Container.call(this)

     this.bubbleList = []
     this.css = { min:8, max:16, font: 'Shadows Into Light', fill: '#ffffff', align: 'left' }
     this.phylactere = new Phylactere("Player", this.css, 8)
     this.phylactere.x = Manager.mouse.x
     this.phylactere.y = Manager.mouse.y
     this.phylactere.Init()

     for (var i = 0; i < this.phylactere.letters.length; ++i)
     {
       var boid = this.phylactere.letters[i]
       boid.isPlayer = true
       Manager.drawer.redraw(Manager.boidList.indexOf(boid))
       this.bubbleList.push(boid)
     }

    for (var i = 0; i < this.phylactere.cloudBoidList.length; ++i)
    {
      var boid = this.phylactere.cloudBoidList[i]
      boid.isPlayer = true
      Manager.drawer.redraw(Manager.boidList.indexOf(boid))
      this.bubbleList.push(boid)
     }

    this.Absorb = function (boid)
    {
      var absorbed = true
      if (this.phylactere.cloudBoidList.length > 0)
      {
        var shell = this.phylactere.cloudBoidList[0]
        shell.text.text = boid.text.text
        shell.text.style.fill = '#ffffff'
        shell.size = boid.size
        Manager.drawer.redraw(Manager.boidList.indexOf(shell))
        this.phylactere.cloudBoidList.splice(0, 1)
        this.phylactere.letters.push(shell)
      }
      return absorbed
    }

		this.DivideBubble = function (collider)
		{
			collider.size = Settings.MIN_SIZE

			var letter = new Letter(" ", this.css)
			letter.position.set(collider.x, collider.y)
      letter.isPlayer = true
			Manager.stage.addChild(letter)
			Manager.boidList.push(letter)
			Manager.drawer.AddBubble(letter)
      this.phylactere.cloudBoidList.push(letter)
      this.bubbleList.push(letter)
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
