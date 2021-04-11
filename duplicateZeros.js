/*
Input: [1,0,2,3,0,4,5,0]
Output: null
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
*/

const duplicateZeros = function (arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    const num = arr[i];
    if (num === 0) {
      for (let j = length - 2; j > i; j--) {
        const num2 = arr[j];
        arr[j + 1] = num2;
      }
      if (length - 1 > i) {
        arr[i + 1] = num;
        i++;
      }
    }
  }
  console.log(arr.length);
  return arr;
};

//TEST
console.log(duplicateZeros([0, 0, 0, 0, 0, 0, 0]));
console.log(duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0]));

// Leetcode Submit result
// Runtime => 92 ms
// Memory => 40.4 MB
// Rank => beat 61.96% of solutions
