const app = document.querySelector(".app"),
	cursor = document.querySelector(".cursor"),
	hp = document.querySelector(".hp"),
	hearts = document.querySelectorAll(".heart"),
	circle = document.querySelector(".circle");

mouseX = 0, mouseY = 0, posX = 0, posY = 0

function mouseCoords(e) {
	mouseX = e.pageX
	mouseY = e.pageY
}

app.addEventListener("mousemove", e => {
	mouseCoords(e);
	cursor.classList.remove("hidden");
	hp.classList.remove("hidden");
})

app.addEventListener("touchmove", e => {
	mouseCoords(e);
	cursor.classList.remove("hidden");
	hp.classList.remove("hidden");
})

app.addEventListener("mouseout", e => {
	cursor.classList.add("hidden");
	hp.classList.add("hidden");
})

app.addEventListener("click", e => {
	console.log(e.target);
	hp.removeChild(hp.lastElementChild);
})

circle.addEventListener("mouseenter", e => {
	console.log(mouseX)
	console.dir(circle)
	if (box.pageX == mouseX) {
		console.log('Hi')
	}
})

gsap.to({}, .01, {
	repeat: -1,

	onRepeat: () => {
		posX += (mouseX - posX) / 5
		posY += (mouseY - posY) / 5

		gsap.set(cursor, {
			css: {
				left: mouseX - 5,
				top: mouseY - 5,
			}
		})

		gsap.set(hp, {
			css: {
				left: posX + 10,
				top: posY - 20,
			}
		})
	}
})