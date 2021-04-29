/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
Example 4:

Input: s = "([)]"
Output: false
Example 5:

Input: s = "{[]}"
Output: true
*/

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "[" || s[i] === "{") {
      arr.push(s[i]);
    } else {
      if (arr[arr.length - 1] === map[s[i]]) {
        arr.pop();
      } else return false;
    }
  }
  return arr.length === 0;
};

// TEST
console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));

// Leetcode Submit result
// Runtime => 92 ms
// Memory => 38.8 MB
// Rank => beat 15.07% of solutions (runtime)
// Rank => beat 72.24% of solutions (memory)
