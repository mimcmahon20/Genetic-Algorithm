class Obstacle {
    constructor(x,y,w,h,r,g,b,shape) {
        this.vec = createVector(x,y);
        this.w = w;
        this.h = h;
        this.fill = color(r, g, b);
        this.shape = shape;
    }

    draw() {
        if(this.shape == "Circle") {
            push();
            fill(this.fill);
            circle(this.vec.x,this.vec.y,this.w);
            pop();
        } else if(this.shape == "Rectangle") {
            push();
            fill(this.fill);
            rect(this.vec.x,this.vec.y,this.w,this.h);
            pop();
        }
    }

    // checks if the rocket has collided with the obstacle
    checkCollision(rocketVec) {
        if(this.shape == "Circle") {
            let d = dist(rocketVec.x, rocketVec.y, this.vec.x, this.vec.y);
            if(d < this.w / 2) {
                return true;
            }
        }
        else if(this.shape == "Rectangle") {
            if(rocketVec.x > this.vec.x && rocketVec.x < this.vec.x + this.w && rocketVec.y > this.vec.y && rocketVec.y < this.vec.y + this.h) {

                return true;
            }
        }
    }
}