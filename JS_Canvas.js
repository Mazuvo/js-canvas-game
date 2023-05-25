let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

var colorBackG = "#ff8";
canvas.style.background = colorBackG;

var ob_count = 0;
var coin_count = 0;
var enemi_count = 0;
var tile_size = 50;
var direction = null;
var counter = 0;
var collected = 0;
var roundendW = true;
var roundendL = false;
var score = 0;
var go = true;
var figCount = 0;

var Colors = ["red", "blue", "green", "purple"];

var Map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

canvas.width = Map[0].length * tile_size;
canvas.height = Map.length * tile_size;


class Circle {
    constructor(radius, color){

        this.Xpos = 0;
        this.Ypos = 0;
        this.Radius = radius;
        this.Color = color;

        this.SpawnX = []; //up, down, left, right
        this.SpawnY = [];

        this.CornerCheck = [null, null, null, null]; //upL, upR, downL, DownR

        this.PlayerBox = new box();
        
        this.Figure = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
        
        this.Scount = 0;
    }
    spawn(){
        
        do {

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0)

        for (let i = 0; i < this.Figure.length; i++) {
            for (let j = 0; j < this.Figure[0].length; j++) {
    
                if (this.Figure[i][j] == 1) {
                    this.SpawnX[this.Scount] = (this.Xpos - 1 + j);
                    this.SpawnY[this.Scount] = (this.Ypos - 1 + i);
                    this.Scount++;
                }
    
            }
        }
        this.Scount = 0;

    }
    draw(context){
        context.beginPath();

        context.strokeStyle = "black";

        context.stroke();
        context.closePath();

        figCount = 0;
        for (let i = 0; i < this.Figure.length; i++) {
            for (let j = 0; j < this.Figure[0].length; j++) {
    
                if (this.Figure[i][j] == 1) {
                    this.PlayerBox[figCount] = new box((this.Xpos - 1 + j)* tile_size, (this.Ypos - 1 + i) * tile_size, tile_size, tile_size, "black", true);
                    this.PlayerBox[figCount].draw(context);
                    figCount++;
                }
    
            }
        }
        for (let i = 0; i < figCount; i++) {
            this.PlayerBox[i].update();
        }
    }
    
    update() {

        this.draw(context);
    }
}
class Enemi {
    constructor(radius, color){

        this.Xpos = null;
        this.Ypos = null;

        this.Radius = radius;
        this.Color = color;

        this.dx = 0;
        this.dy = 0;
        
        this.Rnd = RandomNum(4);

        this.PosIsOk = false;

    }
    spawn(){
        
        do {
            this.PosIsOk = true;
            for(let i = 0; i < player.SpawnX.length; i++) {
                
                if (player.SpawnX[i] == this.Xpos && player.SpawnY[i] == this.Ypos) this.PosIsOk = false;
            }

            this.Xpos = RandomNum(Map[0].length -1);
            this.Ypos = RandomNum(Map.length -1);

        } while(Map[this.Ypos][this.Xpos] != 0 || this.PosIsOk == false)


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

        if(Map[this.Ypos][this.Xpos] == 0) Map[this.Ypos][this.Xpos] = 3;
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

        if(Map[this.Ypos + this.dy][this.Xpos] == 0 && this.dy != 0) {
            if(Map[this.Ypos][this.Xpos] == 3) Map[this.Ypos][this.Xpos] = 0;
            this.Ypos = this.Ypos + this.dy;
        }
        else if(Map[this.Ypos][this.Xpos + this.dx] == 0 && this.dx != 0) {
            if(Map[this.Ypos][this.Xpos] == 3) Map[this.Ypos][this.Xpos] = 0;
            this.Xpos = this.Xpos + this.dx;
        }
        else this.Rnd = RandomNum(4);
    }
} 
class box {
    constructor(xpos, ypos, height, width, color, fill){

        this.Xpos = xpos;
        this.Ypos = ypos;
        this.Height = height;
        this.Width = width;
        this.Color = color;
        this.Fill = fill;
    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.Color;
        context.fillStyle = this.Color;
        context.lineWidth = 5;

        if (this.Fill == true) context.fillRect(this.Xpos, this.Ypos, this.Width, this.Height);

        else context.rect(this.Xpos, this.Ypos, this.Width, this.Height);
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
        else context.fillStyle = "rgba(0, 0, 0, 0.0)";
        

        context.arc((tile_size * (this.Xpos + 0.5)), (tile_size * (this.Ypos + 0.5)), 5, 0, Math.PI *2, false);
        context.fill();
        context.closePath();
    }
    update(){
        this.draw(context);

        for (let i = 0; i < figCount; i++) {
            
            if (this.Xpos == player.PlayerBox[i].Xpos / tile_size && this.Ypos == player.PlayerBox[i].Ypos / tile_size) {
                this.Picked = true;
            }
        }
    }

}

var object_box = new box();
var object_coin = new Coins();
var object_enemi = new Enemi();


var button = document.createElement("button");
button.innerHTML = "Restart";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);
button.style.width = tile_size*2 + "px";
button.style.height = tile_size + "px";
button.style.top = canvas.height + 10 + "px";
button.style.left = (canvas.width/2 - tile_size) + 8 + "px";

button.addEventListener ("click", function() {
  button.style.visibility = "hidden";
  score = 0;
  roundendL = false;
  roundendW = true;
});

document.addEventListener('keyup', checkKey);

let Int_load = function Load() {
    if (roundendW == true && roundendL == false) {

        roundendW = false;

        player = new Circle((tile_size * 0.8) /2, "black");
        player.spawn();
        player.draw(context);


        enemi_count = 0;
        ob_count = 0;
        coin_count = 0;
        collected = 0;

        CreateEnemi(0, Colors);

        SetMap(Map);

        updateCircle();
    }
}

let Int_move = function Move() {

    if (roundendW == true && roundendL == false) {
        if (go == true) {
            countdown(3);
            go = false;
        }

        setTimeout(Int_load, 3020);
    }
    else go = true;
    

    if (roundendL == false && roundendW == false) {
        for (let i = 0; i < enemi_count; i++) {
            object_enemi[i].Movement();
        }
        counter = 0;
    }

    setTimeout(Int_move, 1000);
}
setTimeout(Int_move, 1000);

function countdown(num) {
    var from = num;
    if (from != 0) {
        
        context.clearRect(0,0,window_width,window_height);
        
        context.font = "30px Arial";
        context.fillStyle = "Black";
        context.textAlign = "center";

        if (score != 0) context.fillText("Next level in " + from,  tile_size * (Map[0].length/2), tile_size * (Map.length/2));
        else context.fillText("First level in " + from,  tile_size * (Map[0].length/2), tile_size * (Map.length/2));
        
        from--;
        setTimeout(countdown, 1000, from);
    }
}

function oneCount(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].left; i++) {
            if (array[i][j] == 1) count++;
        }
    }
    return count;
}

function RandomNum(num) {

    let Random = Math.floor(Math.random() * num) + 1;
    return Random; 
}

function Score(collected, score) {
    let a = collected - 1;

    score = score + (collected - a);
    return score;
}

function SetMap(Map) {

    for (let i = 0; i < Map.length; i++) {
        for (let j = 0; j < Map[0].length; j++) {
            if (Map[i][j] == 1) {
                object_box[ob_count] = new box(j*tile_size, i*tile_size, tile_size, tile_size, "orange", false);
                object_box[ob_count].draw(context);
                ob_count++;
            }
            if (Map[i][j] != 1 ) {
                Map[i][j] = 0;
                
                let CoinPosOk = true;
                for(let k = 0; k < player.SpawnX.length; k++) {
                
                    if (player.SpawnY[k] == i && player.SpawnX[k] == j) CoinPosOk = false;
    
                }
                if (CoinPosOk == true) {
                    object_coin[coin_count] = new Coins( j, i);
                    object_coin[coin_count].draw(context);
                    coin_count++;
                }
                CoinPosOk = true;
            }
        }
    }
}

function checkKey(e) {

    e = e || window.event;

    if (roundendW == false && roundendL == false) {
        
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

function WinEnd(collected) {
    if (collected == coin_count && roundendL == false) {
        roundendW = true;

        context.font = "30px Arial";
        context.fillStyle = "Black";
        context.fillText("Win", tile_size * (Map[0].length/2), tile_size * (Map.length/2));
        
    }
}

function LoseEnd() {
    for (let i = 0; i < enemi_count; i++) {
        
        if (object_enemi[i].Xpos == player.Xpos && object_enemi[i].Ypos == player.Ypos) {
            roundendL = true;
    
            context.font = "30px Arial";
            context.fillStyle = "Black";
            context.fillText("Lose", tile_size * (Map[0].length/2), tile_size * (Map.length/2));
            button.style.visibility = "visible";
        }

    }
}

function CreateEnemi(quantity, Colors) {

    for (let i = 0; i < quantity; i++) {

        object_enemi[i] = new Enemi((tile_size/2)-3, Colors[i]);       
        object_enemi[i].spawn();
        object_enemi[i].draw(context);
        
        enemi_count++;
    }
}

function updateCircle() {

    if (roundendW == false && roundendL == false) {
    requestAnimationFrame(updateCircle);
    }

    context.clearRect(0, 0, window_width, window_height);

    for (let i = 0; i < ob_count; i++) {
        object_box[i].update();
    }
    for (let i = 0; i < coin_count; i++) {
        object_coin[i].update();
        if (object_coin[i].Picked == true && object_coin[i].Checked == false) {
            collected++;

            context.font = "30px Arial";
            context.fillStyle = "Black";
            score = Score(collected, score);
            
            object_coin[i].Checked = true;
        }
    }

    context.font = "30px Arial";
    context.fillStyle = "Black";
    context.fillText(collected, tile_size * 0.5, tile_size * 0.5);
    context.fillText(coin_count, tile_size * 1.5, tile_size * 0.5);
    context.fillText("Score: " + score, tile_size * (Map[0].length/2), tile_size * 0.5);

    player.update();
    
    if (roundendL == false && roundendW == false) {
        for (let i = 0; i < enemi_count; i++) object_enemi[i].update();
    }
    else {
        for (let i = 0; i < enemi_count; i++) {
            if (object_enemi[i].Xpos == player.Xpos && object_enemi[i].Ypos == player.Ypos ) {
                object_enemi[i].update();
            }
        }
    }

    WinEnd(collected);
    LoseEnd();
}