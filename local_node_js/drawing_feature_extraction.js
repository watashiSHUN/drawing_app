const constants = require("../common/constants_module.js");
const features_function = require("../common/features_module.js");
const utils = require("../common/utils_module.js");

const fs = require("fs");

// INPUT: raw data points
// OUTPUT: metadata for each drawing + features

const metadatas = JSON.parse(fs.readFileSync(constants.METADATA_FILE));

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

// Avoid repeating keys, store the key names only once, outside the for loop.
const feature_names = features_function.active.map((f) => f.name);

// Output is 2 arrays
fs.writeFileSync(
  constants.JSON_DIR + "/features.json",
  JSON.stringify({ feature_names, metadatas })
);

fs.writeFileSync(
  constants.JS_DIR + "/features.js",
  utils.jsonToVariable({ feature_names, metadatas }, "features")
);
