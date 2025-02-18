// Multi-layer perceptron
// class MLP {}

// Sum(a*x1+b*x2+c*x3...) > threshold == 1
// Plane equation
class NeuralNetwork {
  //  [5,4,3,2] 5 input, 4 hidden, 3 hidden, 2 output
  constructor(neurons_per_level) {
    // At least 1 level
    if (neurons_per_level.length < 2) {
      throw new Error("At least 2 levels are required");
    }
    this.levels = [];
    // Each level needs its own input size and its output size
    // Create 1 level for each input
    for (let i = 0; i < neurons_per_level.length - 1; i++) {
      let level = new Level(neurons_per_level[i], neurons_per_level[i + 1], i);
      level.randomInitialize();
      this.levels.push(level);
    }
  }
  // Must match the input size
  feedForward(inputs) {
    if (inputs.length !== this.levels[0].input_nodes.length) {
      throw new Error("Input size mismatch");
    }
    // link between the levels
    let outputs = inputs;
    // NOTE, we need to iterate through all levels
    for (let i = 0; i < this.levels.length; i++) {
      console.log(`Level [${i}]->[${i + 1}] input: ${outputs}`);
      outputs = this.levels[i].feedForward(outputs);
    }
    console.log(`Final output: ${outputs}`);
    return outputs;
  }
}

class Level {
  constructor(input_size, output_size, row) {
    this.input_nodes = new Array(input_size);
    for (let i = 0; i < this.input_nodes.length; i++) {
      this.input_nodes[i] = new Node(output_size, row, i);
      this.input_nodes[i].randomInitialize();
    }
    this.row = row;
    // output are values [0,1] one or zeros
    // Output threshold, a value above which the output is considered as 1
    this.output_biases = new Array(output_size);
    this.randomInitialize();
    // weight is per connection, there are total of input_size * output_size connections
  }
  randomInitialize() {
    // Math.random() returns [0,1)
    for (let i = 0; i < this.output_biases.length; i++) {
      this.output_biases[i] = Math.random();
    }
  }
  // [0.1, 0.2, 0.3, 0.4]
  feedForward(inputs) {
    let output_values = new Array(this.output_biases.length).fill(0);
    for (let i = 0; i < inputs.length; i++) {
      let outputs_from_single_input = this.input_nodes[i].feedForward(
        inputs[i]
      );
      for (let j = 0; j < outputs_from_single_input.length; j++) {
        // NOTE: we cannot add numbers to empty
        output_values[j] += outputs_from_single_input[j];
      }
    }
    return output_values.map((x, index) =>
      x > this.output_biases[index] ? 1 : 0
    );
  }
}

class Node {
  constructor(neighbors_count, row, column) {
    this.row = row;
    this.column = column;
    this.neighbors = new Array(neighbors_count);
  }
  // Initialize the edges with random values
  randomInitialize() {
    for (let i = 0; i < this.neighbors.length; i++) {
      this.neighbors[i] = Math.random();
    }
    console.log(
      `node[${this.row}][${this.column}] edge values: ${this.neighbors}`
    );
  }
  feedForward(input) {
    return this.neighbors.map((x) => x * input);
  }
}

// Unit test
if (require.main === module) {
  // if the current module is the main entry point of the program.
  let nn = new NeuralNetwork([3, 4, 2]);
  nn.feedForward([0, 0, 0]); // expect output [0,0]
  nn.feedForward([0.1, 0.22, 0.333]);
}
