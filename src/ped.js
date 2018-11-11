class Ped {
	constructor(level, x, y, dx, dy) {
		this.level = level;
		this.position = p2.vec2.fromValues(x, y);
		this.waiting = true;
		this.arrived = false;
		this.destination = p2.vec2.fromValues(dx, dy);
		this.boardDistance = 50;
		this.arrivalDistance = 100;
		this.tag = false;
	}
	board() {
		this.waiting = false
		this.level.player.peds.push(this);
	}
	arrival() {
		this.arrived = true;
		this.level.director.score();
		this.tag = true;
	}
	update() {
		var distance;
		if (this.waiting && !this.arrived) {
			distance = p2.vec2.distance(this.position, this.level.player.chassis.body.position);
			if (distance <= this.boardDistance) {this.board()}
		}
		else if (!this.waiting) {
			distance = p2.vec2.distance(this.destination, this.level.player.chassis.body.position);
			if (distance <= this.arrivalDistance) {this.arrival()}
		}
	}
	draw() {
		if (this.waiting) {ellipse(this.position[0], this.position[1], 10)}
		if (!this.waiting && !this.arrived) {
			push();
			fill(color(255, 0, 0, 100));
			rect(this.destination[0] - this.arrivalDistance, this.destination[1] - this.arrivalDistance, this.arrivalDistance * 2, this.arrivalDistance * 2);
			pop();
		}
	}
}