let fireworks = [];
function setup() {
    createCanvas(1400, 500);
    
}

function draw() {
    background(255);

    fireworks.forEach(firework => {
        firework.show();
    });
    // else {
    //     fill(255);
    // }
    // ellipse(mouseX, mouseY, 80, 80);
}

function mousePressed(){
    fireworks.push(new Firework(createVector(width/2,500),createVector(mouseX,mouseY)))
}

// class Wave {

//     Wave(x,y,speed){
//         this.x = x;
//         this.y = y;
//         this.speed = speed;
//     }
// }