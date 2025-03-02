const constants = require("../common/constants_module.js");
const utils = require("../common/utils_module.js");

// Different classifiers (models)
const KNN = require("../common/classifiers/knn.js");
const MLP = require("../common/classifiers/mlp.js");

const fs = require("fs");

const training_data = JSON.parse(fs.readFileSync(constants.TRAINING_DATA));
const testing_data = JSON.parse(fs.readFileSync(constants.TESTING_DATA));

const feature_extractor = (data) => data.features;
const result_extractor = (data) => data.drawing;

const classification = [
  "car",
  "fish",
  "house",
  "tree",
  "bicycle",
  "guitar",
  "pencil",
  "clock",
];

const mLP_model = new MLP(
  /*neurons_per_level=*/ [
    training_data[0].features.length,
    10, // hidden layer
    classification.length,
  ],
  /*output_array=*/ classification
);

console.log(
  `MLP correctness rate for no training model:  ${mLP_model.evaluate(
    testing_data
  )}`
);

mLP_model.fit(training_data);

console.log(
  `MLP correctness rate for after 1000 traning:  ${mLP_model.evaluate(
    testing_data
  )}`
);

// NOTE result: https://i.sstatic.net/JPKCSl2C.png
// NOTE pure guessing is 1/8 => 0.125
// kNN with k = 50 -> 0.5
for (let k = 1; k <= 50; k++) {
  const kNN_model = new KNN(
    training_data,
    feature_extractor,
    result_extractor,
    k
  );

  let correct_count = 0;
  let total_count = 0;

  for (let i = 0; i < testing_data.length; i++) {
    let data = testing_data[i];
    // expected result
    const expected = data.drawing;
    const { predict_result: actual } = kNN_model.predict(data.features);

    correct_count += actual == expected ? 1 : 0;
    total_count++;
    utils.printProgress(i + 1, testing_data.length);
  }
  console.log(
    `KNN correctness rate for k=${k}:  ${correct_count / total_count}`
  );
}
