class DFS {
  constructor(G, s) {
    this.marked = [false];
    this.edgeTo = [];
    this.S = s;
    this.allVisited = [];
    this.dfs(G, this.S);
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.allVisited.push(v);
    for (let x of G.adjTo(v)) {
      if (!this.marked[x]) {
        this.edgeTo[x] = v;
        this.dfs(G, x);
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v];
  }
  vistiedPaths() {
    return this.allVisited;
  }
  pathTo(v) {
    if (!this.hasPathTo(v)) return null;
    let stack = [];
    for (let x = v; x != this.S; x = this.edgeTo[x]) stack.push(x);
    stack.push(this.S);
    return stack;
  }
}
