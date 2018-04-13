import { SVG_NS } from "../settings.js";

export default class Score {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
    
    render(svg, player) {
        // create score
        const score = document.createElementNS(SVG_NS, "text");
        score.textContent = player.score;
        score.setAttributeNS(null, "x", this.x);
        score.setAttributeNS(null, "y", this.y);
        score.setAttributeNS(null, "fill", "white");
        score.setAttributeNS(null, "font-family", "Silkscreen Web");
        score.setAttributeNS(null, "font-size", this.size);
        
        // append to svg
        svg.appendChild(score);

    }
  }