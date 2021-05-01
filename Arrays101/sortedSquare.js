/*
Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

 

Example 1:

Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
Example 2:

Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
*/

const sortedSquares = function (nums) {
  //////////////////////////////////
  ///// BRUTE FORCE SOLUTION////////
  //////////////////////////////////

  const squaredArr = nums.map((num) => num * num);
  return squaredArr.sort((a, b) => a - b);

  //////////////////////////////////
  /////// OPTOMIZED SOLUTION ///////
  //////////////////////////////////
};

// TEST
console.log(sortedSquares([-4, -1, 0, 3, 10]));
console.log(sortedSquares([-7, -3, 2, 3, 11]));

// Leetcode Submit result
// Runtime => 124 ms
// Memory => 44.9 MB
// Rank => beat 49.57% of solutions
