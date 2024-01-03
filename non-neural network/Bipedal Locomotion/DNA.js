function DNA(genes) {

  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];

    for (var i = 0; i < 6; i++) {
      this.genes[i] = [];
      for (var j = 0; j < 40; j++) {
        this.genes[i][j] = (Math.random() * 10) - 5;
      }
    }
  }

  this.crossover = function(partner) {

    var newgenes = [];

    for (var i = 0; i < this.genes.length; i++) {
      newgenes[i] = [];
      var mid = Math.floor(Math.random() * this.genes[i].length);
      for (var j = 0; j < this.genes[i].length; j++) {
        if (j > mid) {
          newgenes[i][j] = this.genes[i][j];
        } else {
          newgenes[i][j] = partner.genes[i][j];
        }
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function() {

    for (var i = 0; i < this.genes.length; i++) {
      for (var j = 0; j < this.genes[i].length; j++) {
        if (Math.random() < 0.05) {
          this.genes[i][j] = (Math.random() * 40) - 20;
        }
      }
    }
  }
}
