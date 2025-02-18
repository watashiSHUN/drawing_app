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
    // Each level needs its own size and its output size
    // Create 1 level for each input
    for (let i = 0; i < neurons_per_level.length - 1; i++) {
      let level = new Level(neurons_per_level[i], neurons_per_level[i + 1]);
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
    for (let i = 0; i < this.levels.length - 1; i++) {
      outputs = this.levels[i].feedForward(outputs);
    }
    return outputs;
  }
}

class Level {
  constructor(input_size, output_size) {
    // TODO, what's the input range?
    this.input_nodes = new Array(input_size);
    for (let i = 0; i < this.input_nodes.length; i++) {
      this.input_nodes[i] = new Node(output_size);
      this.input_nodes[i].random_initialize();
    }
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
    let output_values = new Array(this.output_biases.length);
    for (let i = 0; i < inputs.length; i++) {
      let outputs_from_single_input = this.input_nodes[i].feedForward(
        inputs[i]
      );
      for (let j = 0; j < outputs_from_single_input.length; j++) {
        output_values[j] += outputs_from_single_input[j];
      }
    }
    return output_values.map((x, index) =>
      x > this.output_biases[index] ? 1 : 0
    );
  }
}

class Node {
  constructor(neighbors_count) {
    this.neighbors = new Array(neighbors_count);
  }
  // Initialize the edges with random values
  randomInitialize() {
    for (let i = 0; i < this.neighbors.length; i++) {
      this.neighbors[i] = Math.random();
    }
  }
  feedForward(input) {
    return this.neighbors.map((x) => x * input);
  }
}
