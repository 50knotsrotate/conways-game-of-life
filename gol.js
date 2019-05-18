const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // g
var grid = [];
const rows = 50;

class Cell {
  constructor(x, y, size, current, newVal, pos) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.current = current;
    this.newVal = newVal;
    this.pos = pos;
    this.update = function() {
      var count = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          grid[(this.pos.x + j + rows) % rows][(this.pos.y + i + rows) % rows]
            .current && count++;
        }
      }
      this.current
        ? (this.newVal = count == 4 || count == 3)
        : (this.newVal = count == 3);
    };
  }
}

function createGrid() {
  for (let i = 0; i < rows; i++) {
    var _temp = [];
    for (let j = 0; j < rows; j++) {
      _temp.push(
        new Cell(
          j * (canvas.width / rows),
          i * (canvas.height / rows),
          canvas.width / rows,
          Math.random() > 0.5,
          null,
          { x: i, y: j }
        )
      );
    }

    grid.push(_temp);
  }
}
createGrid();

function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      context.beginPath();
      context.fillStyle = grid[i][j].current ? "black" : "white";
      context.rect(
        grid[j][i].x,
        grid[j][i].y,
        grid[i][j].size,
        grid[i][j].size
      );
      context.fill();
      context.stroke();
    }
  }
}

function go() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //check neighbors
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      grid[j][i].update();
    }
  }

  //set new to current
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      grid[j][i].current = grid[j][i].newVal;
      grid[j][i].newVal = null;
    }
  }
  drawGrid();
}
setInterval(go, 100);
