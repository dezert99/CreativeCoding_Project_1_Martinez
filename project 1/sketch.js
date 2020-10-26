
let fireworks = [];
let stars = [];
let target = 80;
let chance = 300

function setup() {
    createCanvas(1400, 700);
    background(13,0,66,26);
    for(let i = 0; i< 200; i++){
        stars.push(new Star(Math.random() * 1400,Math.random() * 400, Math.floor(Math.random() * 254)));
    }
    
}

function draw() {
    background(13,0,66);

    //Loop through firworks array and draw firework
    fireworks.forEach(firework => {
        if(!firework.done){
            firework.show();
        }
    });

    //Loop through stars array and draw stars.
    stars.forEach(star => {
        star.show();
    })

    //Hills
    noStroke()
    fill(31,58,36)
    ellipse(600, 800,2000,900);
    fill(31,68,36)
    ellipse(1400,900,2000,900);
    fill(31,77,36)
    ellipse(0,900,2000,900);

    moon();

    //Send random firework
    if(frameCount >= target){
        sendFirework();
        target = frameCount + Math.floor(Math.random() *chance);
    }

}

//Fire firework on point
function mousePressed(){
    fireworks.push(new Firework(createVector(width/2,400),createVector(mouseX,mouseY)))
}

//Check for chance mods
function keyPressed() {
    if(keyCode === UP_ARROW){
        chance -= 10;
        if(chance <= 50){
            chance = 50;
        }
    }
    else if(keyCode === DOWN_ARROW){
        chance += 10;
    }
}

//Sends firework to random point.
function sendFirework(){
    console.log("firing");
    fireworks.push(new Firework(createVector(width/2,400),createVector(Math.random() *1000 +200, 100)))
}

//Draws moon
function moon() {
    fill(255,255,255,230)
    ellipse(1300,100,110,110);
    fill(255,255,255,255)
    ellipse(1300,100,100,100);
}


// class Wave {

//     Wave(x,y,speed){
//         this.x = x;
//         this.y = y;
//         this.speed = speed;
//     }
// }