var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Ball{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 15;
        this.color = "#0095DD";
        this.speed = 1;
    }

    drawBall(){
        ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*this.radius, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        ctx.closePath();
    }
}

var player1 = new Ball();
player1.drawBall();

// A peripheral frame
ctx.beginPath();
    ctx.rect(1,1,canvas.width-2,canvas.height-2);
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();

ctx.beginPath();
    ctx.rect(20,40,50,50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
ctx.closePath();

ctx.beginPath();
    ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
ctx.closePath();

ctx.beginPath();
    ctx.rect(160, 10, 100, 40);
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();
ctx.closePath();