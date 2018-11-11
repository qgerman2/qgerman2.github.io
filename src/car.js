var TIMESTEP = 1 / 60;
class Car {
	constructor(level, x, y, width, height, type, angle = 0) {
		this.chassis = {
			body: new p2.Body({mass: 1, position: [x, y]}),
			shape: new p2.Box({width: width, height: height}),
		}
		this.chassis.body.addShape(this.chassis.shape);
		level.world.addBody(this.chassis.body);
		console.log(type);
		var vertices = [
			[	-width / 2 + 2, -height / 2 + 10],
			[	width / 2 - 2, 	-height / 2 + 10],
			[	-width / 2 + 2, height / 2 - 10],
			[	width / 2 - 2, 	height / 2 - 10],
		]
		if (type == "bus") {
			vertices = [
				[	-width / 2 + 2, -height / 2 + 20],
				[	width / 2 - 2, 	-height / 2 + 20],
				[	-width / 2 + 2, height / 2 - 10],
				[	width / 2 - 2, 	height / 2 - 10],
			]
			this.chassis.body.mass = 4;
			this.chassis.body.updateMassProperties();
		}
		this.wheels = [];
		this.constraints = [];
		//Ejes rueda chasis
		for (var i = 0; i < 4; i++) {
			var grip = 40;
			if (type == "city") {grip = 10};
			this.wheels.push(new Tire(level, x + vertices[i][0], y + vertices[i][1], 4, 8, grip));
			var constraint = new p2.RevoluteConstraint(this.wheels[i].body, this.chassis.body, {
				localPivotB: vertices[i]
			})
			constraint.collideConnected = false;
			level.world.addConstraint(constraint);
			this.constraints.push(constraint);
		}
		//Ruedas traseras
		this.constraints[0].setLimits(0, 0);
		this.constraints[1].setLimits(0, 0);
		//Dirección
		this.turning = {
			lockAngle: Math.PI / 6,
			turnSpeedPerSec: 15,
			turnPerTimeStep: this.turnSpeedPerSec / TIMESTEP,
			desiredAngle: 0,
			turnDirection: 0,
		}
		this.turnDir = 0;
		this.moveDir = 0;
		this.peds = [];

		this.chassis.body.angle = Math.PI;
	}
	turn() {
		var direction = this.turnDir;
		var settings = this.turning;
		var angleNow = this.constraints[2].angle;
		var desiredAngle = 0;
		if (direction == 1) {desiredAngle = -settings.lockAngle} 
		else if (direction == -1) {desiredAngle = settings.lockAngle}
		var angleToTurn = desiredAngle - angleNow;
		if (angleToTurn > settings.turnPerTimeStep) {angleToTurn = settings.turnPerTimeStep}
		else if (angleToTurn < -settings.turnPerTimeStep) {angleToTurn = -settings.turnPerTimeStep}
		var newAngle = angleNow + angleToTurn;
		for (var i = 2; i < 4; i++) {
			this.constraints[i].setLimits(newAngle, newAngle);
		}
	}
	move() {
		for (var i = 0; i < 4; i++) {
			this.wheels[i].move(this.moveDir);
		}
	}
	speed() {
		var angle = this.chassis.body.angle;
		var velocity = this.chassis.body.velocity;
		var normal = p2.vec2.fromValues(Math.cos(angle + Math.PI / 2), Math.sin(angle + Math.PI / 2));
		var fvelocity = [0,0]; p2.vec2.scale(fvelocity, normal, p2.vec2.dot(normal, velocity));
		return p2.vec2.dot(fvelocity, normal);
	}
	update() {
		for (var i = 0; i < 4; i++) {
			this.wheels[i].update();
		}
		this.turn();
		this.move();
	}
	draw() {
		push();
		translate(this.chassis.body.position[0], this.chassis.body.position[1]);
		rotate(this.chassis.body.angle);
		image(textures.bus, -this.chassis.shape.width / 2, -this.chassis.shape.height / 2, this.chassis.shape.width, this.chassis.shape.height)
		pop()
		for (var i = 0; i < 4; i++) {
			this.wheels[i].draw();
		}
	}
}