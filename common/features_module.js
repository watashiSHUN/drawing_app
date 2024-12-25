const features = {};

features.getPathsCount=(paths)=>{
    return paths.length;
}

// Sum over all the points in all the paths
features.getPointsCount=(paths)=>{
    const points = paths.flat(); // [[],[],[]] => []
    return points.length;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = features;
}