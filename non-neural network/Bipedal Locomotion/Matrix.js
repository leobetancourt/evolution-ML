
function Matrix(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.matrix = new Array(rows);

  for (var i = 0; i < this.rows; i++) {
    this.matrix[i] = new Array(cols);

    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0;
    }
  }
}

Matrix.prototype.randomize = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      //this.matrix[i][j] = randomGaussian();
      this.matrix[i][j] = random(-2, 2);
    }
  }
}

Matrix.prototype.toArray = function() {
  // Add all the values to the array
  var arr = [];
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      arr.push(this.matrix[i][j]);
    }
  }
  return arr;
}

Matrix.fromArray = function(array) {
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
}

Matrix.prototype.copy = function() {
  var result = new Matrix(this.rows, this.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[i][j];
    }
  }
  return result;
}

Matrix.map = function(m, fn) {
  var result = new Matrix(m.rows, m.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = fn(m.matrix[i][j]);
    }
  }
  return result;
}

Matrix.dot = function(a, b) {
  // Won't work if columns of A don't equal columns of B
  if (a.cols != b.rows) {
    console.log("Incompatible matrix sizes!");
    return;
  }
  // Make a new matrix
  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {
      // Sum all the rows of A times columns of B
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.matrix[i][k] * b.matrix[k][j];
      }
      // New value
      result.matrix[i][j] = sum;
    }
  }
  return result;
}
