class Rocket {
  constructor(vec, lifespan, baseSpeed) {
    if (vec) {
      this.vec = vec;
    } else {
      this.vec = new createVector(0, 0);
    }
    this.vel = new createVector(0, 0);
    this.acc = new createVector(0, 0);
    this.lifespan = lifespan;
    this.DNA = new DNA();
    this.count = 0;
    this.DNA.populate(this.lifespan);
    this.fitness = 0;
    this.timeAlive = 0;
    this.fill = color(0,0,0, 150);
    this.collided = false;
  }

  // calculates the fitness of the rocket
  calcFitness() {
    let d = dist(this.vec.x, this.vec.y, target.vec.x, target.vec.y);

    //10 is the best score (dist = 1), and a lower number (higher dist) is a worse fitness
    if (d < target.r / 1.5) {
      this.fitness = 10;
    } else {
      this.fitness = 10 / d;
    }
    if(this.collided) {
      this.fitness = 0;
    }
    //this.fitness += this.timeAlive / 25;
  }

  // renders the rockets
  draw() {
    push();
    noStroke();
    fill(this.fill);
    circle(this.vec.x, this.vec.y, 10);
    pop();
  }

  //updates the rocket
  update() {
    let d = dist(this.vec.x, this.vec.y, target.vec.x, target.vec.y);
    let colorRatio = map(d, 0, 500, 255, 0);
    this.fill = color(colorRatio, 255-colorRatio, colorRatio, 155);
    this.checkObstacleCollision();

    if(this.collided && this.timeAlive == 0) {
      this.timeAlive = this.count;
    }

    //checks first if the rocket has reached the target
    if (d < target.r / 1.5) {
      this.vec = target.vec.copy();
      this.acc.mult(0);
      //if it has, then stop the rocket, if it hasn't check for collision with obstacle
    } else if(this.collided) {
      this.vec = new createVector(-1000, -1000);
      this.acc.mult(0);
    }else {
      this.applyForce(this.DNA.genes[this.count]);
      this.vel.add(this.acc);
      this.vec.add(this.vel);
      this.acc.mult(0);
    }
    this.checkTimeAlive();
    this.count++;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updateDNA(newDNA) {
    this.DNA = newDNA;
  }

  checkObstacleCollision() {
    obstacles.forEach(obstacle => {
      if (obstacle.checkCollision(this.vec)) {
        this.collided = true;
      }
    })
    //check collision with borders of window
    if (this.vec.x < 0 || this.vec.x > width || this.vec.y < 0 || this.vec.y > height) {
      this.collided = true;
    }
  }

  checkTimeAlive() {
    if(this.collided && this.timeAlive == 0) {
      this.timeAlive = this.count;
    } else if(!this.collided && this.count > this.timeAlive) {
      this.timeAlive = this.count;
    }
  }
}
