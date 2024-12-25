const constants = require('../common/constants_module.js');
const features = require('../common/features_module.js');
const utils = require('../common/utils_module.js');

const fs = require('fs');

// INPUT: raw data points
// OUTPUT: metadata for each drawing + features

const metadatas = JSON.parse(fs.readFileSync(constants.METADATA_FILE));

let output = [];

for(let i = 0; i < metadatas.length; i++){
    // TODO(shunxian): can we change it in place?
    const m = metadatas[i];
    const {id, drawing, student_name, student_id} = m;
    const paths = JSON.parse(fs.readFileSync(`${constants.JSON_DIR}/${id}.json`));
    output.push({
        id,
        drawing,
        student_name,
        student_id,
        features: {
            paths: features.getPathsCount(paths),
            points: features.getPointsCount(paths)
        }
    });

    utils.printProgress(i+1, metadatas.length);
}

fs.writeFileSync(constants.JSON_DIR + "/features.json", JSON.stringify(output));