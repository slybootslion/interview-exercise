/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (!s) return true
  const reg = /[\W|_]/g
  return s.replace(reg, '').toLowerCase().split('').reverse().join('') === s.replace(reg, '').toLocaleLowerCase()
};
// @lc code=end

