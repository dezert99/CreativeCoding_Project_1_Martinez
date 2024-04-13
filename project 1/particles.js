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
        //Explosion particle different from trail.
        if(system === "explode"){
            const accX = random(-.05,.05);
            const accY = random(-.05,.05)
            this.acceleration = createVector(accX, accY,);
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
        //Update position and velocity
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 1.5;
        if(this?.color) {
            this.color.setAlpha(this.lifespan)

        }
    };

    display() {
        //If assigned color, use color, else use 127 by default.
        if(this.color){
            fill(this.color, [this.lifespan]);
        }
        else{
            fill(127, [this.lifespan]);
        }
        stroke(200, this.lifespan);
        strokeWeight(2);
        noStroke();

        
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

    //Adds particle
    addParticle(size,system,color) {
        this.particles.push(new Particle(this.origin,size, system, color));
    };

    //Updates position so it can follow firework
    updatePos(position){
        this.origin = position.copy();
    }

    // Returns booling showing if the particle system is done
    isDone(){
        return this.particles.length > 0;
    }

    //Run particle
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
