var Body = function() {
  Body.DRAW_TRAILS = true;
  Body.TRAIL_LENGTH = 100;
  Body.TRAIL_ALPHA_START = 0.2;
  function Body(universe, mass, position, speed, radius, color) {
    this.universe = universe;
    this.mass = mass != null ? mass : 100;
    this.position = position != null ? position : new Vector(0, 0);
    this.speed = speed != null ? speed : new Vector(0, 0);
    this.radius = radius != null ? radius : 5;
    this.color = color != null ? color : '#0000FF';
    this.canvas = document.createElement('canvas');
    this.path = [];
  }
  Body.prototype.applyForce = function(body) {
    var distance, force, xDistance, xForce, yDistance, yForce;
    xDistance = this.position.x - body.position.x;
    yDistance = this.position.y - body.position.y;
    if(xDistance > 2000 || yDistance > 2000){
		return;
	}
	distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    force = Universe.G * ((this.mass + body.mass) / (distance * distance));
    xForce = xDistance / distance * force;
    yForce = yDistance / distance * force;
    this.speed.x -= xForce / this.mass;
    this.speed.y -= yForce / this.mass;
    body.speed.x += xForce / body.mass;
    return body.speed.y += yForce / body.mass;
  };
  Body.prototype.draw = function(context) {
    var alpha, circle, step, _i, _len, _ref;
    context.fillStyle = this.color;
    if (Body.DRAW_TRAILS) {
      alpha = Body.TRAIL_ALPHA_START;
      step = alpha / this.path.length;
      _ref = this.path;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        circle = _ref[_i];
        alpha -= step;
        context.globalAlpha = alpha;
        this.drawBody(context, circle);
      }
      context.globalAlpha = 1;
    }
    return this.drawBody(context, this.position);
  };
  Body.prototype.drawBody = function(context, position) {
    var radius;
    radius = Math.floor(this.radius * this.universe.pixelsPerUnit);
    if (radius < 1) {
      radius = 1;
    }
    context.beginPath();
    context.arc(Math.floor(position.x * this.universe.pixelsPerUnit + this.universe.offset.x), Math.floor(position.y * this.universe.pixelsPerUnit + this.universe.offset.y), radius, 0, Math.PI * 2);
    return context.fill();
  };
  Body.prototype.update = function(timeDiff) {
    var _results;
    this.path.unshift(new Vector(this.position.x, this.position.y));
    this.position.x += this.speed.x * timeDiff;
    this.position.y += this.speed.y * timeDiff;
    _results = [];
    while (this.path.length > Body.TRAIL_LENGTH) {
      _results.push(this.path.pop());
    }
    return _results;
  };
  return Body;
}();