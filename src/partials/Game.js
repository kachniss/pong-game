import { SVG_NS, KEYS, PADDLE, SCORE } from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Text from './Text';

export default class Game {
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.pause = false;
		this.keyPressed = {};
        document.addEventListener('keydown', (event) => {
            this.keyPressed[event.key] = true;
         }, false);
         document.addEventListener('keyup', (event) => {
            this.keyPressed[event.key] = false;
         }, false);

        document.addEventListener('keydown', event => {
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
		this.ball = new Ball(this.width, this.height);
		this.ball2 = new Ball(this.width, this.height);

		// create a scoreboard
		this.score1 = new Score((this.width/2 - 50), SCORE.scoreY, SCORE.scoreSize);
		this.score2 = new Score((this.width/2 + 25), SCORE.scoreY, SCORE.scoreSize);

		this.text = new Text(this.width/2 - 120, this.height/2 - 20, SCORE.scoreSize);
	}

	reset(player) {
		player.score = 0;
		player.y = ((this.height - PADDLE.paddleHeight) / 2);
		player.height = PADDLE.paddleHeight;
	}

	render() {
		// pause detection
		if (this.keyPressed[KEYS.spaceBar]) {
			this.pause = !this.pause;
		}
		
		if(this.pause) {
			if(this.player1.score === 0 || this.player2.score === 0) {
				document.getElementById("pause").style.visibility  = "hidden";
			} else {
				document.getElementById("pause").style.visibility  = "visible";
			}
			return;
		} else {
			console.log("unpaused");
			document.getElementById("pause").style.visibility  = "hidden";
		}
		

		this.gameElement.innerHTML = '';

		// create svg
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		// render all svg elements
		this.board.render(svg);
		this.player1.render(svg, this.keyPressed);
		this.player2.render(svg, this.keyPressed);
		this.ball.render(svg, this.player1, this.player2);
		this.ball2.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1);
		this.score2.render(svg, this.player2);

		

		if(this.player1.score === 10) {
			this.text.winner(svg, 1);
			this.pause = true;
			this.reset(this.player1);
			this.reset(this.player2);
			this.ball.reset();
			this.ball2.reset();
		}

		if(this.player2.score === 10) {
			this.text.winner(svg, 2);
			this.pause = true;
			this.reset(this.player1);
			this.reset(this.player2);
			this.ball.reset();
			this.ball2.reset();
		}
	}
}