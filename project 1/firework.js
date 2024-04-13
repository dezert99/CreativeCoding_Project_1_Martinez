class Firework {
    constructor(position, target) {
        this.position = position;
        this.acceleration = createVector();
        this.target = target;
        this.maxSpeed = 2.5;
        this.velocity = p5.Vector.sub(target,position);
        this.velocity.limit(this.maxSpeed);
        this.gravity = createVector(0,.01);
        this.exploded = false;
        setInterval(() => {this.stop(this)},5000);
        this.particleSystem = new ParticleSystem(position);
        this.partsMade = 0;

        this.isRandom = random(1,1000) < 100;
        this.color = color(random(0,255),random(0,255),random(0,255));
    }

    stop(self){
        // Set velocity to 0, stopping the firework
        self.velocity = createVector(0,0);
        self.exploded = true;
    }
    
      update() {
          //Distance to target
        let dist2targ = dist(this.position.x,this.position.y,this.target.x,this.target.y);
        // console.log("this.exploded",this.exploded);
        //Move particle system so it follows firework
        this.particleSystem.updatePos(this.position);
        // Stop firework if it is close enough to target
        if(abs(dist2targ) < 20){
            this.exploded = true;
        }
        if(!this.exploded){
            // console.log("velocity:",this.velocity);
            // console.log("position:", this.position);
            // console.log("acceleration:", this.acceleration);
            // Move firework
            this.position.add(this.velocity);
            //Apply gravity. No need for separate acceleration, it gets an instantaneous velocity at the start and only
            //gravity should affect it going forward. Neglecting air resistance. 
            this.velocity.add(this.gravity);
            //Limit the speed
            this.velocity.limit(this.maxSpeed);
            // Add a trail particle every three frames, to prevent overcrowing
            if(frameCount%3==0){
                this.particleSystem.addParticle(random(4,10),"trail");
            }
        }
        else {
            // console.log("part should be running");
            //Create particle system if it didn't have one before
            if(this.particleSystem === null){
                this.particleSystem = new ParticleSystem(this.position);
            }
            //Stop making particles after 50 have been made
            if(this.partsMade < 50){
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