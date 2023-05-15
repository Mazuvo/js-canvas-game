let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";


class Circle {
    constructor(xpos, ypos, radius, color, text, speed){

        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Radius = radius;
        this.Color = color;
        this.text = text;
        this.Speed = speed;

        this.dx = 1 * this.Speed;
        this.dy = 1 * this.Speed;

    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;
        
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.fillText(this.text, this.Xpos, this.Ypos);

        context.lineWidth = 5;
        context.arc(this.Xpos, this.Ypos, this.Radius, 0, Math.PI *2, false);
        context.stroke();
        context.closePath();
    }

    update() {

        this.draw(context);

        if( (this.Xpos + this.Radius)> window_width) {
            this.dx = -this.dx;
        }
        if( (this.Xpos - this.Radius)< 0) {
            this.dx = -this.dx;
        }

        if( (this.Ypos + this.Radius)> window_height) {
            this.dy = -this.dy;
        }
        if( (this.Ypos - this.Radius)< 0) {
            this.dy = -this.dy;
        }
        

        this.Xpos += this.dx;
        this.Ypos += this.dy;

    }
}



let getDistance = function(xpos1, ypos1, xpos2, ypos2) {

    var result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
    return result; 
}




let my_circle1 = new Circle(300,650, 50, "black", "A", 0);
let my_circle2 = new Circle(210, 300, 200, "black", "B", 0);


my_circle1.draw(context);
my_circle2.draw(context);


let updateCircle = function() {
    requestAnimationFrame(updateCircle);

    context.clearRect(0, 0, window_width, window_height);

    my_circle1.update();
    my_circle2.update();

    if (getDistance(my_circle1.Xpos, my_circle1.Ypos, my_circle2.Xpos, my_circle2.Ypos) 
    < (my_circle2.Radius + my_circle1.Radius)) {
        my_circle2.Color = "red";
    }

    if (getDistance(my_circle1.Xpos, my_circle1.Ypos, my_circle2.Xpos, my_circle2.Ypos) 
    > my_circle2.Radius + my_circle1.Radius) {
        my_circle2.Color = "black";
    }

}

updateCircle();


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode === 87 && my_circle1.Ypos + my_circle1.Radius > 0 + my_circle1.Radius + my_circle1.Radius) {
       my_circle1.Ypos -= 10; //up
    }
    else if (e.keyCode === 83 && my_circle1.Ypos + my_circle1.Radius < window_height - 5) {
       my_circle1.Ypos += 10; //down
    }
    else if (e.keyCode === 65 && my_circle1.Xpos + my_circle1.Radius > 0 + my_circle1.Radius + my_circle1.Radius) {
       my_circle1.Xpos -= 10; //left
    }
    else if (e.keyCode === 68 && my_circle1.Xpos + my_circle1.Radius < window_width - 9) {
       my_circle1.Xpos += 10;
    }

}
document.addEventListener('keydown', checkKey);

let Random100Num = function() {

    var Random = Math.floor(Math.random() * 100) + 1;
    return Random; 
}

let Random4Num = function() {

    var Random = Math.floor(Math.random() * 4) + 1;
    return Random; 
}




function Movement() {

    let Random = Random100Num;
    let 
    for (let i = 0; i < Random; i++) {
        my_circle2.
    }

}


