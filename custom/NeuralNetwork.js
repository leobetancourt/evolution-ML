


NeuralNetwork.sigmoid = function(x) {
  var y =  1 / (1 + Math.pow(Math.E, -x));
  return y;
}

NeuralNetwork.tanh = function(x) {
  var y = Math.tanh(x);
  return y;
}

// Adjust weights ever so slightly
function mutate(x) {
  if (Math.random() < 0.007) {
    return (Math.random() * 4) - 2;
  }
}

function NeuralNetwork(activation, wih, who) {

  this.inodes = inp;
  this.hnodes = hid;
  this.onodes = out;

  // These are the weight matrices
  // wih: weights from input to hidden
  // who: weights from hidden to output
  // weights inside the arrays are w_i_j
  // where link is from node i to node j in the next layer
  // Matrix is rows X columns
  this.wih = wih;
  this.who = who;

  if (activation == "tanh") {
    this.activation = NeuralNetwork.tanh;
  } else {
    this.activation = NeuralNetwork.sigmoid;
  }
}

NeuralNetwork.prototype.copy = function() {
  return new NeuralNetwork(this);
}

NeuralNetwork.prototype.mutate = function() {
  this.wih = Matrix.map(this.wih, mutate);
  this.who = Matrix.map(this.who, mutate);
}


NeuralNetwork.prototype.train = function(inputs_array) {

  //Turn inputs array into a matrix! Yay!
  var inputs = Matrix.fromArray(inputs_array);
  //The input to the hidden layer is the weights (wih) multiplied by inputs
  var hidden_inputs = Matrix.dot(this.wih, inputs);
  //The outputs of the hidden layer pass through a sigmoid/tanh activation function
  var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  var outputs = Matrix.map(output_inputs, this.activation);

  outputs = outputs.toArray();

  for (var i = 0; i < outputs.length; i++) {
    outputs[i] *= 5;
  }

  return outputs;
}
