define(['lib/pixi', 'base/manager', 'base/renderer', 'base/utils', 'settings'], function(PIXI, Manager, renderer, Utils, Settings)
{
  var Collider = function ()
  {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('images/ncs-1.png'))

    this.anchor.x = 0.5
    this.anchor.y = 0.5
    this.x = renderer.width / 2
    this.y = renderer.height / 2

    this.left = this.x - this.width / 2
    this.right = this.x + this.width / 2
    this.top = this.y - this.height / 2
    this.bottom = this.y + this.height / 2

    Manager.layerCollider.addChild(this)

    this.pointIsNearCorner = function (point, treshold)
    {
			var dist = Utils.Distance(point.x, point.y, this.left, this.top)
			dist = Math.min(dist, Utils.Distance(point.x, point.y, this.left, this.bottom))
			dist = Math.min(dist, Utils.Distance(point.x, point.y, this.right, this.top))
			dist = Math.min(dist, Utils.Distance(point.x, point.y, this.right, this.bottom))
			return dist <= treshold
		}

    this.collideWith = function (boid)
    {
      if (this.getBounds().contains(boid.x, boid.y))
      {
        var direction = boid.velocity.getNormal()
				// Corner issue
				if (this.pointIsNearCorner(boid, boid.size)) {
					direction = Utils.Normalize({x: boid.x - this.x, y: boid.y - this.y});
        }
				// Bottom of box and particle is going up
				else if (boid.y > this.bottom && direction.y < 0) {
					direction = Utils.Reflect(direction, {x:0, y:-1});
          console.log(direction)
        }
				// Top of box and particle is going down
				else if (boid.y < this.top && direction.y > 0) {
					direction = Utils.Reflect(direction, {x:0, y:1});
        }
				// Left of box and particle is going right
				else if (boid.x < this.left && direction.x > 0) {
					direction = Utils.Reflect(direction, {x:-1, y:0});
        }
				// Right of box and particle is going left
				else if (boid.x > this.right && direction.x < 0) {
					direction = Utils.Reflect(direction, {x:1, y:0});
        }
        // boid.velocity.x = direction.x
        // boid.velocity.y = direction.y
        // boid.velocity.x *= -1//Settings.DEFAULT_FRICTION_COLLISION
        // boid.velocity.y *= -1//Settings.DEFAULT_FRICTION_COLLISION
      }
    }
  }

	Collider.prototype = Object.create(PIXI.Sprite.prototype)
	Collider.prototype.constructor = Collider

  return Collider
})
