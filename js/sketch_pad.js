class SketchPad{
    constructor(container, size=400){
        this.canvas = document.createElement('canvas'); // HTML5 canvas element
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        `
        container.appendChild(this.canvas);
        this.undoButton = document.createElement('button');
        this.undoButton.innerText = 'Undo';
        container.appendChild(this.undoButton);

        this.ctx = this.canvas.getContext('2d');

        // Private method
        this.#addEventListeners();

        this.reset();
    }

    reset(){
        this.path = [];
        this.isDrawing = false;
        this.#toggleUndoButton();
        this.#redraw();
    }

    #addEventListeners(){
        // only when mouse is in the canvas
        this.canvas.onmousedown = (e) => {
            this.path.push([this.#getMousePosition(e)]);
            this.#toggleUndoButton();
            this.#redraw();
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (e) => {
            if (this.isDrawing){
                this.path[this.path.length-1].push(this.#getMousePosition(e));
                // TODO(shunxian): normalize the path or the points, 2D matrix?
                // the path is used for us to connect the dots
                this.#redraw();
            }
        }
        this.canvas.onmouseup = (e) => {          
            this.isDrawing = false;
        }
        
        this.undoButton.onclick = (e) => {
            // NOTE(shunxian): should we allow pop from empty array?
            this.path.pop();
            this.#toggleUndoButton();
            this.#redraw();
        }
    }

    #getMousePosition(e){
        const rect = this.canvas.getBoundingClientRect();
        return [Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top)];
    }

    #toggleUndoButton(){
        this.undoButton.disabled = this.path.length == 0;
    }

    #redraw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        for (let i = 0; i < this.path.length; i++){
            this.ctx.beginPath();
            const line = this.path[i]; // [[x1,y1], [x2,y2], ...]
            this.ctx.moveTo(...line[0]);
            for (let j = 1; j < line.length; j++){
                this.ctx.lineTo(...line[j]);
            }
            this.ctx.stroke();
        }
        // TODO(shunxian): reset the canvas context?
    }
}