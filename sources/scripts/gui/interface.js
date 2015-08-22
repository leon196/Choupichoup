
define(['../lib/pixi','../base/point', '../gui/button'], function(PIXI, Point, Button)
{
	var Interface = function ()
	{
		PIXI.Container.call(this)

		this.buttonList = []
		this.labelFontSize = 24

		this.margin = 4
		this.labelAnchor = new Point(this.margin, this.margin)

		this.addButton = function (text, callback, url)
		{
			var button = new Button(text, callback, url)
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
				this.addChild(text)
			}
		}
	}

	Interface.prototype = Object.create(PIXI.Container.prototype)
	Interface.prototype.constructor = Interface

	return Interface
})