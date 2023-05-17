let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

var ob_count = 0;
var tile_size = 50;
var direction = null;
var counter = 0;

var Map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];


class Circle {
    constructor(xpos, ypos, radius, color, text, map, ){

        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Radius = radius;
        this.Color = color;
        this.text = text;
        this.Map = map;

    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;
        
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.fillText(this.text, (tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)));

        context.lineWidth = 5;
        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), this.Radius, 0, Math.PI *2, false);
        context.stroke();
        context.closePath();
    }
    update() {

        this.draw(context);
    }
    Movement() {

        if (Rnd100 == 0 || Rnd100 == null) {
            Rnd100 = Random100Num();
            Rnd4 = Random4Num();
        }
        
        if (Rnd4 == 1) {
            this.Xpos--;
            Rnd100--;
        }
        else if (Rnd4 == 2) {
            this.Xpos++;
            Rnd100--;
        }
        else if (Rnd4 == 3) {
            this.Ypos--;
            Rnd100--;
        }
        else if (Rnd4 == 4) {
            this.Ypos++;
            Rnd100--;
        }
    }
}

class Enemi {
    constructor(xpos, ypos, radius, color, map, speed ){

        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Radius = radius;
        this.Color = color;
        this.Map = map;
        this.Speed = speed;

        
        this.dx = 0;
        this.dy = 0;

    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;

        context.lineWidth = 5;
        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), this.Radius, 0, Math.PI *2, false);
        context.stroke();
        context.closePath();
    }
    update() {

        this.draw(context);
        
        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) {}
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) {}
        else Rnd4 = Random4Num();
    }
    Movement() { //dx + Xpos

        //up
        if (Rnd4 == 1) this.dy = -1;
        //down
        else if (Rnd4 == 2) this.dy = 1;
        //left
        else if (Rnd4 == 3) this.dx = -1;
        //right
        else if (Rnd4 == 4) this.dx = 1;

        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) this.Ypos = this.Ypos + this.dy;
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) this.Xpos = this.Xpos + this.dx;
        else Rnd4 = Random4Num();
    }
} 


class box {
    constructor(xpos, ypos, height, width, color){

        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Height = height;
        this.Width = width;
        this.Color = color;
    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;
        context.lineWidth = 5;
        context.rect(this.Xpos, this.Ypos, this.Width, this.Height);
        context.stroke();
        context.closePath();


        
    }
    update(){
        this.draw(context);
    }

}

let Random4Num = function() {

    var Random = Math.floor(Math.random() * 4) + 1;
    return Random; 
}
var Rnd4 = Random4Num();


var objects = new box();

function SetMap(Map) {

    for (let i = 0; i < Map.length; i++) {
        for (let j = 0; j < Map[0].length; j++) {
            if (Map[i][j] == 1) {
                objects[ob_count] = new box(j*tile_size, i*tile_size, tile_size, tile_size, "orange");
                objects[ob_count].draw(context);
                ob_count++;
            }
        }
    }
}

player = new Circle(1, 1, 25, "black", "P", Map, 1);
player.draw(context);

enemi = new Enemi(4, 4, 25, "black", Map);
enemi.draw(context);

SetMap(Map);

let getDistance = function(xpos1, ypos1, xpos2, ypos2) {

    var result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
    return result; 
}

let updateCircle = function() {
    requestAnimationFrame(updateCircle);

    context.clearRect(0, 0, window_width, window_height);

    player.update();
    enemi.update();

    if (counter == 100) {
        enemi.Movement();
        counter = 0;
    }
    else counter++;
        

    for (let i = 0; i < ob_count; i++) {
        objects[i].update();
    }

}

updateCircle();
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode === 87 && Map[player.Ypos-1][player.Xpos] != 1) {
        direction = "up"; //up
        player.Ypos--;
    }
    else if (e.keyCode === 83 && Map[player.Ypos+1][player.Xpos] != 1) {
        direction = "down"; //down
        player.Ypos++;
    }
    else if (e.keyCode === 65 && Map[player.Ypos][player.Xpos-1] != 1) {
        direction = "left"; //left
        player.Xpos--;
    }
    else if (e.keyCode === 68 && Map[player.Ypos][player.Xpos+1] != 1) {
        direction = "right"; //right
        player.Xpos++;
    }

}
document.addEventListener('keyup', checkKey);






