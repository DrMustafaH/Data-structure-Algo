const findMaxConsecutiveOnes = function (nums) {
  let counter = 0;
  let max = 0;
  nums.forEach((num) => {
    if (num === 1) {
      counter++;
      if (counter > max) {
        max = counter;
      }
    } else {
      counter = 0;
    }
  });
  return max;
};

console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]));

// Input: nums = [1,1,0,1,1,1]
// Output: 3
