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
var start = true;

var Map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1],
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

player = new Circle(1, 1, 25, "black", "P", Map);
player.draw(context);

SetMap(Map);

let getDistance = function(xpos1, ypos1, xpos2, ypos2) {

    var result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
    return result; 
}



//let my_circle1 = new Circle(300,650, 50, "black", "A");
//my_circle1.draw(context);

let updateCircle = function() {
    requestAnimationFrame(updateCircle);

    context.clearRect(0, 0, window_width, window_height);

    //my_circle1.update();
    player.update();

    for (let i = 0; i < ob_count; i++) {
        objects[i].update();
    }
    /*
    if (direction == "up" && my_circle1.Ypos + my_circle1.Radius > 0 + my_circle1.Radius + my_circle1.Radius) my_circle1.Ypos--;
    else if (direction == "down" && my_circle1.Ypos + my_circle1.Radius < window_height - 5) my_circle1.Ypos++;
    else if (direction == "left" && my_circle1.Xpos + my_circle1.Radius > 0 + my_circle1.Radius + my_circle1.Radius) my_circle1.Xpos--;
    else if (direction == "right" && my_circle1.Xpos + my_circle1.Radius < window_width - 9) my_circle1.Xpos++;
    */
    


}

updateCircle();
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode === 87 && Map[player.Ypos-1][player.Xpos] != 1) {
        direction = "up"; //up
        player.Ypos -= 1;
    }
    else if (e.keyCode === 83 && Map[player.Ypos+1][player.Xpos] != 1) {
        direction = "down"; //down
        player.Ypos += 1;
    }
    else if (e.keyCode === 65 && Map[player.Ypos][player.Xpos-1] != 1) {
        direction = "left"; //left
        player.Xpos -= 1;
    }
    else if (e.keyCode === 68 && Map[player.Ypos][player.Xpos+1] != 1) {
        direction = "right"; //right
        player.Xpos += 1;
    }

}
document.addEventListener('keydown', checkKey);






