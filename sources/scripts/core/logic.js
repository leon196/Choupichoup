
define(['../utils/tool', '../settings'], function(Tool, Settings)
{
  var Logic = function()
  {
    this.balanceOfPower = function (boid, boidOther)
    {
      var dist = Tool.distance(boid.x, boid.y, boidOther.x, boidOther.y)
      // var ratio = boid.size / boidOther.size
      if (boid.getSize() < boidOther.getSize()) {
        if (boid.phylactere) {
          if (boid.colorness > boidOther.colorness) {
            boid.setColorness(boid.colorness - Settings.COLORNESS_SPEED)// / ratio)
          }
          else if (boid.colorness < boidOther.colorness) {
            boid.setColorness(boid.colorness + Settings.COLORNESS_SPEED)// / ratio)
          }
        }
      }
      else if (boid.getSize() > boidOther.getSize()) {
        if (boidOther.phylactere) {
          if (boid.colorness < boidOther.colorness) {
            boidOther.setColorness(boidOther.colorness - Settings.COLORNESS_SPEED)// * ratio)
          }
          else if (boid.colorness > boidOther.colorness) {
            boidOther.setColorness(boidOther.colorness + Settings.COLORNESS_SPEED)// * ratio)
          }
        }
      }
    }
  }

  return new Logic()
})
