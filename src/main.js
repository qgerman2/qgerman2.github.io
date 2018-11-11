var state, states
var textures = {};
var TIMESTEP = 1 / 60;
var canvas;
var song;
var threed;
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
	threed = createGraphics(width, height, WEBGL);
}

function draw() {
	
	background(255);
	threed.clear();
	states[state].update(TIMESTEP);	//plano juego
	states[state].draw();
}