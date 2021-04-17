/*
Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

After doing so, return the array.

 

Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation: 
- index 0 --> the greatest element to the right of index 0 is index 1 (18).
- index 1 --> the greatest element to the right of index 1 is index 4 (6).
- index 2 --> the greatest element to the right of index 2 is index 4 (6).
- index 3 --> the greatest element to the right of index 3 is index 4 (6).
- index 4 --> the greatest element to the right of index 4 is index 5 (1).
- index 5 --> there are no elements to the right of index 5, so we put -1.
Example 2:

Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.
*/

const replaceElements = function (arr) {
  let length = arr.length - 1;
  let max = arr[length];

  for (let i = length - 1; i >= 0; i--) {
    let cur = arr[i];
    arr[i] = max;
    max = max > cur ? max : cur;
  }
  arr[length] = -1;
  return arr;
};

// TEST
console.log(replaceElements([17, 18, 5, 4, 6, 1]));

// Leetcode Submit result
// Runtime => 84 ms
// Memory => 41.4 MB
// Rank => beat 70.34% of solutions
