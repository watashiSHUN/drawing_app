// Extract features from a drawing, be it Finished(training data, processed in nodejs)
// or unfinished(user input in the webapp, for matching)
const features_function = {};

features_function.getPathsCount = (paths) => {
  return paths.length;
};

// Sum over all the points in all the paths
features_function.getPointsCount = (paths) => {
  // [[[1,2],[3,4]],[[5,6],[7,8]]] -> [[1,2],[3,4],[5,6],[7,8]]
  // merge multiple paths (each being an array of points)
  // into a single array of points
  const points = paths.flat();
  return points.length;
};

// TODO: when there's no data in the path, what's the return value?
features_function.getWidth = (paths) => {
  const points = paths.flat();
  const xs = points.map((p) => p[0]);
  return Math.max(...xs) - Math.min(...xs);
};

features_function.getHeight = (paths) => {
  const points = paths.flat();
  const ys = points.map((p) => p[1]);
  return Math.max(...ys) - Math.min(...ys);
};

features_function.active = [
  { name: "width", function: features_function.getWidth },
  { name: "height", function: features_function.getHeight },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = features_function;
}
