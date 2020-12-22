var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var fg = new Image();
var bg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
fg.src = "img/fg.png";
bg.src = "img/bg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//audio
var score_audio = new Audio();
var fly = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


var gap = 110;

// blocks
var pipe = [];
 pipe[0] = {
 	x : cvs.width,
 	y : 0
 }

//space
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -=37;
	fly.play();
}

// bird position
var xPos = 10;
var yPos = 150;
var grav = 1.8;

var score = 0;

function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++){
	ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

	pipe[i].x--;


	if(pipe[i].x == 75){
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
		})
	}

	if(xPos + bird.width >= pipe[i].x
		&& xPos <= pipe[i].x + pipeUp.width
		&& (yPos <= pipe[i].y + pipeUp.height
			|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
		|| yPos + bird.height >=cvs.height - fg.height) {
		location.reload();
	}

	if(pipe[i].x == 5) {
		score++;
		score_audio.play();
	} 

}
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = "#000";
	ctx.font = "25px Calibri";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);

}

bg.onload = draw;