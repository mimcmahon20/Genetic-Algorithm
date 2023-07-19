class Target {
  constructor(x, y, r) {
    this.vec = createVector(x, y);
    this.r = r;
  }

  draw() {
    push();
    fill(255, 0, 0);
    circle(this.vec.x, this.vec.y, this.r);
    pop();
  }
}
