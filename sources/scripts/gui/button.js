
var Button = function (text, callback)
{
	this.DOM = document.createElement("button")
	this.DOM.innerHTML = text
	this.DOM.onclick = callback
	this.DOM.style.fontSize = '20px'
	this.DOM.style.fontFamiliy = 'sans-serif'
    this.DOM.style.position = 'relative';
    this.DOM.style.padding = '4px';
    this.DOM.style.margin = '4px';
	document.getElementById('container').appendChild(this.DOM)
}