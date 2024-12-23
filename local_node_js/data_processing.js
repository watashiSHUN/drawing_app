// Normalize all the data set

// 1) raw.json => {author:X, session_id:0, {"object":[[x1, y1], [x2, y2], ...]...}}, 8 objects
// - output from the web app
// 2) metadata.json => {id:0, drawing:0, student_name:X, student_id:0}, all metadata in one file
// 2.1) normalized.json => [[x1, y1], [x2, y2], ...] 1 object under id.json
// 3) normalized.png => drawing

const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMG_DIR = constants.DATASET_DIR + "/img";

// NOTE(shunxian): commonJs
const fs = require('fs');
// Named import
// NOTE(shunxian): destructing assignment, unpack array/objects
const { drawPath } = require('../common/draw_module.js');
const {createCanvas} = require('canvas');
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

// Read dir
const file_names = fs.readdirSync(constants.RAW_DIR);

const metadata = [];
let id = 0;

// Read file
file_names.forEach(file_name => {
    const file_content = fs.readFileSync(constants.RAW_DIR + "/" + file_name);
    // TODO(shunxian): refactor this out (proto exchange)
    const {session, student, drawings} = JSON.parse(file_content);
    // Extract metadata
    for (let drawing in drawings){
        // NOTE, drawing only returns the `key`
        // same as python (for key in dictionary)
        metadata.push({
            id, // by default, the key is the variable name
            drawing,
            student_name: student,
            student_id: session,
        });

        // Extract the actual drawing
        const paths = drawings[drawing];
        // Save the numerical representation of the drawing
        fs.writeFileSync(constants.JSON_DIR + "/" + id + ".json", JSON.stringify(drawings[paths]));
        // Save the image representation of the drawing
        generateImage(paths, constants.IMG_DIR + "/" + id + ".png");

        id++;
    }
});

// Write metadata
fs.writeFileSync(constants.JSON_DIR + "/metadata.json", JSON.stringify(metadata));

function generateImage(paths, output_file){
    drawPath(ctx, paths);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(output_file, buffer);
}