const utils = {};

// Print progress percentage in stdout
// NOTE: each call will override the previous print, repeatedly call
// this function to show progress ANIMATION
utils.printProgress = (count, total) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percentage = Math.round(count / total * 100);
    process.stdout.write(`Processing...${count}/${total} (${percentage}%)`);
};

// INPUT: an array of objects
// OUTPUT: all objects with the same key are grouped together
// {key1: [obj1, obj2,...], key2: [obj3, obj4,...]}
utils.groupByKey = (array, key) => {
    const return_value = {};
    for(let obj of array){
        const property = obj[key];
        return_value[property] = return_value[property] || [];
        return_value[property].push(obj);
    }
    return return_value;
};

// INPUT: json object
// OUTPUT: "variable_name = json_object" as string
utils.jsonToVariable = (json_object, varaible_name) => {
    return `const ${varaible_name} = ${JSON.stringify(json_object)};`;
};

if (typeof module !== 'undefined'){
    module.exports = utils;
}