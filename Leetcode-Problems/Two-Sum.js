/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
*/

const twoSum = function (nums, target) {
  const outputArr = [];
  for (let i = 0; i <= nums.length - 1; i++) {
    const num = nums[i];
    for (let j = 0; j <= nums.length - 1; j++) {
      const num2 = nums[j];
      if (num + num2 === target && i !== j) {
        outputArr.push(i, j);
        return outputArr;
      }
    }
  }
};

// TEST
// console.log(twoSum([3, 2, 4], 6));

// Leetcode Submit result
// Runtime => 72 ms
// Memory => 38.7 MB
