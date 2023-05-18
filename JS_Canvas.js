let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

var ob_count = 0;
var coin_count = 0;
var tile_size = 50;
var direction = null;
var counter = 0;
var collected = 0;
var roundend = false;

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
    constructor(radius, color){

        this.Xpos = 0;
        this.Ypos = 0;
        this.Radius = radius;
        this.Color = color;

        this.SpawnX = 0;
        this.SpawnY = 0;

    }
    spawn(){
        
        do {

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0)

        this.SpawnX = this.Xpos;
        this.SpawnY = this.Ypos;

    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;
        
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.lineWidth = 5;
        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), this.Radius, 0, Math.PI *2, false);
        context.stroke();
        context.closePath();
    }
    update() {

        this.draw(context);
        
        WinEnd(collected);
    }
}
class Enemi {
    constructor(radius, color, speed ){

        this.Xpos = null;
        this.Ypos = null;

        this.Radius = radius;
        this.Color = color;
        this.Speed = speed;

        this.dx = 0;
        this.dy = 0;
        
        this.Rnd = RandomNum(4);

    }
    spawn(){
        
        do {

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0 || this.Ypos == player.SpawnY && this.Xpos == player.SpawnX)


    }
    draw(context){
        context.beginPath();

        context.fillStyle = this.Color;

        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), this.Radius, 0, Math.PI *2, false);
        context.fill();
        context.closePath();
    }
    update() {

        this.draw(context);
        
        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) {}
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) {}
        else this.Rnd = RandomNum(4);
    }
    Movement() { //dx + Xpos

        //up
        if (this.Rnd == 1) this.dy = -1;
        //down
        else if (this.Rnd == 2) this.dy = 1;
        //left
        else if (this.Rnd == 3) this.dx = -1;
        //right
        else if (this.Rnd == 4) this.dx = 1;

        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) this.Ypos = this.Ypos + this.dy;
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) this.Xpos = this.Xpos + this.dx;
        else this.Rnd = RandomNum(4);
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
class Coins {
    constructor(xpos, ypos){
        
        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Picked = false;
        this.Checked = false;
    }
    draw(context){

        context.beginPath();

        if (this.Picked == false) context.fillStyle = "pink";
        else context.fillStyle = "#ff8";
        

        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), 5, 0, Math.PI *2, false);
        context.fill();
        context.closePath();
    }
    update(){
        this.draw(context);

        if (this.Xpos == player.Xpos && this.Ypos == player.Ypos) this.Picked = true;

    }

}

let RandomNum = function(num) {

    var Random = Math.floor(Math.random() * num) + 1;
    return Random; 
}


var object_box = new box();
var object_coin = new Coins(); 

function SetMap(Map) {

    for (let i = 0; i < Map.length; i++) {
        for (let j = 0; j < Map[0].length; j++) {
            if (Map[i][j] == 1) {
                object_box[ob_count] = new box(j*tile_size, i*tile_size, tile_size, tile_size, "orange");
                object_box[ob_count].draw(context);
                ob_count++;
            }
            if (Map[i][j] == 0 && i != player.Ypos || Map[i][j] == 0 && j != player.Xpos) {
                object_coin[coin_count] = new Coins( j, i);
                object_coin[coin_count].draw(context);
                coin_count++;
            }
        }
    }
}

player = new Circle(22, "black");
player.spawn();
player.draw(context);

enemi2 = new Enemi(22, "blue");
enemi2.spawn();
enemi2.draw(context);

enemi1 = new Enemi(22, "red");
enemi1.spawn();
enemi1.draw(context);


SetMap(Map);

let updateCircle = function() {
    requestAnimationFrame(updateCircle);

    context.clearRect(0, 0, window_width, window_height);

    for (let i = 0; i < ob_count; i++) {
        object_box[i].update();
    }
    for (let i = 0; i < coin_count; i++) {
        object_coin[i].update();
        if (object_coin[i].Picked == true && object_coin[i].Checked == false) {
            collected++;
            object_coin[i].Checked = true;
        }
    }

    context.font = "30px Arial";
    context.fillStyle = "Black";
    context.fillText(collected, tile_size * 0.5, tile_size * 0.5);
    context.fillText(coin_count, tile_size * 1.5, tile_size * 0.5);

    player.update();

    enemi2.update();
    enemi1.update();

    if (counter == 100 && roundend == false) {
        enemi1.Movement();
        enemi2.Movement();
        counter = 0;
    }
    else counter++;
}
updateCircle();

function checkKey(e) {

    e = e || window.event;

    if (roundend == false) {
        
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
}
document.addEventListener('keyup', checkKey);


function WinEnd(collected) {
    if (collected == coin_count) {
        roundend = true;
        
        enemi1.Color = "#ff8"
        enemi2.Color = "#ff8"

        context.font = "30px Arial";
        context.fillStyle = "Black";
        context.fillText("Win", tile_size * (Map.length/2), tile_size * (Map[0].length/2));
        
    }
}





