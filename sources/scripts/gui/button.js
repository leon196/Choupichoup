
var Button = function (text, callback)
{
	var buttonDOM = document.createElement("button");
	buttonDOM.innerHTML = text;
	buttonDOM.setAttribute('class', 'button')
	buttonDOM.onclick = callback
	document.getElementById('container').appendChild(buttonDOM);
}