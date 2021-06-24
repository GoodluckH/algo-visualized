class DirectedEdge {
    constructor(v, w, weight) {
        this.v = v;
        this.w = w;
        this.Weight = weight;
    }
    
    from() {return this.v;}
    to() {return this.w;}
    weight() {return this.Weight;}
}