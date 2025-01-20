// import { drawPath } from '../common/draw_module.js';

class SketchPad {
  constructor(
    /*drawing_area=*/ container,
    size,
    /*callback=*/ on_redraw = null
  ) {
    this.on_redraw = on_redraw;
    this.canvas = document.createElement("canvas"); // HTML5 canvas element
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        `;
    container.appendChild(this.canvas);
    const new_div = document.createElement("div");
    container.appendChild(new_div);
    this.undoButton = document.createElement("button");
    this.undoButton.innerText = "UNDO";
    new_div.appendChild(this.undoButton);

    this.ctx = this.canvas.getContext("2d");

    // Private method
    this.#addEventListeners();

    this.reset();
  }

  reset() {
    this.path = [];
    this.isDrawing = false;
    this.#toggleUndoButton();
    this.#redraw();
  }

  #addEventListeners() {
    // only when mouse is in the canvas
    this.canvas.onmousedown = (e) => {
      this.path.push([this.#getMousePosition(e)]);
      this.#toggleUndoButton();
      this.#redraw();
      this.isDrawing = true;
    };
    this.canvas.onmousemove = (e) => {
      if (this.isDrawing) {
        this.path[this.path.length - 1].push(this.#getMousePosition(e));
        // TODO(shunxian): normalize the path or the points, 2D matrix?
        // the path is used for us to connect the dots
        this.#redraw();
      }
    };
    this.canvas.onmouseup = (e) => {
      this.isDrawing = false;
    };

    this.undoButton.onclick = (e) => {
      // NOTE(shunxian): should we allow pop from empty array?
      this.path.pop();
      this.#toggleUndoButton();
      this.#redraw();
    };
  }

  #getMousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];
  }

  #toggleUndoButton() {
    this.undoButton.disabled = this.path.length == 0;
  }

  #redraw() {
    // Imported via <script> tag in html
    drawPath(this.ctx, this.path);
    if (this.on_redraw) {
      this.on_redraw(this.path);
    }
  }
}
