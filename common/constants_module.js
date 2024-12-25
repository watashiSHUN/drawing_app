const constants = {};

// String constants
// File paths and directories
constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.JS_DIR = constants.DATASET_DIR + "/js";
constants.IMG_DIR = constants.DATASET_DIR + "/img";
constants.METADATA_FILE = constants.JSON_DIR + "/metadata.json";

// Numeric constants
constants.CANVAS_SIZE = 400;

if (typeof module !== "undefined") {
  module.exports = constants;
}
