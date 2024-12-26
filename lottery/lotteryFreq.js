// lottery is 6 numbers and a bonues number to hit jackpot you should get all 6 numbers without the bonus if you got 5 numbers and the bonus you get a smaller prize

function lotteryFreq(arr) {
    let obj = {};
    arr.forEach((num) => {
        obj[num] ? obj[num]++ : (obj[num] = 1);
    });
    return obj;
}

function sortObject(obj) {
    let sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    //return only entries with more than 1 seletion
    return sorted.filter((subArr) => subArr[1] !== 1);
}

// function to seperate array into groups of 7 this will include the bonus number
function groupArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 7) {
        result.push(arr.slice(i, i + 7));
    }
    return result;
}

function predictNextDraw(draws) {
    let frequencyMap = {};
    let bonusFrequencyMap = {};

    // Count the frequency of each number and bonus number
    draws.forEach((draw) => {
        draw.slice(0, 6).forEach((number) => {
            frequencyMap[number] = (frequencyMap[number] || 0) + 1;
        });
        const bonusNumber = draw[6];
        bonusFrequencyMap[bonusNumber] =
            (bonusFrequencyMap[bonusNumber] || 0) + 1;
    });

    // Sort numbers by frequency
    let sortedNumbers = Object.entries(frequencyMap).sort(
        (a, b) => b[1] - a[1]
    );
    let sortedBonusNumbers = Object.entries(bonusFrequencyMap).sort(
        (a, b) => b[1] - a[1]
    );

    // Suggest the six most frequent numbers as the next draw, and the most frequent bonus number
    let nextDrawPrediction = sortedNumbers
        .slice(0, 6)
        .map((item) => parseInt(item[0]));
    let bonusPrediction = parseInt(sortedBonusNumbers[0][0]);

    // console.log('Next Draw Prediction (Main Numbers):', nextDrawPrediction);
    // console.log('Next Draw Prediction (Bonus Number):', bonusPrediction);

    return nextDrawPrediction.concat(bonusPrediction);
}

function isCombinationInList(combination, draws) {
    return draws.some((draw) => combination.every((num) => draw.includes(num)));
}

function findMostSimilarSets(combination, draws) {
    let similarSets = [];

    draws.forEach((draw) => {
        let matchCount = draw
            .slice(0, 6)
            .reduce(
                (count, num) => (combination.includes(num) ? count + 1 : count),
                0
            );

        if (matchCount >= 3) {
            similarSets.push({ set: draw.slice(0, 6), matchCount });
        }
    });

    return similarSets;
}

// this function takes an array and a number and returns an object with two arrays one with the segmented arrays and the other with the identical arrays
function segmentAndCompare(arr, count) {
    // Segment the array into sub-arrays of `count` elements
    const segmentedArrays = [];
    for (let i = 0; i < arr.length; i += count) {
        segmentedArrays.push(arr.slice(i, i + count));
    }

    // Find identical arrays
    const identicalArrays = [];
    for (let i = 0; i < segmentedArrays?.length; i++) {
        for (let j = i + 1; j < segmentedArrays.length; j++) {
            const setA = new Set(segmentedArrays[i]);
            const setB = new Set(segmentedArrays[j]);
            if (
                segmentedArrays[i].length === segmentedArrays[j].length &&
                [...setA].every((value) => setB.has(value))
            ) {
                identicalArrays.push(segmentedArrays[i]);
            }
        }
    }

    return { segmentedArrays, identicalArrays };
}

// this function takes an array of segmented arrays and returns an object with the most similar pairs and the number of similar numbers
function findMostSimilar(segmentedArrays) {
    if (!segmentedArrays?.length) {
        return { mostSimilarPairs: [], maxSimilarity: 0 };
    }

    let maxSimilarity = 0;
    const mostSimilarPairs = [];

    for (let i = 0; i < segmentedArrays.length; i++) {
        for (let j = i + 1; j < segmentedArrays.length; j++) {
            const setA = new Set(segmentedArrays[i]);
            const setB = new Set(segmentedArrays[j]);
            const intersection = new Set([...setA].filter((x) => setB.has(x)));

            if (intersection.size > maxSimilarity) {
                maxSimilarity = intersection.size;
                mostSimilarPairs.length = 0; // Clear the array
                mostSimilarPairs.push({
                    array1: segmentedArrays[i],
                    array2: segmentedArrays[j],
                    similarNumbers: [...intersection],
                });
            } else if (intersection.size === maxSimilarity) {
                mostSimilarPairs.push({
                    array1: segmentedArrays[i],
                    array2: segmentedArrays[j],
                    similarNumbers: [...intersection],
                });
            }
        }
    }

    return { mostSimilarPairs, maxSimilarity };
}

// these are numbers of draws where someone won the lottery
const winNumsIncludebonus = [
    2, 7, 18, 19, 23, 25, 43, 15, 25, 26, 29, 42, 43, 22, 10, 11, 18, 20, 35,
    48, 39, 5, 11, 15, 28, 31, 47, 19, 7, 24, 34, 42, 46, 49, 1, 2, 14, 15, 28,
    42, 44, 25, 31, 32, 45, 46, 47, 49, 12, 8, 11, 13, 23, 24, 36, 12, 1, 6, 12,
    27, 45, 49, 47, 4, 13, 26, 34, 35, 42, 1, 6, 15, 19, 34, 45, 47, 27, 8, 19,
    33, 44, 46, 48, 21, 2, 10, 35, 36, 38, 46, 20, 11, 17, 21, 27, 41, 44, 7,
    10, 16, 18, 22, 39, 46, 19, 2, 16, 21, 27, 38, 45, 43, 4, 7, 11, 29, 30, 31,
    32, 2, 10, 17, 18, 22, 28, 36, 14, 21, 31, 37, 39, 42, 19, 17, 22, 28, 35,
    37, 41, 18, 4, 11, 27, 30, 33, 34, 42, 2, 7, 10, 23, 25, 29, 40, 6, 7, 30,
    33, 35, 39, 15, 2, 3, 7, 22, 28, 31, 20, 5, 12, 15, 23, 37, 42, 21,
];

const winNumsWithoutBonus = [
    2, 7, 18, 19, 23, 25, 15, 25, 26, 29, 42, 43, 10, 11, 18, 20, 35, 48, 5, 11,
    15, 28, 31, 47, 7, 24, 34, 42, 46, 49, 1, 2, 14, 15, 28, 42, 44, 31, 32, 45,
    46, 47, 49, 7, 15, 37, 41, 42, 47, 8, 11, 13, 23, 24, 36, 1, 6, 12, 27, 45,
    49, 4, 13, 26, 34, 35, 42, 20, 33, 39, 44, 48, 49, 6, 15, 19, 34, 45, 47, 8,
    19, 33, 44, 46, 48, 2, 14, 26, 27, 33, 49, 8, 2, 10, 35, 36, 38, 46, 11, 17,
    21, 27, 41, 44, 10, 16, 18, 22, 39, 46, 2, 16, 21, 27, 38, 45, 4, 7, 11, 29,
    30, 31, 2, 10, 17, 18, 22, 28, 14, 21, 31, 37, 39, 42, 17, 22, 28, 35, 37,
    41, 4, 11, 27, 30, 33, 34, 2, 7, 10, 23, 25, 29, 6, 7, 30, 33, 35, 39, 2, 3,
    7, 22, 28, 31, 5, 12, 15, 23, 37, 42,
];
const winBonusNums = [
    43, 22, 39, 19, 1, 25, 12, 12, 12, 47, 1, 27, 21, 20, 7, 19, 43, 32, 36, 19,
    18, 42, 40, 15, 20, 21,
];

// these are numbers of draws where someone did not win the lottery
const noWinLotteryNums = [
    5, 6, 7, 18, 25, 37, 24, 3, 4, 18, 23, 27, 28, 38, 6, 7, 14, 32, 35, 41, 11,
    14, 17, 27, 34, 36, 42, 8, 23, 25, 26, 36, 40, 49, 42, 1, 6, 26, 27, 43, 46,
    12, 1, 9, 12, 18, 35, 48, 19, 2, 10, 15, 16, 20, 49, 18, 1, 2, 3, 11, 15,
    43, 46, 4, 13, 21, 24, 31, 45, 41, 18, 32, 42, 44, 45, 48, 38, 7, 8, 15, 17,
    19, 33, 6, 2, 5, 8, 29, 36, 45, 23, 6, 18, 23, 31, 46, 48, 4, 8, 21, 26, 29,
    31, 46, 40, 5, 10, 35, 41, 42, 44, 13, 3, 12, 19, 37, 39, 45, 47, 7, 12, 27,
    31, 37, 44, 35, 5, 22, 25, 30, 32, 46, 45, 3, 17, 25, 29, 36, 46, 2, 7, 15,
    37, 41, 42, 47, 12, 1, 5, 15, 18, 22, 44, 6, 7, 19, 21, 33, 36, 45, 4, 5,
    10, 15, 27, 40, 47, 7, 8, 9, 28, 29, 34, 43, 40, 1, 8, 20, 30, 31, 34, 41,
    8, 10, 11, 25, 29, 37, 45, 24, 28, 31, 40, 42, 48, 43, 3, 18, 25, 31, 35,
    39, 1, 18, 19, 33, 38, 48, 49, 27, 2, 12, 23, 30, 32, 35, 47, 7, 18, 23, 28,
    31, 48, 44, 20, 33, 39, 44, 48, 49, 6, 4, 8, 15, 32, 40, 44, 7, 12, 27, 32,
    38, 39, 41, 42, 2, 14, 26, 27, 33, 49, 8, 14, 22, 27, 39, 40, 45, 6, 7, 12,
    25, 29, 39, 43, 23, 16, 18, 22, 29, 36, 43, 44, 11, 12, 17, 23, 38, 46, 40,
    4, 7, 8, 14, 41, 46, 6, 9, 14, 23, 26, 30, 43, 35, 3, 6, 18, 26, 36, 42, 17,
    3, 18, 30, 34, 36, 39, 21, 13, 17, 23, 24, 40, 48, 29, 27, 29, 32, 33, 35,
    39, 18, 3, 18, 20, 25, 39, 43, 4, 4, 6, 24, 27, 32, 41, 34, 3, 6, 26, 28,
    39, 40, 29, 7, 8, 10, 17, 43, 48, 26, 8, 12, 19, 28, 42, 48, 5, 20, 23, 29,
    34, 37, 43, 33, 5, 6, 8, 16, 18, 38, 30, 7, 11, 18, 37, 28, 45, 31, 5, 18,
    27, 31, 32, 35, 23, 11, 13, 25, 28, 34, 42, 44,
];

const noWinNotBonusNums = [
    5, 6, 7, 18, 25, 37, 3, 4, 18, 23, 27, 28, 6, 7, 14, 32, 35, 41, 14, 17, 27,
    34, 36, 42, 23, 25, 26, 36, 40, 49, 1, 6, 26, 27, 43, 46, 1, 9, 12, 18, 35,
    48, 2, 10, 15, 16, 20, 49, 1, 2, 3, 11, 15, 43, 4, 13, 21, 24, 31, 45, 18,
    32, 42, 44, 45, 48, 7, 8, 15, 17, 19, 33, 2, 5, 8, 29, 36, 45, 6, 18, 23,
    31, 46, 48, 8, 21, 26, 29, 31, 46, 5, 10, 35, 41, 42, 44, 3, 12, 19, 37, 39,
    45, 7, 12, 27, 31, 37, 44, 5, 22, 25, 30, 32, 46, 3, 17, 25, 29, 36, 46, 7,
    15, 37, 41, 42, 47, 1, 5, 15, 18, 22, 44, 7, 19, 21, 33, 36, 45, 4, 5, 10,
    15, 27, 40, 47, 8, 9, 28, 29, 34, 43, 1, 8, 20, 30, 31, 34, 8, 10, 11, 25,
    29, 37, 24, 28, 31, 40, 42, 48, 3, 18, 25, 31, 35, 39, 1, 18, 19, 33, 38,
    48, 49, 2, 12, 23, 30, 32, 35, 7, 18, 23, 28, 31, 48, 20, 33, 39, 44, 48,
    49, 4, 8, 15, 32, 40, 44, 12, 27, 32, 38, 39, 41, 2, 14, 26, 27, 33, 49, 14,
    22, 27, 39, 40, 45, 7, 12, 25, 29, 39, 43, 16, 18, 22, 29, 36, 43, 11, 12,
    17, 23, 38, 46, 4, 7, 8, 14, 41, 46, 9, 14, 23, 26, 30, 43, 3, 6, 18, 26,
    36, 42, 3, 18, 30, 34, 36, 39, 13, 17, 23, 24, 40, 48, 27, 29, 32, 33, 35,
    39, 3, 18, 20, 25, 39, 43, 4, 6, 24, 27, 32, 41, 3, 6, 26, 28, 39, 40, 7, 8,
    10, 17, 43, 48, 8, 12, 19, 28, 42, 48, 20, 23, 29, 34, 37, 43, 5, 6, 8, 16,
    18, 38, 7, 11, 18, 37, 28, 45, 5, 18, 27, 31, 32, 35, 11, 13, 25, 28, 34,
    42,
];
const noWinBonusNums = [
    24, 38, 11, 8, 42, 12, 19, 18, 46, 41, 38, 6, 23, 4, 40, 13, 47, 35, 45, 2,
    7, 12, 6, 4, 40, 41, 45, 43, 1, 27, 47, 44, 6, 7, 42, 8, 6, 23, 44, 40, 6,
    35, 17, 21, 29, 18, 4, 34, 29, 26, 5, 33, 30, 31, 23, 44,
];

// all numbers picked
const allPicked = winNumsIncludebonus.concat(noWinLotteryNums);
const allPickedNotBonus = winNumsWithoutBonus.concat(noWinNotBonusNums);
const allPickedBonus = winBonusNums.concat(noWinBonusNums);

//Object Forming
const winLotteryNumsObj = sortObject(lotteryFreq(winNumsIncludebonus));
const winNotBonusNumsObj = sortObject(lotteryFreq(winNumsWithoutBonus));
const winBonusNumsObj = sortObject(lotteryFreq(winBonusNums));
const noWinLotteryNumsObj = sortObject(lotteryFreq(noWinLotteryNums));
const noWinNotBonusNumsObj = sortObject(lotteryFreq(noWinNotBonusNums));
const noWinBonusNumsObj = sortObject(lotteryFreq(noWinBonusNums));
const allPickedObj = sortObject(lotteryFreq(allPicked));
const allPickedNotBonusObj = sortObject(lotteryFreq(allPickedNotBonus));
const allPickedBonusObj = sortObject(lotteryFreq(allPickedBonus));

// segment and compare arrays
const {
    segmentedArrays: segmentedAllPickedArrays,
    identicalArrays: identicalAllPickedArrays,
} = segmentAndCompare(allPicked, 7);

// find most similar sets
const {
    mostSimilarPairs: mostSimilarAllPickedPairs,
    maxSimilarity: maxSimilarityAllPicked,
} = findMostSimilar(segmentedAllPickedArrays);

// console.log('*****************************');
// console.log('*******WINNERS**********');
// console.log('*****************************');
// console.log('winNumsIncludebonus', winLotteryNumsObj);
// console.log('*****************************');
// console.log('winNumsWithoutBonus', winNotBonusNumsObj);
// console.log('*****************************');
// console.log('winBonusNums', winBonusNumsObj);
// console.log('\n');
// console.log('*****************************');
// console.log('*******NOT-WINNERS**********');
// console.log('*****************************');
// console.log('noWinLotteryNums', noWinLotteryNumsObj);
// console.log('*****************************');
// console.log('noWinNotBonusNums', noWinNotBonusNumsObj);
// console.log('*****************************');
// console.log('noWinBonusNums', noWinBonusNumsObj);
// console.log('\n');
// console.log('*****************************');
// console.log('*******ALL**********');
// console.log('*****************************');
// console.log('allPicked', allPickedObj);
// console.log('*****************************');
// console.log('allPickedNotBonus', allPickedNotBonusObj);
// console.log('*****************************');
// console.log('allPickedBonus', allPickedBonusObj);
// console.log('*****************************');
// console.log('\n');
console.log('*****************************');
console.log('*********IDENTICAL ALL PICKED ARRAYS*******');
console.log('*****************************');
console.log({ identicalAllPickedArrays });
console.log('*****************************');
console.log('*********IDENTICAL ALL PICKED ARRAYS*******');
console.log('*****************************');
console.log({ mostSimilarAllPickedPairs });
console.log(JSON.stringify(mostSimilarAllPickedPairs, null, 2));
console.log('*****************************');
console.log('*********MAX SIMILARITY ALL PICKED*******');
console.log('*****************************');
console.log({ maxSimilarityAllPicked });

const sortedSimilarNumbers = mostSimilarAllPickedPairs
    .map((pair) => pair.similarNumbers) // Extract similarNumbers arrays
    .reduce((acc, val) => acc.concat(val), []) // Flatten the array
    .sort((a, b) => a - b); // Sort numbers in ascending order

console.log({ sortedSimilarNumbers });

const draws1 = groupArray(noWinLotteryNums).concat(
    groupArray(winNumsIncludebonus)
);
console.log('*****************************');
console.log('*****************************');
console.log('*****************************');
console.log('*****************************');
console.log('prediction', predictNextDraw(draws1));

// console.log(
//     'isCombinationInList',
//     isCombinationInList(predictNextDraw(draws1), draws1)
// );
// console.log(
//     'findMostSimilarSets',
//     findMostSimilarSets(predictNextDraw(draws1), draws1)
// );

function predictNextDrawFromSimilarSets(similarSets) {
    let numberFrequency = {};

    // Count the frequency of each number in the similar sets
    similarSets.forEach((setInfo) => {
        setInfo.set.forEach((number) => {
            numberFrequency[number] = (numberFrequency[number] || 0) + 1;
        });
    });

    // Convert the frequency object to an array of [number, frequency] pairs
    let frequencyPairs = Object.entries(numberFrequency);

    // Sort the pairs by frequency in descending order
    frequencyPairs.sort((a, b) => b[1] - a[1]);

    // Select the top 6 most frequent numbers for the prediction
    let prediction = frequencyPairs
        .slice(0, 6)
        .map((pair) => parseInt(pair[0]));

    return prediction;
}

console.log(
    'predictNextDrawFromSimilarSets',
    predictNextDrawFromSimilarSets(
        findMostSimilarSets(predictNextDraw(draws1), draws1)
    )
);

//MARCH 2024 numbers that i selected is 7,12,27,31,45,47
//MAY 2024 numbers that i selected is 6,7,18,23,27,31
//JUNE 2024 numbers that i selected is 6,7,18,27,31,46
