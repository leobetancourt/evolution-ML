function DNA(wih, who) {

  if (wih === undefined) {
    this.wih = new Matrix(12, 10);

    this.wih.randomize(true);
  } else {
    this.wih = wih;
  }

  if (who === undefined) {
    this.who = new Matrix(6, 12);

    this.who.randomize(false);
  } else {
    this.who = who;

  }

  this.nn = new NeuralNetwork('tanh', this.wih, this.who);

  this.calculateOutputs = function(inputs) {
    var outputs_ = this.nn.train(inputs);
    return outputs_;
  }

  this.crossover = function(partner) {

    var newwih = [];
    var newwho = [];

    var inputweights = this.wih.toArray();
    var hiddenweights = this.who.toArray();

    var pinputweights = partner.wih.toArray();
    var phiddenweights = partner.who.toArray();

    var mid1 = Math.floor(Math.random() * inputweights.length);
    for (var i = 0; i < inputweights.length; i++) {
      if (i > mid1) {
        newwih[i] = inputweights[i];
      } else {
        newwih[i] = pinputweights[i];
      }
    }

    var mid2 = Math.floor(Math.random() * hiddenweights.length);
    for (var i = 0; i < hiddenweights.length; i++) {
      if (i > mid2) {
        newwho[i] = hiddenweights[i];
      } else {
        newwho[i] = phiddenweights[i];
      }
    }

    //wih
    var inputw = [],
      i, k;

    for (i = 0, k = -1; i < newwih.length; i++) {
      if (i % 10 === 0) {
        k++;
        inputw[k] = [];
      }

      inputw[k].push(newwih[i]);
    }

    //who
    var hiddenw = [],
      l, m;

    for (l = 0, m = -1; l < newwho.length; l++) {
      if (l % 12 === 0) {
        m++;
        hiddenw[m] = [];
      }
      hiddenw[m].push(newwho[l]);
    }

    var wi = matrixify(inputw, 10);
    var wh = matrixify(hiddenw, 12);
    wi.mutate();
    wh.mutate();
    newdna = new DNA(wi, wh);
    return newdna;
  }

  this.mutation = function() {
    this.nn.mutate();
  }
}
