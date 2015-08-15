
var Button = function (text, callback, url)
{
	this.DOM = document.createElement("button")
	this.DOM.innerHTML = text
	this.DOM.onclick = callback
	this.DOM.style.fontSize = '20px'
	this.DOM.style.fontFamiliy = 'sans-serif'
    this.DOM.style.position = 'relative';
    this.DOM.style.padding = '4px';
    this.DOM.style.margin = '4px';

    if (typeof url !== "undefined")
    {
    	var link = document.createElement("a")
		link.href = url;
		link.setAttribute('target', '_blank')
		link.appendChild(this.DOM)
		document.getElementById('container').appendChild(link)
    }
    else
    {
		document.getElementById('container').appendChild(this.DOM)
	}
}