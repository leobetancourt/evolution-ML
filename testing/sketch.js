function positionCanvas(x, y, canvas) {
  canvas.parent(document.getElementById('container'));
  canvas.position(x, y);
}

var inputNodes = [];
var hiddenNodes = [];
var outputNodes = [];
var wih = [];
var who = [];

function setup() {
  var cvs = createCanvas(400, 250);

  positionCanvas(0, 30, cvs);

  for (var i = 0; i < 14; i++) {
    inputNodes.push(new Node('input', 50, 25 + (15 * i)));
  }

  for (var i = 0; i < 16; i++) {
    hiddenNodes.push(new Node('input', 200, 15 + (15 * i)));
  }

  for (var i = 0; i < 8; i++) {
    outputNodes.push(new Node('output', 350, 70 + (15 * i)));
  }

  for (var i = 0; i < inputNodes.length; i++) {
    for (var j = 0; j < hiddenNodes.length; j++) {
      wih.push(new Synapse(inputNodes[i].x, inputNodes[i].y, hiddenNodes[j].x, hiddenNodes[j].y));
    }
  }

  for (var i = 0; i < hiddenNodes.length; i++) {
    for (var j = 0; j < outputNodes.length; j++) {
      who.push(new Synapse(hiddenNodes[i].x, hiddenNodes[i].y, outputNodes[j].x, outputNodes[j].y));
    }
  }
}

function draw() {
  background(38, 38, 38);

  noFill();
  stroke(255);
  //rect(0, 0, 399, 249);

  for (var i = 0; i < wih.length; i++) {
    wih[i].show();
    wih[i].color = color(random(255), 0, 0, random(100));
  }

  for (var i = 0; i < who.length; i++) {
    who[i].show();
    who[i].color = color(random(255), 0, 0, random(100));
  }

  for (var i = 0; i < inputNodes.length; i++) {
    inputNodes[i].show();
  }

  for (var i = 0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].show();
  }

  for (var i = 0; i < outputNodes.length; i++) {
    outputNodes[i].show();
  }
}

function Node(type, x, y) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.alpha = 100;
  this.color = color(0, 255, 0, this.alpha);

  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }
}

function Synapse(ax, ay, ex, ey) {
  this.sx = ax;
  this.sy = ay;
  this.ex = ex;
  this.ey = ey;

  this.alpha = 100;
  this.color = color(255, 0, 0, this.alpha);

  this.show = function() {
    stroke(this.color);
    line(this.sx, this.sy, this.ex, this.ey);
  }
}
