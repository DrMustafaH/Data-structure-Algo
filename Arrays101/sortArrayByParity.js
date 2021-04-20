/*
Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

You may return any answer array that satisfies this condition.

 

Example 1:

Input: [3,1,2,4]
Output: [2,4,3,1]
The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
*/

const sortArrayByParity = function (A) {
  if (A.length < 2) return A;
  let curr = 0;
  let next = 1;
  let notEven = 0;
  while (next < A.length) {
    if (A[curr] % 2 !== 0 && A[next] % 2 === 0) {
      notEven = A[curr];
      A[curr] = A[next];
      A[next] = notEven;
      curr++;
      next++;
    } else if (A[curr] % 2 !== 0 && A[next] % 2 !== 0) {
      next++;
    } else {
      curr++;
      next++;
    }
  }
  return A;
};

// TEST
console.log(sortArrayByParity([3, 1, 2, 4]));

// Leetcode Submit result
// Runtime => 84 ms
// Memory => 40.7 MB
// Rank => beat 98.84% of solutions
