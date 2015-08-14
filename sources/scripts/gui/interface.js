
var Interface = function ()
{
	PIXI.Container.call(this)

	this.buttonList = []
	this.labelFontSize = 24

	this.margin = 4
	this.labelAnchor = new Point(this.margin, this.margin)

	this.addButton = function (text, callback)
	{
		var button = new Button(text, callback)
		this.buttonList.push(button)
		this.labelAnchor.y = button.DOM.offsetHeight + this.margin * 2
	}

	this.addLabels = function (texts, colors)
	{
		for (var i = 0; i < colors.length; ++i)
		{
			var text = new PIXI.Text(texts[i], 
				{ 
					font: this.labelFontSize+'px Snippet', 
					fill: colors[i], 
					align: 'left' 
				})
			text.x = this.labelAnchor.x
			text.y = this.labelAnchor.y + (this.labelFontSize + this.margin) * i
			text.visible = false
			this.addChild(text)
		}
	}
}

Interface.prototype = Object.create(PIXI.Container.prototype)
Interface.prototype.constructor = Interface