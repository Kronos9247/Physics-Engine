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

const STATIC_BODY = 1;
const DYNAMIC_BODY = 0;


class BodyDef {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  getType() {
    return this.type;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

class FixtureDef {
  constructor(def, mass, shape) {
    this.bodydef = def;
    this.mass = mass;
    this.shape = shape;
    this.restitution = 0.5; //0-1
  }

  getBodyDef() {
    return this.bodydef;
  }

  getMass() {
    return this.mass;
  }

  getShape() {
    return this.shape;
  }
}

class World {
  constructor(gravity) {
    this.gravity = gravity;
    this.bodies = []; //dynamic / kinematic body list
    this.sbodies = []; //static-body list
  }

  createBody(fixDef) {
    let bodyDef = fixDef.getBodyDef();
    let body;

    if(bodyDef.type == STATIC_BODY) {
      body = new StaticBody(fixDef, bodyDef.getX(), bodyDef.getY());

      this.sbodies.push(body);
    }
    else {
      body = new Body(fixDef, bodyDef.getX(), bodyDef.getY());

      this.bodies.push(body);
    }

    body.world = this;

    return body;
  }

  collision(shape, x, y) {
    for(var i = 0; i < this.sbodies.length; i++) {
      let b2 = this.sbodies[i];

      if(shape.collision(x, y, b2.pos.x, b2.pos.y, b2.fixDef.shape) == true) return true;
    }

    return false;
  }

  update() {
    stroke(0);
    fill(255);
    for(let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].applyGravity(this.gravity);
      this.bodies[i].update();
    }
  }

  debug() {
    stroke(0);
    fill(255);
    for(let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].debug();
    }

    stroke(0, 255, 0);
    fill(100, 255, 100);
    for(let i = 0; i < this.sbodies.length; i++) {
      this.sbodies[i].debug();
    }
  }
}
