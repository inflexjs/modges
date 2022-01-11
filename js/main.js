const app = document.querySelector(".app"),
	game = document.querySelector("#game"),
	ctx = game.getContext('2d'),
	cursor = document.querySelector(".cursor"),
	hp = document.querySelector(".hp"),
	hearts = document.querySelectorAll(".heart"),
	mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// window.addEventListener('resize', () => {
// 	// We execute the same script as before
// 	let vh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
// });
game.width = window.innerWidth;
game.height = window.innerHeight;

let start = false,
	mouseX = 0,
	mouseY = 0,

	posX = 0,
	posY = 0,

	touchX = Math.round(game.width / 2),
	touchY = Math.round(game.height / 2),

	ballX = Math.round(game.width / 2),
	ballY = Math.round(game.height / 2),

	dx = 2,
	dy = -2,

	ballRadius = 30,
	score = 0;

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

function getHit() {
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
	if ((deviceX - ballX) <= 25 && (deviceX - ballX) >= -25 && (deviceY - ballY) <= 25 && (deviceY - ballY) >= -25) {
		console.log(`Твой счет: ${score}`);
		score++;

	} else {
		console.log("Покинул область");
		getHit();
	}
}

function draw() {
	ctx.clearRect(0, 0, game.width, game.height);
	drawBall();

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
		} else {
			gsap.set(cursor, {
				css: {
					left: mouseX - 5,
					top: mouseY - 5,
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
		});

		app.addEventListener("touchstart", e => {
			setInterval(draw, 10);
			start = true;
		}, {
			once: true
		});

	} else {

		app.addEventListener("mousemove", e => {
			mouseCoords(e);
			cursor.classList.remove("hidden");
			hp.classList.remove("hidden");
		});

		app.addEventListener("mouseout", e => {
			cursor.classList.add("hidden");
			hp.classList.add("hidden");
		});

		app.addEventListener("click", e => {
			setInterval(draw, 10);
			start = true;
		}, {
			once: true
		});
	}

	draw();

} else {
	// canvas-unsupported code here
}