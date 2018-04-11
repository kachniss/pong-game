import { SVG_NS } from "../settings.js";

export default class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    render(svg) {
        // create backround
        const boardBackground = document.createElementNS(SVG_NS, "rect");
        boardBackground.setAttributeNS(null, "width", this.width);
        boardBackground.setAttributeNS(null, "height", this.height);
        boardBackground.setAttributeNS(null, "x", 0);
        boardBackground.setAttributeNS(null, "y", 0);
        boardBackground.setAttributeNS(null, "fill", "#353535");
        
        // create middle line
        const middleLine = document.createElementNS(SVG_NS, "line");
        middleLine.setAttributeNS(null, "x1", this.width/2);
        middleLine.setAttributeNS(null, "x2", this.width/2);
        middleLine.setAttributeNS(null, "y1", 0);
        middleLine.setAttributeNS(null, "y2", this.height);
        middleLine.setAttributeNS(null, "stroke", "white");
        middleLine.setAttributeNS(null, "stroke-dasharray", 5);

        // append to svg
        svg.appendChild(boardBackground);
        svg.appendChild(middleLine);
    }
  }