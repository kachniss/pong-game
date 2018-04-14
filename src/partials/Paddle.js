import { SVG_NS, PADDLE } from '../settings.js';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = PADDLE.speed;
        this.score = PADDLE.score;
        this.upButton = up;
        this.downButton = down; 

        // document.addEventListener('keydown', event => {
        //     switch (event.key) {
        //       case up:
        //         this.up();
        //         break;
        //       case down:
        //         this.down();
        //         break;
        //     }
        // });
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

    incrementScore() {
        this.score++;
        this.height -= this.score/2;
        this.speed += this.score/4;
    }

    render(svg, keyPressed) {
        // create a paddle
        const paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'x', this.x);
        paddle.setAttributeNS(null, 'y', this.y);
        paddle.setAttributeNS(null, 'fill', 'white');

        // append to svg
        svg.appendChild(paddle);

        if (keyPressed[this.upButton]) {
			this.up();
		}
        
        if (keyPressed[this.downButton]) {
			this.down();
		}
    }
  }