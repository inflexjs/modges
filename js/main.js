const app = document.querySelector(".app"),
	game = document.querySelector("#game"),
	ctx = game.getContext('2d'),
	cursor = document.querySelector(".cursor"),
	hp = document.querySelector(".hp"),
	hearts = document.querySelectorAll(".heart"),
	scoreText = document.querySelector(".score"),
	trainingText = document.querySelector(".training"),
	mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

game.width = window.innerWidth;
game.height = window.innerHeight;

// window.addEventListener('resize', async () => {
// 	game.width = window.innerWidth;
// 	game.height = window.innerHeight;
// 	draw();
// });

let start = false,
	mouseX = Math.round(game.width / 2),
	mouseY = Math.round(game.height / 2),

	posX = 0,
	posY = 0,

	touchX = Math.round(game.width / 2),
	touchY = Math.round(game.height / 2),

	ballX = Math.round(game.width / 2),
	ballY = Math.round(game.height / 2),

	dx = randIntExcep(-1, 1, 0),
	dy = randIntExcep(-1, 1, 0),

	ballRadius = 100,
	score = 0,
	startInterval;

console.log(dx);
console.log(dy);

function randIntExcep(min, max, exp) {
	var n;
	while (true) {
		if ((n = Math.floor(Math.random() * (max - min + 1)) + min) != exp) {
			return n;
		}
	}
}

function mouseCoords(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}

function mouseCoords(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}

function touchCoords(e) {
	touchX = e.touches[0].clientX;
	touchY = e.touches[0].clientY;
}

async function getHit() {
	hp.removeChild(hp.lastElementChild);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#303030";
	ctx.fill();
	ctx.closePath();
}

function nowInside(deviceX, deviceY) {
	if ((deviceX - ballX) <= (ballRadius / 1.2) && (deviceX - ballX) >=
		-(ballRadius / 1.2) && (deviceY - ballY) <=
		(ballRadius / 1.2) && (deviceY - ballY) >= -(ballRadius / 1.2)) {

		scoreText.textContent = `Score: ${score}`;
		score++;

	} else {
		console.log("Покинул область");
		getHit();
		ctx.clearRect(0, 0, game.width, game.height);
		clearInterval(startInterval);
	}
}

function draw() {
	ctx.clearRect(0, 0, game.width, game.height);
	drawBall();

	if (score > 1000 && score < 2000) {
		ballRadius = 80;
	} else if (score > 2000 && score < 3000) {
		ballRadius = 60;
	} else if (score > 3000 && score < 4000) {
		ballRadius = 40;
	} else if (score > 4000 && score < 5000) {
		ballRadius = 20;
	}

	if (ballX + dx > game.width - ballRadius || ballX + dx < ballRadius) {
		dx = -dx;
	}

	if (ballY + dy > game.height - ballRadius || ballY + dy < ballRadius) {
		dy = -dy;
	}

	if (start) {
		if (mobile) {
			nowInside(touchX, touchY);
		} else {
			nowInside(mouseX, mouseY);
		}
	}

	ballX += dx;
	ballY += dy;
	console.log(ballX);
	console.log(ballY);
	console.log(mouseX);
	console.log(mouseY);
}

gsap.to({}, 0.01, {
	repeat: -1,

	onRepeat: () => {
		if (mobile) {
			posX += (touchX - posX) / 5;
			posY += (touchY - posY) / 5;
		} else {
			posX += (mouseX - posX) / 5;
			posY += (mouseY - posY) / 5;
		}

		if (mobile) {
			gsap.set(cursor, {
				css: {
					left: touchX - 5,
					top: touchY - 5,
				}
			});

			gsap.set(trainingText, {
				css: {
					left: '50%',
					top: '90%',
					fontSize: 18,
				}
			});
		} else {
			gsap.set(cursor, {
				css: {
					left: mouseX - 5,
					top: mouseY - 5,
				}
			});

			gsap.set(trainingText, {
				css: {
					left: '50%',
					top: '90%',
				}
			});
		}

		gsap.set(hp, {
			css: {
				left: posX + 15,
				top: posY - 25,
			}
		});
	}
});

if (game.getContext) {
	if (mobile) {

		app.addEventListener("touchmove", e => {
			touchCoords(e);
			cursor.classList.remove("hidden");
			hp.classList.remove("hidden");
			trainingText.classList.remove("hidden");
		});

		app.addEventListener("touchstart", e => {
			startInterval = setInterval(draw, 10);
			trainingText.style.display = "none";
			start = true;
		}, {
			once: true
		});

	} else {

		app.addEventListener("mousemove", e => {
			mouseCoords(e);
			cursor.classList.remove("hidden");
			hp.classList.remove("hidden");
			trainingText.classList.remove("hidden");
		});

		app.addEventListener("mouseout", e => {
			cursor.classList.add("hidden");
			hp.classList.add("hidden");
			trainingText.classList.add("hidden");
		});

		app.addEventListener("click", e => {
			startInterval = setInterval(draw, 10);
			trainingText.style.display = "none";
			start = true;
		}, {
			once: true
		});
	}

	draw();

} else {
	// canvas-unsupported code here
}