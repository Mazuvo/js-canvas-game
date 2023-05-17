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
    constructor(radius, color, text, map, ){

        this.Xpos = 0;
        this.Ypos = 0;
        this.Radius = radius;
        this.Color = color;
        this.text = text;
        this.Map = map;

    }
    spawn(){
        
        do {

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0)

        this.Map[this.Ypos][this.Xpos] = 2;

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
}

class Enemi {
    constructor(radius, color, map, speed ){

        this.Xpos = null;
        this.Ypos = null;
        this.Radius = radius;
        this.Color = color;
        this.Map = map;
        this.Speed = speed;

        
        this.dx = 0;
        this.dy = 0;

    }
    spawn(){
        
        do {

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0 || player.Map[this.Ypos][this.Xpos] == 2)


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
        else Rnd = RandomNum(4);
    }
    Movement() { //dx + Xpos

        //up
        if (Rnd == 1) this.dy = -1;
        //down
        else if (Rnd == 2) this.dy = 1;
        //left
        else if (Rnd == 3) this.dx = -1;
        //right
        else if (Rnd == 4) this.dx = 1;

        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) this.Ypos = this.Ypos + this.dy;
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) this.Xpos = this.Xpos + this.dx;
        else Rnd = RandomNum(4);
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

let RandomNum = function(num) {

    var Random = Math.floor(Math.random() * num) + 1;
    return Random; 
}
var Rnd = RandomNum(4);


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

player = new Circle(25, "black", "P", Map, 1);
player.spawn();
player.draw(context);

enemi = new Enemi(25, "black", Map);
enemi.spawn();
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






