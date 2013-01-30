var Screen = function() {
  function Screen(controller, bgcolor) {
    this.controller = controller;
    if (bgcolor == null) {
      bgcolor = '#FFFFFF';
    }
    this.resize = __bind(this.resize, this);
    this.run = __bind(this.run, this);
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.bgColor = bgcolor;
    document.body.style.overflow = "hidden";
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.framerate = 60;
    this.clear = true;
    this.context = this.canvas.getContext('2d');
    window.onresize = this.resize;
    this.resize();
    this.lastTime = new Date().getTime();
  }
  Screen.prototype.run = function() {
    var lastRun, timeDiff;
    lastRun = this.lastTime;
    this.lastTime = new Date().getTime();
    timeDiff = this.lastTime - lastRun;
    if (this.clear) {
      this.context.clearRect(0, 0, this.size.x, this.size.y);
    }
    this.controller.update(this, timeDiff);
    this.controller.draw(this);
    return setTimeout(this.run, this.framerate / 1000);
  };
  Screen.prototype.resize = function() {
    this.size = new Vector(document.documentElement.clientWidth, document.documentElement.clientHeight);
    this.canvas.width = this.size.x;
    return this.canvas.height = this.size.y;
  };
  Screen.getCoordinates = function(e) {
    var posx, posy;
    posx = 0;
    posy = 0;
    if (e.layerX || e.layerX === 0) {
      posx = e.layerX;
      posy = e.layerY;
    } else if (e.offsetX || e.offsetX === 0) {
      posx = e.offsetX;
      posy = e.offsetX;
    }
    return new Vector(posx, posy);
  };
  return Screen;
}();