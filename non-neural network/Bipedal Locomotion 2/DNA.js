function DNA(genesa, genesb) {

  if (genesa) {
    this.genesa = genesa;
  } else {
    this.genesa = [];

    for (var i = 0; i < 1000; i++) {
      this.genesa[i] = (Math.random() * 20) - 10;
    }
  }

  if (genesb) {
    this.genesb = genesb;
  } else {
    this.genesb = [];

    for (var i = 0; i < 1000; i++) {
      this.genesb[i] = (Math.random() * 20) - 10;
    }
  }

  this.crossover = function(partner) {

    var newgenesa = [];
    var newgenesb = [];

    var mid = Math.floor(Math.random() * this.genesa.length);
    for (var i = 0; i < this.genesa.length; i++) {
      if (i > mid) {
        newgenesa[i] = this.genesa[i];
      } else {
        newgenesa[i] = partner.genesa[i];
      }
    }

    for (var i = 0; i < this.genesb.length; i++) {
      if (i > mid) {
        newgenesb[i] = this.genesb[i];
      } else {
        newgenesb[i] = partner.genesb[i];
      }
    }
    return new DNA(newgenesa, newgenesb);
  }

  this.mutation = function() {
    for (var i = 0; i < this.genesa.length; i++) {
      if (Math.random() < 0.05) {
        this.genesa[i] = (Math.random() * 40) - 20;
      }
    }

    for (var i = 0; i < this.genesb.length; i++) {
      if (Math.random() < 0.05) {
        this.genesb[i] = (Math.random() * 40) - 20;
      }
    }
  }
}
