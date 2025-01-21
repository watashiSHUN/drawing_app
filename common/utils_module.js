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

utils.euclideanDistance = (a, b) => {
  return Math.sqrt(
    a.reduce((acc, val, index) => acc + (val - b[index]) ** 2, 0)
  );
};

// Return k nearest points
// Iterate over all points and compute their distance to the given point
// OUTPUT: return the INDEX of the nearest point in points
utils.getKNearestPoint = (coordinate, points, k = 1) => {
  // TODO: use heap instead of sorting
  const processed_points = points.map((point, index) => {
    return {
      index: index,
      distance: utils.euclideanDistance(coordinate, point),
    };
  });
  processed_points.sort((a, b) => a.distance - b.distance);
  return processed_points.slice(0, k).map((point) => point.index);
  // NOTE: Math.min(...array) will return the minimum value
  // but only works on numbers, not tuples of numbers
};

utils.getMostFrequent = (array) => {
  const counts = {};
  for (let element of array) {
    counts[element] = counts[element] || 0;
    counts[element]++;
  }
  let max_count = 0;
  let max_element = null;
  for (let element in counts) {
    if (counts[element] > max_count) {
      max_count = counts[element];
      max_element = element;
    }
  }
  return max_element;
};

if (typeof module !== "undefined") {
  module.exports = utils;
}
