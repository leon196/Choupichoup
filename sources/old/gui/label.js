
define([], function()
{
  var Label = function (text)
  {
    this.DOM = document.createElement("div")
    this.DOM.innerHTML = text
    this.DOM.style.display = 'inline';
    this.DOM.style.padding = '4px';
    this.DOM.style.margin = '4px';
    this.DOM.style.backgroundColor = '#ffd181';
    this.DOM.style.textShadow = "1px 1px 0px #ffffff";

    document.body.appendChild(this.DOM)
  }

  return Label
})
