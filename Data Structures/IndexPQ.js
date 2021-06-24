class IndexPQ {
  constructor(v) {
    this.pq = [];
    this.keys = [];
    this.n = 0;
    this.qp = [];

    for (i = 0; i <= v; i++) {
      this.qp[i] = -1;
    }
  }

  insert(i, key) {
    this.n++;
    this.keys[i] = key;
    this.qp[i] = this.n;
    this.pq[this.n] = i;
    this.swim(this.n);
  }

  swim(k) {
    while (k > 1 && this.greater(Math.floor(k / 2), k)) {
      this.swap(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }

  size() {
    return this.n;
  }

  sink(k) {
    while (2*k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.greater(j, j + 1)) j++;
      if (!this.greater(k, j)) break;
      this.swap(k, j);
      k = j;
    }
  }

  delMin() {
    let min = this.pq[1];
    this.swap(1, this.n--);
    this.sink(1);
    this.qp[min] = -1;
    this.keys[min] = null;
    return min;
  }

  isEmpty() {
    return this.n == 0;
  }

  contains(i) {
    return this.qp[i] != -1;
  }

  change(i, key) {
    if (!this.contains(i)) alert("no such key");
    this.keys[i] = key;
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  greater(i, j) {
    return this.keys[this.pq[i]] - this.keys[this.pq[j]] > 0;
  }

  swap(i, j) {
    let temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }
}
