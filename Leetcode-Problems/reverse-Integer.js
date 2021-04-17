/*
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
Example 4:

Input: x = 0
Output: 0
*/

const reverse1 = function (x) {
  if (x === 0) return 0;
  const stringX = x.toString().split("").reverse().join("");
  if (x >= 0) {
    const res = Number(stringX);
    if (res > Math.pow(-2, 31) && res <= Math.pow(2, 31) - 1) {
      return res;
    }
  } else {
    const positiveStr = stringX.substring(0, stringX.length - 1);
    const res = Number(positiveStr) * -1;
    if (res > Math.pow(-2, 31) && res <= Math.pow(2, 31)) {
      return res;
    }
  }
  return 0;
};

// another answer made after looking at solutions in leetcode
const reverse2 = function (x) {
  let negative = false;

  if (x < 0) {
    negative = true;
    x *= -1;
  }

  let res = 0;
  while (x > 0) {
    res *= 10;
    let numberToPlace = x % 10;
    res += numberToPlace;
    x = Math.floor(x / 10);
  }

  if (res > Math.pow(2, 31) - 1) return 0;

  return negative ? res * -1 : res;
};

// TEST
// console.log(reverse(123));
// console.log(reverse(120));
// console.log(reverse(-123));
// console.log(reverse(0));
// console.log(reverse(1534236469));

// Leetcode Submit result of first answer
// Runtime => 104 ms
// Memory => 40.3 MB

// Leetcode Submit result of second answer
// Runtime => 96 ms
// Memory => 39.9 MB
