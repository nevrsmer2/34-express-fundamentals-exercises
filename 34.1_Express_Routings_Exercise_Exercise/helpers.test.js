const { toNumValidateNum, mean, mode, median } = require('./helpers')


/* Testing mean() Function */

describe("Testing Mean Function", () => {
    const arr1 = mean([2, 2, 2, 2]);
    const arr2 = mean([-2, -2, -2, -2]);
    const arr3 = mean([2.2, 2.2, 2.2, 2.2]);
    const arr4 = mean([]);
    const arr5 = mean([2, 2, 2, 2, 'y']);

    test('Test if mean() returns a positive integer', () => {
        expect(arr1).toEqual(2);
    });
    test('Test if mean() returns a negative integer', () => {
        expect(arr2).toEqual(-2);
    });
    test('Test if mean() returns a float integer', () => {
        expect(arr3).toEqual(2.2);
    });
    test('Test if mean() returns a float integer', () => {
        expect(arr4).toBe(NaN);
    });
    test('Test if mean() returns a float integer', () => {
        expect(arr5).toBe(NaN);
    });
});


/* Testing median() Function*/

describe("Testing Median Function", () => {
    const arr1 = median([1, 2, 3]);
    const arr2 = median([1, 2, -3]);
    const arr3 = median([1, 2, 3, 4]);
    const arr4 = median([]);

    test('Test on array with 3 numbers to return middle number', () => {
        expect(arr1).toEqual(2);
    });
    test('Test if median() returns middle number with negative in arrayr', () => {
        expect(arr2).toEqual(1);
    });
    test('Test if median() returns float with array of 4 numbers', () => {
        expect(arr3).toEqual(2.5);
    });
    test('Test if it returns undefined with an empty array', () => {
        expect(arr4).toBe(undefined);
    });
});


/* Testing median() Function*/

describe("Testing Median Function", () => {
    const arr1 = mode([1, 2, 3]);
    const arr2 = mode([1, 2, -2, 2, 2, 2, -2, -2]);
    const arr3 = mode([1, 2, 2, 3, 3, -3, 4]);
    const arr4 = mode([]);

    test('Should return first number in array with no repeated numbers', () => {
        expect(arr1).toEqual(1);
    });
    test('Should return most frequntly occuring number', () => {
        expect(arr2).toEqual(2);
    });
    test('Should return the first most frequntly occuring number', () => {
        expect(arr3).toEqual(2);
    });
    test('Should return NaN if array is empty', () => {
        expect(arr4).toBe(NaN);
    });
});





