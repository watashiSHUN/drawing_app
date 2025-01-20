const utils = {};

// Print progress percentage in stdout
// NOTE: each call will override the previous print, repeatedly call
// this function to show progress ANIMATION
utils.printProgress = (count, total) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percentage = Math.round((count / total) * 100);
  process.stdout.write(`Processing...${count}/${total} (${percentage}%)`);
};

// INPUT: an array of objects
// OUTPUT: all objects with the same key are grouped together
// {key1: [obj1, obj2,...], key2: [obj3, obj4,...]}
utils.groupByKey = (array, key) => {
  const return_value = {};
  for (let obj of array) {
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

utils.distance2D = (a, b) => {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
};

// Iterate over all points and compute their distance to the given point
// OUTPUT: return the INDEX of the nearest point in points
utils.getNearestPoint = (coordinate, points) => {
  let min_distance = Infinity;
  let nearest_index = 0;
  points.forEach((point, index) => {
    const distance = utils.distance2D(coordinate, point);
    if (distance < min_distance) {
      min_distance = distance;
      nearest_index = index;
    }
  });
  return nearest_index;

  // NOTE: Math.min(...array) will return the minimum valu
  // but only works on numbers, not tuples of numbers
};

if (typeof module !== "undefined") {
  module.exports = utils;
}
