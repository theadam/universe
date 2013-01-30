var Vector = function() {
  function Vector(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }
  Vector.prototype.sub = function(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  };
  Vector.prototype.add = function(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  };
  Vector.prototype.div = function(num) {
    return new Vector(this.x / num, this.y / num);
  };
  Vector.prototype.times = function(num) {
    return new Vector(this.x * num, this.y * num);
  };
  return Vector;
}();