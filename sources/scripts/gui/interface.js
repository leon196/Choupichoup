
define(['../lib/pixi', '../base/point', '../core/renderer',
 '../gui/button', '../gui/label'], function(PIXI, Point, renderer, Button, Label)
{
	var Interface = function ()
	{
		PIXI.Container.call(this)

		this.background = new PIXI.Sprite(PIXI.Texture.fromImage('images/heads.png'))
		this.background.anchor.x = 0.5
		this.background.anchor.y = 0.5
		this.background.x = renderer.width / 2
		this.background.y = renderer.height / 2
		this.bgAspectRatio = this.background.width / this.background.height
		if (renderer.width > renderer.height)
		{
			this.background.width = renderer.width
			this.background.height = this.background.width / this.bgAspectRatio
			if (this.background.height < renderer.height)
			{
				this.background.height = renderer.height
				this.background.width = this.background.height * this.bgAspectRatio
			}
		}
		else {
			this.background.height = renderer.height
			this.background.width = this.background.height * this.bgAspectRatio
		}
		this.background.alpha = 0.5
		this.addChild(this.background)

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

		this.addLabel = function (text)
		{
			var label = new Label(text)
			this.buttonList.push(label)
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
