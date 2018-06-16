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

class BodyBase {
  constructor(fixDef, x, y) {
    this.fixDef = fixDef;

    this.pos = createVector(x, y);
    this.mass = 1; // in kg the si-unit for mass
  }

  debug() {
    this.fixDef.getShape().draw(this.pos.x, this.pos.y);
  }

  update() {

  }

  applyGravity(grav) {

  }
}

class StaticBody extends BodyBase {
  constructor(fixDef, x, y) {
    super(fixDef, x, y);
  }
}

class Body extends BodyBase {
  constructor(fixDef, x, y) {
    super(fixDef, x, y);

    this.vel = createVector();
    this.acc = this.vel.copy();
  }

  applyImpuls(impuls) { //in Ns (newton second)
    this.vel.add(impuls.copy().div(this.mass));
  }

  applyForce(force) { //in N (newton)
    this.acc.add(force.copy().div(this.mass));
  }

  applyGravity(grav) {
    super.applyGravity(grav);

    this.acc.add(grav);
  }

  checkCollision() {
    this.world.collision(this);
  }

  checkVel(pos, vel) {
    var out = pos;
    var restitution = Math.max(0, this.fixDef.restitution);

    if(!this.world.collision(this.fixDef.shape, pos.x + vel.x, pos.y)) {
      out.x = out.x + vel.x
    }
    else {
      this.applyImpuls(createVector(-vel.x * restitution, 0));
    }

    if(!this.world.collision(this.fixDef.shape, pos.x, pos.y + vel.y)) {
      out.y = out.y + vel.y
    }
    else {
      this.applyImpuls(createVector(0, -vel.y * restitution));
    }

    return out;
  }

  update() {
    //m * a = F
    //p = m * v
    //p = F * deltaT

    this.vel.add(this.acc);
    //this.pos.add(this.vel);
    this.pos = this.checkVel(this.pos, this.vel);

    this.vel.limit(20);
    this.vel.mult(0.99);

    this.acc.x = 0;
    this.acc.y = 0;
  }
}

class DynamicBody extends Body {
  update() {
    //this.acc.add();

    super.update();
  }
}
