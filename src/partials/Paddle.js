import { SVG_NS, PADDLE, KEYS } from "../settings.js";

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = PADDLE.speed;
        this.score = PADDLE.score;
        this.pause = false;
        document.addEventListener("keydown", event => {
            if (event.key === KEYS.spaceBar) {
                this.pause = !this.pause;
            }
        });

        document.addEventListener("keydown", event => {
            switch (event.key) {
              case up:
                if (!this.pause) {
                    this.up();
                }
                break;
              case down:
                if (!this.pause) {
                    this.down();
                }
                break;
            }
        });
    }

    // move up function
    up() {
        this.y =  Math.max(this.y - this.speed, 0);
    }

    // move down function
    down() {
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }
    
    coordinates() {
        let leftX = this.x;
        let rightX = this.x + this.width;
        let topY = this.y;
        let bottomY = this.y + this.height;
        return [leftX, rightX, topY, bottomY];
      }

    render(svg) {
        // create a paddle
        const paddle = document.createElementNS(SVG_NS, "rect");
        paddle.setAttributeNS(null, "width", this.width);
        paddle.setAttributeNS(null, "height", this.height);
        paddle.setAttributeNS(null, "x", this.x);
        paddle.setAttributeNS(null, "y", this.y);
        paddle.setAttributeNS(null, "fill", "white");

        // append to svg
        svg.appendChild(paddle);
    }
  }