/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

 

Example 1:

Input: s = "III"
Output: 3
Example 2:

Input: s = "IV"
Output: 4
Example 3:

Input: s = "IX"
Output: 9
Example 4:

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 5:

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

var romanToInt = function (s) {
  let total = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "I") {
      total += 1;
    } else if (s[i] === "V" && s[i - 1] === "I") {
      total += 3;
    } else if (s[i] === "X" && s[i - 1] === "I") {
      total += 8;
    } else if (s[i] === "L" && s[i - 1] === "X") {
      total += 30;
    } else if (s[i] === "C" && s[i - 1] === "X") {
      total += 80;
    } else if (s[i] === "D" && s[i - 1] === "C") {
      total += 300;
    } else if (s[i] === "M" && s[i - 1] === "C") {
      total += 800;
    } else if (s[i] === "V") {
      total += 5;
    } else if (s[i] === "X") {
      total += 10;
    } else if (s[i] === "L") {
      total += 50;
    } else if (s[i] === "C") {
      total += 100;
    } else if (s[i] === "D") {
      total += 500;
    } else if (s[i] === "M") {
      total += 1000;
    }
  }
  return total;
};

// TEST
console.log(romanToInt("III"));
console.log(romanToInt("IV"));
console.log(romanToInt("IX"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));

// Leetcode Submit result
// Runtime => 180 ms
// Memory => 44.5 MB
// Rank => beat 25.97% of solutions (runtime)
// Rank => beat 88.70% of solutions (memory)
