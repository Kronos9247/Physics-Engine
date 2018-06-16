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

class Shape {
  constructor() {

  }

  draw(x, y) {}

  collision(x, y, x2, y2, shape2) {}
}

class CircleShape extends Shape {
  constructor(radius) {
    super();

    this.radius = radius;
  }

  draw(x, y) {
    ellipse(x, y, radius * 2, radius * 2);
  }
}

class RectShape extends Shape {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;
  }

  draw(x, y) {
    rect(x, y, this.width, this.height);
  }

  collision(x, y, x2, y2, shape2) {
    super.collision(x, y, x2, y2, shape2);

    return RectShape.rectRect(x, y, this.width, this.height, x2, y2, shape2.width, shape2.height);
  }

  static rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    if (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h) {
      return true;
    }

    return false;
  }
}
