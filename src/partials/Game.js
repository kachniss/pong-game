import { SVG_NS, KEYS, PADDLE, SCORE } from "../settings.js";
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.pause = false;
        document.addEventListener("keydown", event => {
            if (event.key === KEYS.pause) {
                this.pause = !this.pause;
            }
        });

		// create board
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);

		// create players
		this.player1 = new Paddle(
			this.height,
			PADDLE.paddleWidth,
			PADDLE.paddleHeight,
			PADDLE.boardGap,
			((this.height - PADDLE.paddleHeight) / 2),
			KEYS.p1up,
			KEYS.p1down,
		);
		this.player2 = new Paddle(
			this.height,
			PADDLE.paddleWidth,
			PADDLE.paddleHeight,
			(this.width - PADDLE.paddleWidth - PADDLE.boardGap),
			((this.height - PADDLE.paddleHeight) / 2),
			KEYS.p2up,
			KEYS.p2down,
		);

		// create a ball
		this.ball = new Ball(8, this.width, this.height);

		// create a scoreboard
		this.score1 = new Score((this.width/2 - 50), SCORE.scoreY, SCORE.scoreSize);
		this.score2 = new Score((this.width/2 + 25), SCORE.scoreY, SCORE.scoreSize);

		// pause detection
		document.addEventListener("keydown", event => {
            if (event.key === KEYS.spaceBar) {
                this.pause = !this.pause;
            }
        });
	}

	render() {
		if(this.pause) {
			return;
		}

		this.gameElement.innerHTML = "";

		// create svg
		let svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS(null, "width", this.width);
		svg.setAttributeNS(null, "height", this.height);
		svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		// render all svg elements
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1);
		this.score2.render(svg, this.player2);
		
	}
}