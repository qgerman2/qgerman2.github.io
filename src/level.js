class Level {
	constructor() {
		this.camera = new Camera(this);
		this.world = new p2.World({gravity: [0, 0]});
		this.map = new Map(this);
		this.player = new Car(this, 550, 240, 27, 80, "bus");
		this.director = new Director(this);
		this.GUI = new GUI(this);

		this.player.chassis.body.angle = Math.PI;
	}
	input() {
		if (keyIsDown(UP_ARROW)) {this.player.moveDir = 1}
		else if (keyIsDown(DOWN_ARROW)) {this.player.moveDir = -1}
		else {this.player.moveDir = 0}
		if (keyIsDown(RIGHT_ARROW)) {this.player.turnDir = 1}
		else if (keyIsDown(LEFT_ARROW)) {this.player.turnDir = -1}
		else {this.player.turnDir = 0}
	}
	update(dt) {
		var carPos = this.player.chassis.body.position;
		var carVel = this.player.chassis.body.velocity;
		this.camera.target(carPos[0] + carVel[0] * 0.25, carPos[1] + carVel[1] * 0.25);
		this.camera.update(dt);
		this.map.update();
		this.world.step(dt);
		this.input();
		this.director.update(dt);
		this.player.update();
		this.GUI.update();
	}
	draw() {
		threed.push();
		push();
		this.camera.draw();
		this.map.draw();
		this.director.draw();
		this.player.draw();
		threed.pop();
		pop();
		image(threed, 0 ,0);
		this.GUI.draw();
	}
}