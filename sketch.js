/*
  A example physics engine written in javascript using p5.js
  
  Copyright (C) 2018  Rafael Orman

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

let wld;
function setup() {
  //createCanvas(700, 700);
  fullScreen(40);

  wld = new World(new p5.Vector(0, 9/100));

  sbox(105, 150, 350, 10);

  sbox(20, 20, width - 40, 40);
  sbox(20, height - 60, width - 40, 40);
  sbox(20, 20, 40, height - 40);
  sbox(width - 60, 20, 40, height - 40);
}

function draw() {
  background(51);

  wld.update();
  wld.debug();
}

function sbox(x, y, width, height) {
  let fixDef = new FixtureDef(new BodyDef(STATIC_BODY, x, y), 1, new RectShape(width, height));
  let body = wld.createBody(fixDef);
}

function mousePressed() {
  let fixDef = new FixtureDef(new BodyDef(DYNAMIC_BODY, mouseX, mouseY), 1, new RectShape(20, 20));
  let body = wld.createBody(fixDef);
}

function applyEffect(effect) {
  for(let i = 0; i < wld.bodies.length; i++) {
    let body = wld.bodies[i];

    effect(body);
  }
}

function effect_Jump(body) {
  body.applyImpuls(new p5.Vector(0, -2.5));
}

function keyPressed() {
  if(keyCode == 32) { //SPACE
    applyEffect(effect_Jump);
  }
}

function fullScreen(offset, offsetY) {
  let x = offset;
  let y = offset;

  if(offsetY !== undefined) {
    y = offsetY;
  }

  let cnv = createCanvas(window.innerWidth - x, window.innerHeight - y);
  //cnv.position(x / 2, y / 2);

  return cnv;
}
