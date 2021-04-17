/*
Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]


Example 1:

Input: arr = [2,1]
Output: false
Example 2:

Input: arr = [3,5,5]
Output: false
Example 3:

Input: arr = [0,3,2,1]
Output: true
*/

var validMountainArray = function (arr) {
  if (arr.length < 3) {
    return false;
  }

  let left = 0;
  let right = arr.length - 1;

  while (arr[left] < arr[left + 1]) {
    left++;
  }

  while (arr[right] < arr[right - 1]) {
    right--;
  }

  return left === right && left !== 0 && right !== arr.length - 1;
};

// TEST
console.log(validMountainArray([0, 3, 2, 1]));
console.log(validMountainArray([3, 5, 5]));

// Leetcode Submit result
// Runtime => 84 ms
// Memory => 41.4 MB
// Rank => beat 70.34% of solutions
