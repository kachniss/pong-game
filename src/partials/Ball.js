import { SVG_NS } from "../settings.js";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.ping = new Audio("public/sounds/pong-01.wav");
        this.reset();
    }

    reset() {
        // default ball position and speed vector
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        do {
            this.vy = Math.floor(Math.random() * 10 - 5);
        } while(this.vy === 0)
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    move() {
         // change the position
        this.x += this.vx;
        this.y += this.vy;
    }

    wallCollision(player1, player2) {
        // top and bottom wall bounce
        if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= this.boardHeight) {
            this.vy = this.vy * -1;
        }

        // left ball bounce
        if (this.x - this.radius <= 0) {
            this.direction = 1;
            this.reset();
            player2.incrementScore();
        }

        // right ball bounce
        if (this.x + this.radius >= this.boardWidth) {
            this.direction = -1;
            this.reset();
            player1.incrementScore();
        }
    }

    paddleCollision(player1, player2) {
        if(this.vx > 0) {
            // check for player 2 collision
            let [leftX, rightX, topY, bottomY] = player2.coordinates();
            if((this.x + this.radius >= leftX) && (this.x + this.radius <= rightX) && (this.y >= topY && this.y <= bottomY)) {
                this.vx = this.vx * -1;
                this.ping.play();
            }
        } else {
            // check for player 1 collision
            let [leftX, rightX, topY, bottomY] = player1.coordinates();
            if((this.x - this.radius >= leftX) && (this.x - this.radius <= rightX) && (this.y >= topY && this.y <= bottomY)) {
                this.vx = this.vx * -1;
                this.ping.play();
            }
        }
    }
 
    render(svg, player1, player2) {
        // create a ball
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "fill", "white");

        // append to svg
        svg.appendChild(ball);

        // move the ball if the game is not paused
        this.move();
        this.wallCollision(player1, player2);
        this.paddleCollision(player1, player2);
    }
  }