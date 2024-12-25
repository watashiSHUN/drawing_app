const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.JS_DIR = constants.DATASET_DIR + "/js";
constants.IMG_DIR = constants.DATASET_DIR + "/img";
constants.METADATA_FILE = constants.JSON_DIR + "/metadata.json";

if(typeof module !== 'undefined'){
    module.exports = constants;
}