import { SVG_NS, KEYS } from "../settings.js";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset();
        this.pause = false;
        // console.log(pause);
        document.addEventListener("keydown", event => {
            if (event.key === KEYS.spaceBar) {
                this.pause = !this.pause;
            }
        });
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

    wallCollision() {
        // top and bottom wall bounce
        if ((this.y - this.radius) <= 0 || (this.y + this.radius) >= this.boardHeight) {
            this.vy = this.vy * -1;
        }

        // left ball bounce
        if (this.x - this.radius <= 0) {
            this.goal(2);
        }

        // right ball bounce
        if (this.x + this.radius >= this.boardWidth) {
            this.goal(1);
            
        }
    }

    paddleCollision(player1, player2) {
        if(this.vx > 0) {
            // check for player 2 collision
            let [leftX, rightX, topY, bottomY] = player2.coordinates();
            if((this.x + this.radius >= leftX) && (this.x + this.radius <= rightX) && (this.y >= topY && this.y <= bottomY)) {
                this.vx = this.vx * -1;
            }
        } else {
            // check for player 1 collision
            let [leftX, rightX, topY, bottomY] = player1.coordinates();
            if((this.x - this.radius >= leftX) && (this.x - this.radius <= rightX) && (this.y >= topY && this.y <= bottomY)) {
                this.vx = this.vx * -1;
            }
        }
    }

    goal(player) {
        if (player === 1) {
            this.direction = -1;
        } else {
            this.direction = 1;
        }
        this.reset();
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
        if(!this.pause) {
            this.move();
            this.wallCollision();
            this.paddleCollision(player1, player2);
        } 
    }
  }