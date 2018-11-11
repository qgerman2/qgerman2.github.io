class Map {
	constructor(level) {
		this.level = level;
		this.cellSize = 900;

		this.cells = [
			[
				this.cellCollision(),
				this.cellCollision()
			],
			[
				this.cellCollision(),
				this.cellCollision()
			]
		]
	}
	cellCollision() {
		var cell = {
			body: new p2.Body({mass: 100, position: [300, 300]}),
			shape: new p2.Box({width: 645, height: 645})
		}
		cell.body.fixedRotation = true;
		cell.body.fixedX = true;
		cell.body.fixedY = true;
		cell.body.addShape(cell.shape);
		this.level.world.addBody(cell.body);
		return cell;
	}
	update() {
		var carpos = this.level.player.chassis.body.position;
		for (var x = 0; x < 2; x++) {
			for (var y = 0; y < 2; y++) {
				var cellpos = [carpos[0] + x * this.cellSize, carpos[1] + y * this.cellSize];
				var pos = p2.vec2.fromValues(this.cellSize * Math.floor(cellpos[0] / this.cellSize), this.cellSize * Math.floor(cellpos[1] / this.cellSize));
				if (p2.vec2.distance(pos, this.cells[x][y].body.position) > 100) {
					
					this.cells[x][y].body.position = pos;
					
				}
			}
		}
	}
	draw() {
		var carpos = this.level.player.chassis.body.position;
		for (var x = -2; x <= 2; x++) {
			for (var y = -2; y <= 2; y++) {
				var cellpos = [carpos[0] + x * this.cellSize, carpos[1] + y * this.cellSize];
				var pos = [this.cellSize * Math.floor(cellpos[0] / this.cellSize), this.cellSize * Math.floor(cellpos[1] / this.cellSize)];
				image(textures.bg, pos[0], pos[1], this.cellSize, this.cellSize);
				threed.push();
				threed.fill(color(0, 40, 100));
				threed.translate(pos[0] - 400, pos[1] - 300, 225);
				threed.box(645, 645, 450);
				threed.pop();
			}
		}
	}
}