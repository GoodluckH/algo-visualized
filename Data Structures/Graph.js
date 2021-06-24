class Graph {
    constructor(v) {
        this.V = v;
        this.adj = [];
        // this.E = 0;
        for (i = 0; i < v; i++){
            this.adj[i] = new Set();
        }
    }

    adjTo(v){
        return this.adj[v];
    }

    addEdge(v, w){
        this.adj[v].add(w);
        this.adj[w].add(v);
        // this.E++;
    }

}