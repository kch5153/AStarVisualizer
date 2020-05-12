// inefficiencies:
// 1.linear time search to see if current is in openSet or closedSet  solution:Tree search
// How could this be used in an application?

const cols = 50;
const rows = 50;
let grid = new Array(cols)

let openSet = [];
let closedSet = [];
let path = [];

let begin;
let end;
let playAnimation = false;

let w, h;



function startAnimation() {

  let endX = document.getElementById("end-x").value;
  let endY = rows - 1 -document.getElementById("end-y").value;

  if(endX.length != 0 && endY.lenght != 0) {

    if(endX >= 0 && endX <= cols-1 && endY >= 0 && endY <= rows-1) {
      if(grid[endX][endY].block === true) {
        console.log("Endpoint cannot be an obstacle");
      } else {
        end = grid[endX][endY];
      }
    }
  }

  console.log(endX < 230);

  openSet = [];
  closedSet = [];

  // reset algorithm
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].prev = undefined;
      grid[i][j].fScore = 0;
      grid[i][j].gScore = 0;
      grid[i][j].h = 0;
    }
  }


  openSet.push(begin);

  playAnimation = true;
  loop();
}


function setup() {
  let canvas = createCanvas(600,600);

  canvas.parent('sketch-holder');

  console.log('A*');

  w = width / cols;
  h = height / rows;


  openSet = [];
  closedSet = [];
  // make 2d array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // create grid
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // loop through again and add neighbors
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  begin = grid[0][0];
  end = grid[cols-1][rows-1];
  begin.block = false;
  end.block = false;

  openSet.push(begin);


  noLoop();
}

function mouseDragged() {

  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].clicked();
    }
  }

  redraw();

}

function mousePressed() {

  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].clicked();
    }
  }

  redraw();
}

function draw() {

  background(255);

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  if(openSet.length > 0 && playAnimation === true) {

    var lowestIndex = 0;
    for(var i = 0; i < openSet.length; i++) {
      if (openSet[i].fScore < openSet[lowestIndex].fScore){
        lowestIndex = i;
      }
    }

    let current = openSet[lowestIndex];

    if(current === end) {

      playAnimation = false;
      noLoop();

      console.log("done");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for(let i = 0; i < neighbors.length; i++) {

      var neighbor = neighbors[i];

      if(!closedSet.includes(neighbor) && !neighbor.block) {
        let tempG = current.gScore + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.gScore) {
            neighbor.gScore = tempG;
            newPath = true;
          }
        } else {
          neighbor.gScore = tempG;
          openSet.push(neighbor);
          newPath = true;
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.fScore = neighbor.gScore + neighbor.h;
          neighbor.prev = current;
        }

      }

    }


    // draw grid


    for(let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(255,0,0));
    }

    for(let i = 0; i < openSet.length; i++) {
      openSet[i].show(color(0,255,0));
    }

    path = [];
    let temp = current;
    path.push(temp);
    while(temp.prev) {
      path.push(temp.prev);
      temp = temp.prev;
    }

    for(var i = 0; i < path.length; i++) {
      path[i].show(color(0,0,255));
    }
/*
    noFill();
    stroke(0, 100, 50);
    strokeWeight(w/2);

    beginShape();
    for(var i = 0; i < path.length; i++) {
      vertex(path[i].i*w + (w/2), path[i].j*h + (h/2));
    }
    endShape();
*/
  } else {
    playAnimation = false;
    noLoop();
    return;
    // no solution
  }




}
