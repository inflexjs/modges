const app = document.querySelector(".app"),
	game = document.querySelector("#game"),
	ctx = game.getContext('2d'),
	cursor = document.querySelector(".cursor"),
	hp = document.querySelector(".hp"),
	hearts = document.querySelectorAll(".heart"),
	circle = document.querySelector(".circle"),
	mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// window.addEventListener('resize', () => {
// 	// We execute the same script as before
// 	let vh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
// });

if (game.getContext) {

	mouseX = 580, mouseY = 484, posX = 580, posY = 484, touchX = -5, touchY = -5

	function mouseCoords(e) {
		mouseX = e.pageX
		mouseY = e.pageY
	}

	function touchCoords(e) {
		touchX = e.touches[0].clientX;
		touchY = e.touches[0].clientY;
	}

	if (mobile) {

		app.addEventListener("touchmove", e => {
			touchCoords(e);
			cursor.classList.remove("hidden");
			hp.classList.remove("hidden");
		})

		app.addEventListener("click", e => {
			hp.removeChild(hp.lastElementChild);
		})

	} else {

		app.addEventListener("mousemove", e => {
			mouseCoords(e);
			cursor.classList.remove("hidden");
			hp.classList.remove("hidden");
		})

		app.addEventListener("mouseout", e => {
			cursor.classList.add("hidden");
			hp.classList.add("hidden");
		})

		// app.addEventListener("click", e => {
		// 	hp.removeChild(hp.lastElementChild);
		// })
	}

	gsap.to({}, .01, {
		repeat: -1,

		onRepeat: () => {
			if (mobile) {
				posX += (touchX - posX) / 5
				posY += (touchY - posY) / 5
			} else {
				posX += (mouseX - posX) / 5
				posY += (mouseY - posY) / 5
			}

			if (mobile) {
				gsap.set(cursor, {
					css: {
						left: touchX - 5,
						top: touchY - 5,
					}
				})
			} else {
				gsap.set(cursor, {
					css: {
						left: mouseX - 5,
						top: mouseY - 5,
					}
				})
			}

			gsap.set(hp, {
				css: {
					left: posX + 10,
					top: posY - 20,
				}
			})
		}
	})

	game.width = window.innerWidth;
	game.height = window.innerHeight;

	let ballX = Math.round(game.width / 2),
		ballY = Math.round(game.height / 2),
		dx = 1,
		dy = -1,
		ballRadius = 30,
		paddleHeight = 10,
		paddleWidth = 10,
		paddleX = (game.width - paddleWidth) / 2,
		paddleY = (game.height - paddleHeight) - 30;

	function drawBall() {
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = "#303030";
		ctx.fill();
		ctx.closePath();
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

		// if ((mouseX + 5) - (ballX + 15) > 15 || (mouseY + 5) - (ballY + 15) > 15) {
		// 	console.log("hi");
		// }

		if ((mouseX - ballX) <= 35 && (mouseX - ballX) >= -35) {
			if ((mouseY - ballY) <= 35 && (mouseY - ballY) >= -35) {
				console.log("hi")
			}
		}

		// ballX += dx;
		// ballY += dy;
		// console.log(ballX);
		// console.log(ballY);
		// console.log(mouseX);
		// console.log(mouseY);
	}

	setInterval(draw, 10);

} else {
	// canvas-unsupported code here
}