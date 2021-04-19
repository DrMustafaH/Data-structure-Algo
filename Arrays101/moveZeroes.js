/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

 

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
*/

const moveZeroes = function (nums) {
  let len = nums.length;
  if (len < 2) return nums;
  let pointer = 1;
  let notZero = 0;
  for (let i = 0; pointer < len; i++) {
    let curr = nums[i];
    let pointerNum = nums[pointer];
    if (pointerNum === 0 && curr === 0) {
      pointer++;
      i--;
    } else if (pointerNum !== 0 && curr === 0) {
      notZero = pointerNum;
      nums[pointer] = nums[i];
      nums[i] = notZero;
      pointer++;
    } else {
      pointer++;
    }
  }
  return nums;
};

// TEST
console.log(moveZeroes([0, 1, 0, 3, 12]));
console.log(moveZeroes([0]));

// Leetcode Submit result
// Runtime => 88 ms
// Memory => 40.3 MB
// Rank => beat 55.52% of solutions
