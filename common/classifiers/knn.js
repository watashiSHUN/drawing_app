if (typeof utils === "undefined") {
  // TODO(shunxian): why no let/const in front?
  utils = require("../utils_module.js");
}

class KNN {
  constructor(training_data, feature_extractor, result_extractor, k) {
    this.training_data = training_data;
    this.feature_extractor = feature_extractor;
    this.result_extractor = result_extractor;

    this.training_set = training_data.map(this.feature_extractor);
    this.k = k;
  }

  // Output:
  // {
  // predict_result: "circle",
  // k_nearest_neighbors_indices: [1, 2, 3, 4, 5]
  // }
  predict(data) {
    // Return the indices of the k nearest neighbor in training_data
    const k_nearest_neighbors_indices = utils.getKNearestPoint(
      data,
      this.training_set,
      this.k
    );
    const k_nearest_neighbor_value = k_nearest_neighbors_indices.map((index) =>
      this.result_extractor(this.training_data[index])
    );
    const predict_result = utils.getMostFrequent(k_nearest_neighbor_value);
    return { predict_result, k_nearest_neighbors_indices };
  }
}

if (typeof module !== "undefined") {
  module.exports = KNN;
}
