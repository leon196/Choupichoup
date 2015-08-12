
var buttonList = []

var Button = function (text, callback)
{
	var buttonDOM = document.createElement("button");
	buttonDOM.innerHTML = text;
	buttonDOM.setAttribute('class', 'button')
	buttonDOM.onclick = callback
	document.getElementById('container').appendChild(buttonDOM);

	buttonDOM.style.top = (10 + buttonList.length * 30) + 'px'
	buttonList.push(buttonDOM)
}