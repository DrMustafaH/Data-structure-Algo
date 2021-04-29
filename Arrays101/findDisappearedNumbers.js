/*
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:

Input: nums = [1,1]
Output: [2]
*/

const findDisappearedNumbers = function (nums) {
  ///// BRUTE FORCE SOLUTION//////

  // const mySet = new Set(nums);
  // const noDupArr = Array.from(mySet);
  // const sortedArr = noDupArr.sort((a, b) => a - b);
  // const newArr = [...Array(nums.length + 1).keys()];
  // const result = newArr.filter((num) => !sortedArr.includes(num));
  // return result.slice(1);

  /////// OPTOMIZED SOLUTION ///////

  let stack = [];
  for (let i = 0; i < nums.length; i++) {
    stack.push(i + 1);
  }
  nums.forEach((num) => {
    stack[num - 1] = -1;
  });
  return stack.filter((i) => i != -1);
};

// TEST
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDisappearedNumbers([1, 1]));

// Leetcode Submit result
// Runtime => 108 ms
// Memory => 49.4 MB
// Rank => beat 91.83% of solutions
