class Firework {
    constructor(position, target) {
        this.position = position;
        this.acceleration = createVector();
        this.target = target;
        this.maxSpeed = 3;
        this.velocity = p5.Vector.sub(target,position);
        this.velocity.limit(this.maxSpeed);
        this.gravity = createVector(0,.01);
        this.exploded = false;
        setInterval(() => {this.stop(this)},5000);
        this.particleSystem = new ParticleSystem(position);;
        this.partsMade = 0;

        this.isRandom = random(1,1000) <100;
        this.color = color(random(0,255),random(0,255),random(0,255));
    }

    stop(self){
        // console.log("stop called");
        self.velocity = createVector(0,0);
        self.exploded = true;
    }
    
      update() {
        let dist2targ = dist(this.position.x,this.position.y,this.target.x,this.target.y);
        // console.log("this.exploded",this.exploded);
        this.particleSystem.updatePos(this.position);
        if(abs(dist2targ) < 20){
            this.exploded = true;
        }
        if(!this.exploded){
            // console.log("velocity:",this.velocity);
            // console.log("position:", this.position);
            // console.log("acceleration:", this.acceleration);
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
            this.velocity.add(this.gravity);
            this.velocity.limit(this.maxSpeed);
            this.acceleration.mult(0);
            if(frameCount%3==0){
                this.particleSystem.addParticle(random(4,10),"trail");
            }
        }
        else {
            // console.log("part should be running");
            if(this.particleSystem === null){
                this.particleSystem = new ParticleSystem(this.position);
            }
            if(this.partsMade < 40){
                console.log(this.isRandom, this.color);
                this.particleSystem.addParticle(random(1,15),"explode",this.isRandom ? color(random(0,255),random(0,255),random(0,255)) : this.color);
                this.partsMade++;
            }
        }
        this.particleSystem.run();
       
      }

    show(){
        if(!this.exploded){
            strokeWeight(16);
            stroke(0);
            point(this.position.x,this.position.y);
        }
        this.update();
    }
}