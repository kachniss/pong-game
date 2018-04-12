import { SVG_NS, KEYS, PADDLE } from "../settings.js";
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.pause = false;
        document.addEventListener("keydown", event => {
            if (event.key === KEYS.spaceBar) {
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
	}

	render() {
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
		// if(!this.pause) {
			this.ball.render(svg);
		// }
		
		
	}
}