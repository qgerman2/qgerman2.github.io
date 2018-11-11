class GUI {
	constructor(level) {
		this.level = level;
		this.width = width;
		this.height = height;
		textSize(60);
		textAlign(CENTER);
	}
	update() {

	}
	draw() {
		push();
		fill(color(255, 255, 255, 255));
		text(Math.trunc(this.level.director.timer), 0, 60, this.width);
		text(Math.trunc(this.level.director.points), 100, 60);
		text(Math.trunc(this.level.player.chassis.body.position[0]), 100, 400);
		text(Math.trunc(this.level.player.chassis.body.position[1]), 100, 500);
		pop();
		var pedFollow = false;
		var arrowDest = false;
		var carPos = this.level.player.chassis.body.position;
		this.level.player.peds.forEach(function(ped, i, peds) {
			if ((!pedFollow) || (p2.vec2.distance(ped.destination, carPos) < p2.vec2.distance(pedFollow.destination, carPos))) {
				if (ped.tag) {
					peds.splice(i, 1);
				}
				else {	
					pedFollow = ped;
					arrowDest = ped.destination;
				}
			}
		})
		if (!pedFollow) {
			this.level.director.peds.forEach(function(ped, i, peds) {
				if ((!pedFollow) || (p2.vec2.distance(ped.position, carPos) < p2.vec2.distance(pedFollow.position, carPos))) {
					pedFollow = ped;
					arrowDest = ped.position;
				}
			})
		}
		if (arrowDest) {
			var angle = Math.atan2((carPos[1] - arrowDest[1]),(arrowDest[0] - carPos[0])) + Math.PI / 2;
			var arrowpos = [this.width / 2 + Math.sin(angle) * 250, this.height / 2 + Math.cos(angle) * 250]
			push()
			translate(arrowpos[0], arrowpos[1]);
			rotate(-angle + Math.PI / 2);
			image(textures.arrow, -50, -50, 100, 100)
			pop();
		}
	}
}