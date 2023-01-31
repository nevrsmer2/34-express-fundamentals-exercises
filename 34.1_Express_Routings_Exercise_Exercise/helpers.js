// const collect = require('collect.js');



/* Convert Numbers in a String to an Array of Numbers  & Validadte is Number*/
function toNumValidateNum(string) {
    let result = [];
    for (let i = 0; i < string.length; i++) {
        let toNum = Number(string[i]);

        if (isNaN(toNum)) {
            return new Error(`Numbers only.  ${toNum} is not a number.`)
        }

        result.push(toNum);
    }
    return result;
}


/* Return Average/Mean of Array of Numbers */
function mean(arr) {
    const average = arr.reduce((a, b) => a + b, 0) / arr.length;
    return average
};


/* Return Median of an Array of Numbers */
function median(arr) {
    if (arr.length == 0) {
        return;
    }
    arr.sort((a, b) => a - b);
    const midpoint = Math.floor(arr.length / 2);
    const median = arr.length % 2 === 1 ?
        arr[midpoint] :
        (arr[midpoint - 1] + arr[midpoint]) / 2;
    return median;
}


/* Return Mode of an Array of Numbers */
function mode(arr) {
    let numMapping = {};
    var greatestFreq = 0;
    let mode;
    arr.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;

        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
    });
    return +mode;
}








module.exports = {
    toNumValidateNum: toNumValidateNum,
    mean: mean,
    median: median,
    mode: mode

}