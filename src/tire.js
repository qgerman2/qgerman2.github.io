class Tire {
	constructor(level, x, y, width, height, grip = 35) {
		this.body = new p2.Body({mass: 1, position: [x, y]});
		this.shape = new p2.Box({width: width, height: height});
		this.body.addShape(this.shape);
		level.world.addBody(this.body);
		this.maxLateralImpulse = grip; //Agarre
		this.maxForwardSpeed = 1200;
		this.maxBackwardSpeed = 1200;
		this.forwardForce = 500;
		this.backwardForce = 500;
	}
	update() {
		this.friction();
	}
	getLateralVelocity() {
		var angle = this.body.angle;
		var velocity = this.body.velocity;
		var normal = p2.vec2.fromValues(Math.cos(angle), Math.sin(angle));
		return p2.vec2.scale(normal, normal, p2.vec2.dot(normal, velocity));
	}
	getForwardVelocity() {
		var angle = this.body.angle;
		var velocity = this.body.velocity;
		var normal = p2.vec2.fromValues(Math.cos(angle + Math.PI / 2), Math.sin(angle + Math.PI / 2));
		return p2.vec2.scale(normal, normal, p2.vec2.dot(normal, velocity));
	}
	//Reducir velocidad lateral
	friction() {
		var lateralVelocity = p2.vec2.create();
		p2.vec2.scale(lateralVelocity, this.getLateralVelocity(), this.body.mass);
		if (p2.vec2.length(lateralVelocity) > this.maxLateralImpulse) {
			p2.vec2.scale(lateralVelocity, lateralVelocity, this.maxLateralImpulse / p2.vec2.length(lateralVelocity));
		}
		this.body.applyImpulse([-lateralVelocity[0], -lateralVelocity[1]]);
	}
	move(direction) {
		var angle = this.body.angle;
		var desiredSpeed = 0;
		switch (direction) {
			case -1: desiredSpeed = -this.maxBackwardSpeed; break;
			case 1: desiredSpeed = this.maxForwardSpeed; break;
			default: return;
		}
		var forwardNormal = p2.vec2.fromValues(Math.cos(angle + Math.PI / 2), Math.sin(angle + Math.PI / 2));
		var currentSpeed = p2.vec2.dot(this.getForwardVelocity(), forwardNormal);
		var force = 0;
		if (desiredSpeed > currentSpeed) {
			force = this.forwardForce
		}
		else if (desiredSpeed < currentSpeed) {
			force = -this.backwardForce
		}
		else {
			return
		}
		var newForce = p2.vec2.create();
		p2.vec2.scale(newForce, forwardNormal, force);
		this.body.applyForce(newForce);
	}
	draw() {
		//push();
		//translate(this.body.position[0], this.body.position[1]);
		//rotate(this.body.angle);
		//rect(-this.shape.width / 2, -this.shape.height / 2, this.shape.width, this.shape.height);
		//pop()
	}
}