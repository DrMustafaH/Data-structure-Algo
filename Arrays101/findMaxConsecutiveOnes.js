/*
Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

 

Example 1:

Input: nums = [1,0,1,1,0]
Output: 4
Explanation: Flip the first zero will get the maximum number of consecutive 1s. After flipping, the maximum number of consecutive 1s is 4.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 4
*/

const findMaxConsecutiveOnes = function (nums) {
  let maxCount = 0;
  let currCount = 0;
  let currZeroesCount = 0;
  let firstZeroIndex = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) currCount++;
    else if (currZeroesCount === 0) {
      currZeroesCount = 1;
      currCount++;
      firstZeroIndex = i;
    } else {
      if (currCount > maxCount) maxCount = currCount;
      currCount = i - firstZeroIndex;
      firstZeroIndex = i;
    }
  }
  return Math.max(maxCount, currCount);
};

// TEST
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0]));
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 0, 1]));

// Leetcode Submit result
// Runtime => 80 ms
// Memory => 41.8 MB
// Rank => beat 94.58% of solutions
