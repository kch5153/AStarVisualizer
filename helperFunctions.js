
function removeFromArray(a, el) {
  for(let i = a.length-1; i >=0; i--) {
    if(a[i] == el) {
      a.splice(i,1);
    }
  }
}

// returns euclidian distance between two points
function heuristic(a,b) {
  const distance = dist(a.i, a.j, b.i, b.j);

  return distance;
}
