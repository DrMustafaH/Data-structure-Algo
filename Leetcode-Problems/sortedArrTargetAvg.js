/* Write a function called averagePair that when givien a sorted array of integers and a target average, determines if there is a pair of values in the array where the average of the pair equals the target average. There can be more than one pair that mathes the average target.

constraints:
Time: O(N)
Space: O(1)

sample outputs:
averagePair([1,2,3], 2.5) // true;
averagePair([1,2,3,3,5,6,7,10,12,19], 8) //true;
averagePair([-1,0,3,4,5,6], 4.1) // false;
averagePair([], 4) // false;
*/

const averagePair = function (array, average) {
  // if (array.length === 0 || array.length === 1) return false;
  // let x = 0;
  // while (x < array.length) {
  //   let cur = array[x];
  //   for (let i = x + 1; i < array.length; i++) {
  //     const num = array[i];
  //     if ((num + cur) / 2 === average) {
  //       return true;
  //     }
  //   }
  //   x++;
  // }

  // return false;
  let start = 0;
  let end = array.length - 1;
  while (start < end) {
    let avg = (array[start] + array[end]) / 2;
    if (avg === average) return true;
    else if (avg < average) start++;
    else end--;
  }
  return false;
};

console.log(averagePair([1, 2, 3], 2.5)); // true;
console.log(averagePair([1, 2, 3, 3, 5, 6, 7, 10, 12, 19], 8)); //true;
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false;
console.log(averagePair([], 4)); // false;
