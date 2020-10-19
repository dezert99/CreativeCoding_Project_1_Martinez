let fireworks = [];
function setup() {
    createCanvas(1400, 700);
    background(13,0,66,26);
}

function draw() {
    background(13,0,66,26);

    fireworks.forEach(firework => {
        if(!firework.done){
            firework.show();
        }
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