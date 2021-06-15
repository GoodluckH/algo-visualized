class BFS{
    constructor(G, s){
        this.S = s;
        this.marked = [false];
        this.edgeTo = [];
        this.allVisited = [];
        this.bfs(G, s);
    }

    bfs(G, s) {
        this.marked[s] = true;
        let queue = [];
        queue.push(s);
        this.allVisited.push(s);
        
        while(queue.length != 0) {
            let w = queue.shift();
            for (let x of G.adjTo(w)) {
                if(!this.marked[x]) {
                    this.edgeTo[x] = w;
                    this.marked[x] = true;
                    queue.push(x);
                    this.allVisited.push(x);
                }
            }
        }
    }

    hasPathTo(v) {
        return this.marked[v];
      }
      
    vistiedPaths(){return this.allVisited; }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;
        let stack = [];
        for (let x = v; x != this.S; x = this.edgeTo[x]) stack.push(x);
        stack.push(this.S);
        return stack;
      }
}

