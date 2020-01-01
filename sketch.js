
"use strict";

function setup() {
	createCanvas(windowWidth, windowHeight)
	textAlign(CENTER)
	frameRate(30)
	textSize(32)
	color = random(50, 200)
	return
}

let color = 200
let rects = []
let limits = [ 50, 50, ]
// example: { x: 0, y: 0, w: 0, h: 0, ... }

function draw() {
	color = (50 + abs(200 - (frameCount % 400)))
	fill(color)
	stroke(color)
	background(255-color)
	if(!rects.map(r => rect(r.x, r.y, r.w, r.h)).length) {
		text("Drag to draw", width/2, height/2)
	}
	let r = getRect()
	if(r.w > limits[0] && r.h > limits[1]) {
		rect(r.x, r.y, r.w, r.h)
	}
	return
}

function getRect() {
	return {
		x: current.min.x,
		y: current.min.y,
		w: current.max.x - current.min.x,
		h: current.max.y - current.min.y,
	}
}

let current = {
	min: { x: NaN, y: NaN, },
	max: { x: NaN, y: NaN, },
}

function mousePressed() {
	current.min.x = mouseX
	current.min.y = mouseY
	current.max.x = mouseX
	current.max.y = mouseY
	return
}

function mouseReleased() {
	let rect = getRect()
	if(rect.w > limits[0] && rect.h > limits[1]) {
		rects.push(rect)
	}
	return
}

function mouseClicked() {
	let matches = rects.filter(r => (
		(r.x < mouseX && mouseX < (r.x + r.w))
		&&
		(r.y < mouseY && mouseY < (r.y + r.h))
	))
	matches.map(match => rects.splice(rects.indexOf(match), 1))
	return
}

function mouseDragged() {
	current.min.x = mouseX < current.min.x ? mouseX : current.min.x
	current.min.y = mouseY < current.min.y ? mouseY : current.min.y
	current.max.x = mouseX > current.max.x ? mouseX : current.max.x
	current.max.y = mouseY > current.max.y ? mouseY : current.max.y
	line(mouseX, mouseY, pmouseX, pmouseY)
	return
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	return
}
