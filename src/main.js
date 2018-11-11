var state, states
var textures = {};
var TIMESTEP = 1 / 60;
var canvas;
var song;
function preload() {
	textures.bus = loadImage("rsc/bus.png");
	textures.bg = loadImage("rsc/bg.png");
	textures.arrow = loadImage("rsc/arrow.png");
	song = loadSound('rsc/temaso.wav');
}

function setup() {
	song.loop();
	canvas = createCanvas(800, 600);
    canvas.drawingContext.imageSmoothingEnabled = false;
	state = 0;
	states = [
		new Level()
	]
}

function draw() {
	background(255);
	states[state].update(TIMESTEP);
	states[state].draw();
}