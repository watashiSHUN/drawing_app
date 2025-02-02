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

// TODO, optimize
// 1. the data set is fixed, can we pre sort them? potential catch, its euclidean distance?
// 2. use heap to find closest k points will for sure be faster

// Return k nearest points
// Iterate over all points and compute their distance to the given point
// OUTPUT: return the INDICES of the nearest points (K>1)
utils.getKNearestPoint = (coordinate, points, k = 1) => {
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

// INPUT: [[feature1, feature2, ...], [feature1, feature2, ...], ...]
// Normalize points to be in the range [0, 1] (between min->max)
// OUTPUT: normalize points in place also return [{min, max}, ...] for each feature
utils.normalizePoints = (points, min_max) => {
  // Create an array of min_max object for each feature [{min, max}, ...]
  // Get min, max for each dimension
  if (min_max == undefined) {
    // NOTE: we cannot hardcode min_max, what if points are paths count and dot count?
    min_max = [];
    points.forEach((features, index) => {
      if (index == 0) {
        min_max = features.map((value) => {
          return { min: value, max: value };
        });
      }
      features.forEach((value, index) => {
        min_max[index].min = Math.min(min_max[index].min, value);
        min_max[index].max = Math.max(min_max[index].max, value);
      });
    });
  }

  points.forEach((features) => {
    features.forEach((value, index) => {
      const min = min_max[index].min;
      const max = min_max[index].max;
      // Linear interpolate (lerp)
      // TODO(shunxian): what if max == min? => divide by zero exception
      features[index] = (value - min) / (max - min);
    });
  });

  return min_max;
};

if (typeof module !== "undefined") {
  module.exports = utils;
}

// Note: we cannot do `require != undefined`, because interpreter will still need to evaluate what is `require`
// it only works when a variable is declared but not defined, e.g. `var a;`  or MISSING PROPERTY, MISSING FUNCTION PARAM
// use typeof xyz !== "undefined" instead
if (typeof module !== "undefined" && require.main == module) {
  input = [
    [1, 300],
    [100, 20],
    [30, 234],
  ];
  console.log(utils.normalizePoints(input));
  console.log(input);
}
