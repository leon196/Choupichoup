
define(['../lib/pixi', '../core/global', '../core/render', '../utils/tool', '../color',
 '../gui/button', '../gui/label'], function(PIXI, Global, Render, Tool, Color, Button, Label)
{
	var Interface = function ()
	{
		PIXI.Container.call(this)

    this.background = new PIXI.Sprite(PIXI.Texture.fromImage('images/background.jpg'))
    this.background.width = Global.width
    this.background.height = Global.height

		this.buttonList = []
		this.labelFontSize = 24

		this.margin = 4
		this.labelAnchor = Tool.vec2(this.margin, this.margin)

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

	return new Interface()
})
