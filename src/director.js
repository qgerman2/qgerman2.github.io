function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Director {
	constructor(level) {
		this.level = level;
		this.timer = 60;
		this.points = 0;

		this.scoreTime = 5;
		this.scorePoints = 10;

		this.peds = [];
		this.cars = [];
		this.cars.push(new Car(this.level, 0, 0, 25, 45, "city"));
		this.difficulty = 1;
		this.pedTimer = 0;
		for (var i = 0; i < 5; i++) {
			this.spawnPed()
		}
		this.pedSpawnTimer = 10;
		this.pedsPerDifficulty = 3;
		this.pedCount = 0;
		this.spawnCar();
		this.peds.push(new Ped(this.level, 560, 100, 1300, 1000));
	}
	score() {
		this.timer = this.timer + this.scoreTime;
		this.points = this.points + this.scorePoints;
		this.pedCount = this.pedCount + 1;
		if (this.pedCount == this.pedsPerDifficulty) {
			this.difficulty += 1;
			this.pedSpawnTimer += 2;
			this.pedCount = 0;
		}
	}
	rndPedCoordinates() {
		var quad = getRndInteger(0, 3);
		var alley = getRndInteger(0, 3);
		var x = getRndInteger(-this.difficulty, this.difficulty);
		var y = getRndInteger(-this.difficulty, this.difficulty);
		var pos = p2.vec2.create();
		switch (alley) {
			case 0:
				pos[0] = getRndInteger(-320, 320);
				pos[1] = -340;
				break
			case 1:
				pos[0] = getRndInteger(-320, 320);
				pos[1] = 340;
				break
			case 2:
				pos[0] = -340;
				pos[1] = getRndInteger(-320, 320);
				break
			case 3:
				pos[0] = 340;
				pos[1] = getRndInteger(-320, 320);
				break
		}
		switch (quad) {
			case 0:
				pos[0] = pos[0] - (900 * x);
				pos[1] = pos[1] - (900 * y);
				break
			case 1:
				pos[0] = pos[0] + (900 * x);
				pos[1] = pos[1] - (900 * y);
				break
			case 2:
				pos[0] = pos[0] - (900 * x);
				pos[1] = pos[1] + (900 * y);
				break
			case 3:
				pos[0] = pos[0] + (900 * x);
				pos[1] = pos[1] + (900 * y);
				break
		}
		return pos
	}
	rndCarCoordinates() {
		var quad = getRndInteger(0, 3);
		var alley = getRndInteger(0, 3);
		var direction = getRndInteger(0, 1);
		var lane = getRndInteger(0, 1);
		var pos = p2.vec2.create();
		var rot = 0;
		switch (alley) {
			case 0:
				pos[0] = getRndInteger(-320, 320);
				pos[1] = -400;
				rot = Math.PI / 2
				break
			case 1:
				pos[0] = getRndInteger(-320, 320);
				pos[1] = 400;
				rot = Math.PI / 2
				break
			case 2:
				pos[0] = -400;
				pos[1] = getRndInteger(-320, 320);
				break
			case 3:
				pos[0] = 400;
				pos[1] = getRndInteger(-320, 320);
				break
		}
		return [pos, rot]
	}
	spawnPed() {
		var pos = this.rndPedCoordinates();
		var dest = this.rndPedCoordinates();
		this.peds.push(new Ped(this.level, pos[0], pos[1], dest[0], dest[1]));
	}
	spawnCar() {
		var coords = this.rndCarCoordinates();
		this.cars.push(new Car(this.level, coords[0][0], coords[0][1], 25, 45, "city", coords[1]));
	}
	update(dt) {
		this.timer -= dt;
		this.pedTimer += dt;
		if (this.pedTimer > this.pedSpawnTimer) {
			this.spawnPed();
			this.pedTimer = 0;
		}
		this.peds.forEach(function(ped, i, peds) {
			if (ped.tag) {
				peds.splice(i, 1)
			}
			else {ped.update()}
		})
		this.cars.forEach(function(car) {
			car.update();
		})
	}
	draw() {
		this.peds.forEach(function(ped) {
			ped.draw()
		})
		this.cars.forEach(function(car) {
			car.draw();
		})
	}
}