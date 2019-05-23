const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // g
var grid = [];
const rows = 20;
var gameplay = false; //For pausing

document.addEventListener('keydown', (e) => { 
  if (e.keyCode == '32') { 
    gameplay = !gameplay
  }
})


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
      var newCell = new Cell(
        j * (canvas.width / rows),
        i * (canvas.height / rows),
        canvas.width / rows,
        false,
        null,
        { x: i, y: j }
      );
      _temp.push(newCell);
    }
    grid.push(_temp);
  }
}
createGrid();

canvas.addEventListener("click", e => {
  // var x = Math.floor((e.clientX - 8) / (canvas.width / rows) / (3));
  // var y = Math.floor(e.clientY / (canvas.height / rows) / 3);
  
  var x = Math.floor((e.clientX - 8) / (canvas.width / rows) /3 ) 
  var y = Math.floor((e.clientY - 8) / (canvas.width / rows) / 3)
  
  grid[y][x].current = !grid[y][x].current;
  //Each pixel is(canvas.PROP/rows long)
  // console.log(Math.floor( ((( e.clientX - 8) / (canvas.width/rows)) /3 )) )
  // console.log(canvas.width/rows)
});


function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
   
      if (grid[j][i].current) {
           context.beginPath();
           context.fillStyle = "black";
        context.rect(
          grid[j][i].x,
          grid[j][i].y,
          grid[j][i].size,
          grid[j][i].size
        );
        context.fill();
         context.stroke()
      } else { 
             context.beginPath();
             context.fillStyle = "white";
             context.rect(
               grid[j][i].x,
               grid[j][i].y,
               grid[j][i].size,
               grid[j][i].size
             );
             context.fill();
             context.stroke();

      }
    }
  }
}

function go() {
    
  if (gameplay) {
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
  }
  
drawGrid();
}
setInterval(go, 75);
