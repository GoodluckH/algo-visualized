/**** store elements to variables ******/
let canvas = document.getElementById("canvas");
let targetGenBtn = document.getElementById("targetGen");
let resetBtn = document.getElementById("reset");
let dfsBtn = document.getElementById("dfs");
let blocks = document.getElementsByClassName("block");
let bfsBtn = document.getElementById("bfs");
let algBtns = document.getElementById("runAlgos");
let dijBtns = document.getElementById("dijkstra");

var blockHeight = 10;
var blockWidth = 10;
var canvasHeight = canvas.clientHeight;
var canvasWidth = canvas.clientWidth;
var cols = canvasWidth / blockWidth;
var rows = canvasHeight / blockHeight;
var nBlocks = (canvasHeight * canvasWidth) / (blockHeight * blockWidth);

var weight = 2;

/**** set init conditions ******/
populate();
var start;
var end;
resetBtn.style.display = "none";


/**** button functions ******/
function populate() {
  canvas.style.cursor = "pointer";

  if (canvas.children.length != 0) {
    canvas.innerHTML = "";
    algBtns.style.display = "flex";
    resetBtn.style.display = "none";
  }

  for (i = 0; i < nBlocks; i++) {
    var block = document.createElement("div");
    block.className = "block";
    block.setAttribute("id", i);
    block.setAttribute("onClick", "setStart(" + i + ")");
    canvas.append(block);
  }
  // initAnimate();
  targetGen(); // comment this out if using initAnimate()
  setStart(Math.floor(Math.random() * nBlocks));
}

function target() {
  end = Math.floor(Math.random() * nBlocks);
  while (end == start) {
    end = Math.floor(Math.random() * nBlocks);
  }
  var blockTarget = document.getElementById(end);
  blockTarget.style.backgroundColor = "#e76f51";
}

function targetGen() {
  for (i = 0; i < nBlocks; i++) {
    if (i == start) continue;
    blocks[i].style.backgroundColor = "#023047";
  }
  target();
}

function setStart(id) {
  if (algBtns.style.display == "none") return;
  if (start != null && start != id) {
    blocks[start].style.backgroundColor = "#023047";
  }
  if (id == end) targetGen();
  blocks[id].style.backgroundColor = "#2a9d8f";
  start = id;
}

/********* Animations ********/
var init = [
  { transform: "scale(1.1)" },
  { transitionTimingFunction: "ease-in" },
];
var initTiming = {
  duration: 300,
};

function initAnimate() {
  for (let i = 0; i < nBlocks; i++) {
    (function (index) {
      setTimeout(() => blockAnimate(index), i * 1);
    })(i);
  }
}

function blockAnimate(index) {
  blocks[index].animate(init, initTiming);
  if (index == nBlocks - 1) {
    target();
  }
}

var prevBlock;

function pathAnimate(index) {
  blocks[index].style.border = "none";
  blocks[index].animate(init, initTiming);
  convertDivToLine(index, prevBlock);
}

function convertDivToLine(cur, prev) {
  if (Math.abs(cur - prev) == cols) {
    if (
      prev != start &&
      blocks[prev].children[0] != null &&
      blocks[prev].children[0].className == "horiBar"
    ) {
      blocks[prev].innerHTML = "";
      blocks[prev].style.transform = "scale(0.5)";
      blocks[prev].style.borderRadius = "50%";
      blocks[prev].style.backgroundColor = "#ffe8d6";
    }
    if (cur == end) {
      resetBtn.disabled = false;
      return;
    }
    let vertBar = document.createElement("div");
    vertBar.className = "vertBar";
    blocks[cur].append(vertBar);
  } else if (Math.abs(cur - prev) == 1) {
    if (
      prev != start &&
      blocks[prev].children[0] != null &&
      blocks[prev].children[0].className == "vertBar"
    ) {
      blocks[prev].innerHTML = "";
      blocks[prev].style.transform = "scale(0.5)";
      blocks[prev].style.borderRadius = "50%";
      blocks[prev].style.backgroundColor = "#ffe8d6";
    }
    if (cur == end) {
      resetBtn.disabled = false;
      return;
    }
    let horiBar = document.createElement("div");
    horiBar.className = "horiBar";
    blocks[cur].append(horiBar);
  } else {
    if (cur == end) {
      resetBtn.disabled = false;
      return;
    }
    blocks[cur].innerHTML = "";
    blocks[cur].style.transform = "scale(0.5)";
    blocks[cur].style.borderRadius = "50%";
    blocks[cur].style.backgroundColor = "#ffe8d6";
  }
  prevBlock = cur;
}

/********* Algo zone ********/
function runDFS() {
  initAlgo();
  let G = graphize(nBlocks);
  let dfsPath = new DFS(G, start);
  let solutionPath = dfsPath.pathTo(end).reverse();
  let markedPaths = dfsPath.vistiedPaths();
  visualize(markedPaths, solutionPath, 0.7);
}

function runBFS() {
  initAlgo();
  let G = graphize(nBlocks);
  let bfsPath = new BFS(G, start);
  let solutionPath = bfsPath.pathTo(end).reverse();
  let markedPaths = bfsPath.vistiedPaths();
  visualize(markedPaths, solutionPath, 0.7);
}

function runDijkstra() {
  initAlgo();
  let G = digraphize(nBlocks);
  let dijkstraPath = new Dijkstra(G, start, end);
  let solutionPath = dijkstraPath.pathTo(end).reverse();
  let markedPaths = dijkstraPath.vistiedPaths();
  visualize(markedPaths, solutionPath, 0.8);
}

function runAStar() {
  initAlgo();
  let G = digraphize(nBlocks);
  let AStarPath = new AStar(G, start, end);
  let solutionPath = AStarPath.pathTo(end).reverse();
  let markedPaths = AStarPath.vistiedPaths();
  visualize(markedPaths, solutionPath, 0.8);
}

/******** helper functions ******/

function visualize(markedPaths, solutionPath, speed) {
  for (let x = 0; x < markedPaths.length; x++) {
    if (markedPaths[x] == start) continue;
    (function (index) {
      setTimeout(() => {
        if (markedPaths[x] != end)
          blocks[markedPaths[x]].style.backgroundColor = "yellow";
        if (markedPaths[x - 1] != start && markedPaths[x - 1] != end)
          blocks[markedPaths[x - 1]].style.backgroundColor = "gray";

        if (x == markedPaths.length - 1) {
          if (markedPaths[x] != end)
            blocks[markedPaths[x]].style.backgroundColor = "gray";
          showPath(solutionPath, speed * 2);
        }
      }, x * speed);
    })(x);
  }
}

function showPath(paths, speed) {
  prevBlock = start;
  for (let x = 0; x < paths.length; x++) {
    if (paths[x] == start) continue;
    (function (index) {
      setTimeout(() => pathAnimate(paths[index]), x * speed);
    })(x);
  }
}

function graphize(v) {
  const G = new Graph(v);
  for (i = 0; i < nBlocks; i++) {
    link(G, i);
  }
  return G;
}

function digraphize(v) {
  const G = new EdgeWeightedDigraph(v);
  for (i = 0; i < nBlocks; i++) {
    weightedLink(G, i);
  }
  return G;
}

function link(G, i) {
  if (i % cols != cols - 1) G.addEdge(i, i + 1);
  if (i % cols != 0) G.addEdge(i, i - 1);
  if (i - cols >= 0) G.addEdge(i, i - cols);
  if (i + cols < rows * cols) G.addEdge(i, i + cols);
  
}

// for weighted graphs, diagonal blocks have a weight of 1.4, or sqrt(2)
function weightedLink(G, i) {
  if (i % cols != cols - 1) G.addEdge(new DirectedEdge(i, i + 1, 1 * weight));
  if (i % cols != 0) G.addEdge(new DirectedEdge(i, i - 1, 1 * weight));

  if (i + cols < rows * cols) {
      G.addEdge(new DirectedEdge(i, i + cols, 1 * weight));
      if (i % cols != cols - 1) G.addEdge(new DirectedEdge(i, i + cols + 1, 1.4 * weight));
      if (i % cols != 0) G.addEdge(new DirectedEdge(i, i + cols - 1, 1.4 * weight));
  }
  if (i - cols >= 0) {
    G.addEdge(new DirectedEdge(i, i - cols, 1 * weight));
      if (i % cols != cols - 1) G.addEdge(new DirectedEdge(i, i - cols + 1, 1.4 * weight))
      if (i % cols != 0) G.addEdge(new DirectedEdge(i, i - cols - 1, 1.4 * weight));
  }
}

function initAlgo() {
  algBtns.style.display = "none";
  resetBtn.style.display = "block";
  canvas.style.cursor = "default";
  resetBtn.disabled = true;
}
