import { SVG_NS } from "../settings.js";
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		// create board
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);

		// paddle parameters
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		// create players
		this.player1 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, ((this.height - this.paddleHeight) / 2));
		this.player2 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.paddleWidth - this.boardGap), ((this.height - this.paddleHeight) / 2));

		// create a ball
		this.ball = new Ball(256, 128, 8);
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
		this.ball.render(svg);
	}
}