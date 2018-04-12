import { SVG_NS } from "../settings.js";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        // while(!this.vy) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        // }
        console.log(this.vy);
        this.vx = this.direction * (6 - Math.abs(this.vy));
        console.log(this.vx);
        this.reset();
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
    }

    move() {
        if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= this.boardHeight) {
            this.vy = this.vy * -1;
        }
        if ((this.x - this.radius) <= 0 || (this.x + this.radius) >= this.boardWidth) {
            this.vx = this.vx * -1;
        }
        this.x += this.vx;
        this.y += this.vy;
    }

    render(svg) {
        
        // create a ball
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "fill", "white");

        // append to svg
        svg.appendChild(ball);
        this.move();
    }
  }