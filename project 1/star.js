class Star {
    constructor(x,y, offset = 0) {
        this.counter = offset;
        this.position = createVector(x,y);
        this.incrementor = 1;
    }
    
    //Handles fading of star
   update() {
       this.counter += (this.incrementor);

       if(this.counter % 255 ==0){
           this.incrementor *= -1;
       }
   }

    show(){
        strokeWeight(4);
        stroke(color(255,255,255,this.counter));
        point(this.position.x,this.position.y);
        this.update();
    }
}