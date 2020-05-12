
//
function Cell(i,j) {

  this.i = i;
  this.j = j;
  this.fScore = 0;
  this.gScore = 0;
  this.h = 0;
  this.neighbors = [];
  this.prev = undefined;
  this.block = false;

  if(random(1) < 0.3) {
    this.block = true;
  }

  this.show = function(color) {
    fill(color);

    if(this.block) {
      fill(0);
      /*
      noStroke(0);
      ellipse(this.i * w + (w/2), this.j * h + (h/2), w/2, h/2);
      */
    }

    rect(this.i * w, this.j * h, w, h);
  }

  this.addNeighbors = function() {
    let i = this.i;
    let j = this.j;

    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if(j < rows-1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j >0) {
      this.neighbors.push(grid[i-1][j-1]);
    }
    if(i < cols-1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if(i > 0 && j < rows-1) {
      this.neighbors.push(grid[i-1][j+1]);
    }
    if(i < cols-1 && j < rows-1) {
      this.neighbors.push(grid[i+1][j+1]);
    }
  }

  this.clicked = function() {
    let d = dist(mouseX, mouseY, this.i * w + (w/2), this.j * h + (h/2) );

    if(abs(d) < (w/2)) {
      this.block = true;
    }
  }


}
