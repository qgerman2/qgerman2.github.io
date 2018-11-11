class Camera {
	constructor(level) {
		this.level = level;
		this.pos = p2.vec2.create();
		this.scale = 0.75;

		this.width = width;
		this.height = height;

		this.dest = p2.vec2.create();
	}
	target(x, y) {
		this.dest[0] = x - this.width / (this.scale * 2);
		this.dest[1] = y - this.height / (this.scale * 2);
	}
	worldToScreen(x, y) {
		return [(x + this.pos[0]) * this.scale, (y + this.pos[1]) * this.scale];
	}
	screenToWorld(x, y) {
		return [x / this.scale - this.pos[0], y / this.scale - this.pos[1]];
	}
	update(dt) {
		this.pos[0] = this.pos[0] + ((-this.dest[0] - this.pos[0]) * dt * 10);
		this.pos[1] = this.pos[1] + ((-this.dest[1] - this.pos[1]) * dt * 10);
	}
	draw() {
		scale(this.scale);
		translate(this.pos[0], this.pos[1]);
		threed.translate(this.pos[0] - 133, this.pos[1] - 100, -175); //arreglar esta wea algun dia
	}
}