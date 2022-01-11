const app = document.querySelector(".app"),
	cursor = document.querySelector(".cursor"),
	hp = document.querySelector(".hp"),
	hearts = document.querySelectorAll(".heart"),
	circle = document.querySelector(".circle"),
	mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

mouseX = 0, mouseY = 0, posX = 0, posY = 0, touchX = 0, touchY = 0

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

	app.addEventListener("click", e => {
		hp.removeChild(hp.lastElementChild);
	})
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