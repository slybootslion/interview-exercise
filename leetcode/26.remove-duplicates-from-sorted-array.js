/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 直觉的写了个方法通过了，不过成绩不太行
var removeDuplicates = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    if (item === nums[i + 1]) {
      nums.splice(i, 1)
      i--
    }
  }
  return nums.length
};
// @lc code=end

