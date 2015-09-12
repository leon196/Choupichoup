
define([], function()
{
	var Button = function (text, callback, url)
	{
		this.DOM = document.createElement("button")
		this.DOM.innerHTML = text
		this.DOM.onclick = callback
		this.DOM.style.position = 'relative';
		this.DOM.style.padding = '4px';
		this.DOM.style.margin = '4px';
		this.DOM.style.cursor = 'pointer';

		if (typeof url !== "undefined")
		{
			var link = document.createElement("a")
			link.href = url;
			link.setAttribute('target', '_blank')
			link.appendChild(this.DOM)
			document.body.appendChild(link)
		}
		else
		{
			document.body.appendChild(this.DOM)
		}
	}

	return Button
})
