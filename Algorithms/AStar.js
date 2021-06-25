class AStar {
  constructor(G, v, target) {
    this.edgeTo = [];
    this.distTo = [];
    this.s = v;
    this.pq = new IndexPQ(G.V());
    this.allVisited = [];
    this.target = target;
    this.targetHit = false;

    this.targetXPos = this.target % blocksPerRow;
    this.targetYPos = Math.floor(this.target / blocksPerRow);

    for (i = 0; i < G.V(); i++) this.distTo[i] = Number.POSITIVE_INFINITY;

    this.distTo[v] = 0;
    this.pq.insert(v, 0);

    while (!this.pq.isEmpty() && !this.targetHit)
      this.relax(G, this.pq.delMin());
  }

  relax(G, v) {
    this.allVisited.push(v);
    for (let e of G.adjTo(v)) {
      var w = e.to();
      var h = this.heuristic(v);
      if (this.distTo[w] > this.distTo[v] + e.weight() + h) {
        this.distTo[w] = this.distTo[v] + e.weight() + h;
        this.edgeTo[w] = e;
        if (this.pq.contains(w)) this.pq.change(w, this.distTo[w]);
        else this.pq.insert(w, this.distTo[w]);
      }
      if (w == this.target) {
        this.targetHit = true;
        this.allVisited.push(w);
      }
    }
  }

  heuristic(v) {
    let vYPos = Math.floor(v / blocksPerRow);
    let vXPos = v % blocksPerRow;
    let squredDiff =
      (this.targetXPos - vXPos) ** 2 + (this.targetYPos - vYPos) ** 2;
    return Math.sqrt(squredDiff);
  }

  hasPathTo(v) {
    return this.distTo[v] < Number.POSITIVE_INFINITY;
  }

  vistiedPaths() {
    return this.allVisited;
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) alert("no path to " + v);
    let path = [];
    for (var e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from()]) {
      path.push(e.to());
    }
    path.push(this.s);
    return path;
  }
}
