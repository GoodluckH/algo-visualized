class EdgeWeightedDigraph {
  constructor(v) {
    this.vV = v;
    this.adj = [];
    for (i = 0; i < v; i++) {
      this.adj[i] = new Set();
    }
  }

  adjTo(v) {
    return this.adj[v];
  }

  V() {return this.vV;}

  addEdge(e) {
    this.adj[e.from()].add(e);
  }
}
