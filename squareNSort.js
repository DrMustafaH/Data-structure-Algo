/*
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
*/

const sortedSquares = function (nums) {
  const squaredArr = nums.map((num) => num * num);
  return squaredArr.sort((a, b) => a - b);
};

// TEST
console.log(sortedSquares([-4, -1, 0, 3, 10]));

// Leetcode Submit result
// Runtime => 120 ms
// Memory => 44.9 MB
// Rank => beat 68.65% of solutions

/*
O(n) complexity answer in discussion

var sortedSquares = function(nums) {
    // use two pointers
    // create a new array
    const result = new Array(nums.length);
    let left = 0, 
        right = nums.length - 1;
    
	// don't want to rearrange the array, so iterating the array in descending order 
    for (let i = nums.length - 1; i >= 0; i--) {
        if (Math.abs(nums[left]) < Math.abs(nums[right])) {
            result[i] = nums[right] ** 2
            right--;
        } else {
            result[i] = nums[left] ** 2
            left++;
        }
    }
    
    return result;
};
*/
