/*
Given integer array nums, return the third maximum number in this array. If the third maximum does not exist, return the maximum number.

 

Example 1:

Input: nums = [3,2,1]
Output: 1
Explanation: The third maximum is 1.
Example 2:

Input: nums = [1,2]
Output: 2
Explanation: The third maximum does not exist, so the maximum (2) is returned instead.
Example 3:

Input: nums = [2,2,3,1]
Output: 1
Explanation: Note that the third maximum here means the third maximum distinct number.
Both numbers with value 2 are both considered as second maximum.
*/

var thirdMax = function (nums) {
  let first = -Infinity;
  let second = -Infinity;
  let third = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === first || nums[i] === second || nums[i] === third) continue;
    if (nums[i] > first) {
      [first, second, third] = [nums[i], first, second];
    } else if (nums[i] > second) {
      [second, third] = [nums[i], second];
    } else if (nums[i] > third) {
      third = nums[i];
    }
  }
  return third === -Infinity ? first : third;
};

// TEST
console.log(thirdMax([3, 2, 1]));
console.log(thirdMax([1, 2]));
console.log(thirdMax([2, 2, 3, 1]));

// Leetcode Submit result
// Runtime => 80 ms
// Memory => 41.4 MB
// Rank => beat 78.39% of solutions
