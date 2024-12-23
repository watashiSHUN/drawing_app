const utils = {};

// Called after each step
utils.printProgress = (count, total) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percentage = Math.round(count / total * 100);
    process.stdout.write(`Processing...${count}/${total} (${percentage}%)`);
};

if (typeof module !== 'undefined'){
    module.exports = utils;
}