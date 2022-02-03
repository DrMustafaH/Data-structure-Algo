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

const winLotteryNums = [
  2, 7, 18, 19, 23, 25, 43, 15, 25, 26, 29, 42, 43, 22, 10, 11, 18, 20, 35, 48,
  39, 5, 11, 15, 28, 31, 47, 19,
];
const winNotBonusNums = [
  2, 7, 18, 19, 23, 25, 15, 25, 26, 29, 42, 43, 10, 11, 18, 20, 35, 48, 5, 11,
  15, 28, 31, 47,
];
const winBonusNums = [43, 22, 39, 19];

const noWinLotteryNums = [
  5, 6, 7, 18, 25, 37, 24, 3, 4, 18, 23, 27, 28, 38, 6, 7, 14, 32, 35, 41, 11,
  14, 17, 27, 34, 36, 42, 8, 23, 25, 26, 36, 40, 49, 42, 1, 6, 26, 27, 43, 46,
  12, 1, 9, 12, 18, 35, 48, 19, 2, 10, 15, 16, 20, 49, 18, 1, 2, 3, 11, 15, 43,
  46, 4, 13, 21, 24, 31, 45, 41, 18, 32, 42, 44, 45, 48, 38, 7, 8, 15, 17, 19,
  33, 6, 2, 5, 8, 29, 36, 45, 23, 6, 18, 23, 31, 46, 48, 4, 8, 21, 26, 29, 31,
  46, 40, 5, 10, 35, 41, 42, 44, 13, 3, 12, 19, 37, 39, 45, 47, 7, 12, 27, 31,
  37, 44, 35, 5, 22, 25, 30, 32, 46, 45,
];
const noWinNotBonusNums = [
  5, 6, 7, 18, 25, 37, 3, 4, 18, 23, 27, 28, 6, 7, 14, 32, 35, 41, 14, 17, 27,
  34, 36, 42, 23, 25, 26, 36, 40, 49, 1, 6, 26, 27, 43, 46, 1, 9, 12, 18, 35,
  48, 2, 10, 15, 16, 20, 49, 1, 2, 3, 11, 15, 43, 4, 13, 21, 24, 31, 45, 18, 32,
  42, 44, 45, 48, 7, 8, 15, 17, 19, 33, 2, 5, 8, 29, 36, 45, 6, 18, 23, 31, 46,
  48, 8, 21, 26, 29, 31, 46, 5, 10, 35, 41, 42, 44, 3, 12, 19, 37, 39, 45, 7,
  12, 27, 31, 37, 44, 5, 22, 25, 30, 32, 46,
];
const noWinBonusNums = [
  24, 38, 11, 8, 42, 12, 19, 18, 46, 41, 38, 6, 23, 4, 40, 13, 47, 35, 45,
];

const allPicked = winLotteryNums.concat(noWinLotteryNums);
const allPickedNotBonus = winNotBonusNums.concat(noWinNotBonusNums);
const allPickedBonus = winBonusNums.concat(noWinBonusNums);

//Object Forming
const winLotteryNumsObj = sortObject(lotteryFreq(winLotteryNums));
const winNotBonusNumsObj = sortObject(lotteryFreq(winNotBonusNums));
const winBonusNumsObj = sortObject(lotteryFreq(winBonusNums));
const noWinLotteryNumsObj = sortObject(lotteryFreq(noWinLotteryNums));
const noWinNotBonusNumsObj = sortObject(lotteryFreq(noWinNotBonusNums));
const noWinBonusNumsObj = sortObject(lotteryFreq(noWinBonusNums));
const allPickedObj = sortObject(lotteryFreq(allPicked));
const allPickedNotBonusObj = sortObject(lotteryFreq(allPickedNotBonus));
const allPickedBonusObj = sortObject(lotteryFreq(allPickedBonus));

console.log("*****************************");
console.log("*******WINNERS**********");
console.log("*****************************");
console.log("winLotteryNums", winLotteryNumsObj);
console.log("*****************************");
console.log("winNotBonusNums", winNotBonusNumsObj);
console.log("*****************************");
console.log("winBonusNums", winBonusNumsObj);
console.log("\n");
console.log("*****************************");
console.log("*******NOT-WINNERS**********");
console.log("*****************************");
console.log("noWinLotteryNums", noWinLotteryNumsObj);
console.log("*****************************");
console.log("noWinNotBonusNums", noWinNotBonusNumsObj);
console.log("*****************************");
console.log("noWinBonusNums", noWinBonusNumsObj);
console.log("\n");
console.log("*****************************");
console.log("*******ALL**********");
console.log("*****************************");
console.log("allPicked", allPickedObj);
console.log("*****************************");
console.log("allPickedNotBonus", allPickedNotBonusObj);
console.log("*****************************");
console.log("allPickedBonus", allPickedBonusObj);
