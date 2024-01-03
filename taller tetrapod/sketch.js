var clicked; 
var data;

var nn = function(p) {

  var inputNodes = [];
  var hiddenNodes = [];
  var outputNodes = [];
  var wih;
  var who;
  var hidden_outputs;
  var hiddens;

  p.setup = function() {
    var cvs = p.createCanvas(400, 450);
    cvs.position(p.windowWidth - 400, 10);

    clicked = false;

    for (var i = 0; i < 8; i++) {
      inputNodes.push(new Node('input', 50, 75 + (22.5 * i)));
    }

    for (var i = 0; i < 10; i++) {
      hiddenNodes.push(new Node('hidden', 200, 55 + (22.5 * i)));
    }

    for (var i = 0; i < 4; i++) {
      outputNodes.push(new Node('output', 350, 145 + (22.5 * i)));
    }

    wih = new Array(hiddenNodes.length);

    for (var i = 0; i < wih.length; i++) {
      wih[i] = new Array(inputNodes.length);
    }

    for (var i = 0; i < wih.length; i++) {
      for (var j = 0; j < wih[i].length; j++) {
        wih[i][j] = new Synapse(inputNodes[j].x, inputNodes[j].y, hiddenNodes[i].x, hiddenNodes[i].y);
      }
    }

    who = new Array(outputNodes.length);

    for (var i = 0; i < who.length; i++) {
      who[i] = new Array(hiddenNodes.length);
    }

    for (var i = 0; i < who.length; i++) {
      for (var j = 0; j < who[i].length; j++) {
        who[i][j] = new Synapse(hiddenNodes[j].x, hiddenNodes[j].y, outputNodes[i].x, outputNodes[i].y);
      }
    }

    var toggle = document.getElementById("container3");
    var toggletext = document.getElementById("nntoggle");
    toggle.addEventListener("click", function() {
      if (clicked === false) {
        clicked = true;
        toggletext.innerHTML = "Hide Neural Activity";
      } else {
        clicked = false;
        toggletext.innerHTML = "Show Neural Activity"
      }
    });
  }

  p.draw = function() {
    p.background('#161616');

    p.noFill();
    //stroke(255);
    //rect(0, 0, 399, 249);
    if (counter > 1 && clicked === true) {
      //Neural Activity
      p.noStroke();
      p.fill(255);
      p.textSize(16);
      p.text('Neural Activity', 150, 20);

      for (var i = 0; i < wih.length; i++) {
        for (var j = 0; j < wih[i].length; j++) {
          wih[i][j].show();
          if (population.popsize === 30) {
            var inputss = population.creatures[population.bestCreature].inputs;
            var weightedSum = inputss[j] * population.creatures[population.bestCreature].dna.wih.matrix[i][j];
            var r = p.map(weightedSum, -2, 2, 255, 66);
            var g = p.map(weightedSum, -2, 2, 101, 211);
            var b = p.map(Math.abs(weightedSum), 0.9, 2, 0, 255)

            if (weightedSum >= 0) {
              wih[i][j].color = p.color(66, g, 109, b);
            } else {
              wih[i][j].color = p.color(r, 101, 109, b);
            }
          } else if (population.popsize === 1) {
            var inputss = population.creatures[0].inputs;
            var weightedSum = inputss[j] * population.creatures[0].dna.wih.matrix[i][j];
            var r = p.map(weightedSum, -2, 2, 255, 66);
            var g = p.map(weightedSum, -2, 2, 101, 211);
            var b = p.map(Math.abs(weightedSum), 0.9, 2, 0, 255)

            if (weightedSum >= 0) {
              wih[i][j].color = p.color(66, g, 109, b);
            } else {
              wih[i][j].color = p.color(r, 101, 109, b);
            }
          }
        }
      }

      for (var i = 0; i < inputNodes.length; i++) {
        inputNodes[i].show();
        if (population.popsize === 30) {
          var inputss = population.creatures[population.bestCreature].inputs;
          var b = p.map(inputss[i], 1, -1, 255, 0);

          inputNodes[i].color = p.color(b, 255);
        } else if (population.popsize === 1) {
          var inputss = population.creatures[0].inputs;
          var b = p.map(inputss[i], 1, -1, 255, 0);

          inputNodes[i].color = p.color(b, 255);
        }
      }

      for (var i = 0; i < hiddenNodes.length; i++) {
        hiddenNodes[i].show();
        if (population.popsize === 30) {
          var inputss = population.creatures[population.bestCreature].inputs;
          var inputs = Matrix.fromArray(inputss);
          var wihh = population.creatures[population.bestCreature].dna.wih;
          hidden_inputs = Matrix.dot(wihh, inputs);
          hidden_outputs = Matrix.map(hidden_inputs, NeuralNetwork.tanh);
          hiddens = hidden_outputs;
          hidden_outputs = hidden_outputs.toArray();

          var b = p.map(hidden_outputs[i], -1, 1, 0, 255);
          hiddenNodes[i].color = p.color(b, 255);

        } else if (population.popsize === 1) {
          var inputss = population.creatures[0].inputs;
          var inputs = Matrix.fromArray(inputss);
          var wihh = population.creatures[0].dna.wih;
          var hidden_inputs = Matrix.dot(wihh, inputs);
          var hidden_outputs = Matrix.map(hidden_inputs, NeuralNetwork.tanh);
          var hiddens = hidden_outputs;
          hidden_outputs = hidden_outputs.toArray();

          var b = p.map(hidden_outputs[i], -1, 1, 0, 255);
          hiddenNodes[i].color = p.color(b, 255);
        }
      }

      for (var i = 0; i < who.length; i++) {
        for (var j = 0; j < who[i].length; j++) {
          who[i][j].show();
          if (population.popsize === 30) {
            var hiddenInputs = hidden_outputs;
            var weightedSumm = hiddenInputs[j] * population.creatures[population.bestCreature].dna.who.matrix[i][j];
            var r = p.map(weightedSumm, -2, 2, 255, 66);
            var g = p.map(weightedSumm, -2, 2, 101, 211);
            var b = p.map(Math.abs(weightedSumm), 0.9, 2, 0, 255)

            if (weightedSumm >= 0) {
              who[i][j].color = p.color(66, g, 109, b);
            } else {
              who[i][j].color = p.color(r, 101, 109, b);
            }
          } else if (population.popsize === 1) {
            var hiddenInputs = hidden_outputs;
            var weightedSumm = hiddenInputs[j] * population.creatures[0].dna.who.matrix[i][j];
            var r = p.map(weightedSumm, -2, 2, 255, 66);
            var g = p.map(weightedSumm, -2, 2, 101, 211);
            var b = p.map(Math.abs(weightedSumm), 0.9, 2, 0, 255)

            if (weightedSumm >= 0) {
              who[i][j].color = p.color(66, g, 109, b);
            } else {
              who[i][j].color = p.color(r, 101, 109, b);
            }
          }
        }
      }

      for (var i = 0; i < outputNodes.length; i++) {
        outputNodes[i].show();
        if (population.popsize === 30) {
          var output_inputs = Matrix.dot(population.creatures[population.bestCreature].dna.who, hiddens);
          var outputs = Matrix.map(output_inputs, NeuralNetwork.tanh);
          outputs = outputs.toArray();

          var b = p.map(outputs[i], -1, 1, 0, 255);
          outputNodes[i].color = p.color(b, 255);

        } else if (population.popsize === 1) {
          var output_inputs = Matrix.dot(population.creatures[0].dna.who, hiddens);
          var outputs = Matrix.map(output_inputs, NeuralNetwork.tanh);
          outputs = outputs.toArray();

          var b = p.map(outputs[i], -1, 1, 0, 255);
          outputNodes[i].color = p.color(b, 255);
        }
      }
    }
  }

  function Node(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.color = p.color(255, 255, 255, this.alpha);
    this.strokeColor = p.color(255);

    this.show = function() {
      p.strokeWeight(1);
      p.stroke(this.strokeColor);
      p.fill(this.color);
      p.ellipse(this.x, this.y, 15, 15);
    }
  }

  function Synapse(ax, ay, ex, ey) {
    this.sx = ax;
    this.sy = ay;
    this.ex = ex;
    this.ey = ey;

    this.alpha = 100;
    this.color = p.color(207, 211, 109, this.alpha);
    //this.color = color(211, 66, 66, this.alpha);

    this.show = function() {
      p.strokeWeight(1);
      p.stroke(this.color);
      p.line(this.sx, this.sy, this.ex, this.ey);
    }
  }
}

var on = false;

var myp5 = new p5(nn, 'container');

var graph = function(p) {

  var x = 1;
  data = [p.createVector(0, 0)];
  var localBest = 0;
  var startup = false;

  p.setup = function() {

    p.createCanvas(p.windowWidth, 200);
    p.background('#161616');
	  
  }

  p.draw = function() {
    if (deathcount === population.creatures.length || counter == lifespan - 1) {
      p.background('#161616');
      var bestFitness = population.creatures[population.bestCreature].fitness;
      if (bestFitness > localBest) {
        localBest = bestFitness;
      }

      data.push(p.createVector(x, bestFitness));

      x++;
    }

    if (clicked && counter > 1) {

      for (var i = 0; i < data.length; i++) {
        p.fill(255);
        p.strokeWeight(0.5);
        p.stroke(255);

        if (i === 0) {
          //p.ellipse(data[i].x, p.map(data[i].y, 0, localBest, 200, 10), 1, 1);
        } else if (i > 0) {
          p.ellipse((p.windowWidth) / (data.length - 1) * (i), p.map(data[i].y, 0, localBest, 200, 10), 1, 1);
        }

        if (i < data.length - 1 && data.length != 1) {
          p.line((p.windowWidth) / (data.length - 1) * (i), p.map(data[i].y, 0, localBest, 200, 10), (p.windowWidth) / (data.length - 1) * (i + 1), p.map(data[i + 1].y, 0, localBest, 200, 10));
        }
      }
    } else {
		p.background('#161616');
	}
  }
}

var myp5 = new p5(graph, 'graph');
