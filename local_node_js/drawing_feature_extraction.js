const constants = require("../common/constants_module.js");
const features_function = require("../common/features_module.js");
const utils = require("../common/utils_module.js");

const fs = require("fs");

// INPUT: raw data points
// OUTPUT: metadata for each drawing + features

// Filter outliers: img/3106.png
const metadatas = JSON.parse(fs.readFileSync(constants.METADATA_FILE)).filter(
  (m) => m.id != 3106
);

console.log("Extract feature for each drawing...");
for (let i = 0; i < metadatas.length; i++) {
  const m = metadatas[i];
  const paths = JSON.parse(
    fs.readFileSync(`${constants.JSON_DIR}/${m.id}.json`)
  );
  // Edit metadatas in place
  // Features are numeric values, so we can put them in an array
  m.features = features_function.active.map((f) => f.function(paths));

  utils.printProgress(i + 1, metadatas.length);
}

// NOTE: normalize the points before separating training and testing data
// `min_max` should be computed over all possible range, otherwise, each dataset will have different min_max!!!

// Normalize feature values to be in the range [0, 1]
// Change in place
const min_max = utils.normalizePoints(metadatas.map((m) => m.features));

// Separate training and testing data
const training_data = metadatas.filter((m, index) => index % 2 == 0);
const testing_data = metadatas.filter((m, index) => index % 2 == 1);

// Avoid repeating keys, store the key names only once, outside the for loop.
const feature_names = features_function.active.map((f) => f.name);

// Output is 2 arrays
// TODO(shunxian): what are these used for?
// fs.writeFileSync(
//   constants.JSON_DIR + "/features.json",
//   JSON.stringify({ feature_names, metadatas })
// );

// NOTE result: https://i.sstatic.net/JPKCSl2C.png

const training_data_feature_extraction = training_data.map((m) => m.features);

for (let k = 1; k <= 20; k++) {
  // Model evaluation
  let correct_count = 0;
  let error_count = 0;

  for (let i = 0; i < testing_data.length; i++) {
    let data = testing_data[i];
    // expected result
    const expected = data.drawing;
    const k_nearest_neighbors = utils.getKNearestPoint(
      data.features,
      training_data_feature_extraction,
      k
    );
    const k_nearest_neighbor_drawings = k_nearest_neighbors.map(
      (index) => training_data[index].drawing
    );
    // Return the most frequently occuring drawing.
    const predict = utils.getMostFrequent(k_nearest_neighbor_drawings);
    if (predict == expected) {
      correct_count++;
    } else {
      error_count++;
    }
    utils.printProgress(i + 1, testing_data.length);
  }
  console.log(
    `correctness rate for k=${k}:  ${
      correct_count / (correct_count + error_count)
    }`
  );
}

console.log("Saving files...");
console.log("metadata", metadatas.length);
fs.writeFileSync(
  constants.JS_DIR + "/features.js",
  utils.jsonToVariable({ feature_names, metadatas }, "features")
);

console.log("training_data", training_data.length);
fs.writeFileSync(
  constants.JS_DIR + "/training_data.js",
  utils.jsonToVariable(training_data, "training_data")
);

console.log("testing_data", testing_data.length);
fs.writeFileSync(
  constants.JS_DIR + "/testing_data.js",
  utils.jsonToVariable(testing_data, "testing_data")
);

console.log("min_max", min_max.length);
fs.writeFileSync(
  constants.JS_DIR + "/min_max.js",
  utils.jsonToVariable(min_max, "min_max")
);
