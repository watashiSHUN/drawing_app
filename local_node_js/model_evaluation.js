const constants = require("../common/constants_module.js");
const utils = require("../common/utils_module.js");

// Different classifiers (models)
const KNN = require("../common/classifiers/knn.js");

const fs = require("fs");

const training_data = JSON.parse(fs.readFileSync(constants.TRAINING_DATA));
const testing_data = JSON.parse(fs.readFileSync(constants.TESTING_DATA));

const feature_extractor = (data) => data.features;
const result_extractor = (data) => data.drawing;

// NOTE result: https://i.sstatic.net/JPKCSl2C.png
// NOTE, pure guessing is 1/8 => 0.125
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
  console.log(`correctness rate for k=${k}:  ${correct_count / total_count}`);
}
