var Universe = function() {
  Universe.G = 100;
  function Universe() {
    this.up = __bind(this.up, this);
    this.move = __bind(this.move, this);
    this.down = __bind(this.down, this);
    this.keyPress = __bind(this.keyPress, this);    
	this.pixelsPerUnit = 1;
    this.children = [];
    this.arrow = null;
    this.follower = -1;
    this.screen = new Screen(this, '#000000');
    this.screen.canvas.onmousedown = this.down;
    this.screen.canvas.onmouseup = this.up;
	this.screen.canvas.ontouchstart = this.down;
    this.screen.canvas.ontouchend = this.up;
    document.onkeydown = this.keyPress;
    this.offset = new Vector();
    this.screen.run();
  }
  Universe.prototype.makeBodies = function() {
    this.children.push(new Body(this, 1.98892e30, new Vector(0, 0), new Vector(0, 0), 6.955e8, '#FFAA00'));
    return this.children.push(new Body(this, 5.9721986e24, new Vector(1.495978707e11, 0), new Vector(0, -29800), 6.3675e6, '#0000FF'));
  };
  Universe.prototype.draw = function(screen) {
    var child, _i, _len, _ref, _results;
    if (this.arrow) {
      screen.context.strokeStyle = '#FFFFFF';
      screen.context.beginPath();
      screen.context.moveTo(this.arrow.start.x, this.arrow.start.y);
      screen.context.lineTo(this.arrow.end.x, this.arrow.end.y);
      screen.context.closePath();
      screen.context.stroke();
    }
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.draw(screen.context));
    }
    return _results;
  };
  Universe.prototype.update = function(screen, timeDiff) {
    var child, i, j, _i, _len, _ref;
    i = 0;
    while (i < this.children.length) {
      j = i + 1;
      while (j < this.children.length) {
        this.children[i].applyForce(this.children[j]);
        j++;
      }
      i++;
    }
    _ref = this.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.update(timeDiff / (1000/this.screen.framerate));
    }
    this.offset.x = this.screen.size.x / 2;
    this.offset.y = this.screen.size.y / 2;
    if (this.follower > -1) {
      this.offset.x -= this.children[this.follower].position.x * this.pixelsPerUnit;
      return this.offset.y -= this.children[this.follower].position.y * this.pixelsPerUnit;
    }
  };
  Universe.prototype.fixFollower = function() {
    if (this.follower >= this.children.length) {
      this.follower = -1 + this.follower % this.children.length;
    }
    if (this.follower < -1) {
      return this.follower = this.children.length - (-1 - this.follower);
    }
  };
  Universe.prototype.keyPress = function(e) {
    if (e.keyCode === 37) {
      this.follower--;
      return this.fixFollower();
    } else if (e.keyCode === 39) {
      this.follower++;
      return this.fixFollower();
    } else if (e.keyCode === 38) {
      return this.pixelsPerUnit *= 2;
    } else if (e.keyCode === 40) {
      return this.pixelsPerUnit /= 2;
    } else if (e.keyCode === 84) {
      return Body.DRAW_TRAILS = !Body.DRAW_TRAILS;
    }
  };
  Universe.prototype.fixChildren = function() {
    var child, _i, _len, _ref, _results;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.initCanvas());
    }
    return _results;
  };
  Universe.prototype.down = function(e) {
	if (!e)
		e = event
	e.preventDefault()
    this.screen.canvas.onmousemove = this.move;
	this.screen.canvas.ontouchmove = this.move;
    this.arrow = new Object();
    this.arrow.start = Screen.getCoordinates(e);
    return this.arrow.end = Screen.getCoordinates(e);
  };
  Universe.prototype.move = function(e) {
    return this.arrow.end = Screen.getCoordinates(e);
  };
  Universe.prototype.up = function(e) {
    var diff;
    this.screen.canvas.onmousemove = null;
	this.screen.canvas.ontouchmove = null;
    diff = this.arrow.start.sub(this.arrow.end).div(this.pixelsPerUnit * 50);
    this.children.push(new Body(this, 100 / (this.pixelsPerUnit * this.pixelsPerUnit), this.arrow.start.sub(this.offset).div(this.pixelsPerUnit), diff, 5 / this.pixelsPerUnit));
    return this.arrow = null;
  };
  return Universe;
}();

var u = new Universe();