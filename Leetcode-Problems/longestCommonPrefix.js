/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
*/

const longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  let prefix = "";
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[0][i] !== strs[j][i]) return prefix;
    }
    prefix += strs[0][i];
  }
  return prefix;
};

// TEST
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));

// Leetcode Submit result
// Runtime => 92 ms
// Memory => 39.6 MB
// Rank => beat 35.52% of solutions (runtime)
// Rank => beat 53.95% of solutions (memory)
