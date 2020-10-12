let system;

// function setup() {
//   createCanvas(720, 400);
//   system = new ParticleSystem(createVector(width / 2, 50));
// }

// function draw() {
//   background(51);
//   system.addParticle();
//   system.run();
// }

class Particle {
    constructor(position, size, system, color){
        if(system === "explode"){
            this.acceleration = createVector(random(-.05,.05), random(-.05,.05),);
            this.velocity = createVector(random(-1, 1), random(-1, 0));
        }
        else {
            this.acceleration = createVector(0, 0.01);
            this.velocity = createVector(random(-.04, .04), random(-.4, 0));
        }
        
        this.position = position.copy();
        this.lifespan = 255;
        this.size = size;
        this.color = color;
    }

    run() {
        this.update();
        this.display();
    };

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    };

    display() {
        if(this.color){
            fill(this.color, this.lifespan);
        }
        else{
            fill(127, this.lifespan);
        }
        stroke(200, this.lifespan);
        strokeWeight(2);
        
        ellipse(this.position.x, this.position.y, this.size, this.size);
    };

    isDead() {
        return this.lifespan < 0;
    };
}

class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    } 

    addParticle(size,system,color) {
        this.particles.push(new Particle(this.origin,size, system, color));
    };

    updatePos(position){
        this.origin = position.copy();
    }


    run() {
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
            this.particles.splice(i, 1);
            }
        }
    };
}
