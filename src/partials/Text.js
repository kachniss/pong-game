import { SVG_NS } from '../settings.js';

export default class Text {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
    
    winner(svg, playerNo) {

      // winner's text color
      if (playerNo === 1) {
        this.color = 'green';
      } else {
        this.color = 'red';
      }
        // create winner field
        const winner = document.createElementNS(SVG_NS, 'text');
        winner.textContent = `Player ${playerNo} wins!`;
        winner.setAttributeNS(null, 'x', this.x);
        winner.setAttributeNS(null, 'y', this.y);
        winner.setAttributeNS(null, 'fill', this.color);
        winner.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        winner.setAttributeNS(null, 'font-size', this.size);

        // create winner field
        const restart = document.createElementNS(SVG_NS, 'text');
        restart.textContent = 'Press Space to restart';
        restart.setAttributeNS(null, 'x', this.x - 90);
        restart.setAttributeNS(null, 'y', this.y + 40);
        restart.setAttributeNS(null, 'fill', 'white');
        restart.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        restart.setAttributeNS(null, 'font-size', this.size);

        // append to svg
        svg.appendChild(winner);
        svg.appendChild(restart);
    }
  }